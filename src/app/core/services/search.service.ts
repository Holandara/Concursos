import { Injectable, inject } from '@angular/core';
import { db } from '../db/database';
import { SubjectStore } from './subject.store';

export interface SearchResult {
  type: 'assunto' | 'resumo' | 'observacao' | 'legislacao' | 'questao' | 'flashcard';
  subjectId: number;
  subjectTitle: string;
  title: string;
  snippet: string;
  tab?: string;
}

const norm = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

function snippetOf(text: string, q: string, len = 140): string {
  const i = norm(text).indexOf(q);
  if (i < 0) return text.slice(0, len);
  const start = Math.max(0, i - 40);
  return (start > 0 ? '…' : '') + text.slice(start, start + len) + (start + len < text.length ? '…' : '');
}

/** Busca global local: assuntos, resumos, observações, legislação, questões e flashcards. */
@Injectable({ providedIn: 'root' })
export class SearchService {
  private store = inject(SubjectStore);

  async search(query: string): Promise<SearchResult[]> {
    const q = norm(query.trim());
    if (q.length < 2) return [];
    const results: SearchResult[] = [];
    const titleOf = (id: number) => this.store.byId(id)?.title ?? '';
    // Busca "global" é global DENTRO do concurso ativo. Misturar editais aqui
    // produziria resultados que nem sequer abrem no menu lateral atual.
    const scope = this.store.scopeIds();
    const inScope = (subjectId: number) => scope.has(subjectId);

    for (const s of this.store.subjects()) {
      const hay = norm(s.title + ' ' + s.topics.join(' '));
      if (hay.includes(q)) {
        results.push({
          type: 'assunto', subjectId: s.id!, subjectTitle: s.title,
          title: s.title, snippet: snippetOf(s.topics.join(' · '), q),
        });
      }
    }

    const docs = await db.docs.toArray();
    for (const d of docs) {
      if (inScope(d.subjectId) && norm(d.text).includes(q)) {
        results.push({
          type: d.kind === 'summary' ? 'resumo' : 'observacao',
          subjectId: d.subjectId, subjectTitle: titleOf(d.subjectId),
          title: d.kind === 'summary' ? 'Resumo' : 'Minhas observações',
          snippet: snippetOf(d.text, q),
          tab: d.kind === 'summary' ? 'resumo' : 'observacoes',
        });
      }
    }

    const articles = await db.articles.toArray();
    for (const a of articles) {
      if (inScope(a.subjectId) && norm(a.text + ' ' + a.heading + ' ' + a.lawRef + ' ' + a.note).includes(q)) {
        results.push({
          type: 'legislacao', subjectId: a.subjectId, subjectTitle: titleOf(a.subjectId),
          title: `${a.lawRef} — ${a.heading}`, snippet: snippetOf(a.text, q), tab: 'legislacao',
        });
      }
    }

    const questions = await db.questions.toArray();
    for (const question of questions) {
      const hay = norm([question.statement, ...question.options, question.comment, question.justification, question.myNote, question.tags.join(' ')].join(' '));
      if (inScope(question.subjectId) && hay.includes(q)) {
        results.push({
          type: 'questao', subjectId: question.subjectId, subjectTitle: titleOf(question.subjectId),
          title: `Questão ${question.banca ? '· ' + question.banca : ''} ${question.year ?? ''}`.trim(),
          snippet: snippetOf(question.statement, q), tab: 'questoes',
        });
      }
    }

    const cards = await db.flashcards.toArray();
    for (const c of cards) {
      if (inScope(c.subjectId) && norm(c.front + ' ' + c.back).includes(q)) {
        results.push({
          type: 'flashcard', subjectId: c.subjectId, subjectTitle: titleOf(c.subjectId),
          title: 'Flashcard', snippet: snippetOf(c.front + ' — ' + c.back, q), tab: 'flashcards',
        });
      }
    }

    return results.slice(0, 80);
  }
}
