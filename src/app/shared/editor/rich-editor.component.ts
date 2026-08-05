import {
  ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input,
  OnDestroy, OnInit, Output, ViewChild, signal,
} from '@angular/core';

import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Placeholder from '@tiptap/extension-placeholder';
import { Callout, FontSize } from './tiptap-extensions';
import { IconComponent } from '../icon/icon.component';

export interface EditorChange {
  json: string;
  text: string;
  html: string;
}

interface ActiveState {
  bold: boolean; italic: boolean; underline: boolean; strike: boolean;
  h1: boolean; h2: boolean; h3: boolean;
  bulletList: boolean; orderedList: boolean; taskList: boolean;
  blockquote: boolean; callout: boolean; codeBlock: boolean; code: boolean;
  link: boolean; table: boolean;
  hlYellow: boolean; hlGreen: boolean; hlRed: boolean;
}

const EMPTY: ActiveState = {
  bold: false, italic: false, underline: false, strike: false,
  h1: false, h2: false, h3: false,
  bulletList: false, orderedList: false, taskList: false,
  blockquote: false, callout: false, codeBlock: false, code: false,
  link: false, table: false,
  hlYellow: false, hlGreen: false, hlRed: false,
};

/**
 * Editor rico (TipTap) com toolbar completa e autosave via evento debounced.
 * Sem botão salvar: o output `changed` é emitido ~800ms após a última digitação.
 */
@Component({
  selector: 'app-rich-editor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  template: `
  <div class="card overflow-hidden">
    @if (editable) {
      <div class="flex flex-wrap items-center gap-0.5 border-b border-line px-2 py-1.5 bg-app/50 sticky top-0 z-10"
           style="background: var(--bg);">
        <button type="button" class="icon-btn" title="Desfazer (Ctrl+Z)" (click)="cmd('undo')"><app-icon name="undo" /></button>
        <button type="button" class="icon-btn" title="Refazer (Ctrl+Y)" (click)="cmd('redo')"><app-icon name="redo" /></button>
        <span class="mx-1 h-5 w-px bg-line"></span>

        <select class="select !w-auto !py-1 !px-2 text-xs" title="Estilo do bloco"
                [value]="blockValue()" (change)="setBlock($any($event.target).value)">
          <option value="p">Texto</option>
          <option value="h1">Título 1</option>
          <option value="h2">Título 2</option>
          <option value="h3">Título 3</option>
        </select>
        <select class="select !w-auto !py-1 !px-2 text-xs" title="Tamanho da fonte"
                (change)="setFontSize($any($event.target).value)">
          <option value="">Fonte</option>
          <option value="13px">Pequena</option>
          <option value="15px">Normal</option>
          <option value="18px">Grande</option>
          <option value="24px">Enorme</option>
        </select>
        <span class="mx-1 h-5 w-px bg-line"></span>

        <button type="button" class="icon-btn" [class.tb-on]="active().bold" title="Negrito (Ctrl+B)" (click)="cmd('bold')"><app-icon name="bold" /></button>
        <button type="button" class="icon-btn" [class.tb-on]="active().italic" title="Itálico (Ctrl+I)" (click)="cmd('italic')"><app-icon name="italic" /></button>
        <button type="button" class="icon-btn" [class.tb-on]="active().underline" title="Sublinhado (Ctrl+U)" (click)="cmd('underline')"><app-icon name="underline" /></button>
        <button type="button" class="icon-btn" [class.tb-on]="active().strike" title="Tachado" (click)="cmd('strike')"><app-icon name="strikethrough" /></button>
        <button type="button" class="icon-btn" [class.tb-on]="active().code" title="Código inline" (click)="cmd('code')"><app-icon name="code" /></button>
        <span class="mx-1 h-5 w-px bg-line"></span>

        <button type="button" class="icon-btn" [class.tb-on]="active().hlYellow" title="Destaque amarelo" (click)="highlight('yellow')">
          <span class="w-4 h-4 rounded-sm" style="background: var(--hl-yellow); border: 1px solid var(--line);"></span>
        </button>
        <button type="button" class="icon-btn" [class.tb-on]="active().hlGreen" title="Destaque verde" (click)="highlight('green')">
          <span class="w-4 h-4 rounded-sm" style="background: var(--hl-green); border: 1px solid var(--line);"></span>
        </button>
        <button type="button" class="icon-btn" [class.tb-on]="active().hlRed" title="Destaque vermelho" (click)="highlight('red')">
          <span class="w-4 h-4 rounded-sm" style="background: var(--hl-red); border: 1px solid var(--line);"></span>
        </button>
        <label class="icon-btn" title="Cor do texto">
          <app-icon name="text-color" />
          <input type="color" class="w-0 h-0 opacity-0 absolute" (change)="setColor($any($event.target).value)">
        </label>
        <button type="button" class="icon-btn" title="Limpar formatação" (click)="clearFormat()"><app-icon name="clear-format" /></button>
        <span class="mx-1 h-5 w-px bg-line"></span>

        <button type="button" class="icon-btn" [class.tb-on]="active().bulletList" title="Lista" (click)="cmd('bulletList')"><app-icon name="list-bullet" /></button>
        <button type="button" class="icon-btn" [class.tb-on]="active().orderedList" title="Lista numerada" (click)="cmd('orderedList')"><app-icon name="list-ordered" /></button>
        <button type="button" class="icon-btn" [class.tb-on]="active().taskList" title="Checklist" (click)="cmd('taskList')"><app-icon name="list-task" /></button>
        <button type="button" class="icon-btn" [class.tb-on]="active().blockquote" title="Citação" (click)="cmd('blockquote')"><app-icon name="quote" /></button>
        <button type="button" class="icon-btn" [class.tb-on]="active().callout" title="Callout" (click)="cmd('callout')"><app-icon name="callout" /></button>
        <button type="button" class="icon-btn" [class.tb-on]="active().codeBlock" title="Bloco de código" (click)="cmd('codeBlock')"><app-icon name="code-block" /></button>
        <span class="mx-1 h-5 w-px bg-line"></span>

        <button type="button" class="icon-btn" [class.tb-on]="active().link" title="Link" (click)="setLink()"><app-icon name="link" /></button>
        <button type="button" class="icon-btn" title="Imagem (URL)" (click)="addImageUrl()"><app-icon name="image" /></button>
        <label class="icon-btn" title="Enviar imagem">
          <app-icon name="image-upload" />
          <input type="file" accept="image/*" class="hidden" (change)="uploadImage($event)">
        </label>
        <button type="button" class="icon-btn" title="Tabela" (click)="insertTable()"><app-icon name="table" /></button>
        @if (active().table) {
          <button type="button" class="icon-btn" title="Adicionar linha" (click)="tableCmd('addRow')"><app-icon name="table-row" /></button>
          <button type="button" class="icon-btn" title="Adicionar coluna" (click)="tableCmd('addCol')"><app-icon name="table-column" /></button>
          <button type="button" class="icon-btn btn-danger" title="Excluir tabela" (click)="tableCmd('delete')"><app-icon name="delete" /></button>
        }
      </div>
    }
    <div #host class="px-4 py-3 sm:px-5" [style.minHeight]="minHeight"></div>
    @if (editable && savedAt()) {
      <div class="px-4 pb-2 text-[11px] text-faint select-none">Salvo automaticamente</div>
    }
  </div>
  `,
  styles: [`
    :host { display: block; }
    .tb-on { background: var(--sel); color: var(--accent); }
  `],
})
export class RichEditorComponent implements OnInit, OnDestroy {
  @ViewChild('host', { static: true }) host!: ElementRef<HTMLElement>;

  @Input() placeholder = 'Escreva aqui… use a barra acima para formatar.';
  @Input() editable = true;
  @Input() minHeight = '10rem';
  /** JSON inicial (string) do documento TipTap. */
  @Input() set content(value: string | null | undefined) {
    this.initialContent = value ?? null;
    if (this.editor && !this.editor.isFocused) {
      this.setEditorContent(value ?? null);
    }
  }

  @Output() changed = new EventEmitter<EditorChange>();

  readonly active = signal<ActiveState>(EMPTY);
  readonly savedAt = signal<number | null>(null);

  private editor: Editor | null = null;
  private initialContent: string | null = null;
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    this.editor = new Editor({
      element: this.host.nativeElement,
      editable: this.editable,
      editorProps: { attributes: { class: 'tiptap rich-content' } },
      extensions: [
        StarterKit,
        Underline,
        Highlight.configure({ multicolor: true }),
        Link.configure({ openOnClick: false, autolink: true }),
        Image.configure({ allowBase64: true }),
        Table.configure({ resizable: false }),
        TableRow, TableCell, TableHeader,
        TaskList, TaskItem.configure({ nested: true }),
        TextStyle, Color, FontSize, Callout,
        Placeholder.configure({ placeholder: this.placeholder }),
      ],
      onTransaction: () => this.refreshActive(),
      onUpdate: () => this.queueEmit(),
    });
    this.setEditorContent(this.initialContent);
  }

  ngOnDestroy(): void {
    if (this.debounceTimer) { clearTimeout(this.debounceTimer); this.emitNow(); }
    this.editor?.destroy();
  }

  private setEditorContent(value: string | null): void {
    if (!this.editor) return;
    try {
      const parsed = value ? JSON.parse(value) : null;
      this.editor.commands.setContent(parsed ?? '', false);
    } catch {
      this.editor.commands.setContent(value ?? '', false);
    }
  }

  private queueEmit(): void {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => this.emitNow(), 800);
  }

  private emitNow(): void {
    if (!this.editor) return;
    this.debounceTimer = null;
    this.changed.emit({
      json: JSON.stringify(this.editor.getJSON()),
      text: this.editor.getText(),
      html: this.editor.getHTML(),
    });
    this.savedAt.set(Date.now());
  }

  private refreshActive(): void {
    const e = this.editor;
    if (!e) return;
    this.active.set({
      bold: e.isActive('bold'), italic: e.isActive('italic'),
      underline: e.isActive('underline'), strike: e.isActive('strike'),
      h1: e.isActive('heading', { level: 1 }), h2: e.isActive('heading', { level: 2 }), h3: e.isActive('heading', { level: 3 }),
      bulletList: e.isActive('bulletList'), orderedList: e.isActive('orderedList'), taskList: e.isActive('taskList'),
      blockquote: e.isActive('blockquote'), callout: e.isActive('callout'),
      codeBlock: e.isActive('codeBlock'), code: e.isActive('code'),
      link: e.isActive('link'), table: e.isActive('table'),
      hlYellow: e.isActive('highlight', { color: 'var(--hl-yellow)' }),
      hlGreen: e.isActive('highlight', { color: 'var(--hl-green)' }),
      hlRed: e.isActive('highlight', { color: 'var(--hl-red)' }),
    });
  }

  blockValue(): string {
    const a = this.active();
    return a.h1 ? 'h1' : a.h2 ? 'h2' : a.h3 ? 'h3' : 'p';
  }

  cmd(name: string): void {
    const c = this.editor?.chain().focus();
    if (!c) return;
    switch (name) {
      case 'undo': c.undo().run(); break;
      case 'redo': c.redo().run(); break;
      case 'bold': c.toggleBold().run(); break;
      case 'italic': c.toggleItalic().run(); break;
      case 'underline': c.toggleUnderline().run(); break;
      case 'strike': c.toggleStrike().run(); break;
      case 'code': c.toggleCode().run(); break;
      case 'bulletList': c.toggleBulletList().run(); break;
      case 'orderedList': c.toggleOrderedList().run(); break;
      case 'taskList': c.toggleTaskList().run(); break;
      case 'blockquote': c.toggleBlockquote().run(); break;
      case 'codeBlock': c.toggleCodeBlock().run(); break;
      case 'callout': (c as any).toggleWrap('callout').run(); break;
    }
  }

  setBlock(value: string): void {
    const c = this.editor?.chain().focus();
    if (!c) return;
    if (value === 'p') c.setParagraph().run();
    else c.toggleHeading({ level: Number(value.slice(1)) as 1 | 2 | 3 }).run();
  }

  setFontSize(px: string): void {
    if (!px || !this.editor) return;
    this.editor.chain().focus().setMark('textStyle', { fontSize: px }).run();
  }

  setColor(color: string): void {
    this.editor?.chain().focus().setColor(color).run();
  }

  highlight(kind: 'yellow' | 'green' | 'red'): void {
    const color = `var(--hl-${kind})`;
    const e = this.editor;
    if (!e) return;
    if (e.isActive('highlight', { color })) e.chain().focus().unsetHighlight().run();
    else e.chain().focus().setHighlight({ color }).run();
  }

  clearFormat(): void {
    this.editor?.chain().focus().unsetAllMarks().setParagraph().run();
  }

  setLink(): void {
    const e = this.editor;
    if (!e) return;
    if (e.isActive('link')) { e.chain().focus().unsetLink().run(); return; }
    const url = window.prompt('URL do link:');
    if (url) e.chain().focus().setLink({ href: url }).run();
  }

  addImageUrl(): void {
    const url = window.prompt('URL da imagem:');
    if (url) this.editor?.chain().focus().setImage({ src: url }).run();
  }

  uploadImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.editor?.chain().focus().setImage({ src: String(reader.result) }).run();
    };
    reader.readAsDataURL(file);
    input.value = '';
  }

  insertTable(): void {
    this.editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }

  tableCmd(what: 'addRow' | 'addCol' | 'delete'): void {
    const c = this.editor?.chain().focus();
    if (!c) return;
    if (what === 'addRow') c.addRowAfter().run();
    else if (what === 'addCol') c.addColumnAfter().run();
    else c.deleteTable().run();
  }
}
