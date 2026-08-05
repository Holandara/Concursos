/**
 * Modelos de dados da plataforma.
 * Todos os registros possuem `updatedAt` para viabilizar sincronização futura
 * (estratégia last-write-wins ou CRDT — ver README).
 */

export type SubjectStatus = 'nao_iniciado' | 'estudando' | 'revisando' | 'dominado';
export type Priority = 'alta' | 'media' | 'baixa';
export type Difficulty = 'facil' | 'media' | 'dificil';
export type QuestionStatus = 'nunca_vista' | 'errei' | 'acertei' | 'revisar';

/** Concurso (ex.: DATAPREV 2026). A árvore de assuntos pertence a um concurso. */
export interface Contest {
  id?: number;
  slug: string;
  name: string;
  role: string;
  year: number;
  /** Linha de rodapé do menu: banca, número do edital, data da prova. */
  examInfo?: string;
  createdAt: number;
  updatedAt: number;
}

/** Nó da árvore de assuntos. `parentId = null` → categoria raiz. */
export interface Subject {
  id?: number;
  contestId: number;
  parentId: number | null;
  title: string;
  order: number;
  /** Tópicos do edital (ementa) associados a este assunto. */
  topics: string[];
  status: SubjectStatus;
  priority: Priority;
  favorite: 0 | 1;
  /** Nível de domínio 0–100 (auto-avaliação). */
  mastery: number;
  timesReviewed: number;
  lastReviewedAt: number | null;
  totalSeconds: number;
  createdAt: number;
  updatedAt: number;
}

/** Documento rico (Resumo ou Observações) de um assunto — JSON do TipTap. */
export interface RichDoc {
  id?: number;
  subjectId: number;
  kind: 'summary' | 'notes';
  /** JSON serializado do documento TipTap. */
  json: string;
  /** Texto plano extraído (para busca). */
  text: string;
  updatedAt: number;
}

/** Artigo/dispositivo de legislação vinculado a um assunto. */
export interface LawArticle {
  id?: number;
  subjectId: number;
  lawRef: string;      // ex.: "Lei nº 13.709/2018 (LGPD)"
  heading: string;     // ex.: "Art. 5º"
  html: string;        // conteúdo rico (com destaques/sublinhados)
  text: string;        // texto plano para busca
  note: string;        // observação lateral
  important: 0 | 1;    // grifado como importante
  favorite: 0 | 1;
  order: number;
  createdAt: number;
  updatedAt: number;
}

export interface Question {
  id?: number;
  subjectId: number;
  statement: string;
  options: string[];
  correct: number;      // índice da alternativa correta
  banca: string;
  year: number | null;
  orgao: string;
  difficulty: Difficulty;
  subtopic: string;
  tags: string[];
  comment: string;        // comentário (ex.: do professor)
  justification: string;  // justificativa da resposta
  myNote: string;         // minha observação
  status: QuestionStatus;
  favorite: 0 | 1;
  answered: number;       // vezes respondida
  correctCount: number;   // vezes acertada
  createdAt: number;
  updatedAt: number;
}

export interface Flashcard {
  id?: number;
  subjectId: number;
  front: string;
  back: string;
  intervalDays: number;
  dueAt: number;   // timestamp da próxima revisão
  reps: number;
  lapses: number;
  createdAt: number;
  updatedAt: number;
}

/** Agendamento de revisão de um assunto (estilo Anki, intervalos fixos). */
export interface ReviewEntry {
  id?: number;
  subjectId: number;
  dueAt: number;
  intervalDays: number;
  done: 0 | 1;
  completedAt: number | null;
  createdAt: number;
  updatedAt: number;
}

/** Sessão de estudo (para horas estudadas e mapa de calor). */
export interface StudySession {
  id?: number;
  subjectId: number;
  day: string;      // 'YYYY-MM-DD'
  seconds: number;
  startedAt: number;
  updatedAt: number;
}

export interface Setting {
  key: string;
  value: unknown;
}

/** Intervalos de revisão disponíveis (dias). */
export const REVIEW_INTERVALS = [1, 3, 7, 15, 30, 90] as const;

export const STATUS_LABEL: Record<SubjectStatus, string> = {
  nao_iniciado: 'Não iniciado',
  estudando: 'Estudando',
  revisando: 'Em revisão',
  dominado: 'Dominado',
};

export const PRIORITY_LABEL: Record<Priority, string> = {
  alta: 'Alta',
  media: 'Média',
  baixa: 'Baixa',
};

export const QSTATUS_LABEL: Record<QuestionStatus, string> = {
  nunca_vista: 'Nunca vista',
  errei: 'Errei',
  acertei: 'Acertei',
  revisar: 'Revisar',
};

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  facil: 'Fácil',
  media: 'Média',
  dificil: 'Difícil',
};
