import { ChangeDetectionStrategy, Component, Input, OnInit, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { db, now } from '../../../core/db/database';
import {
  DIFFICULTY_LABEL, Difficulty, QSTATUS_LABEL, Question, QuestionStatus,
} from '../../../core/models/models';

interface Draft {
  id: number | null;
  statement: string;
  options: string[];
  correct: number;
  banca: string;
  year: number | null;
  orgao: string;
  difficulty: Difficulty;
  subtopic: string;
  tags: string;
  comment: string;
  justification: string;
  myNote: string;
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

@Component({
  selector: 'app-questions-tab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  template: `
  <div class="space-y-4">
    <!-- Barra de ações / filtros -->
    <div class="flex flex-wrap items-center gap-2">
      <input class="input !w-56 flex-1 sm:flex-none" type="search" placeholder="Filtrar questões…"
             [ngModel]="filterText()" (ngModelChange)="filterText.set($event)">
      <select class="select !w-auto" [ngModel]="filterStatus()" (ngModelChange)="filterStatus.set($event)">
        <option value="">Todos os status</option>
        @for (s of statusOptions; track s) { <option [value]="s">{{ qstatusLabel[s] }}</option> }
      </select>
      <label class="flex cursor-pointer items-center gap-1.5 text-sm text-soft">
        <input type="checkbox" [ngModel]="onlyFavorites()" (ngModelChange)="onlyFavorites.set($event)"
               class="accent-[var(--accent)]"> ★ favoritas
      </label>
      <span class="ml-auto"></span>
      <button type="button" class="btn btn-primary" (click)="startNew()">＋ Nova questão</button>
    </div>

    <!-- Formulário -->
    @if (draft(); as d) {
      <div class="card space-y-3 p-4">
        <div class="text-sm font-semibold">{{ d.id ? 'Editar questão' : 'Nova questão' }}</div>
        <div>
          <label class="label">Enunciado</label>
          <textarea class="textarea" rows="4" [(ngModel)]="d.statement"
                    placeholder="Texto da questão…"></textarea>
        </div>
        <div>
          <label class="label">Alternativas (marque a correta)</label>
          <div class="space-y-2">
            @for (opt of d.options; track $index; let i = $index) {
              <div class="flex items-center gap-2">
                <input type="radio" name="correct" [checked]="d.correct === i"
                       (change)="d.correct = i" class="accent-[var(--accent)]">
                <span class="w-5 text-xs font-bold text-faint">{{ letters[i] }})</span>
                <input class="input" [ngModel]="d.options[i]"
                       (ngModelChange)="d.options[i] = $event" placeholder="Texto da alternativa">
                @if (d.options.length > 2) {
                  <button type="button" class="icon-btn btn-danger" (click)="removeOption(i)">✕</button>
                }
              </div>
            }
          </div>
          @if (d.options.length < 6) {
            <button type="button" class="btn btn-ghost mt-2 text-xs" (click)="d.options.push('')">＋ alternativa</button>
          }
        </div>
        <div class="grid gap-3 sm:grid-cols-3">
          <div><label class="label">Banca</label><input class="input" [(ngModel)]="d.banca" placeholder="FGV"></div>
          <div><label class="label">Ano</label><input class="input" type="number" [(ngModel)]="d.year" placeholder="2026"></div>
          <div><label class="label">Órgão</label><input class="input" [(ngModel)]="d.orgao" placeholder="DATAPREV"></div>
          <div>
            <label class="label">Dificuldade</label>
            <select class="select" [(ngModel)]="d.difficulty">
              @for (k of difficultyOptions; track k) { <option [value]="k">{{ difficultyLabel[k] }}</option> }
            </select>
          </div>
          <div><label class="label">Subassunto</label><input class="input" [(ngModel)]="d.subtopic"></div>
          <div><label class="label">Tags (vírgula)</label><input class="input" [(ngModel)]="d.tags" placeholder="lgpd, sanções"></div>
        </div>
        <div class="grid gap-3 sm:grid-cols-3">
          <div><label class="label">Comentário</label><textarea class="textarea" rows="2" [(ngModel)]="d.comment"></textarea></div>
          <div><label class="label">Justificativa</label><textarea class="textarea" rows="2" [(ngModel)]="d.justification"></textarea></div>
          <div><label class="label">Minha observação</label><textarea class="textarea" rows="2" [(ngModel)]="d.myNote"></textarea></div>
        </div>
        <div class="flex gap-2">
          <button type="button" class="btn btn-primary" (click)="saveDraft()">Salvar</button>
          <button type="button" class="btn" (click)="draft.set(null)">Cancelar</button>
        </div>
      </div>
    }

    <p class="text-xs text-faint">{{ filtered().length }} de {{ questions().length }} questão(ões)</p>

    <!-- Lista -->
    @for (question of filtered(); track question.id) {
      <div class="card p-4">
        <div class="flex flex-wrap items-center gap-1.5 text-xs">
          <span class="chip" [class]="'qs-' + question.status">{{ qstatusLabel[question.status] }}</span>
          @if (question.banca) { <span class="chip bg-hoverc text-soft">{{ question.banca }}</span> }
          @if (question.year) { <span class="chip bg-hoverc text-soft">{{ question.year }}</span> }
          @if (question.orgao) { <span class="chip bg-hoverc text-soft">{{ question.orgao }}</span> }
          <span class="chip bg-hoverc text-soft">{{ difficultyLabel[question.difficulty] }}</span>
          @if (question.subtopic) { <span class="chip bg-hoverc text-soft">{{ question.subtopic }}</span> }
          @for (tag of question.tags; track tag) { <span class="chip" style="background: var(--sel); color: var(--accent);">#{{ tag }}</span> }
          <span class="ml-auto flex items-center">
            <button type="button" class="icon-btn" [title]="question.favorite ? 'Desfavoritar' : 'Favoritar'" (click)="toggleFavorite(question)">
              {{ question.favorite ? '★' : '☆' }}
            </button>
            <button type="button" class="icon-btn" title="Marcar para revisar" (click)="setStatus(question, 'revisar')">🔖</button>
            <button type="button" class="icon-btn" title="Editar" (click)="edit(question)">🖊</button>
            <button type="button" class="icon-btn" title="Duplicar" (click)="duplicate(question)">⧉</button>
            <button type="button" class="icon-btn btn-danger" title="Excluir" (click)="remove(question)">🗑</button>
          </span>
        </div>

        <p class="mt-3 whitespace-pre-wrap text-[15px] leading-relaxed">{{ question.statement }}</p>

        <div class="mt-3 space-y-1.5">
          @for (opt of question.options; track $index; let i = $index) {
            <button type="button"
                    class="alt flex w-full items-start gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors"
                    [class.alt-neutral]="answeredIdx(question.id!) === null"
                    [class.alt-correct]="answeredIdx(question.id!) !== null && i === question.correct"
                    [class.alt-wrong]="answeredIdx(question.id!) === i && i !== question.correct"
                    (click)="answer(question, i)">
              <span class="font-bold text-faint">{{ letters[i] }})</span>
              <span class="flex-1">{{ opt }}</span>
            </button>
          }
        </div>

        @if (answeredIdx(question.id!) !== null) {
          <div class="mt-3 rounded-lg border border-line p-3 text-sm"
               [style.background]="answeredIdx(question.id!) === question.correct ? 'color-mix(in srgb, var(--ok) 8%, transparent)' : 'color-mix(in srgb, var(--bad) 8%, transparent)'">
            <div class="font-semibold">
              {{ answeredIdx(question.id!) === question.correct ? '✅ Você acertou!' : '❌ Você errou.' }}
              Gabarito: {{ letters[question.correct] }}
            </div>
            @if (question.justification) { <p class="mt-1"><b>Justificativa:</b> {{ question.justification }}</p> }
            @if (question.comment) { <p class="mt-1"><b>Comentário:</b> {{ question.comment }}</p> }
            @if (question.myNote) { <p class="mt-1"><b>Minha observação:</b> {{ question.myNote }}</p> }
          </div>
        }

        <div class="mt-2 text-[11px] text-faint">
          Respondida {{ question.answered }}x · {{ question.correctCount }} acerto(s)
        </div>
      </div>
    } @empty {
      @if (!draft()) {
        <div class="card p-8 text-center text-sm text-faint">
          Nenhuma questão ainda. Crie a primeira com <b>＋ Nova questão</b>.
        </div>
      }
    }
  </div>
  `,
  styles: [`
    .alt-neutral { border-color: var(--line); background: var(--surface); }
    .alt-neutral:hover { border-color: var(--accent); }
    .alt-correct { border-color: var(--ok); background: color-mix(in srgb, var(--ok) 10%, transparent); }
    .alt-wrong { border-color: var(--bad); background: color-mix(in srgb, var(--bad) 10%, transparent); }
    .qs-nunca_vista { background: var(--hover); color: var(--soft); }
    .qs-errei { background: color-mix(in srgb, var(--bad) 15%, transparent); color: var(--bad); }
    .qs-acertei { background: color-mix(in srgb, var(--ok) 15%, transparent); color: var(--ok); }
    .qs-revisar { background: color-mix(in srgb, var(--warn) 18%, transparent); color: var(--warn); }
  `],
})
export class QuestionsTabComponent implements OnInit {
  @Input({ required: true }) subjectId!: number;

  readonly questions = signal<Question[]>([]);
  readonly draft = signal<Draft | null>(null);
  readonly filterText = signal('');
  readonly filterStatus = signal<'' | QuestionStatus>('');
  readonly onlyFavorites = signal(false);
  /** questãoId -> alternativa marcada nesta sessão. */
  readonly answers = signal<Map<number, number>>(new Map());

  readonly letters = LETTERS;
  readonly qstatusLabel = QSTATUS_LABEL;
  readonly difficultyLabel = DIFFICULTY_LABEL;
  readonly statusOptions: QuestionStatus[] = ['nunca_vista', 'errei', 'acertei', 'revisar'];
  readonly difficultyOptions: Difficulty[] = ['facil', 'media', 'dificil'];

  readonly filtered = computed(() => {
    const txt = this.filterText().toLowerCase();
    const st = this.filterStatus();
    const fav = this.onlyFavorites();
    return this.questions().filter((q) => {
      if (st && q.status !== st) return false;
      if (fav && !q.favorite) return false;
      if (txt) {
        const hay = (q.statement + ' ' + q.options.join(' ') + ' ' + q.tags.join(' ') + ' ' + q.subtopic).toLowerCase();
        if (!hay.includes(txt)) return false;
      }
      return true;
    });
  });

  async ngOnInit(): Promise<void> {
    await this.reload();
  }

  private async reload(): Promise<void> {
    const list = await db.questions.where('subjectId').equals(this.subjectId).toArray();
    this.questions.set(list.sort((a, b) => b.createdAt - a.createdAt));
  }

  answeredIdx(id: number): number | null {
    return this.answers().get(id) ?? null;
  }

  startNew(): void {
    this.draft.set({
      id: null, statement: '', options: ['', '', '', '', ''], correct: 0,
      banca: 'FGV', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
      subtopic: '', tags: '', comment: '', justification: '', myNote: '',
    });
  }

  edit(question: Question): void {
    this.draft.set({
      id: question.id!, statement: question.statement, options: [...question.options],
      correct: question.correct, banca: question.banca, year: question.year,
      orgao: question.orgao, difficulty: question.difficulty, subtopic: question.subtopic,
      tags: question.tags.join(', '), comment: question.comment,
      justification: question.justification, myNote: question.myNote,
    });
    window.scrollTo({ top: 0 });
  }

  removeOption(index: number): void {
    const d = this.draft();
    if (!d) return;
    d.options.splice(index, 1);
    if (d.correct >= d.options.length) d.correct = 0;
    this.draft.set({ ...d });
  }

  async saveDraft(): Promise<void> {
    const d = this.draft();
    if (!d || !d.statement.trim()) return;
    const options = d.options.map((o) => o.trim()).filter(Boolean);
    if (options.length < 2) return;
    const tags = d.tags.split(',').map((t) => t.trim()).filter(Boolean);
    const base = {
      statement: d.statement.trim(), options, correct: Math.min(d.correct, options.length - 1),
      banca: d.banca.trim(), year: d.year ? Number(d.year) : null, orgao: d.orgao.trim(),
      difficulty: d.difficulty, subtopic: d.subtopic.trim(), tags,
      comment: d.comment.trim(), justification: d.justification.trim(), myNote: d.myNote.trim(),
      updatedAt: now(),
    };
    if (d.id != null) {
      await db.questions.update(d.id, base);
    } else {
      await db.questions.add({
        ...base, subjectId: this.subjectId, status: 'nunca_vista', favorite: 0,
        answered: 0, correctCount: 0, createdAt: now(),
      });
    }
    this.draft.set(null);
    await this.reload();
  }

  async answer(question: Question, index: number): Promise<void> {
    if (this.answers().has(question.id!)) return; // já respondida nesta sessão
    this.answers.update((m) => new Map(m).set(question.id!, index));
    const correct = index === question.correct;
    await db.questions.update(question.id!, {
      status: correct ? 'acertei' : 'errei',
      answered: question.answered + 1,
      correctCount: question.correctCount + (correct ? 1 : 0),
      updatedAt: now(),
    });
    await this.reload();
  }

  async setStatus(question: Question, status: QuestionStatus): Promise<void> {
    await db.questions.update(question.id!, { status, updatedAt: now() });
    await this.reload();
  }

  async toggleFavorite(question: Question): Promise<void> {
    await db.questions.update(question.id!, { favorite: (question.favorite ? 0 : 1) as 0 | 1, updatedAt: now() });
    await this.reload();
  }

  async duplicate(question: Question): Promise<void> {
    const { id, ...rest } = question;
    await db.questions.add({
      ...rest, status: 'nunca_vista', answered: 0, correctCount: 0,
      createdAt: now(), updatedAt: now(),
    });
    await this.reload();
  }

  async remove(question: Question): Promise<void> {
    if (!confirm('Excluir esta questão?')) return;
    await db.questions.delete(question.id!);
    await this.reload();
  }
}
