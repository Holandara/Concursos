import {
  ChangeDetectionStrategy, Component, Input, OnDestroy, computed, inject, signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { SubjectStore } from '../../core/services/subject.store';
import { StudyTrackerService } from '../../core/services/study-tracker.service';
import {
  PRIORITY_LABEL, Priority, STATUS_LABEL, SubjectStatus,
} from '../../core/models/models';
import { DocTabComponent } from './tabs/doc-tab.component';
import { LegislationTabComponent } from './tabs/legislation-tab.component';
import { QuestionsTabComponent } from './tabs/questions-tab.component';
import { ReviewsTabComponent } from './tabs/reviews-tab.component';
import { FlashcardsTabComponent } from './tabs/flashcards-tab.component';

type TabId = 'resumo' | 'legislacao' | 'questoes' | 'observacoes' | 'revisoes' | 'flashcards';

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'resumo', label: 'Resumo', icon: '📝' },
  { id: 'legislacao', label: 'Legislação', icon: '⚖️' },
  { id: 'questoes', label: 'Questões', icon: '❓' },
  { id: 'observacoes', label: 'Observações', icon: '💭' },
  { id: 'revisoes', label: 'Revisões', icon: '🔁' },
  { id: 'flashcards', label: 'Flashcards', icon: '🃏' },
];

@Component({
  selector: 'app-subject-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DocTabComponent, LegislationTabComponent, QuestionsTabComponent,
    ReviewsTabComponent, FlashcardsTabComponent,
  ],
  template: `
  @if (subject(); as s) {
    <div class="mx-auto max-w-4xl px-4 py-5 sm:px-6">

      <!-- Breadcrumb -->
      <nav class="flex flex-wrap items-center gap-1 text-xs text-faint">
        @for (p of path(); track p.id; let last = $last) {
          @if (!last) {
            <span>{{ p.title }}</span><span>/</span>
          }
        }
      </nav>

      <!-- Header -->
      <div class="mt-1 flex flex-wrap items-start justify-between gap-3">
        <h1 class="min-w-0 text-2xl font-bold leading-tight tracking-tight">
          {{ s.title }}
        </h1>
        <button type="button" class="icon-btn text-lg" (click)="store.toggleFavorite(s.id!)"
                [title]="s.favorite ? 'Remover dos favoritos' : 'Favoritar'">
          {{ s.favorite ? '★' : '☆' }}
        </button>
      </div>

      <div class="mt-2 flex flex-wrap items-center gap-2">
        <select class="select !w-auto !py-1 text-xs" [value]="s.status"
                (change)="setStatus($any($event.target).value)">
          @for (opt of statusOptions; track opt) {
            <option [value]="opt">{{ statusLabel[opt] }}</option>
          }
        </select>
        <select class="select !w-auto !py-1 text-xs" [value]="s.priority"
                (change)="setPriority($any($event.target).value)">
          @for (opt of priorityOptions; track opt) {
            <option [value]="opt">Prioridade {{ priorityLabel[opt] }}</option>
          }
        </select>
        @if (s.topics.length) {
          <button type="button" class="btn btn-ghost !py-1 text-xs" (click)="showTopics.set(!showTopics())">
            {{ showTopics() ? 'Ocultar ementa' : 'Ver ementa do edital (' + s.topics.length + ')' }}
          </button>
        }
      </div>

      @if (showTopics() && s.topics.length) {
        <div class="card mt-3 p-4">
          <div class="label">Tópicos do edital</div>
          <ul class="list-disc space-y-1 pl-5 text-sm text-soft">
            @for (t of s.topics; track $index) { <li>{{ t }}</li> }
          </ul>
        </div>
      }

      <!-- Tabs -->
      <div class="sticky top-0 z-20 -mx-4 mt-4 border-b border-line px-4 sm:-mx-6 sm:px-6"
           style="background: var(--bg);">
        <div class="flex gap-1 overflow-x-auto pb-0 pt-1">
          @for (t of tabs; track t.id) {
            <button type="button"
                    class="whitespace-nowrap rounded-t-lg border-b-2 px-3 py-2 text-sm font-medium transition-colors"
                    [class.tab-on]="tab() === t.id"
                    [class.tab-off]="tab() !== t.id"
                    (click)="selectTab(t.id)">
              <span class="mr-1">{{ t.icon }}</span>{{ t.label }}
            </button>
          }
        </div>
      </div>

      <div class="py-5">
        @switch (tab()) {
          @case ('resumo') { <app-doc-tab [subjectId]="s.id!" kind="summary" /> }
          @case ('legislacao') { <app-legislation-tab [subjectId]="s.id!" /> }
          @case ('questoes') { <app-questions-tab [subjectId]="s.id!" /> }
          @case ('observacoes') { <app-doc-tab [subjectId]="s.id!" kind="notes" /> }
          @case ('revisoes') { <app-reviews-tab [subjectId]="s.id!" /> }
          @case ('flashcards') { <app-flashcards-tab [subjectId]="s.id!" /> }
        }
      </div>
    </div>
  } @else {
    <div class="p-8 text-sm text-faint">Assunto não encontrado.</div>
  }
  `,
  styles: [`
    .tab-on { border-color: var(--accent); color: var(--accent); }
    .tab-off { border-color: transparent; color: var(--soft); }
    .tab-off:hover { color: var(--ink); background: var(--hover); }
  `],
})
export class SubjectPageComponent implements OnDestroy {
  readonly store = inject(SubjectStore);
  private tracker = inject(StudyTrackerService);
  private router = inject(Router);

  readonly tabs = TABS;
  readonly statusLabel = STATUS_LABEL;
  readonly priorityLabel = PRIORITY_LABEL;
  readonly statusOptions: SubjectStatus[] = ['nao_iniciado', 'estudando', 'revisando', 'dominado'];
  readonly priorityOptions: Priority[] = ['alta', 'media', 'baixa'];

  readonly subjectId = signal<number | null>(null);
  readonly tab = signal<TabId>('resumo');
  readonly showTopics = signal(false);

  readonly subject = computed(() => {
    const id = this.subjectId();
    return id != null ? this.store.byId(id) : undefined;
  });
  readonly path = computed(() => {
    const id = this.subjectId();
    return id != null ? this.store.pathOf(id) : [];
  });

  /** Rota: /assunto/:id */
  @Input() set id(value: string) {
    const num = Number(value);
    if (!Number.isFinite(num)) return;
    this.subjectId.set(num);
    this.tracker.start(num);
  }

  /** Query param ?tab= */
  @Input('tab') set tabParam(value: string | undefined) {
    if (value && this.tabs.some((t) => t.id === value)) this.tab.set(value as TabId);
  }

  selectTab(tabId: TabId): void {
    this.tab.set(tabId);
    void this.router.navigate([], { queryParams: { tab: tabId }, queryParamsHandling: 'merge', replaceUrl: true });
  }

  setStatus(status: SubjectStatus): void {
    const id = this.subjectId();
    if (id != null) void this.store.setStatus(id, status);
  }

  setPriority(priority: Priority): void {
    const id = this.subjectId();
    if (id != null) void this.store.setPriority(id, priority);
  }

  ngOnDestroy(): void {
    void this.tracker.stop();
  }
}
