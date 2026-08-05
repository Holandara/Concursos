#!/usr/bin/env node
/**
 * Validador do conteúdo estático de `public/content/`.
 *
 * Roda no `prebuild` — ou seja, `npm run build` (e o deploy do Netlify) falha
 * antes de publicar conteúdo quebrado. É o que recupera a rede de segurança
 * que existia quando o conteúdo morava em TypeScript.
 *
 * Uso direto: `npm run content:check`
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = path.join(ROOT, 'public', 'content');
const SUPPORTED_SCHEMA = 1;

const errors = [];
const warnings = [];
const fail = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

const norm = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();

function readJson(file, label) {
  if (!fs.existsSync(file)) { fail(`${label}: arquivo não encontrado (${path.relative(ROOT, file)})`); return null; }
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    fail(`${label}: JSON inválido — ${e.message}`);
    return null;
  }
}

/** Títulos das FOLHAS da árvore (só folhas recebem conteúdo). */
function leafTitles(nodes, acc = []) {
  for (const n of nodes ?? []) {
    if (!n.children?.length) acc.push(n.title);
    leafTitles(n.children, acc);
  }
  return acc;
}

function allTitles(nodes, acc = []) {
  for (const n of nodes ?? []) {
    acc.push(n.title);
    allTitles(n.children, acc);
  }
  return acc;
}

/** Checa se as tags de bloco abrem e fecham na mesma quantidade. */
function checkHtml(html, label) {
  for (const tag of ['table', 'tbody', 'tr', 'td', 'ul', 'ol', 'li', 'p', 'div', 'blockquote', 'h1', 'h2', 'h3']) {
    const open = (html.match(new RegExp(`<${tag}(\\s[^>]*)?>`, 'g')) || []).length;
    const close = (html.match(new RegExp(`</${tag}>`, 'g')) || []).length;
    if (open !== close) fail(`${label}: <${tag}> desbalanceado (${open} aberturas, ${close} fechamentos)`);
  }
}

// ---------------------------------------------------------------- manifesto
const manifest = readJson(path.join(CONTENT, 'index.json'), 'manifesto');
if (!manifest) { report(); process.exit(1); }

if (manifest.schemaVersion !== SUPPORTED_SCHEMA) {
  fail(`manifesto: schemaVersion ${manifest.schemaVersion} — esperado ${SUPPORTED_SCHEMA}`);
}
if (!Array.isArray(manifest.contests) || manifest.contests.length === 0) {
  fail('manifesto: nenhum concurso registrado em "contests"');
}

const seenSlugs = new Set();
let totalSubjects = 0, totalQuestions = 0, totalArticles = 0;

for (const contest of manifest.contests ?? []) {
  const where = `concurso "${contest.slug}"`;
  for (const field of ['slug', 'name', 'role', 'year', 'contentVersion', 'areas']) {
    if (contest[field] === undefined) fail(`${where}: campo obrigatório ausente no manifesto: ${field}`);
  }
  if (seenSlugs.has(contest.slug)) fail(`${where}: slug duplicado no manifesto`);
  seenSlugs.add(contest.slug);
  if (!Number.isInteger(contest.contentVersion)) fail(`${where}: contentVersion deve ser inteiro`);

  // ------------------------------------------------------------------ meta
  const dir = path.join(CONTENT, contest.slug);
  const meta = readJson(path.join(dir, 'meta.json'), `${where} meta.json`);
  if (!meta) continue;
  if (meta.slug !== contest.slug) fail(`${where}: slug do meta.json (${meta.slug}) difere do manifesto`);
  if (!Array.isArray(meta.tree) || meta.tree.length === 0) fail(`${where}: árvore do edital vazia`);

  const titles = allTitles(meta.tree);
  const titleSet = new Set(titles.map(norm));
  const leaves = leafTitles(meta.tree);
  const dupTitles = titles.filter((t, i) => titles.findIndex((x) => norm(x) === norm(t)) !== i);
  if (dupTitles.length) fail(`${where}: títulos repetidos na árvore: ${[...new Set(dupTitles)].join(', ')}`);

  // ----------------------------------------------------------------- áreas
  const covered = new Set();
  for (const area of contest.areas ?? []) {
    const file = path.join(dir, `${area}.json`);
    const data = readJson(file, `${where} área "${area}"`);
    if (!data) continue;
    if (!Array.isArray(data.subjects)) { fail(`${where} área "${area}": esperado { "subjects": [...] }`); continue; }

    for (const [i, s] of data.subjects.entries()) {
      const at = `${where} · ${area}[${i}]`;
      if (!s.subject) { fail(`${at}: campo "subject" ausente`); continue; }
      const key = norm(s.subject);

      if (!titleSet.has(key)) fail(`${at}: "${s.subject}" não existe na árvore do edital`);
      if (covered.has(key)) fail(`${at}: "${s.subject}" já recebeu conteúdo em outra área`);
      covered.add(key);
      totalSubjects++;

      if (s.summary) checkHtml(s.summary, `${at} resumo`);
      if (s.notes) checkHtml(s.notes, `${at} observações`);

      for (const [j, a] of (s.articles ?? []).entries()) {
        totalArticles++;
        for (const field of ['lawRef', 'heading', 'html']) {
          if (!a[field]) fail(`${at} artigo[${j}]: campo obrigatório ausente: ${field}`);
        }
        if (a.important !== undefined && a.important !== 0 && a.important !== 1) {
          fail(`${at} artigo[${j}]: "important" deve ser 0 ou 1`);
        }
        if (a.html) checkHtml(a.html, `${at} artigo[${j}] (${a.heading})`);
      }

      for (const [j, q] of (s.questions ?? []).entries()) {
        totalQuestions++;
        const qAt = `${at} questão[${j}]`;
        if (!q.statement) fail(`${qAt}: enunciado ausente`);
        if (!Array.isArray(q.options) || q.options.length < 2) {
          fail(`${qAt}: precisa de ao menos 2 alternativas`);
        } else {
          if (q.options.some((o) => typeof o !== 'string' || !o.trim())) fail(`${qAt}: alternativa vazia`);
          if (!Number.isInteger(q.correct) || q.correct < 0 || q.correct >= q.options.length) {
            fail(`${qAt}: gabarito ${q.correct} fora do intervalo 0..${q.options.length - 1}`);
          }
          if (q.options.length !== 5) warn(`${qAt}: ${q.options.length} alternativas (a FGV usa 5)`);
        }
        if (q.difficulty && !['facil', 'media', 'dificil'].includes(q.difficulty)) {
          fail(`${qAt}: dificuldade inválida "${q.difficulty}"`);
        }
        if (q.year !== undefined && q.year !== null && !Number.isInteger(q.year)) {
          fail(`${qAt}: "year" deve ser inteiro ou null`);
        }
      }
    }
  }

  const semConteudo = leaves.filter((t) => !covered.has(norm(t)));
  if (semConteudo.length) {
    warn(`${where}: ${semConteudo.length} assunto(s) do edital sem conteúdo — ${semConteudo.slice(0, 5).join(', ')}${semConteudo.length > 5 ? '…' : ''}`);
  }
  console.log(`✓ ${contest.slug}: ${leaves.length} folhas no edital, ${covered.size} com conteúdo, v${contest.contentVersion}`);
}

function report() {
  if (warnings.length) {
    console.log(`\n${warnings.length} aviso(s):`);
    for (const w of warnings) console.log('  ! ' + w);
  }
  if (errors.length) {
    console.error(`\n${errors.length} erro(s):`);
    for (const e of errors) console.error('  ✗ ' + e);
  }
}

console.log(`\ntotais: ${totalSubjects} assuntos · ${totalQuestions} questões · ${totalArticles} artigos`);
report();

if (errors.length) {
  console.error('\nconteúdo inválido — build interrompido.');
  process.exit(1);
}
console.log('\nconteúdo válido.');
