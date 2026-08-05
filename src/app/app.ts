import { ChangeDetectionStrategy, Component, HostListener, computed, inject, signal, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SubjectStore } from './core/services/subject.store';
import { ThemeService } from './core/services/theme.service';
import { ReviewService } from './core/services/review.service';
import { SidebarNodeComponent } from './layout/sidebar-node.component';
import { IconComponent } from './shared/icon/icon.component';
import { CONTEST_PREFIX, contestLink } from './core/routing/contest.routing';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, SidebarNodeComponent, IconComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly store = inject(SubjectStore);
  readonly theme = inject(ThemeService);
  readonly reviews = inject(ReviewService);
  private router = inject(Router);

  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;

  /** Sidebar aberta (desktop) / visível (mobile overlay). */
  readonly sidebarOpen = signal(this.isDesktop());
  readonly isMobile = signal(!this.isDesktop());

  readonly dueCount = computed(() => this.reviews.due().length);

  readonly expandedIds = signal<Set<number>>(this.loadExpanded());

  /** Seletor de concurso aberto na sidebar. */
  readonly pickerOpen = signal(false);
  readonly prefix = CONTEST_PREFIX;

  /** Iniciais do concurso ativo para o quadradinho colorido do seletor. */
  readonly contestInitials = computed(() => {
    const name = this.store.contest()?.name ?? '';
    const words = name.split(/\s+/).filter(Boolean);
    if (!words.length) return '··';
    return (words[0].slice(0, 1) + (words[1]?.slice(0, 1) ?? words[0].slice(1, 2))).toUpperCase();
  });

  /** Rodapé da sidebar: dados da prova quando o edital os traz. */
  readonly footerNote = computed(() => {
    const contest = this.store.contest();
    if (!contest) return 'Nenhum concurso selecionado';
    return contest.examInfo || `${contest.name} · ${contest.year}`;
  });

  /** Links do shell (Dashboard, Busca) apontam para o concurso ativo. */
  link(...segments: (string | number)[]): unknown[] {
    return contestLink(this.store.activeSlug(), ...segments);
  }

  chooseContest(): void {
    this.pickerOpen.set(false);
    this.closeSidebarOnMobile();
  }

  private isDesktop(): boolean {
    return window.matchMedia('(min-width: 1024px)').matches;
  }

  private loadExpanded(): Set<number> {
    try {
      const raw = localStorage.getItem('cs-expanded');
      return new Set(raw ? (JSON.parse(raw) as number[]) : []);
    } catch { return new Set(); }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.isMobile.set(!this.isDesktop());
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.searchInput?.nativeElement.focus();
    }
  }

  toggleSidebar(): void {
    this.sidebarOpen.update((v) => !v);
  }

  closeSidebarOnMobile(): void {
    if (this.isMobile()) this.sidebarOpen.set(false);
  }

  toggleNode(id: number): void {
    this.expandedIds.update((set) => {
      const next = new Set(set);
      if (next.has(id)) next.delete(id); else next.add(id);
      try { localStorage.setItem('cs-expanded', JSON.stringify([...next])); } catch { /* ignore */ }
      return next;
    });
  }

  submitSearch(value: string): void {
    const q = value.trim();
    if (!q) return;
    this.closeSidebarOnMobile();
    void this.router.navigate(this.link('busca'), { queryParams: { q } });
  }
}
