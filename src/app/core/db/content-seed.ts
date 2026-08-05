import { db, now } from './database';
import { Subject } from '../models/models';
import { CONTENT_VERSION, SubjectContent } from '../data/content/content-types';
import { SUBJECT_CONTENT } from '../data/content';

const SETTING_KEY = 'contentSeedVersion';

/** Remove tags para gerar o texto plano usado na busca global. */
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

/** Normaliza títulos para casar conteúdo x assunto mesmo com acento/caixa diferente. */
function norm(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
}

/**
 * Aplica o seed de conteúdo (resumos, legislação e questões).
 *
 * Regras:
 *  - idempotente: roda só quando `CONTENT_VERSION` mudar;
 *  - NÃO destrutivo: só preenche o que ainda está vazio — nada do que você
 *    escreveu é sobrescrito.
 */
export async function seedContent(): Promise<void> {
  const setting = await db.settings.get(SETTING_KEY);
  if (setting && setting.value === CONTENT_VERSION) return;

  const subjects = await db.subjects.toArray();
  const byTitle = new Map<string, Subject>();
  for (const s of subjects) byTitle.set(norm(s.title), s);

  const missing: string[] = [];
  const ts = now();

  for (const content of SUBJECT_CONTENT as SubjectContent[]) {
    const subject = byTitle.get(norm(content.subject));
    if (!subject?.id) { missing.push(content.subject); continue; }
    const subjectId = subject.id;

    if (content.summary) {
      const existing = await db.docs.where('[subjectId+kind]').equals([subjectId, 'summary']).first();
      if (!existing) {
        await db.docs.add({
          subjectId, kind: 'summary',
          json: content.summary, text: toText(content.summary), updatedAt: ts,
        });
      }
    }

    if (content.notes) {
      const existing = await db.docs.where('[subjectId+kind]').equals([subjectId, 'notes']).first();
      if (!existing) {
        await db.docs.add({
          subjectId, kind: 'notes',
          json: content.notes, text: toText(content.notes), updatedAt: ts,
        });
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
          createdAt: ts,
          updatedAt: ts,
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
          createdAt: ts,
          updatedAt: ts,
        })));
      }
    }
  }

  if (missing.length) {
    console.warn('[content-seed] assuntos não encontrados na árvore:', missing);
  }

  await db.settings.put({ key: SETTING_KEY, value: CONTENT_VERSION });
}
