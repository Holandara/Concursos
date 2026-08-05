import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    title: 'Dashboard · Estudos DATAPREV',
  },
  {
    path: 'assunto/:id',
    loadComponent: () =>
      import('./features/subject/subject-page.component').then((m) => m.SubjectPageComponent),
    title: 'Assunto · Estudos DATAPREV',
  },
  {
    path: 'busca',
    loadComponent: () =>
      import('./features/search/search-page.component').then((m) => m.SearchPageComponent),
    title: 'Busca · Estudos DATAPREV',
  },
  { path: '**', redirectTo: '' },
];
