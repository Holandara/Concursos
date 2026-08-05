import { Injectable, computed, signal } from '@angular/core';
import { db, now } from '../db/database';
import { seedDatabase } from '../db/seed';
import { Contest, Priority, Subject, SubjectStatus } from '../models/models';

export interface SubjectNode extends Subject {
  children: SubjectNode[];
}

/** Concurso escolhido pela última vez — lembrado entre sessões. */
const ACTIVE_KEY = 'cs-active-contest';

/**
 * Store central de assuntos (árvore do edital) baseada em Signals.
 * Fonte da verdade: IndexedDB. O signal `subjects` é o cache reativo em memória.
 *
 * A plataforma hospeda VÁRIOS concursos no mesmo banco. Um deles é o "ativo":
 * a árvore do menu, o dashboard, a busca e as revisões enxergam apenas ele.
 * `allSubjects` guarda a lista completa porque um link vindo de fora (ou uma
 * URL colada) pode apontar para um assunto de outro concurso — nesse caso o
 * app troca o ativo em vez de exibir "assunto não encontrado".
 */
@Injectable({ providedIn: 'root' })
export class SubjectStore {
  readonly loaded = signal(false);
  /** Conteúdo não pôde ser baixado e o banco está vazio (1ª abertura sem rede). */
  readonly contentUnavailable = signal(false);

  /** Todos os concursos semeados, na ordem do manifesto. */
  readonly contests = signal<Contest[]>([]);
  /** Slug do concurso ativo (persistido em localStorage). */
  readonly activeSlug = signal<string | null>(null);

  /** Todos os assuntos do banco, de todos os concursos. */
  readonly allSubjects = signal<Subject[]>([]);

  readonly contest = computed<Contest | null>(
    () => this.contests().find((c) => c.slug === this.activeSlug()) ?? null
  );

  /** Assuntos do concurso ativo — base de tudo que a interface mostra. */
  readonly subjects = computed<Subject[]>(() => {
    const contestId = this.contest()?.id;
    if (contestId == null) return [];
    return this.allSubjects().filter((s) => s.contestId === contestId);
  });

  /** IDs do concurso ativo: usado pelos serviços para filtrar tabelas globais. */
  readonly scopeIds = computed<Set<number>>(
    () => new Set(this.subjects().map((s) => s.id!))
  );

  /** Árvore montada a partir da lista plana. */
  readonly tree = computed<SubjectNode[]>(() => {
    const list = this.subjects();
    const byParent = new Map<number | null, Subject[]>();
    for (const s of list) {
      const arr = byParent.get(s.parentId) ?? [];
      arr.push(s);
      byParent.set(s.parentId, arr);
    }
    const build = (parentId: number | null): SubjectNode[] =>
      (byParent.get(parentId) ?? [])
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((s) => ({ ...s, children: build(s.id!) }));
    return build(null);
  });

  /** Assuntos "folha" (sem filhos) — unidades reais de estudo. */
  readonly leaves = computed<Subject[]>(() => {
    const list = this.subjects();
    const parents = new Set(list.map((s) => s.parentId).filter((p) => p !== null));
    return list.filter((s) => !parents.has(s.id!));
  });

  async init(): Promise<void> {
    if (this.loaded()) return;
    const seed = await seedDatabase();
    // Falha de rede na primeira abertura deixa o app sem conteúdo; a flag
    // permite avisar o usuário em vez de mostrar uma árvore vazia sem explicação.
    this.contentUnavailable.set(!seed.ok && (await db.subjects.count()) === 0);
    await this.reload();
    this.loaded.set(true);
  }

  /** Recarrega concursos e assuntos, mantendo (ou corrigindo) o concurso ativo. */
  async reload(): Promise<void> {
    const [contests, subjects] = await Promise.all([
      db.contests.toArray(),
      db.subjects.toArray(),
    ]);
    this.contests.set(contests);
    this.allSubjects.set(subjects);

    // O ativo pode ter sumido (banco novo, concurso removido do manifesto):
    // cair no primeiro disponível é melhor que renderizar uma tela vazia.
    const stored = this.activeSlug() ?? this.readStoredSlug();
    const valid = stored != null && contests.some((c) => c.slug === stored);
    this.setActive(valid ? stored : (contests[0]?.slug ?? null), false);
  }

  private readStoredSlug(): string | null {
    try { return localStorage.getItem(ACTIVE_KEY); } catch { return null; }
  }

  /** Troca o concurso ativo. `persist = false` apenas sincroniza o estado. */
  setActive(slug: string | null, persist = true): void {
    if (this.activeSlug() === slug) return;
    this.activeSlug.set(slug);
    if (!persist) return;
    try {
      if (slug) localStorage.setItem(ACTIVE_KEY, slug);
      else localStorage.removeItem(ACTIVE_KEY);
    } catch { /* modo privado: seguir sem lembrar a escolha */ }
  }

  hasContest(slug: string): boolean {
    return this.contests().some((c) => c.slug === slug);
  }

  contestOf(subjectId: number): Contest | undefined {
    const subject = this.allSubjects().find((s) => s.id === subjectId);
    return this.contests().find((c) => c.id === subject?.contestId);
  }

  /** Busca em TODOS os concursos: uma URL colada pode ser de outro edital. */
  byId(id: number): Subject | undefined {
    return this.allSubjects().find((s) => s.id === id);
  }

  /** Trilha de ancestrais (para breadcrumb). */
  pathOf(id: number): Subject[] {
    const path: Subject[] = [];
    let cur = this.byId(id);
    while (cur) {
      path.unshift(cur);
      cur = cur.parentId != null ? this.byId(cur.parentId) : undefined;
    }
    return path;
  }

  async patch(id: number, changes: Partial<Subject>): Promise<void> {
    const ts = now();
    await db.subjects.update(id, { ...changes, updatedAt: ts });
    this.allSubjects.update((list) =>
      list.map((s) => (s.id === id ? { ...s, ...changes, updatedAt: ts } : s))
    );
  }

  setStatus(id: number, status: SubjectStatus) { return this.patch(id, { status }); }
  setPriority(id: number, priority: Priority) { return this.patch(id, { priority }); }
  toggleFavorite(id: number) {
    const s = this.byId(id);
    return this.patch(id, { favorite: s?.favorite ? 0 : 1 });
  }

  async addSubject(contestId: number, parentId: number | null, title: string): Promise<number> {
    const ts = now();
    const siblings = this.allSubjects().filter(
      (s) => s.contestId === contestId && s.parentId === parentId
    );
    const id = await db.subjects.add({
      contestId, parentId, title,
      order: siblings.length,
      topics: [],
      status: 'nao_iniciado', priority: 'media', favorite: 0,
      mastery: 0, timesReviewed: 0, lastReviewedAt: null, totalSeconds: 0,
      createdAt: ts, updatedAt: ts,
    });
    await this.reload();
    return id;
  }

  /** Exclui um assunto e todo o seu conteúdo (recursivo). */
  async deleteSubject(id: number): Promise<void> {
    const ids: number[] = [];
    const collect = (sid: number) => {
      ids.push(sid);
      this.allSubjects().filter((s) => s.parentId === sid).forEach((c) => collect(c.id!));
    };
    collect(id);
    await db.transaction('rw', [db.subjects, db.docs, db.articles, db.questions, db.flashcards, db.reviews, db.sessions], async () => {
      await db.subjects.bulkDelete(ids);
      for (const table of [db.docs, db.articles, db.questions, db.flashcards, db.reviews, db.sessions]) {
        await (table as any).where('subjectId').anyOf(ids).delete();
      }
    });
    await this.reload();
  }
}
