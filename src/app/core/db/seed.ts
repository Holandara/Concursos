import { db, now } from './database';
import { Subject } from '../models/models';
import {
  AreaFile, ContestManifestEntry, SubjectContent, SubjectSeed,
} from '../data/content-types';
import {
  isSchemaSupported, loadAllAreas, loadContestMeta, loadManifest,
} from '../data/content-loader';

export interface SeedResult {
  ok: boolean;
  /** Slugs cujo conteúdo foi aplicado nesta execução. */
  applied: string[];
  /** Mensagem de falha — normalmente rede indisponível no primeiro acesso. */
  error?: string;
}

/** Chave de versão POR CONCURSO: publicar um não força reprocessar os outros. */
const versionKey = (slug: string) => `contentVersion:${slug}`;

function toText(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Casa título de conteúdo com título do edital ignorando acento e caixa. */
function norm(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
}

/**
 * Semeia o banco a partir dos JSON estáticos de `public/content/`.
 *
 * O conteúdo é buscado SOMENTE quando há trabalho a fazer: concurso ainda não
 * cadastrado ou `contentVersion` do manifesto maior que a registrada. Depois da
 * primeira execução o app funciona inteiramente offline, lendo do IndexedDB.
 *
 * Falha de rede não é fatal: o app segue com o que já estiver semeado e tenta
 * de novo na próxima abertura, já que a versão só é gravada em caso de sucesso.
 */
export async function seedDatabase(): Promise<SeedResult> {
  const applied: string[] = [];
  try {
    const manifest = await loadManifest();
    if (!isSchemaSupported(manifest)) {
      return {
        ok: false,
        applied,
        error: `Formato de conteúdo não suportado (schemaVersion ${manifest.schemaVersion}).`,
      };
    }
    for (const contest of manifest.contests) {
      if (await seedContest(contest)) applied.push(contest.slug);
    }
    return { ok: true, applied };
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    console.warn('[seed] conteúdo não pôde ser carregado:', error);
    return { ok: false, applied, error };
  }
}

/** @returns true se o conteúdo foi aplicado nesta execução. */
async function seedContest(entry: ContestManifestEntry): Promise<boolean> {
  const ts = now();

  // 1. Concurso e árvore do edital — só na primeira vez.
  let contest = await db.contests.where('slug').equals(entry.slug).first();
  if (!contest) {
    const meta = await loadContestMeta(entry);
    const contestId = await db.contests.add({
      slug: meta.slug, name: meta.name, role: meta.role, year: meta.year,
      examInfo: meta.examInfo,
      createdAt: ts, updatedAt: ts,
    });
    await insertTree(meta.tree, null, contestId, ts);
    contest = await db.contests.get(contestId);
  }
  if (!contest?.id) return false;

  // 2. Conteúdo — só quando a versão publicada é mais nova que a registrada.
  const stored = await db.settings.get(versionKey(entry.slug));
  if (stored?.value === entry.contentVersion) return false;

  // Rótulos do concurso podem ser corrigidos numa publicação (retificação de
  // edital, banca alterada). Diferente do conteúdo, aqui a fonte externa manda:
  // são metadados publicados, não trabalho do usuário.
  const meta = await loadContestMeta(entry);
  await db.contests.update(contest.id, {
    name: meta.name, role: meta.role, year: meta.year,
    examInfo: meta.examInfo, updatedAt: ts,
  });

  const areas: AreaFile[] = await loadAllAreas(entry);
  await applyContent(contest.id, areas.flatMap((a) => a.subjects), ts);
  await db.settings.put({ key: versionKey(entry.slug), value: entry.contentVersion });
  return true;
}

async function insertTree(
  nodes: SubjectSeed[], parentId: number | null, contestId: number, ts: number,
): Promise<void> {
  let order = 0;
  for (const node of nodes) {
    const subject: Subject = {
      contestId, parentId,
      title: node.title,
      order: order++,
      topics: node.topics ?? [],
      status: 'nao_iniciado',
      priority: 'media',
      favorite: 0,
      mastery: 0,
      timesReviewed: 0,
      lastReviewedAt: null,
      totalSeconds: 0,
      createdAt: ts, updatedAt: ts,
    };
    const id = await db.subjects.add(subject);
    if (node.children?.length) await insertTree(node.children, id, contestId, ts);
  }
}

/**
 * Aplica resumos, legislação e questões.
 *
 * NÃO é destrutivo: preenche apenas o que estiver vazio. Nada do que você
 * escreveu é sobrescrito, mesmo quando a versão do conteúdo avança.
 */
async function applyContent(
  contestId: number, contents: SubjectContent[], ts: number,
): Promise<void> {
  // Escopo por concurso: títulos iguais em concursos diferentes não se misturam.
  const subjects = await db.subjects.where('contestId').equals(contestId).toArray();
  const byTitle = new Map(subjects.map((s) => [norm(s.title), s]));
  const missing: string[] = [];

  for (const content of contents) {
    const subject = byTitle.get(norm(content.subject));
    if (!subject?.id) { missing.push(content.subject); continue; }
    const subjectId = subject.id;

    for (const kind of ['summary', 'notes'] as const) {
      const html = kind === 'summary' ? content.summary : content.notes;
      if (!html) continue;
      const existing = await db.docs.where('[subjectId+kind]').equals([subjectId, kind]).first();
      if (!existing) {
        await db.docs.add({ subjectId, kind, json: html, text: toText(html), updatedAt: ts });
      }
    }

    if (content.articles?.length) {
      const count = await db.articles.where('subjectId').equals(subjectId).count();
      if (count === 0) {
        await db.articles.bulkAdd(content.articles.map((a, i) => ({
          subjectId,
          lawRef: a.lawRef,
          heading: a.heading,
          html: a.html,
          text: toText(a.html),
          note: a.note ?? '',
          important: a.important ?? 0,
          favorite: 0 as 0 | 1,
          order: i,
          createdAt: ts, updatedAt: ts,
        })));
      }
    }

    if (content.questions?.length) {
      const count = await db.questions.where('subjectId').equals(subjectId).count();
      if (count === 0) {
        await db.questions.bulkAdd(content.questions.map((q) => ({
          subjectId,
          statement: q.statement,
          options: q.options,
          correct: q.correct,
          banca: q.banca,
          year: q.year,
          orgao: q.orgao,
          difficulty: q.difficulty,
          subtopic: q.subtopic ?? '',
          tags: q.tags ?? [],
          comment: q.comment ?? '',
          justification: q.justification ?? '',
          myNote: '',
          status: 'nunca_vista' as const,
          favorite: 0 as 0 | 1,
          answered: 0,
          correctCount: 0,
          createdAt: ts, updatedAt: ts,
        })));
      }
    }
  }

  if (missing.length) {
    console.warn('[seed] assuntos do conteúdo sem correspondência na árvore:', missing);
  }
}
