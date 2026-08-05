import { Injectable, inject, signal } from '@angular/core';
import { db, now } from '../db/database';
import { Flashcard, ReviewEntry } from '../models/models';
import { SubjectStore } from './subject.store';

const DAY_MS = 86_400_000;
const LADDER = [1, 3, 7, 15, 30, 90];

/**
 * Sistema de revisão espaçada (estilo Anki) com intervalos fixos:
 * 1, 3, 7, 15, 30 e 90 dias — tanto para assuntos quanto para flashcards.
 */
@Injectable({ providedIn: 'root' })
export class ReviewService {
  private store = inject(SubjectStore);

  /** Revisões de assuntos pendentes (vencidas ou de hoje). */
  readonly due = signal<ReviewEntry[]>([]);

  async refresh(): Promise<void> {
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    // Só o concurso ativo: o sino da sidebar avisa sobre o que está em estudo,
    // não sobre revisões de um edital que a pessoa deixou de lado.
    const scope = this.store.scopeIds();
    const list = await db.reviews
      .where('done').equals(0)
      .and((r) => r.dueAt <= endOfToday.getTime() && scope.has(r.subjectId))
      .toArray();
    this.due.set(list.sort((a, b) => a.dueAt - b.dueAt));
  }

  /** Agenda (ou reagenda) a próxima revisão do assunto. */
  async schedule(subjectId: number, intervalDays: number): Promise<void> {
    await db.reviews.where('subjectId').equals(subjectId).and((r) => r.done === 0).delete();
    await db.reviews.add({
      subjectId,
      dueAt: now() + intervalDays * DAY_MS,
      intervalDays,
      done: 0,
      completedAt: null,
      createdAt: now(),
      updatedAt: now(),
    });
    await this.refresh();
  }

  /** Marca o assunto como revisado agora e agenda a próxima com o intervalo dado. */
  async completeReview(subjectId: number, nextIntervalDays: number | null): Promise<void> {
    const pending = await db.reviews.where('subjectId').equals(subjectId).and((r) => r.done === 0).toArray();
    for (const p of pending) {
      await db.reviews.update(p.id!, { done: 1, completedAt: now(), updatedAt: now() });
    }
    const subject = this.store.byId(subjectId);
    if (subject) {
      await this.store.patch(subjectId, {
        timesReviewed: subject.timesReviewed + 1,
        lastReviewedAt: now(),
      });
    }
    if (nextIntervalDays) await this.schedule(subjectId, nextIntervalDays);
    await this.refresh();
  }

  async pendingFor(subjectId: number): Promise<ReviewEntry | undefined> {
    return db.reviews.where('subjectId').equals(subjectId).and((r) => r.done === 0).first();
  }

  async historyFor(subjectId: number): Promise<ReviewEntry[]> {
    const all = await db.reviews.where('subjectId').equals(subjectId).toArray();
    return all.sort((a, b) => b.createdAt - a.createdAt);
  }

  // ---------- Flashcards ----------

  /** Avalia um flashcard e devolve o card atualizado (escada de intervalos). */
  rateCard(card: Flashcard, rating: 'again' | 'good' | 'easy'): Partial<Flashcard> {
    let idx = LADDER.indexOf(card.intervalDays);
    if (idx < 0) idx = 0;
    let nextIdx: number;
    if (rating === 'again') nextIdx = 0;
    else if (rating === 'good') nextIdx = Math.min(idx + 1, LADDER.length - 1);
    else nextIdx = Math.min(idx + 2, LADDER.length - 1);
    const interval = card.reps === 0 && rating !== 'again' ? LADDER[Math.max(nextIdx, 1)] : LADDER[nextIdx];
    return {
      intervalDays: interval,
      dueAt: now() + interval * DAY_MS,
      reps: card.reps + 1,
      lapses: card.lapses + (rating === 'again' ? 1 : 0),
      updatedAt: now(),
    };
  }
}
