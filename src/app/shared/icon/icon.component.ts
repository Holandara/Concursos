import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import {
  Baseline, BookOpen, Bookmark, Bold, Braces, Calendar, Check, ChevronDown, ChevronRight,
  CircleCheck, CircleQuestionMark, CircleX, Clock, Code, Columns3, Copy, FileText, Flag, Image,
  ImagePlus, Italic, Layers, LayoutDashboard, Library, Lightbulb, Link, List, ListOrdered, ListTodo,
  LucideAngularModule, LucideIconData, Menu, MessageSquare, Moon, PartyPopper, PenLine, Play,
  Plus, Quote, Redo2, RefreshCw, RemoveFormatting, Rows3, Scale, Search, Star, Strikethrough,
  Sun, Table, Trash2, Underline, Undo2, X,
} from 'lucide-angular';

/**
 * Registro central de ícones (Lucide).
 *
 * Só o que está aqui entra no bundle — a importação nomeada acima preserva o
 * tree-shaking. Para usar um ícone novo: importe-o do `lucide-angular` e
 * acrescente uma entrada neste mapa; o `IconName` se atualiza sozinho e o
 * compilador passa a aceitar o novo nome nos templates.
 */
export const APP_ICONS = {
  // Navegação e shell
  dashboard: LayoutDashboard,
  contests: Library,
  search: Search,
  menu: Menu,
  sun: Sun,
  moon: Moon,
  'chevron-down': ChevronDown,
  'chevron-right': ChevronRight,

  // Abas e tipos de conteúdo
  summary: FileText,
  legislation: Scale,
  question: CircleQuestionMark,
  note: MessageSquare,
  review: RefreshCw,
  flashcard: Layers,
  subject: BookOpen,

  // Ações
  add: Plus,
  edit: PenLine,
  duplicate: Copy,
  delete: Trash2,
  check: Check,
  close: X,
  star: Star,
  flag: Flag,
  bookmark: Bookmark,
  play: Play,
  calendar: Calendar,
  clock: Clock,
  success: CircleCheck,
  error: CircleX,
  celebrate: PartyPopper,

  // Editor
  undo: Undo2,
  redo: Redo2,
  bold: Bold,
  italic: Italic,
  underline: Underline,
  strikethrough: Strikethrough,
  code: Code,
  'code-block': Braces,
  'text-color': Baseline,
  'clear-format': RemoveFormatting,
  'list-bullet': List,
  'list-ordered': ListOrdered,
  'list-task': ListTodo,
  quote: Quote,
  callout: Lightbulb,
  link: Link,
  image: Image,
  'image-upload': ImagePlus,
  table: Table,
  'table-row': Rows3,
  'table-column': Columns3,
} satisfies Record<string, LucideIconData>;

export type IconName = keyof typeof APP_ICONS;

/**
 * Ícone da interface.
 *
 * Uso: `<app-icon name="star" />` · `<app-icon name="star" [filled]="true" [size]="20" />`
 *
 * O ícone é sempre DECORATIVO (`aria-hidden`): o nome acessível deve vir do
 * `aria-label` ou do texto do botão que o contém, para não duplicar a leitura
 * em leitores de tela.
 */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule],
  template: `<lucide-icon
    [img]="icon"
    [size]="size"
    [strokeWidth]="strokeWidth"
    [class]="filled ? 'icon-filled' : ''" />`,
  styles: [`
    :host { display: inline-flex; align-items: center; justify-content: center; line-height: 0; }
  `],
})
export class IconComponent {
  @HostBinding('attr.aria-hidden') readonly ariaHidden = 'true';

  protected icon: LucideIconData = APP_ICONS.check;

  @Input({ required: true }) set name(value: IconName) {
    this.icon = APP_ICONS[value];
  }

  /** Lado do ícone em px. 16 combina com o texto de 13–14px da interface. */
  @Input() size = 16;
  @Input() strokeWidth = 2;
  /** Preenche o ícone com a cor atual — usado em estados ativos (favorito, marcado). */
  @Input() filled = false;
}
