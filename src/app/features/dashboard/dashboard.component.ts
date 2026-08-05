import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardStats, StatsService } from '../../core/services/stats.service';
import { ReviewService } from '../../core/services/review.service';
import { SubjectStore } from '../../core/services/subject.store';
import { STATUS_LABEL, PRIORITY_LABEL } from '../../core/models/models';
import { contestLink } from '../../core/routing/contest.routing';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent],
  template: `
  <div class="mx-auto max-w-5xl px-4 py-6 sm:px-6">
    <h1 class="text-2xl font-bold tracking-tight">Dashboard</h1>
    <p class="mt-1 text-sm text-soft">
      {{ store.contest()?.name }} — {{ store.contest()?.role }}
    </p>

    @if (stats(); as s) {
      <!-- Cards -->
      <div class="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
        <div class="card p-4">
          <div class="text-[11px] font-semibold uppercase tracking-wide text-faint">Progresso geral</div>
          <div class="mt-1 text-2xl font-bold">{{ s.progressPct }}%</div>
          <div class="mt-2 h-1.5 w-full overflow-hidden rounded-full" style="background: var(--hover);">
            <div class="h-full rounded-full" style="background: var(--accent);" [style.width.%]="s.progressPct"></div>
          </div>
        </div>
        <div class="card p-4">
          <div class="text-[11px] font-semibold uppercase tracking-wide text-faint">Assuntos estudados</div>
          <div class="mt-1 text-2xl font-bold">{{ s.studied }}<span class="text-sm font-normal text-faint">/{{ s.totalLeaves }}</span></div>
          <div class="text-xs text-soft">{{ s.dominated }} dominados</div>
        </div>
        <div class="card p-4">
          <div class="text-[11px] font-semibold uppercase tracking-wide text-faint">Questões respondidas</div>
          <div class="mt-1 text-2xl font-bold">{{ s.questionsAnswered }}</div>
        </div>
        <div class="card p-4">
          <div class="text-[11px] font-semibold uppercase tracking-wide text-faint">Taxa de acerto</div>
          <div class="mt-1 text-2xl font-bold">{{ s.accuracyPct === null ? '—' : s.accuracyPct + '%' }}</div>
        </div>
        <div class="card p-4">
          <div class="text-[11px] font-semibold uppercase tracking-wide text-faint">Horas estudadas</div>
          <div class="mt-1 text-2xl font-bold">{{ hours(s.totalSeconds) }}</div>
        </div>
      </div>

      <!-- Revisões de hoje -->
      <section class="mt-8">
        <h2 class="text-base font-semibold">Revisões do dia</h2>
        @if (dueSubjects().length === 0) {
          <p class="mt-2 flex items-center gap-1.5 text-sm text-faint">
            <app-icon name="celebrate" /> Nada para revisar hoje.
          </p>
        } @else {
          <div class="mt-3 grid gap-2 sm:grid-cols-2">
            @for (item of dueSubjects(); track item.id) {
              <a [routerLink]="link('assunto', item.subjectId)" [queryParams]="{ tab: 'revisoes' }"
                 class="card flex items-center gap-3 p-3 no-underline hover:border-accent transition-colors">
                <app-icon name="clock" [size]="17" class="text-accent" />
                <span class="min-w-0">
                  <span class="block truncate text-sm font-medium text-ink">{{ item.title }}</span>
                  <span class="block text-xs text-soft">intervalo de {{ item.intervalDays }} dia(s)</span>
                </span>
              </a>
            }
          </div>
        }
      </section>

      <!-- Mapa de calor -->
      <section class="mt-8">
        <h2 class="text-base font-semibold">Calendário de estudos <span class="font-normal text-faint">(últimos 4 meses)</span></h2>
        <div class="card mt-3 overflow-x-auto p-4">
          <div class="heat-grid">
            @for (cell of s.heatmap; track cell.day) {
              <div class="heat-cell" [class]="heatClass(cell.seconds)"
                   [title]="cell.day + ' · ' + minutes(cell.seconds)"></div>
            }
          </div>
          <div class="mt-2 flex items-center gap-1 text-[11px] text-faint">
            menos <span class="heat-cell heat-0"></span><span class="heat-cell heat-1"></span><span class="heat-cell heat-2"></span><span class="heat-cell heat-3"></span><span class="heat-cell heat-4"></span> mais
          </div>
        </div>
      </section>

      <div class="mt-8 grid gap-6 lg:grid-cols-2">
        <!-- Últimos assuntos -->
        <section>
          <h2 class="text-base font-semibold">Últimos assuntos</h2>
          <div class="mt-3 space-y-2">
            @for (subject of s.recent; track subject.id) {
              <a [routerLink]="link('assunto', subject.id!)"
                 class="card flex items-center gap-3 p-3 no-underline hover:border-accent transition-colors">
                <span class="min-w-0 flex-1">
                  <span class="block truncate text-sm font-medium text-ink">{{ subject.title }}</span>
                  <span class="block text-xs text-soft">{{ statusLabel[subject.status] }} · {{ hours(subject.totalSeconds) }}</span>
                </span>
                <span class="chip" [class]="'st-' + subject.status">{{ statusLabel[subject.status] }}</span>
              </a>
            } @empty {
              <p class="text-sm text-faint">Comece a estudar para ver seu histórico aqui.</p>
            }
          </div>
        </section>

        <!-- Pendentes -->
        <section>
          <h2 class="text-base font-semibold">Assuntos pendentes</h2>
          <div class="mt-3 space-y-2">
            @for (subject of s.pending; track subject.id) {
              <a [routerLink]="link('assunto', subject.id!)"
                 class="card flex items-center gap-3 p-3 no-underline hover:border-accent transition-colors">
                <span class="min-w-0 flex-1 truncate text-sm font-medium text-ink">{{ subject.title }}</span>
                <span class="chip" [class]="'pr-' + subject.priority">{{ priorityLabel[subject.priority] }}</span>
              </a>
            } @empty {
              <p class="flex items-center gap-1.5 text-sm text-faint">
                <app-icon name="success" /> Nenhum assunto pendente.
              </p>
            }
          </div>
        </section>
      </div>
    } @else {
      <p class="mt-8 text-sm text-faint">Carregando…</p>
    }
  </div>
  `,
  styles: [`
    .heat-grid {
      display: grid;
      grid-template-rows: repeat(7, 12px);
      grid-auto-flow: column;
      gap: 3px;
      width: max-content;
    }
    .heat-cell { width: 12px; height: 12px; border-radius: 3px; display: inline-block; }
    .st-nao_iniciado { background: var(--hover); color: var(--soft); }
    .st-estudando { background: color-mix(in srgb, var(--warn) 18%, transparent); color: var(--warn); }
    .st-revisando { background: var(--sel); color: var(--accent); }
    .st-dominado { background: color-mix(in srgb, var(--ok) 18%, transparent); color: var(--ok); }
    .pr-alta { background: color-mix(in srgb, var(--bad) 15%, transparent); color: var(--bad); }
    .pr-media { background: color-mix(in srgb, var(--warn) 15%, transparent); color: var(--warn); }
    .pr-baixa { background: var(--hover); color: var(--soft); }
  `],
})
export class DashboardComponent implements OnInit {
  /** Links do dashboard já nascem prefixados com o concurso ativo. */
  link = (...segments: (string | number)[]) => contestLink(this.store.activeSlug(), ...segments);

  readonly store = inject(SubjectStore);
  private statsService = inject(StatsService);
  private reviewService = inject(ReviewService);

  readonly stats = signal<DashboardStats | null>(null);
  readonly statusLabel = STATUS_LABEL;
  readonly priorityLabel = PRIORITY_LABEL;

  readonly dueSubjects = computed(() =>
    this.reviewService.due().map((r) => ({
      id: r.id, subjectId: r.subjectId, intervalDays: r.intervalDays,
      title: this.store.byId(r.subjectId)?.title ?? 'Assunto',
    }))
  );

  async ngOnInit(): Promise<void> {
    await this.reviewService.refresh();
    this.stats.set(await this.statsService.compute());
  }

  hours(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.round((seconds % 3600) / 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  }

  minutes(seconds: number): string {
    return seconds ? Math.round(seconds / 60) + ' min' : 'sem estudo';
  }

  heatClass(seconds: number): string {
    if (!seconds) return 'heat-cell heat-0';
    const m = seconds / 60;
    if (m < 15) return 'heat-cell heat-1';
    if (m < 45) return 'heat-cell heat-2';
    if (m < 90) return 'heat-cell heat-3';
    return 'heat-cell heat-4';
  }
}
