import { Injectable, inject } from '@angular/core';
import { db } from '../db/database';
import { SubjectStore } from './subject.store';
import { Subject } from '../models/models';

export interface DashboardStats {
  totalLeaves: number;
  studied: number;        // status != nao_iniciado
  dominated: number;
  progressPct: number;    // média ponderada por status
  questionsAnswered: number;
  accuracyPct: number | null;
  totalSeconds: number;
  heatmap: { day: string; seconds: number }[];
  recent: Subject[];
  pending: Subject[];
  favorites: Subject[];
}

const STATUS_WEIGHT: Record<string, number> = {
  nao_iniciado: 0, estudando: 0.4, revisando: 0.75, dominado: 1,
};

@Injectable({ providedIn: 'root' })
export class StatsService {
  private store = inject(SubjectStore);

  async compute(): Promise<DashboardStats> {
    const leaves = this.store.leaves();
    const totalLeaves = leaves.length;
    const studied = leaves.filter((s) => s.status !== 'nao_iniciado').length;
    const dominated = leaves.filter((s) => s.status === 'dominado').length;
    const progress = totalLeaves
      ? leaves.reduce((acc, s) => acc + (STATUS_WEIGHT[s.status] ?? 0), 0) / totalLeaves
      : 0;

    // `questions` e `sessions` são tabelas globais: sem o filtro por escopo, o
    // dashboard de um concurso somaria as estatísticas de todos os outros.
    const scope = this.store.scopeIds();
    const questions = (await db.questions.toArray()).filter((q) => scope.has(q.subjectId));
    const answered = questions.reduce((a, q) => a + q.answered, 0);
    const correct = questions.reduce((a, q) => a + q.correctCount, 0);

    const sessions = (await db.sessions.toArray()).filter((s) => scope.has(s.subjectId));
    const byDay = new Map<string, number>();
    for (const s of sessions) byDay.set(s.day, (byDay.get(s.day) ?? 0) + s.seconds);

    // últimos 119 dias (17 semanas) para o mapa de calor
    const heatmap: { day: string; seconds: number }[] = [];
    const d = new Date();
    for (let i = 118; i >= 0; i--) {
      const dt = new Date(d);
      dt.setDate(d.getDate() - i);
      const key = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
      heatmap.push({ day: key, seconds: byDay.get(key) ?? 0 });
    }

    const recent = leaves
      .filter((s) => s.totalSeconds > 0 || s.status !== 'nao_iniciado')
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .slice(0, 6);
    const pending = leaves
      .filter((s) => s.status === 'nao_iniciado')
      .sort((a, b) => (a.priority === 'alta' ? -1 : a.priority === 'media' ? 0 : 1) - (b.priority === 'alta' ? -1 : b.priority === 'media' ? 0 : 1))
      .slice(0, 8);
    const favorites = leaves.filter((s) => s.favorite === 1).slice(0, 8);

    return {
      totalLeaves, studied, dominated,
      progressPct: Math.round(progress * 100),
      questionsAnswered: answered,
      accuracyPct: answered ? Math.round((correct / answered) * 100) : null,
      totalSeconds: sessions.reduce((a, s) => a + s.seconds, 0),
      heatmap, recent, pending, favorites,
    };
  }
}
