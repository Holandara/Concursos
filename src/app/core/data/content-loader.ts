import {
  AreaFile, ContentManifest, ContestManifestEntry, ContestMeta, SUPPORTED_SCHEMA_VERSION,
} from './content-types';

/** Raiz dos arquivos estáticos de conteúdo (servidos pelo Netlify/CDN). */
const BASE = 'content';

/**
 * Resolve contra o `<base href>` do documento, não contra a rota atual.
 *
 * Um caminho relativo simples quebraria: recarregar em `/assunto/42` faria o
 * `fetch` procurar `/assunto/content/index.json`. Resolver pelo `baseURI`
 * também mantém o app funcionando caso ele passe a ser servido sob um subpath.
 */
function contentUrl(pathname: string): string {
  return new URL(`${BASE}/${pathname}`, document.baseURI).href;
}

async function getJson<T>(pathname: string): Promise<T> {
  const url = contentUrl(pathname);
  const res = await fetch(url, { credentials: 'omit' });
  if (!res.ok) throw new Error(`HTTP ${res.status} ao buscar ${url}`);

  // O fallback de SPA responde index.html com status 200 para caminhos
  // inexistentes. Sem esta checagem, um nome de área errado viraria um
  // "Unexpected token '<'" — erro que não diz nada sobre a causa real.
  const type = res.headers.get('content-type') ?? '';
  if (!type.includes('json')) {
    throw new Error(`${url} não retornou JSON (content-type: ${type || 'ausente'}). Arquivo inexistente?`);
  }
  return (await res.json()) as T;
}

/**
 * Manifesto. Sem cache-busting: é pequeno e precisa refletir publicações novas,
 * então o `netlify.toml` manda revalidar sempre (um 304 é barato).
 */
export function loadManifest(): Promise<ContentManifest> {
  return getJson<ContentManifest>('index.json');
}

/**
 * Os demais arquivos levam `?v=<contentVersion>`: podem ser cacheados de forma
 * imutável, porque qualquer alteração de conteúdo vem acompanhada de um bump de
 * versão no manifesto — o que muda a URL e invalida o cache naturalmente.
 */
export function loadContestMeta(contest: ContestManifestEntry): Promise<ContestMeta> {
  return getJson<ContestMeta>(`${contest.slug}/meta.json?v=${contest.contentVersion}`);
}

export function loadArea(contest: ContestManifestEntry, area: string): Promise<AreaFile> {
  return getJson<AreaFile>(`${contest.slug}/${area}.json?v=${contest.contentVersion}`);
}

/** Todas as áreas de um concurso, em paralelo. */
export async function loadAllAreas(contest: ContestManifestEntry): Promise<AreaFile[]> {
  return Promise.all(contest.areas.map((area) => loadArea(contest, area)));
}

export function isSchemaSupported(manifest: ContentManifest): boolean {
  return manifest.schemaVersion === SUPPORTED_SCHEMA_VERSION;
}
