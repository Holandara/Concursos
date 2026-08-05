import { SubjectContent } from './content-types';
import { CONTENT_LEGISLACAO } from './content-legislacao';
import { CONTENT_SEGURANCA_1 } from './content-seguranca-1';
import { CONTENT_SEGURANCA_2 } from './content-seguranca-2';
import { CONTENT_SEGURANCA_3 } from './content-seguranca-3';

/**
 * Registro central do conteúdo. Para adicionar um novo bloco de assuntos,
 * crie `content-<area>.ts` exportando um `SubjectContent[]` e inclua-o aqui.
 */
export const SUBJECT_CONTENT: SubjectContent[] = [
  ...CONTENT_LEGISLACAO,
  ...CONTENT_SEGURANCA_1,
  ...CONTENT_SEGURANCA_2,
  ...CONTENT_SEGURANCA_3,
];

export * from './content-types';
