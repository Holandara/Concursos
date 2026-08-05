import { ChangeDetectionStrategy, Component, Input, OnInit, computed, inject, signal } from '@angular/core';
import { db } from '../../../core/db/database';
import { REVIEW_INTERVALS, ReviewEntry, StudySession } from '../../../core/models/models';
import { ReviewService } from '../../../core/services/review.service';
import { SubjectStore } from '../../../core/services/subject.store';

@Component({
  selector: 'app-reviews-tab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  @if (subject(); as s) {
    <div class="space-y-5">

      <!-- Métricas -->
      <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div class="card p-4">
          <div class="text-[11px] font-semibold uppercase tracking-wide text-faint">Revisões feitas</div>
          <div class="mt-1 text-2xl font-bold">{{ s.timesReviewed }}</div>
        </div>
        <div class="card p-4">
          <div class="text-[11px] font-semibold uppercase tracking-wide text-faint">Última revisão</div>
          <div class="mt-1 text-lg font-bold">
            {{ s.lastReviewedAt ? (formatDate(s.lastReviewedAt)) : '—' }}
          </div>
        </div>
        <div class="card p-4">
          <div class="text-[11px] font-semibold uppercase tracking-wide text-faint">Tempo estudado</div>
          <div class="mt-1 text-2xl font-bold">{{ hours(s.totalSeconds) }}</div>
          <div class="text-[11px] text-faint">registrado automaticamente</div>
        </div>
        <div class="card p-4">
          <div class="text-[11px] font-semibold uppercase tracking-wide text-faint">Nível de domínio</div>
          <div class="mt-1 text-2xl font-bold">{{ s.mastery }}%</div>
        </div>
      </div>

      <!-- Domínio -->
      <div class="card p-4">
        <label class="label">Auto-avaliação de domínio ({{ s.mastery }}%)</label>
        <input type="range" min="0" max="100" step="5" class="w-full accent-[var(--accent)]"
               [value]="s.mastery" (change)="setMastery($any($event.target).value)">
        <div class="mt-2 h-2 w-full overflow-hidden rounded-full" style="background: var(--hover);">
          <div class="h-full rounded-full transition-all" style="background: var(--accent);" [style.width.%]="s.mastery"></div>
        </div>
      </div>

      <!-- Próxima revisão / agendar -->
      <div class="card p-4">
        <div class="flex flex-wrap items-center gap-2">
          <div>
            <div class="text-sm font-semibold">Revisão espaçada</div>
            @if (pending(); as p) {
              <p class="text-sm text-soft">
                Próxima revisão: <b [class.text-accent]="isDue(p)">{{ formatDate(p.dueAt) }}</b>
                (intervalo de {{ p.intervalDays }} dia(s))
                @if (isDue(p)) { <span class="chip ml-1" style="background: var(--sel); color: var(--accent);">vence hoje!</span> }
              </p>
            } @else {
              <p class="text-sm text-soft">Nenhuma revisão agendada.</p>
            }
          </div>
        </div>

        <div class="mt-3">
          <div class="label">✅ Revisei agora — agendar próxima em:</div>
          <div class="flex flex-wrap gap-2">
            @for (d of intervals; track d) {
              <button type="button" class="btn" (click)="complete(d)">{{ d }} dia{{ d > 1 ? 's' : '' }}</button>
            }
            <button type="button" class="btn btn-ghost" (click)="complete(null)">Sem reagendar</button>
          </div>
        </div>
        <div class="mt-3">
          <div class="label">📅 Apenas agendar (sem marcar como revisado):</div>
          <div class="flex flex-wrap gap-2">
            @for (d of intervals; track d) {
              <button type="button" class="btn !py-1 text-xs" (click)="schedule(d)">{{ d }}d</button>
            }
          </div>
        </div>
      </div>

      <!-- Histórico -->
      <div class="card p-4">
        <div class="text-sm font-semibold">Histórico</div>
        <div class="mt-2 space-y-1.5">
          @for (r of history(); track r.id) {
            <div class="flex items-center gap-2 text-sm text-soft">
              <span>{{ r.done ? '✅' : '⏳' }}</span>
              <span>
                @if (r.done) { Revisado em {{ formatDate(r.completedAt!) }} }
                @else { Agendado para {{ formatDate(r.dueAt) }} }
              </span>
              <span class="text-faint">· intervalo {{ r.intervalDays }}d</span>
            </div>
          } @empty {
            <p class="text-sm text-faint">Sem registros ainda.</p>
          }
        </div>
      </div>

      <!-- Sessões de estudo -->
      <div class="card p-4">
        <div class="text-sm font-semibold">Sessões de estudo (dias)</div>
        <div class="mt-2 flex flex-wrap gap-1.5">
          @for (sess of sessions(); track sess.id) {
            <span class="chip bg-hoverc text-soft">{{ sess.day }} · {{ minutes(sess.seconds) }}</span>
          } @empty {
            <p class="text-sm text-faint">O tempo é registrado automaticamente enquanto você navega neste assunto.</p>
          }
        </div>
      </div>
    </div>
  }
  `,
})
export class ReviewsTabComponent implements OnInit {
  @Input({ required: true }) subjectId!: number;

  private store = inject(SubjectStore);
  private reviewService = inject(ReviewService);

  readonly intervals = REVIEW_INTERVALS;
  readonly pending = signal<ReviewEntry | null>(null);
  readonly history = signal<ReviewEntry[]>([]);
  readonly sessions = signal<StudySession[]>([]);

  readonly subject = computed(() => this.store.byId(this.subjectId));

  async ngOnInit(): Promise<void> {
    await this.reload();
  }

  private async reload(): Promise<void> {
    this.pending.set((await this.reviewService.pendingFor(this.subjectId)) ?? null);
    this.history.set(await this.reviewService.historyFor(this.subjectId));
    const sess = await db.sessions.where('subjectId').equals(this.subjectId).toArray();
    this.sessions.set(sess.sort((a, b) => b.day.localeCompare(a.day)).slice(0, 30));
  }

  isDue(entry: ReviewEntry): boolean {
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    return entry.dueAt <= end.getTime();
  }

  formatDate(ts: number): string {
    return new Date(ts).toLocaleDateString('pt-BR');
  }

  hours(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.round((seconds % 3600) / 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  }

  minutes(seconds: number): string {
    return Math.max(1, Math.round(seconds / 60)) + ' min';
  }

  async setMastery(value: string): Promise<void> {
    await this.store.patch(this.subjectId, { mastery: Number(value) });
  }

  async complete(nextDays: number | null): Promise<void> {
    await this.reviewService.completeReview(this.subjectId, nextDays);
    const s = this.store.byId(this.subjectId);
    if (s && s.status === 'estudando') await this.store.setStatus(this.subjectId, 'revisando');
    await this.reload();
  }

  async schedule(days: number): Promise<void> {
    await this.reviewService.schedule(this.subjectId, days);
    await this.reload();
  }
}
