# Concurso Studio — DATAPREV 2026 · Segurança Cibernética e Proteção de Dados

Plataforma pessoal de estudos para concursos, **offline-first**, estilo "Notion para concursos".
Primeira instância: **DATAPREV 2026 — Perfil 5: Segurança Cibernética e Proteção de Dados** (Edital 001/2026, FGV, prova em 11/10/2026).

A arquitetura é modular: a mesma base cria plataformas para outros concursos (ABGF, PF, Receita Federal…) apenas adicionando um novo arquivo de seed — sem alterar a estrutura principal.

---

## Como rodar

```bash
npm install
npm start        # http://localhost:4200
npm run build    # produção em dist/dataprev-study/browser
```

Deploy no **Netlify**: o `netlify.toml` já define build command, pasta de publish e o fallback SPA. Basta conectar o repositório.

Não há backend. Todos os dados ficam no **IndexedDB do navegador** (persistem entre sessões no mesmo dispositivo/navegador).

---

## Stack e decisões técnicas

| Escolha | Motivo |
|---|---|
| **Angular 20** (standalone components, signals, OnPush em tudo) | Preferência declarada; signals eliminam re-renders desnecessários e dispensam RxJS para estado local |
| **Dexie 4 (IndexedDB)** | Persistência local robusta, índices compostos, migrações de schema versionadas |
| **TipTap 2** | Editor rico estilo Notion: headings, listas, checklists, tabelas, imagens, código, citações, callouts, destaques multicoloridos, cor e tamanho de fonte, undo/redo, atalhos Markdown nativos |
| **TailwindCSS 3** | Design system próprio via CSS variables (tokens), dark/light mode por classe, bundle mínimo |
| **Sem PrimeNG/PrimeFlex** | Decisão deliberada: para atingir o visual Notion/Linear/Obsidian com contraste AAA e controle total de tema, componentes próprios com Tailwind ficaram mais leves e consistentes que sobrescrever um design system pronto. A troca não afeta a arquitetura — qualquer aba é um componente standalone substituível |
| **Lazy loading** | Cada página é um `loadComponent`; o TipTap só é baixado ao abrir uma página de assunto |
| **RxJS** | Não utilizado para estado (apenas o que o Angular usa internamente) |

**Auto-save em tudo** — não existe botão salvar. Editores emitem alterações com debounce (~800 ms) e gravam direto no IndexedDB; formulários gravam ao confirmar; toggles gravam imediatamente.

---

## Estrutura de pastas

```
src/app/
├── app.ts / app.html          # Shell: sidebar recolhível + topbar + router-outlet
├── app.config.ts              # Providers, APP_INITIALIZER (seed + stores), SYNC_ADAPTER
├── app.routes.ts              # Rotas lazy: /, /assunto/:id, /busca
├── core/
│   ├── models/models.ts       # Todas as interfaces e enums do domínio
│   ├── db/
│   │   ├── database.ts        # Schema Dexie (IndexedDB) versionado
│   │   └── seed.ts            # Popula o banco na 1ª execução (idempotente)
│   ├── data/
│   │   └── edital-dataprev-seguranca.ts   # Árvore de assuntos extraída do edital
│   ├── services/
│   │   ├── subject.store.ts   # Store (signals) da árvore de assuntos
│   │   ├── review.service.ts  # Revisão espaçada (assuntos + flashcards)
│   │   ├── study-tracker.service.ts # Cronômetro automático de estudo
│   │   ├── search.service.ts  # Busca global local
│   │   ├── stats.service.ts   # Agregações do dashboard
│   │   └── theme.service.ts   # Dark/Light mode
│   └── sync/sync-adapter.ts   # Interface p/ sincronização em nuvem (futura)
├── layout/
│   └── sidebar-node.component.ts  # Nó recursivo da árvore no menu
├── shared/
│   ├── editor/
│   │   ├── rich-editor.component.ts   # Wrapper TipTap + toolbar completa
│   │   └── tiptap-extensions.ts       # Extensões próprias: Callout, FontSize
│   └── safe-html.pipe.ts
└── features/
    ├── dashboard/dashboard.component.ts
    ├── search/search-page.component.ts
    └── subject/
        ├── subject-page.component.ts  # Cabeçalho, status, prioridade, favoritos, abas
        └── tabs/
            ├── doc-tab.component.ts          # Resumo E Observações (mesmo componente)
            ├── legislation-tab.component.ts  # Leitor de legislação artigo a artigo
            ├── questions-tab.component.ts    # Banco de questões completo
            ├── reviews-tab.component.ts      # Métricas + revisão espaçada
            └── flashcards-tab.component.ts   # Flashcards com modo estudo
```

---

## Modelo de dados (IndexedDB, banco `concurso-studio`)

| Tabela | Conteúdo | Índices principais |
|---|---|---|
| `contests` | Concursos | `slug` |
| `subjects` | Árvore de assuntos (auto-relação por `parentId`) | `contestId, parentId, status, priority, favorite` |
| `docs` | Documentos ricos (Resumo/Observações) — JSON TipTap + texto p/ busca | `[subjectId+kind]` |
| `articles` | Dispositivos de legislação (HTML com grifos + observação lateral) | `subjectId, order` |
| `questions` | Questões (enunciado, alternativas, gabarito, banca, ano, órgão, dificuldade, subassunto, tags, comentário, justificativa, observação, status, favorita, estatísticas) | `subjectId, status` |
| `flashcards` | Cards com intervalo e vencimento | `subjectId, dueAt` |
| `reviews` | Agendamentos de revisão de assuntos | `subjectId, dueAt, done` |
| `sessions` | Tempo de estudo por dia/assunto (mapa de calor) | `subjectId, day` |
| `settings` | Preferências | `key` |

Todos os registros carregam `updatedAt` — pré-requisito da sincronização futura.

### Sistema de revisão (estilo Anki)
Intervalos fixos: **1 · 3 · 7 · 15 · 30 · 90 dias**.
- **Assuntos**: na aba Revisões você marca "Revisei agora" e escolhe o próximo intervalo; o Dashboard e o sino da sidebar avisam quando algo vence.
- **Flashcards**: cada card tem `dueAt`; avaliações *Errei/Bom/Fácil* sobem/descem na escada de intervalos.

### Rastreamento automático
`StudyTrackerService` conta o tempo enquanto uma página de assunto está aberta (pausa quando a aba do navegador fica oculta) e grava em `sessions` — alimenta horas estudadas, heatmap e "tempo estudado" por assunto.

---

## Como estender sem alterar a estrutura

### Adicionar um novo concurso
1. Crie `src/app/core/data/edital-<slug>.ts` exportando um `ContestSeed` (mesmo formato do arquivo da DATAPREV: árvore de `SubjectSeed` com `title`, `topics`, `children`).
2. Registre-o no array `CONTEST_SEEDS` em `core/db/seed.ts`.
3. Pronto — o seed é idempotente por `slug` e roda na próxima inicialização.

### Adicionar novos assuntos a um concurso existente
- **Pela UI (futuro próximo)** ou programaticamente: `SubjectStore.addSubject(contestId, parentId, título)`.
- Ou edite o arquivo de seed e apague o banco (DevTools → Application → IndexedDB) para re-seedar.

### Adicionar conteúdo
Tudo pela interface: resumos e observações (editor), artigos de legislação (colar texto → grifar), questões (formulário completo com duplicar/editar/excluir) e flashcards. Auto-save sempre.

### Importação futura (PDF, DOCX, JSON, Excel…)
Os modelos já são "importável-friendly": basta criar um serviço `ImportService` que converta a fonte em registros `Question[]`/`LawArticle[]`/`docs` e faça `bulkAdd`. Nenhuma mudança de schema é necessária para JSON/Excel de questões (o shape de `Question` é o contrato).

### Sincronização em nuvem (futura)
`core/sync/sync-adapter.ts` define a interface `SyncAdapter` (registrada via token `SYNC_ADAPTER`, hoje com `NoopSyncAdapter`). Para ativar:
1. Implemente `SyncAdapter` (Supabase/Firebase/API própria): *push* de registros com `updatedAt > lastSyncAt`, *pull* com last-write-wins.
2. Troque o provider no `app.config.ts`.
3. Recomendado: converter exclusões em *soft delete* (tombstones) antes de habilitar.

### IA (resumos, questões, flashcards, explicação de artigos)
Pontos de acoplamento naturais: um `AiService` que recebe `RichDoc.text`/`LawArticle.text` e devolve `Flashcard[]`/`Question[]` para `bulkAdd`. A UI já tem os lugares (botões podem ser adicionados nas abas sem tocar no restante).

---

## Funcionalidades entregues (v1)

- Menu lateral recolhível com **toda a árvore do conteúdo programático do Perfil 5** (Módulo I — Conhecimentos Gerais + Módulo II — Conhecimentos Específicos), gerada automaticamente do edital, com indicador de status por assunto
- Página por assunto com 6 abas: **Resumo** (editor rico), **Legislação** (leitor artigo a artigo com grifos, importante, favorito e observação lateral), **Questões** (CRUD completo + responder com correção instantânea + filtros + duplicar + favoritas), **Observações** (editor livre), **Revisões** (métricas, domínio, agendamento espaçado, histórico), **Flashcards** (CRUD + modo estudo)
- Editor TipTap: undo/redo, H1–H3, negrito, itálico, sublinhado, tachado, destaque amarelo/verde/vermelho, cor de texto, tamanho de fonte, listas, checklist, tabelas (+linha/+coluna), imagens (URL ou upload → base64), código inline e bloco, citação, callout, links, atalhos Markdown
- **Dashboard**: progresso geral, assuntos estudados/dominados, questões respondidas, taxa de acerto, horas estudadas, mapa de calor de 4 meses, revisões do dia, últimos assuntos, pendentes por prioridade
- **Busca global** (Ctrl+K) em assuntos, resumos, observações, legislação, questões e flashcards
- Status (Não iniciado/Estudando/Em revisão/Dominado), prioridade (Alta/Média/Baixa) e favoritos para assuntos, questões e artigos
- Dark/Light mode (persistido, sem flash), mobile-first, sidebar off-canvas no tablet/celular, touch-friendly

## Roadmap sugerido
PWA (service worker) → exportação Markdown/PDF → importadores → IA → sincronização → autenticação → backup/compartilhamento.
