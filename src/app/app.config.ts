import {
  ApplicationConfig, provideAppInitializer, inject,
  provideBrowserGlobalErrorListeners, provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { SubjectStore } from './core/services/subject.store';
import { ReviewService } from './core/services/review.service';
import { NoopSyncAdapter, SYNC_ADAPTER } from './core/sync/sync-adapter';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
    ),
    // Sincronização em nuvem: trocar por um adapter real no futuro (ver README).
    { provide: SYNC_ADAPTER, useClass: NoopSyncAdapter },
    provideAppInitializer(async () => {
      const store = inject(SubjectStore);
      const reviews = inject(ReviewService);
      await store.init();
      await reviews.refresh();
    }),
  ],
};
