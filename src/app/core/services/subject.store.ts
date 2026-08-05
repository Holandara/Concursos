import { Injectable, computed, signal } from '@angular/core';
import { db, now } from '../db/database';
import { seedDatabase } from '../db/seed';
import { Contest, Priority, Subject, SubjectStatus } from '../models/models';

export interface SubjectNode extends Subject {
  children: SubjectNode[];
}

/**
 * Store central de assuntos (árvore do edital) baseada em Signals.
 * Fonte da verdade: IndexedDB. O signal `subjects` é o cache reativo em memória.
 */
@Injectable({ providedIn: 'root' })
export class SubjectStore {
  readonly loaded = signal(false);
  readonly contest = signal<Contest | null>(null);
  readonly subjects = signal<Subject[]>([]);

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
    await seedDatabase();
    const contest = (await db.contests.toArray())[0] ?? null;
    this.contest.set(contest);
    await this.reload();
    this.loaded.set(true);
  }

  async reload(): Promise<void> {
    this.subjects.set(await db.subjects.toArray());
  }

  byId(id: number): Subject | undefined {
    return this.subjects().find((s) => s.id === id);
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
    await db.subjects.update(id, { ...changes, updatedAt: now() });
    this.subjects.update((list) =>
      list.map((s) => (s.id === id ? { ...s, ...changes, updatedAt: now() } : s))
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
    const siblings = this.subjects().filter((s) => s.parentId === parentId);
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
      this.subjects().filter((s) => s.parentId === sid).forEach((c) => collect(c.id!));
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
