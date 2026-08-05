import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { db } from '../../core/db/database';
import { Contest, Subject } from '../../core/models/models';
import { SubjectStore } from '../../core/services/subject.store';
import { CONTEST_PREFIX } from '../../core/routing/contest.routing';
import { IconComponent } from '../../shared/icon/icon.component';

/** Números de um concurso, calculados uma vez ao abrir a página. */
interface ContestCard {
  contest: Contest;
  totalLeaves: number;
  studied: number;
  dominated: number;
  progressPct: number;
  questions: number;
  articles: number;
  hours: number;
}

const STATUS_WEIGHT: Record<string, number> = {
  nao_iniciado: 0, estudando: 0.4, revisando: 0.75, dominado: 1,
};

/**
 * Página de seleção de concurso.
 *
 * Cada concurso é uma ilha: árvore, progresso, questões e revisões próprios.
 * Esta é a única tela que enxerga todos ao mesmo tempo — daí calcular as
 * estatísticas aqui, e não no `StatsService`, que é deliberadamente escopado
 * ao concurso ativo.
 */
@Component({
  selector: 'app-contests-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent],
  template: `
  <div class="mx-auto max-w-4xl px-4 py-8 sm:px-6">
    <h1 class="text-2xl font-bold tracking-tight">Concursos</h1>
    <p class="mt-1 text-sm text-soft">
      Escolha o edital que deseja estudar. Cada concurso mantém conteúdo,
      progresso e revisões separados.
    </p>

    @if (cards().length === 0) {
      <div class="card mt-6 p-6 text-sm text-soft">
        Nenhum concurso carregado ainda. Verifique sua conexão e recarregue a página.
      </div>
    }

    <div class="mt-6 grid gap-3 sm:grid-cols-2">
      @for (c of cards(); track c.contest.id) {
        <a [routerLink]="['/', prefix, c.contest.slug]"
           class="card block p-5 no-underline transition-colors hover:border-accent"
           [class.ring-active]="c.contest.slug === store.activeSlug()">

          <div class="flex items-start justify-between gap-2">
            <div class="min-w-0">
              <div class="truncate text-base font-bold text-ink">{{ c.contest.name }}</div>
              <div class="mt-0.5 text-[13px] leading-snug text-soft">{{ c.contest.role }}</div>
            </div>
            @if (c.contest.slug === store.activeSlug()) {
              <span class="chip shrink-0" style="background: var(--sel); color: var(--accent);">Ativo</span>
            }
          </div>

          <div class="mt-4 flex items-baseline gap-2">
            <span class="text-2xl font-bold">{{ c.progressPct }}%</span>
            <span class="text-xs text-faint">
              {{ c.studied }}/{{ c.totalLeaves }} assuntos · {{ c.dominated }} dominados
            </span>
          </div>
          <div class="mt-2 h-1.5 w-full overflow-hidden rounded-full" style="background: var(--hover);">
            <div class="h-full rounded-full" style="background: var(--accent);"
                 [style.width.%]="c.progressPct"></div>
          </div>

          <div class="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-soft">
            <span class="inline-flex items-center gap-1">
              <app-icon name="question" [size]="13" />{{ c.questions }} questões
            </span>
            <span class="inline-flex items-center gap-1">
              <app-icon name="legislation" [size]="13" />{{ c.articles }} artigos
            </span>
            <span class="inline-flex items-center gap-1">
              <app-icon name="clock" [size]="13" />{{ c.hours }} h estudadas
            </span>
            <span class="text-faint">{{ c.contest.year }}</span>
          </div>
        </a>
      }
    </div>
  </div>
  `,
  styles: [`
    .ring-active { border-color: var(--accent); box-shadow: 0 0 0 1px var(--accent) inset; }
  `],
})
export class ContestsPageComponent implements OnInit {
  readonly store = inject(SubjectStore);
  readonly prefix = CONTEST_PREFIX;
  readonly cards = signal<ContestCard[]>([]);

  async ngOnInit(): Promise<void> {
    const contests = this.store.contests();
    const subjects = this.store.allSubjects();

    // Uma leitura de cada tabela para TODOS os concursos: agrupar em memória
    // custa menos que abrir uma consulta por concurso.
    const [questions, articles, sessions] = await Promise.all([
      db.questions.toArray(),
      db.articles.toArray(),
      db.sessions.toArray(),
    ]);
    const owner = new Map<number, number>(subjects.map((s) => [s.id!, s.contestId]));
    const tally = <T extends { subjectId: number }>(rows: T[], value: (row: T) => number) => {
      const acc = new Map<number, number>();
      for (const row of rows) {
        const contestId = owner.get(row.subjectId);
        if (contestId == null) continue;
        acc.set(contestId, (acc.get(contestId) ?? 0) + value(row));
      }
      return acc;
    };
    const questionCount = tally(questions, () => 1);
    const articleCount = tally(articles, () => 1);
    const secondsCount = tally(sessions, (s) => s.seconds);

    this.cards.set(contests.map((contest) => {
      const own = subjects.filter((s) => s.contestId === contest.id);
      const leaves = leavesOf(own);
      const total = leaves.length;
      const progress = total
        ? leaves.reduce((a, s) => a + (STATUS_WEIGHT[s.status] ?? 0), 0) / total
        : 0;
      return {
        contest,
        totalLeaves: total,
        studied: leaves.filter((s) => s.status !== 'nao_iniciado').length,
        dominated: leaves.filter((s) => s.status === 'dominado').length,
        progressPct: Math.round(progress * 100),
        questions: questionCount.get(contest.id!) ?? 0,
        articles: articleCount.get(contest.id!) ?? 0,
        hours: Math.round((secondsCount.get(contest.id!) ?? 0) / 360) / 10,
      };
    }));
  }
}

/** Folhas = assuntos sem filhos; são as unidades reais de estudo. */
function leavesOf(subjects: Subject[]): Subject[] {
  const parents = new Set(subjects.map((s) => s.parentId).filter((p) => p !== null));
  return subjects.filter((s) => !parents.has(s.id!));
}
