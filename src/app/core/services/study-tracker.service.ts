import { Injectable, inject } from '@angular/core';
import { db, now, todayKey } from '../db/database';
import { SubjectStore } from './subject.store';

/**
 * Rastreia automaticamente o tempo de estudo por assunto.
 * Ao entrar na página do assunto o cronômetro inicia; a cada FLUSH_MS os
 * segundos são persistidos na sessão do dia e no total do assunto.
 */
@Injectable({ providedIn: 'root' })
export class StudyTrackerService {
  private store = inject(SubjectStore);
  private currentSubject: number | null = null;
  private lastTick = 0;
  private timer: ReturnType<typeof setInterval> | null = null;
  private static readonly FLUSH_MS = 20_000;

  start(subjectId: number): void {
    this.stop();
    this.currentSubject = subjectId;
    this.lastTick = now();
    this.timer = setInterval(() => void this.flush(), StudyTrackerService.FLUSH_MS);
  }

  async stop(): Promise<void> {
    if (this.timer) { clearInterval(this.timer); this.timer = null; }
    await this.flush();
    this.currentSubject = null;
  }

  private async flush(): Promise<void> {
    if (this.currentSubject == null) return;
    if (document.hidden) { this.lastTick = now(); return; }
    const seconds = Math.min(Math.round((now() - this.lastTick) / 1000), 120);
    this.lastTick = now();
    if (seconds <= 0) return;

    const subjectId = this.currentSubject;
    const day = todayKey();
    const existing = await db.sessions.where('day').equals(day)
      .and((s) => s.subjectId === subjectId).first();
    if (existing) {
      await db.sessions.update(existing.id!, { seconds: existing.seconds + seconds, updatedAt: now() });
    } else {
      await db.sessions.add({ subjectId, day, seconds, startedAt: now(), updatedAt: now() });
    }
    const subject = this.store.byId(subjectId);
    if (subject) {
      await this.store.patch(subjectId, { totalSeconds: subject.totalSeconds + seconds });
    }
  }
}
