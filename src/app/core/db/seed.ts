import { db, now } from './database';
import { Subject } from '../models/models';
import { ContestSeed, SubjectSeed } from '../data/edital-dataprev-seguranca';
import { EDITAL_DATAPREV_SEGURANCA } from '../data/edital-dataprev-seguranca';
import { seedContent } from './content-seed';

/** Concursos registrados. Para adicionar um novo, basta incluir o seed aqui. */
const CONTEST_SEEDS: ContestSeed[] = [EDITAL_DATAPREV_SEGURANCA];

/**
 * Popula o banco na primeira execução (idempotente por slug do concurso).
 */
export async function seedDatabase(): Promise<void> {
  for (const seed of CONTEST_SEEDS) {
    const existing = await db.contests.where('slug').equals(seed.slug).first();
    if (existing) continue;

    const ts = now();
    const contestId = await db.contests.add({
      slug: seed.slug,
      name: seed.name,
      role: seed.role,
      year: seed.year,
      createdAt: ts,
      updatedAt: ts,
    });

    const insertTree = async (nodes: SubjectSeed[], parentId: number | null) => {
      let order = 0;
      for (const node of nodes) {
        const subject: Subject = {
          contestId,
          parentId,
          title: node.title,
          order: order++,
          topics: node.topics ?? [],
          status: 'nao_iniciado',
          priority: 'media',
          favorite: 0,
          mastery: 0,
          timesReviewed: 0,
          lastReviewedAt: null,
          totalSeconds: 0,
          createdAt: ts,
          updatedAt: ts,
        };
        const id = await db.subjects.add(subject);
        if (node.children?.length) await insertTree(node.children, id);
      }
    };
    await insertTree(seed.tree, null);
  }

  // Conteúdo (resumos, legislação e questões). Roda também em bancos já
  // existentes e só preenche o que estiver vazio — ver `content-seed.ts`.
  await seedContent();
}
