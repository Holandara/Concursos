/**
 * Tipos do "seed de conteúdo": resumos, artigos de legislação e questões
 * associados por TÍTULO de assunto (o mesmo título usado no arquivo do edital).
 *
 * Para adicionar conteúdo a um assunto, basta acrescentar um `SubjectContent`
 * em qualquer arquivo de `core/data/content/` e registrá-lo em `content/index.ts`.
 * Nada na estrutura do app precisa mudar.
 */

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
  /** Comentário geral (por que o tema cai, pegadinha da banca). */
  comment?: string;
  /** Justificativa da alternativa correta e erro das demais. */
  justification?: string;
}

export interface ArticleSeed {
  /** Ex.: "Lei nº 13.709/2018 (LGPD)". */
  lawRef: string;
  /** Ex.: "Art. 5º". */
  heading: string;
  /** Conteúdo em HTML (o leitor aceita grifos, <strong>, <mark> etc.). */
  html: string;
  /** Observação lateral pré-preenchida (dica de prova). */
  note?: string;
  important?: 0 | 1;
}

export interface SubjectContent {
  /** Título EXATO do assunto na árvore do edital. */
  subject: string;
  /** Resumo em HTML (vai para a aba Resumo). */
  summary?: string;
  /** Anotações iniciais em HTML (vai para a aba Observações). */
  notes?: string;
  articles?: ArticleSeed[];
  questions?: QuestionSeed[];
}

/**
 * Versão do conteúdo. Ao incrementar, o app reaplica o seed de conteúdo
 * nos assuntos que ainda estiverem vazios (nunca sobrescreve o que você escreveu).
 */
export const CONTENT_VERSION = 2;
