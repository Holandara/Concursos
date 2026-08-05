import Dexie, { Table } from 'dexie';
import {
  Contest, Subject, RichDoc, LawArticle, Question,
  Flashcard, ReviewEntry, StudySession, Setting,
} from '../models/models';

/**
 * Banco local (IndexedDB via Dexie).
 *
 * Versões do schema são migradas automaticamente pelo Dexie — para evoluir,
 * adicione `this.version(n+1).stores({...}).upgrade(...)` sem remover as anteriores.
 */
export class StudyDatabase extends Dexie {
  contests!: Table<Contest, number>;
  subjects!: Table<Subject, number>;
  docs!: Table<RichDoc, number>;
  articles!: Table<LawArticle, number>;
  questions!: Table<Question, number>;
  flashcards!: Table<Flashcard, number>;
  reviews!: Table<ReviewEntry, number>;
  sessions!: Table<StudySession, number>;
  settings!: Table<Setting, string>;

  constructor() {
    super('concurso-studio');
    this.version(1).stores({
      contests: '++id, slug',
      subjects: '++id, contestId, parentId, status, priority, favorite, updatedAt',
      docs: '++id, subjectId, kind, [subjectId+kind], updatedAt',
      articles: '++id, subjectId, order, important, favorite',
      questions: '++id, subjectId, status, favorite, updatedAt',
      flashcards: '++id, subjectId, dueAt',
      reviews: '++id, subjectId, dueAt, done',
      sessions: '++id, subjectId, day',
      settings: 'key',
    });
  }
}

export const db = new StudyDatabase();

export const now = () => Date.now();
export const todayKey = () => {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
};
