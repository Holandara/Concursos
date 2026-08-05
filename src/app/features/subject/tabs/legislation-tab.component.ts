import { ChangeDetectionStrategy, Component, Input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { db, now } from '../../../core/db/database';
import { LawArticle } from '../../../core/models/models';
import { RichEditorComponent, EditorChange } from '../../../shared/editor/rich-editor.component';
import { SafeHtmlPipe } from '../../../shared/safe-html.pipe';

/**
 * Leitor de legislação: cada artigo é um bloco separado com destaques,
 * sublinhados, comentários e observações laterais — tudo com auto-save.
 */
@Component({
  selector: 'app-legislation-tab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RichEditorComponent, SafeHtmlPipe],
  template: `
  <div class="space-y-4">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <p class="text-sm text-soft">
        {{ articles().length }} dispositivo(s).
        Adicione artigos da legislação deste assunto e grife como em um leitor de PDF.
      </p>
      <button type="button" class="btn btn-primary" (click)="startNew()">＋ Adicionar artigo</button>
    </div>

    @if (creating()) {
      <div class="card space-y-3 p-4">
        <div class="grid gap-3 sm:grid-cols-2">
          <div>
            <label class="label">Lei / Norma</label>
            <input class="input" [(ngModel)]="draftLaw" placeholder="ex.: Lei nº 13.709/2018 (LGPD)">
          </div>
          <div>
            <label class="label">Dispositivo</label>
            <input class="input" [(ngModel)]="draftHeading" placeholder="ex.: Art. 5º, I">
          </div>
        </div>
        <div>
          <label class="label">Texto do dispositivo (cole aqui)</label>
          <textarea class="textarea" rows="5" [(ngModel)]="draftText"
                    placeholder="Cole o texto do artigo…"></textarea>
        </div>
        <div class="flex gap-2">
          <button type="button" class="btn btn-primary" (click)="createArticle()">Adicionar</button>
          <button type="button" class="btn" (click)="creating.set(false)">Cancelar</button>
        </div>
      </div>
    }

    @for (article of articles(); track article.id) {
      <article class="card overflow-hidden" [class.important]="article.important === 1">
        <header class="flex flex-wrap items-center gap-2 border-b border-line px-4 py-2.5">
          <span class="text-xs font-semibold uppercase tracking-wide text-accent">{{ article.lawRef }}</span>
          <span class="text-sm font-bold">{{ article.heading }}</span>
          <span class="ml-auto flex items-center gap-1">
            <button type="button" class="icon-btn" [title]="article.important ? 'Remover destaque de importante' : 'Grifar como importante'"
                    (click)="toggleImportant(article)">
              {{ article.important ? '🚩' : '🏳️' }}
            </button>
            <button type="button" class="icon-btn" [title]="article.favorite ? 'Desfavoritar' : 'Favoritar'"
                    (click)="toggleFavorite(article)">
              {{ article.favorite ? '★' : '☆' }}
            </button>
            <button type="button" class="icon-btn" [title]="editingId() === article.id ? 'Concluir edição' : 'Editar/destacar texto'"
                    (click)="editingId.set(editingId() === article.id ? null : article.id!)">
              {{ editingId() === article.id ? '✔' : '🖊' }}
            </button>
            <button type="button" class="icon-btn btn-danger" title="Excluir" (click)="remove(article)">🗑</button>
          </span>
        </header>

        <div class="grid gap-0 lg:grid-cols-[1fr,240px]">
          <div class="min-w-0 p-1">
            @if (editingId() === article.id) {
              <app-rich-editor
                [content]="article.html"
                minHeight="6rem"
                placeholder="Texto do dispositivo…"
                (changed)="saveText(article, $event)" />
            } @else {
              <div class="tiptap rich-content px-4 py-3 text-[15px] leading-7"
                   [innerHTML]="article.html | safeHtml"></div>
            }
          </div>
          <aside class="border-t border-line p-3 lg:border-l lg:border-t-0">
            <label class="label">Observação lateral</label>
            <textarea class="textarea text-[13px]" rows="4"
                      [ngModel]="article.note"
                      (ngModelChange)="queueNote(article, $event)"
                      placeholder="Anote aqui interpretações, macetes, jurisprudência…"></textarea>
          </aside>
        </div>
      </article>
    } @empty {
      @if (!creating()) {
        <div class="card p-8 text-center text-sm text-faint">
          Nenhum dispositivo ainda. Clique em <b>＋ Adicionar artigo</b> e cole a legislação
          relacionada a este assunto (ex.: artigos da LGPD, trechos de normas ISO…).
        </div>
      }
    }
  </div>
  `,
  styles: [`
    article.important { border-color: var(--warn); }
  `],
})
export class LegislationTabComponent implements OnInit {
  @Input({ required: true }) subjectId!: number;

  readonly articles = signal<LawArticle[]>([]);
  readonly creating = signal(false);
  readonly editingId = signal<number | null>(null);

  draftLaw = '';
  draftHeading = '';
  draftText = '';

  private noteTimers = new Map<number, ReturnType<typeof setTimeout>>();

  async ngOnInit(): Promise<void> {
    await this.reload();
  }

  private async reload(): Promise<void> {
    const list = await db.articles.where('subjectId').equals(this.subjectId).toArray();
    this.articles.set(list.sort((a, b) => a.order - b.order));
  }

  startNew(): void {
    this.creating.set(true);
  }

  async createArticle(): Promise<void> {
    const text = this.draftText.trim();
    if (!text && !this.draftHeading.trim()) return;
    const html = '<p>' + text.replace(/\n{2,}/g, '</p><p>').replace(/\n/g, '<br>') + '</p>';
    await db.articles.add({
      subjectId: this.subjectId,
      lawRef: this.draftLaw.trim() || 'Norma',
      heading: this.draftHeading.trim() || 'Artigo',
      html, text,
      note: '', important: 0, favorite: 0,
      order: this.articles().length,
      createdAt: now(), updatedAt: now(),
    });
    this.draftLaw = ''; this.draftHeading = ''; this.draftText = '';
    this.creating.set(false);
    await this.reload();
  }

  async saveText(article: LawArticle, change: EditorChange): Promise<void> {
    await db.articles.update(article.id!, { html: change.html, text: change.text, updatedAt: now() });
    this.articles.update((list) =>
      list.map((a) => (a.id === article.id ? { ...a, html: change.html, text: change.text } : a)));
  }

  queueNote(article: LawArticle, value: string): void {
    const prev = this.noteTimers.get(article.id!);
    if (prev) clearTimeout(prev);
    this.noteTimers.set(article.id!, setTimeout(async () => {
      await db.articles.update(article.id!, { note: value, updatedAt: now() });
    }, 600));
  }

  async toggleImportant(article: LawArticle): Promise<void> {
    const val = article.important ? 0 : 1;
    await db.articles.update(article.id!, { important: val as 0 | 1, updatedAt: now() });
    this.articles.update((l) => l.map((a) => a.id === article.id ? { ...a, important: val as 0 | 1 } : a));
  }

  async toggleFavorite(article: LawArticle): Promise<void> {
    const val = article.favorite ? 0 : 1;
    await db.articles.update(article.id!, { favorite: val as 0 | 1, updatedAt: now() });
    this.articles.update((l) => l.map((a) => a.id === article.id ? { ...a, favorite: val as 0 | 1 } : a));
  }

  async remove(article: LawArticle): Promise<void> {
    if (!confirm(`Excluir ${article.heading}?`)) return;
    await db.articles.delete(article.id!);
    await this.reload();
  }
}
