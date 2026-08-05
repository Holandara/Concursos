import { inject } from '@angular/core';
import { CanActivateFn, RedirectFunction, Router } from '@angular/router';
import { ReviewService } from '../services/review.service';
import { SubjectStore } from '../services/subject.store';

/**
 * Prefixo de todas as rotas de estudo.
 *
 * O concurso vive na URL — `/c/<slug>/assunto/42` — e não apenas na memória do
 * app. Sem isso, dois editais diferentes compartilhariam `/assunto/42`: um link
 * salvo apontaria para o assunto errado assim que o banco fosse re-semeado, e
 * abrir dois concursos em abas distintas embaralharia o estado das duas.
 */
export const CONTEST_PREFIX = 'c';

/** Monta um `routerLink` para o concurso indicado. */
export function contestLink(slug: string | null, ...segments: (string | number)[]): unknown[] {
  return slug ? ['/', CONTEST_PREFIX, slug, ...segments] : ['/concursos'];
}

/**
 * Sincroniza o concurso ativo com o slug da URL.
 *
 * A URL é a autoridade: navegar para outro concurso (link, histórico, aba nova)
 * troca o ativo. Slug desconhecido cai na lista de concursos em vez de exibir
 * uma árvore vazia sem explicação.
 */
export const activateContestGuard: CanActivateFn = (route) => {
  const store = inject(SubjectStore);
  const reviews = inject(ReviewService);
  const router = inject(Router);
  const slug = route.paramMap.get('contest');
  if (!slug || !store.hasContest(slug)) return router.parseUrl('/concursos');

  const changed = store.activeSlug() !== slug;
  store.setActive(slug);
  // As revisões pendentes são escopadas ao concurso ativo. Sem este refresh, o
  // contador da sidebar continuaria exibindo o total do concurso anterior.
  if (changed) void reviews.refresh();
  return true;
};

/** Raiz (`/`) → dashboard do último concurso estudado. */
export const redirectToActiveContest: RedirectFunction = () => {
  const store = inject(SubjectStore);
  const slug = store.activeSlug();
  return slug ? `/${CONTEST_PREFIX}/${slug}` : '/concursos';
};

/**
 * Compatibilidade com as URLs antigas (`/assunto/:id`, `/busca`), anteriores ao
 * suporte a múltiplos concursos. Para `/assunto/:id` o destino é descoberto
 * pelo dono real do assunto — não pelo concurso ativo —, senão um favorito
 * antigo abriria o assunto certo dentro do concurso errado.
 */
export const legacySubjectRedirect: RedirectFunction = (data) => {
  const store = inject(SubjectStore);
  const id = Number(data.params['id']);
  const slug = store.contestOf(id)?.slug ?? store.activeSlug();
  return slug ? `/${CONTEST_PREFIX}/${slug}/assunto/${id}` : '/concursos';
};

export const legacySearchRedirect: RedirectFunction = () => {
  const store = inject(SubjectStore);
  const slug = store.activeSlug();
  return slug ? `/${CONTEST_PREFIX}/${slug}/busca` : '/concursos';
};
