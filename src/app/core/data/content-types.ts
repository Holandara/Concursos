/**
 * Contrato do conteúdo servido em `public/content/`.
 *
 * O conteúdo NÃO é código: são arquivos JSON estáticos, buscados apenas quando
 * há semeadura a fazer e nunca depois. Adicionar um concurso é criar uma pasta
 * em `public/content/` e registrá-la no manifesto — nenhum TypeScript muda, e o
 * bundle não cresce.
 *
 * Estes tipos existem para dar forma ao dado depois do `fetch`. A garantia real
 * vem do validador `scripts/check-content.mjs`, executado no `prebuild`.
 */

/** Nó da árvore do edital (`meta.json`). */
export interface SubjectSeed {
  title: string;
  topics?: string[];
  children?: SubjectSeed[];
}

/** `public/content/<slug>/meta.json` */
export interface ContestMeta {
  slug: string;
  name: string;
  role: string;
  year: number;
  /** Banca, edital e data da prova — exibido no rodapé do menu lateral. */
  examInfo?: string;
  tree: SubjectSeed[];
}

/** Entrada do concurso no manifesto `public/content/index.json`. */
export interface ContestManifestEntry {
  slug: string;
  name: string;
  role: string;
  year: number;
  /** Incremente para reaplicar o conteúdo nos assuntos ainda vazios. */
  contentVersion: number;
  /** Nomes dos arquivos de área, sem a extensão `.json`. */
  areas: string[];
}

/** `public/content/index.json` */
export interface ContentManifest {
  schemaVersion: number;
  contests: ContestManifestEntry[];
}

export interface QuestionSeed {
  statement: string;
  options: string[];
  /** Índice (0-based) da alternativa correta. */
  correct: number;
  banca: string;
  year: number | null;
  orgao: string;
  difficulty: 'facil' | 'media' | 'dificil';
  subtopic?: string;
  tags?: string[];
  comment?: string;
  justification?: string;
}

export interface ArticleSeed {
  lawRef: string;
  heading: string;
  html: string;
  note?: string;
  important?: 0 | 1;
}

export interface SubjectContent {
  /** Título EXATO do assunto na árvore do edital (`meta.json`). */
  subject: string;
  summary?: string;
  notes?: string;
  articles?: ArticleSeed[];
  questions?: QuestionSeed[];
}

/** `public/content/<slug>/<area>.json` */
export interface AreaFile {
  subjects: SubjectContent[];
}

/** Versão do formato entendido por este código. */
export const SUPPORTED_SCHEMA_VERSION = 1;
