import { ChangeDetectionStrategy, Component, Input, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { db, now } from '../../../core/db/database';
import { Flashcard } from '../../../core/models/models';
import { ReviewService } from '../../../core/services/review.service';

@Component({
  selector: 'app-flashcards-tab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  template: `
  <div class="space-y-4">

    <!-- Modo estudo -->
    @if (studying()) {
      <div class="card mx-auto max-w-xl p-6 text-center">
        @if (currentCard(); as card) {
          <div class="text-xs text-faint">{{ queueIndex() + 1 }} / {{ queue().length }} · intervalo atual: {{ card.intervalDays }}d</div>
          <div class="mt-4 min-h-24 text-lg font-medium leading-relaxed">{{ card.front }}</div>
          @if (revealed()) {
            <hr class="my-4 border-line">
            <div class="min-h-16 whitespace-pre-wrap text-[15px] text-soft">{{ card.back }}</div>
            <div class="mt-6 flex justify-center gap-2">
              <button type="button" class="btn" style="color: var(--bad);" (click)="rate('again')">Errei · 1d</button>
              <button type="button" class="btn" (click)="rate('good')">Bom</button>
              <button type="button" class="btn" style="color: var(--ok);" (click)="rate('easy')">Fácil</button>
            </div>
          } @else {
            <button type="button" class="btn btn-primary mt-6" (click)="revealed.set(true)">Mostrar resposta</button>
          }
          <button type="button" class="btn btn-ghost mt-4 text-xs" (click)="stopStudy()">Encerrar sessão</button>
        } @else {
          <div class="text-2xl">🎉</div>
          <p class="mt-2 text-sm text-soft">Sessão concluída! Nenhum card pendente.</p>
          <button type="button" class="btn mt-4" (click)="stopStudy()">Voltar</button>
        }
      </div>
    } @else {
      <div class="flex flex-wrap items-center justify-between gap-2">
        <p class="text-sm text-soft">
          {{ cards().length }} flashcard(s) · <b>{{ dueCount() }}</b> para revisar hoje
        </p>
        <div class="flex gap-2">
          @if (dueCount() > 0) {
            <button type="button" class="btn btn-primary" (click)="startStudy(true)">▶ Revisar pendentes ({{ dueCount() }})</button>
          }
          @if (cards().length > 0) {
            <button type="button" class="btn" (click)="startStudy(false)">Estudar todos</button>
          }
          <button type="button" class="btn" (click)="creating.set(!creating())">＋ Novo card</button>
        </div>
      </div>

      @if (creating()) {
        <div class="card space-y-3 p-4">
          <div>
            <label class="label">Frente (pergunta)</label>
            <textarea class="textarea" rows="2" [(ngModel)]="draftFront"
                      placeholder="ex.: Quais são as 5 funções do NIST CSF?"></textarea>
          </div>
          <div>
            <label class="label">Verso (resposta)</label>
            <textarea class="textarea" rows="3" [(ngModel)]="draftBack"
                      placeholder="ex.: Identify, Protect, Detect, Respond, Recover"></textarea>
          </div>
          <div class="flex gap-2">
            <button type="button" class="btn btn-primary" (click)="create()">Adicionar</button>
            <button type="button" class="btn" (click)="creating.set(false)">Cancelar</button>
          </div>
        </div>
      }

      <div class="grid gap-3 sm:grid-cols-2">
        @for (card of cards(); track card.id) {
          <div class="card p-4">
            @if (editingId() === card.id) {
              <textarea class="textarea mb-2" rows="2" [(ngModel)]="editFront"></textarea>
              <textarea class="textarea" rows="3" [(ngModel)]="editBack"></textarea>
              <div class="mt-2 flex gap-2">
                <button type="button" class="btn btn-primary !py-1 text-xs" (click)="saveEdit(card)">Salvar</button>
                <button type="button" class="btn !py-1 text-xs" (click)="editingId.set(null)">Cancelar</button>
              </div>
            } @else {
              <div class="text-sm font-medium leading-relaxed">{{ card.front }}</div>
              <div class="mt-2 whitespace-pre-wrap border-t border-line pt-2 text-[13px] text-soft">{{ card.back }}</div>
              <div class="mt-3 flex items-center gap-1 text-[11px] text-faint">
                <span [class.text-accent]="isDue(card)">
                  {{ isDue(card) ? '⏰ revisar hoje' : 'próx.: ' + dueLabel(card) }}
                </span>
                <span>· {{ card.reps }} rev.</span>
                <span class="ml-auto flex">
                  <button type="button" class="icon-btn !h-6 !w-6" title="Editar" (click)="startEdit(card)">🖊</button>
                  <button type="button" class="icon-btn btn-danger !h-6 !w-6" title="Excluir" (click)="remove(card)">🗑</button>
                </span>
              </div>
            }
          </div>
        } @empty {
          @if (!creating()) {
            <div class="card col-span-full p-8 text-center text-sm text-faint">
              Nenhum flashcard ainda. Crie cards de memorização para este assunto
              (futuramente poderão ser gerados por IA a partir do seu resumo).
            </div>
          }
        }
      </div>
    }
  </div>
  `,
})
export class FlashcardsTabComponent implements OnInit {
  @Input({ required: true }) subjectId!: number;

  private reviewService = inject(ReviewService);

  readonly cards = signal<Flashcard[]>([]);
  readonly creating = signal(false);
  readonly editingId = signal<number | null>(null);

  readonly studying = signal(false);
  readonly queue = signal<Flashcard[]>([]);
  readonly queueIndex = signal(0);
  readonly revealed = signal(false);

  draftFront = '';
  draftBack = '';
  editFront = '';
  editBack = '';

  readonly dueCount = computed(() => this.cards().filter((c) => this.isDue(c)).length);
  readonly currentCard = computed(() => this.queue()[this.queueIndex()] ?? null);

  async ngOnInit(): Promise<void> {
    await this.reload();
  }

  private async reload(): Promise<void> {
    const list = await db.flashcards.where('subjectId').equals(this.subjectId).toArray();
    this.cards.set(list.sort((a, b) => a.dueAt - b.dueAt));
  }

  isDue(card: Flashcard): boolean {
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    return card.dueAt <= end.getTime();
  }

  dueLabel(card: Flashcard): string {
    return new Date(card.dueAt).toLocaleDateString('pt-BR');
  }

  async create(): Promise<void> {
    if (!this.draftFront.trim() || !this.draftBack.trim()) return;
    await db.flashcards.add({
      subjectId: this.subjectId,
      front: this.draftFront.trim(), back: this.draftBack.trim(),
      intervalDays: 1, dueAt: now(), reps: 0, lapses: 0,
      createdAt: now(), updatedAt: now(),
    });
    this.draftFront = ''; this.draftBack = '';
    this.creating.set(false);
    await this.reload();
  }

  startEdit(card: Flashcard): void {
    this.editingId.set(card.id!);
    this.editFront = card.front;
    this.editBack = card.back;
  }

  async saveEdit(card: Flashcard): Promise<void> {
    await db.flashcards.update(card.id!, { front: this.editFront.trim(), back: this.editBack.trim(), updatedAt: now() });
    this.editingId.set(null);
    await this.reload();
  }

  async remove(card: Flashcard): Promise<void> {
    if (!confirm('Excluir este flashcard?')) return;
    await db.flashcards.delete(card.id!);
    await this.reload();
  }

  startStudy(onlyDue: boolean): void {
    const list = onlyDue ? this.cards().filter((c) => this.isDue(c)) : [...this.cards()];
    if (!list.length) return;
    this.queue.set(list);
    this.queueIndex.set(0);
    this.revealed.set(false);
    this.studying.set(true);
  }

  async rate(rating: 'again' | 'good' | 'easy'): Promise<void> {
    const card = this.currentCard();
    if (!card) return;
    const patch = this.reviewService.rateCard(card, rating);
    await db.flashcards.update(card.id!, patch);
    this.revealed.set(false);
    this.queueIndex.update((i) => i + 1);
    await this.reload();
  }

  stopStudy(): void {
    this.studying.set(false);
  }
}
