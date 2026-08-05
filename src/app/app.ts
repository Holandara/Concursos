import { ChangeDetectionStrategy, Component, HostListener, computed, inject, signal, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SubjectStore } from './core/services/subject.store';
import { ThemeService } from './core/services/theme.service';
import { ReviewService } from './core/services/review.service';
import { SidebarNodeComponent } from './layout/sidebar-node.component';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, SidebarNodeComponent],
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
    void this.router.navigate(['/busca'], { queryParams: { q } });
  }
}
