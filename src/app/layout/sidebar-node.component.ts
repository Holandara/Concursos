import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SubjectNode } from '../core/services/subject.store';
import { contestLink } from '../core/routing/contest.routing';
import { IconComponent } from '../shared/icon/icon.component';

/** Nó recursivo da árvore de assuntos no menu lateral. */
@Component({
  selector: 'app-sidebar-node',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, IconComponent],
  template: `
    <div class="select-none">
      <div class="group flex items-center gap-1 rounded-md pr-1"
           [style.paddingLeft.px]="depth * 12">
        @if (node.children.length) {
          <button type="button" class="icon-btn !w-5 !h-5"
                  (click)="toggle.emit(node.id!)"
                  [attr.aria-label]="expanded ? 'Recolher' : 'Expandir'">
            <app-icon [name]="expanded ? 'chevron-down' : 'chevron-right'" [size]="13" />
          </button>
        } @else {
          <span class="inline-block w-5 shrink-0 text-center text-faint text-[10px]">
            <span class="status-dot" [class]="'dot-' + node.status"></span>
          </span>
        }
        <a [routerLink]="link" routerLinkActive="!bg-sel !text-accent"
           (click)="navigated.emit()"
           class="flex-1 truncate rounded-md px-1.5 py-1 text-[13.5px] text-soft hover:bg-hoverc hover:text-ink transition-colors">
          {{ node.title }}
          @if (node.favorite) {
            <app-icon name="star" [size]="11" [filled]="true" class="ml-1 align-[-1px] text-accent" />
          }
        </a>
      </div>
      @if (expanded && node.children.length) {
        @for (child of node.children; track child.id) {
          <app-sidebar-node
            [node]="child" [depth]="depth + 1"
            [contestSlug]="contestSlug"
            [expandedIds]="expandedIds"
            (toggle)="toggle.emit($event)"
            (navigated)="navigated.emit()" />
        }
      }
    </div>
  `,
  styles: [`
    .status-dot { display: inline-block; width: 7px; height: 7px; border-radius: 99px; }
    .dot-nao_iniciado { background: var(--line); }
    .dot-estudando { background: var(--warn); }
    .dot-revisando { background: var(--accent); }
    .dot-dominado { background: var(--ok); }
  `],
})
export class SidebarNodeComponent {
  @Input({ required: true }) node!: SubjectNode;
  /** Slug do concurso dono da árvore — mantém o link preso ao edital certo. */
  @Input({ required: true }) contestSlug!: string | null;
  @Input() depth = 0;
  @Input({ required: true }) expandedIds!: Set<number>;
  @Output() toggle = new EventEmitter<number>();
  @Output() navigated = new EventEmitter<void>();

  get link(): unknown[] {
    return contestLink(this.contestSlug, 'assunto', this.node.id!);
  }

  get expanded(): boolean {
    return this.expandedIds.has(this.node.id!);
  }
}
