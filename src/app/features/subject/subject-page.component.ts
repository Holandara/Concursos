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
import { IconComponent, IconName } from '../../shared/icon/icon.component';

type TabId = 'resumo' | 'legislacao' | 'questoes' | 'observacoes' | 'revisoes' | 'flashcards';

const TABS: { id: TabId; label: string; icon: IconName }[] = [
  { id: 'resumo', label: 'Resumo', icon: 'summary' },
  { id: 'legislacao', label: 'Legislação', icon: 'legislation' },
  { id: 'questoes', label: 'Questões', icon: 'question' },
  { id: 'observacoes', label: 'Observações', icon: 'note' },
  { id: 'revisoes', label: 'Revisões', icon: 'review' },
  { id: 'flashcards', label: 'Flashcards', icon: 'flashcard' },
];

@Component({
  selector: 'app-subject-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DocTabComponent, LegislationTabComponent, QuestionsTabComponent,
    ReviewsTabComponent, FlashcardsTabComponent, IconComponent,
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
        <button type="button" class="icon-btn" (click)="store.toggleFavorite(s.id!)"
                [class.text-accent]="s.favorite"
                [title]="s.favorite ? 'Remover dos favoritos' : 'Favoritar'">
          <app-icon name="star" [size]="18" [filled]="s.favorite === 1" />
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
                    class="flex items-center gap-1.5 whitespace-nowrap rounded-t-lg border-b-2 px-3 py-2 text-sm font-medium transition-colors"
                    [class.tab-on]="tab() === t.id"
                    [class.tab-off]="tab() !== t.id"
                    (click)="selectTab(t.id)">
              <app-icon [name]="t.icon" [size]="15" />{{ t.label }}
            </button>
          }
        </div>
      </div>

      <div class="py-5">
        <!--
          O bloco abaixo é CHAVEADO pelo id do assunto (track openSubjectId).

          Motivo: .../assunto/1 e .../assunto/2 são a MESMA rota — só o parâmetro muda.
          O Angular reaproveita esta página e apenas atualiza os inputs, sem
          destruir/recriar os componentes das abas. Como cada aba carrega seus
          dados no ngOnInit, sem esta chave o conteúdo continuaria sendo o do
          assunto anterior (só o cabeçalho se atualizava).

          Ao trocar de assunto, a chave muda: a aba antiga é destruída — o que
          também faz o editor gravar (flush) qualquer alteração pendente no
          documento CORRETO — e uma nova instância é criada já com o novo id.
        -->
        @for (openSubjectId of [s.id!]; track openSubjectId) {
          @switch (tab()) {
            @case ('resumo') { <app-doc-tab [subjectId]="openSubjectId" kind="summary" /> }
            @case ('legislacao') { <app-legislation-tab [subjectId]="openSubjectId" /> }
            @case ('questoes') { <app-questions-tab [subjectId]="openSubjectId" /> }
            @case ('observacoes') { <app-doc-tab [subjectId]="openSubjectId" kind="notes" /> }
            @case ('revisoes') { <app-reviews-tab [subjectId]="openSubjectId" /> }
            @case ('flashcards') { <app-flashcards-tab [subjectId]="openSubjectId" /> }
          }
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

  /** Rota: /c/:contest/assunto/:id */
  @Input() set id(value: string) {
    const num = Number(value);
    if (!Number.isFinite(num)) return;
    if (this.subjectId() === num) return;
    this.subjectId.set(num);
    // Estado local pertence ao assunto aberto — não deve vazar para o próximo.
    this.showTopics.set(false);
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
