import { ChangeDetectionStrategy, Component, Input, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchResult, SearchService } from '../../core/services/search.service';

const TYPE_LABEL: Record<SearchResult['type'], string> = {
  assunto: '📚 Assunto',
  resumo: '📝 Resumo',
  observacao: '💭 Observação',
  legislacao: '⚖️ Legislação',
  questao: '❓ Questão',
  flashcard: '🃏 Flashcard',
};

@Component({
  selector: 'app-search-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
  <div class="mx-auto max-w-3xl px-4 py-6 sm:px-6">
    <h1 class="text-2xl font-bold tracking-tight">Busca global</h1>
    <input class="input mt-4 !py-2.5" type="search" autofocus
           placeholder="Digite pelo menos 2 caracteres…"
           [value]="query()"
           (input)="onQuery($any($event.target).value)">

    @if (loading()) {
      <p class="mt-6 text-sm text-faint">Buscando…</p>
    } @else if (query().trim().length >= 2) {
      <p class="mt-4 text-xs text-faint">{{ results().length }} resultado(s)</p>
      <div class="mt-2 space-y-2">
        @for (r of results(); track $index) {
          <a [routerLink]="['/assunto', r.subjectId]" [queryParams]="r.tab ? { tab: r.tab } : {}"
             class="card block p-3 no-underline hover:border-accent transition-colors">
            <div class="flex items-center gap-2 text-xs text-soft">
              <span>{{ typeLabel[r.type] }}</span>
              <span class="text-faint">·</span>
              <span class="truncate">{{ r.subjectTitle }}</span>
            </div>
            <div class="mt-0.5 text-sm font-medium text-ink">{{ r.title }}</div>
            <div class="mt-0.5 line-clamp-2 text-[13px] text-soft">{{ r.snippet }}</div>
          </a>
        } @empty {
          <p class="text-sm text-faint">Nada encontrado para “{{ query() }}”.</p>
        }
      </div>
    } @else {
      <p class="mt-6 text-sm text-faint">
        Pesquise em assuntos, resumos, observações, legislação, questões e flashcards.
      </p>
    }
  </div>
  `,
})
export class SearchPageComponent implements OnInit {
  private searchService = inject(SearchService);

  readonly query = signal('');
  readonly results = signal<SearchResult[]>([]);
  readonly loading = signal(false);
  readonly typeLabel = TYPE_LABEL;

  private timer: ReturnType<typeof setTimeout> | null = null;

  /** Query param `q` (via withComponentInputBinding). */
  @Input() set q(value: string | undefined) {
    if (value) { this.query.set(value); void this.run(value); }
  }

  ngOnInit(): void { /* noop */ }

  onQuery(value: string): void {
    this.query.set(value);
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => void this.run(value), 250);
  }

  private async run(value: string): Promise<void> {
    if (value.trim().length < 2) { this.results.set([]); return; }
    this.loading.set(true);
    try {
      this.results.set(await this.searchService.search(value));
    } finally {
      this.loading.set(false);
    }
  }
}
