import { Routes } from '@angular/router';
import {
  activateContestGuard, legacySearchRedirect, legacySubjectRedirect, redirectToActiveContest,
} from './core/routing/contest.routing';

/**
 * Rotas.
 *
 * Tudo que é conteúdo de estudo mora sob `/c/:contest/…`. O slug do concurso na
 * URL é o que impede dois editais de disputarem o mesmo endereço e o que
 * permite manter concursos diferentes abertos em abas diferentes.
 */
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: redirectToActiveContest,
  },
  {
    path: 'concursos',
    loadComponent: () =>
      import('./features/contests/contests-page.component').then((m) => m.ContestsPageComponent),
    title: 'Concursos · Concurso Studio',
  },
  {
    path: 'c/:contest',
    canActivate: [activateContestGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
        title: 'Dashboard · Concurso Studio',
      },
      {
        path: 'assunto/:id',
        loadComponent: () =>
          import('./features/subject/subject-page.component').then((m) => m.SubjectPageComponent),
        title: 'Assunto · Concurso Studio',
      },
      {
        path: 'busca',
        loadComponent: () =>
          import('./features/search/search-page.component').then((m) => m.SearchPageComponent),
        title: 'Busca · Concurso Studio',
      },
    ],
  },

  // URLs anteriores ao suporte a múltiplos concursos — mantidas para não
  // quebrar favoritos e links já compartilhados.
  { path: 'assunto/:id', redirectTo: legacySubjectRedirect },
  { path: 'busca', redirectTo: legacySearchRedirect },

  { path: '**', redirectTo: '' },
];
