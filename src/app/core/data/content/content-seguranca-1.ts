import { SubjectContent } from './content-types';

/* eslint-disable max-len */

/**
 * Segurança da Informação — bloco 1: fundamentos, normas ISO, redes,
 * vulnerabilidades, perímetro, criptografia, malware e detecção.
 */
export const CONTENT_SEGURANCA_1: SubjectContent[] = [
  {
    subject: 'Políticas de Segurança da Informação',
    summary: `
<h1>Políticas de Segurança da Informação (PSI)</h1>

<h2>1. Os pilares</h2>
<p><strong>CID / CIA</strong>: <strong>C</strong>onfidencialidade (só quem tem autorização acessa), <strong>I</strong>ntegridade (não sofreu alteração indevida), <strong>D</strong>isponibilidade (acessível quando necessário). Complementos frequentes: <strong>autenticidade</strong>, <strong>irretratabilidade / não repúdio</strong>, <strong>legalidade</strong> e <strong>confiabilidade</strong>.</p>
<div data-callout="info"><p>Pegadinha recorrente: <em>não repúdio</em> não é sinônimo de autenticidade. Autenticidade prova <em>quem</em> é; não repúdio impede que a pessoa <em>negue</em> depois o que fez — depende de assinatura digital com chave privada sob controle exclusivo do titular.</p></div>

<h2>2. Hierarquia documental</h2>
<table><tbody>
<tr><td><strong>Política</strong></td><td>"O quê" e "por quê". Estratégica, curta, aprovada pela <strong>alta direção</strong>, obrigatória para todos</td></tr>
<tr><td><strong>Norma</strong></td><td>Regras específicas e mandatórias por tema (senha, e-mail, backup)</td></tr>
<tr><td><strong>Procedimento</strong></td><td>"Como fazer", passo a passo operacional</td></tr>
<tr><td><strong>Diretriz / Guideline</strong></td><td>Recomendação, <strong>não obrigatória</strong></td></tr>
</tbody></table>

<h2>3. Requisitos de uma PSI eficaz</h2>
<ul>
<li><strong>Patrocínio da alta direção</strong> — é o requisito nº 1 em qualquer prova;</li>
<li>Alinhamento aos objetivos do negócio e à legislação (LGPD, LAI, Marco Civil);</li>
<li>Escopo, papéis e responsabilidades definidos;</li>
<li><strong>Comunicação e conscientização</strong> a todos os colaboradores, terceiros e prestadores;</li>
<li>Sanções por descumprimento previstas;</li>
<li><strong>Análise crítica periódica</strong> e sempre que houver mudança significativa.</li>
</ul>

<h2>4. Princípios de projeto</h2>
<table><tbody>
<tr><td><strong>Menor privilégio</strong></td><td>Só o acesso estritamente necessário à função</td></tr>
<tr><td><strong>Need to know</strong></td><td>Só a informação necessária, mesmo com nível de acesso suficiente</td></tr>
<tr><td><strong>Segregação de funções (SoD)</strong></td><td>Quem solicita não aprova; quem desenvolve não coloca em produção</td></tr>
<tr><td><strong>Defesa em profundidade</strong></td><td>Camadas independentes de controle</td></tr>
<tr><td><strong>Fail-safe / negação padrão</strong></td><td>Na falha ou omissão, o acesso é <strong>negado</strong></td></tr>
<tr><td><strong>Rodízio de funções e férias obrigatórias</strong></td><td>Controle antifraude clássico</td></tr>
</tbody></table>

<h2>5. Tipos de controle</h2>
<p><strong>Quanto à natureza</strong>: administrativos (política, treinamento), técnicos/lógicos (firewall, criptografia), físicos (catraca, CFTV).<br>
<strong>Quanto à função</strong>: <strong>preventivos</strong> (evitam), <strong>detectivos</strong> (identificam), <strong>corretivos</strong> (restauram), <strong>dissuasivos/deterrentes</strong> (desencorajam), <strong>recuperativos</strong> e <strong>compensatórios</strong> (substituem um controle inviável).</p>

<h2>6. Classificação da informação</h2>
<p>Ciclo: identificar → classificar → rotular → tratar → descartar. O <strong>proprietário da informação</strong> (business owner) é quem classifica — não o time de TI, que é apenas <strong>custodiante</strong>. Papéis clássicos: proprietário, custodiante, usuário.</p>

<h2>Erros clássicos de prova</h2>
<ol>
<li>Dizer que a PSI é elaborada e aprovada pela área de TI — a aprovação é da <strong>alta direção</strong>.</li>
<li>Confundir menor privilégio com need to know.</li>
<li>Tratar diretriz como documento obrigatório.</li>
<li>Classificar backup como controle preventivo — é <strong>corretivo/recuperativo</strong>.</li>
</ol>
`,
    questions: [
      {
        statement: 'Em uma organização, o analista que desenvolve o código de uma aplicação não pode ser o mesmo que autoriza sua implantação em produção. Esse controle materializa o princípio de:',
        options: ['Menor privilégio.', 'Need to know.', 'Segregação de funções.', 'Defesa em profundidade.', 'Fail-safe defaults.'],
        correct: 2,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'facil',
        subtopic: 'Princípios de segurança', tags: ['PSI', 'SoD', 'controles'],
        comment: 'SoD é controle antifraude: divide uma tarefa crítica entre pessoas diferentes.',
        justification: 'Segregação de funções (separation of duties) impede que uma única pessoa controle todas as etapas de um processo crítico. Menor privilégio trata do nível de acesso; need to know, do escopo da informação.',
      },
      {
        statement: 'Sobre a classificação de tipos de controle de segurança, assinale a alternativa que associa corretamente o controle à sua função.',
        options: [
          'Câmera de circuito fechado — controle exclusivamente preventivo.',
          'Cópia de segurança (backup) — controle corretivo/recuperativo.',
          'Treinamento de conscientização — controle físico.',
          'Firewall — controle administrativo.',
          'Trilha de auditoria (log) — controle preventivo.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'Tipos de controle', tags: ['controles', 'PSI'],
        comment: 'Backup não impede o incidente; ele restaura depois. Log não impede; ele registra (detectivo).',
        justification: 'Backup é corretivo/recuperativo. CFTV é detectivo (e dissuasivo). Treinamento é administrativo. Firewall é técnico/lógico. Log é detectivo.',
      },
      {
        statement: 'A propriedade da segurança da informação que garante que o emissor de uma mensagem não possa, posteriormente, negar sua autoria é denominada:',
        options: ['Confidencialidade.', 'Integridade.', 'Disponibilidade.', 'Irretratabilidade (não repúdio).', 'Autenticidade.'],
        correct: 3,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'facil',
        subtopic: 'Pilares da SI', tags: ['CID', 'não repúdio'],
        comment: 'Não repúdio se apoia na assinatura digital: só o titular possui a chave privada.',
        justification: 'Irretratabilidade ou não repúdio. Autenticidade garante a identidade do emissor, mas não impede, por si só, a negativa posterior — é a assinatura digital que confere o não repúdio.',
      },
    ],
  },

  {
    subject: 'ISO/IEC 27001:2022',
    summary: `
<h1>ABNT NBR ISO/IEC 27001:2022 — SGSI</h1>
<p>Norma <strong>certificável</strong> que especifica os <strong>requisitos</strong> para estabelecer, implementar, manter e melhorar continuamente um <strong>Sistema de Gestão de Segurança da Informação (SGSI)</strong>. Segue a <em>Estrutura de Alto Nível</em> (Anexo SL), comum a ISO 9001, 14001, 22301 etc.</p>

<h2>1. Estrutura (cláusulas 4 a 10 são auditáveis)</h2>
<table><tbody>
<tr><td><strong>4. Contexto da organização</strong></td><td>Questões internas/externas, partes interessadas, <strong>escopo</strong> do SGSI</td></tr>
<tr><td><strong>5. Liderança</strong></td><td>Comprometimento da alta direção, <strong>política</strong>, papéis e responsabilidades</td></tr>
<tr><td><strong>6. Planejamento</strong></td><td>Riscos e oportunidades, <strong>avaliação e tratamento de riscos</strong>, <strong>Declaração de Aplicabilidade (SoA)</strong>, objetivos</td></tr>
<tr><td><strong>7. Apoio</strong></td><td>Recursos, competência, conscientização, comunicação, informação documentada</td></tr>
<tr><td><strong>8. Operação</strong></td><td>Planejamento e controle operacional, execução da avaliação e do tratamento de riscos</td></tr>
<tr><td><strong>9. Avaliação de desempenho</strong></td><td>Monitoramento e medição, <strong>auditoria interna</strong>, <strong>análise crítica pela direção</strong></td></tr>
<tr><td><strong>10. Melhoria</strong></td><td>Melhoria contínua; <strong>não conformidade e ação corretiva</strong></td></tr>
</tbody></table>
<div data-callout="warning"><p><strong>Mudança da versão 2022:</strong> na 27001:2013 a cláusula 10 começava por "não conformidade e ação corretiva"; na <strong>2022 a melhoria contínua vem primeiro (10.1)</strong> e a não conformidade é 10.2. Além disso, foi acrescido o requisito <strong>6.3 — Planejamento de mudanças</strong>.</p></div>

<h2>2. Anexo A na versão 2022</h2>
<p>Saiu de <strong>114 controles em 14 seções</strong> (2013) para <strong>93 controles em 4 temas</strong> (2022):</p>
<table><tbody>
<tr><td><strong>A.5 Organizacionais</strong></td><td>37 controles</td></tr>
<tr><td><strong>A.6 Pessoas</strong></td><td>8 controles</td></tr>
<tr><td><strong>A.7 Físicos</strong></td><td>14 controles</td></tr>
<tr><td><strong>A.8 Tecnológicos</strong></td><td>34 controles</td></tr>
</tbody></table>
<p><strong>11 controles novos</strong>: inteligência de ameaças; segurança da informação para uso de serviços em nuvem; prontidão de TIC para continuidade de negócios; monitoramento de segurança física; gestão de configuração; exclusão de informações; mascaramento de dados; prevenção de vazamento de dados (DLP); monitoramento de atividades; filtragem web; codificação segura.</p>

<h2>3. Declaração de Aplicabilidade (SoA)</h2>
<p>Documento <strong>obrigatório</strong> (6.1.3, alínea d) que lista os controles necessários, a <strong>justificativa da inclusão</strong>, o status de implementação e a <strong>justificativa da exclusão</strong> de controles do Anexo A. É o primeiro documento que o auditor pede.</p>

<h2>4. Ciclo PDCA</h2>
<p>Planejar (4–7) → Fazer (8) → Checar (9) → Agir (10). A versão 2022 não menciona PDCA explicitamente, mas a lógica permanece.</p>

<h2>5. Família 27000 — quem é quem</h2>
<table><tbody>
<tr><td><strong>27000</strong></td><td>Visão geral e vocabulário</td></tr>
<tr><td><strong>27001</strong></td><td><strong>Requisitos</strong> do SGSI — única certificável para a organização</td></tr>
<tr><td><strong>27002</strong></td><td><strong>Diretrizes</strong> / guia de implementação dos controles</td></tr>
<tr><td><strong>27003</strong></td><td>Guia de implementação do SGSI</td></tr>
<tr><td><strong>27004</strong></td><td>Monitoramento, medição, análise e avaliação (métricas)</td></tr>
<tr><td><strong>27005</strong></td><td>Gestão de riscos de segurança da informação</td></tr>
<tr><td><strong>27007 / 27008</strong></td><td>Auditoria de SGSI / auditoria dos controles</td></tr>
<tr><td><strong>27017 / 27018</strong></td><td>Nuvem: controles / proteção de PII em nuvem pública</td></tr>
<tr><td><strong>27701</strong></td><td>Extensão de privacidade (PIMS) — apoia LGPD e GDPR</td></tr>
<tr><td><strong>27035</strong></td><td>Gestão de incidentes de segurança</td></tr>
</tbody></table>

<h2>Erros clássicos de prova</h2>
<ol>
<li>Dizer que a 27002 é certificável — <strong>não é</strong>; quem certifica é a 27001.</li>
<li>Repetir "114 controles em 14 seções" para a versão <strong>2022</strong> (isso é 2013).</li>
<li>Achar que a SoA é opcional.</li>
<li>Confundir 27005 (riscos) com 31000 (gestão de riscos genérica) e 27035 (incidentes).</li>
</ol>
`,
    questions: [
      {
        statement: 'Sobre a ABNT NBR ISO/IEC 27001:2022, assinale a alternativa correta.',
        options: [
          'O Anexo A passou a conter 114 controles distribuídos em 14 seções.',
          'O Anexo A passou a conter 93 controles distribuídos em 4 temas: organizacionais, de pessoas, físicos e tecnológicos.',
          'A Declaração de Aplicabilidade tornou-se documento facultativo.',
          'A norma substitui a ISO/IEC 27002, que foi cancelada.',
          'A certificação é concedida a produtos de segurança, não a organizações.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'Estrutura da norma', tags: ['ISO 27001', 'Anexo A'],
        comment: 'A distribuição 37/8/14/34 é cobrada literalmente. Some: 93.',
        justification: 'A revisão de 2022 reorganizou o Anexo A em 93 controles e 4 temas (A.5 a A.8), alinhando-se à ISO/IEC 27002:2022. A SoA permanece obrigatória (6.1.3, d).',
      },
      {
        statement: 'O documento que relaciona os controles de segurança necessários, justifica sua inclusão, informa o status de implementação e justifica a exclusão de controles do Anexo A da ISO/IEC 27001 é denominado:',
        options: ['Política de Segurança da Informação.', 'Plano de Tratamento de Riscos.', 'Declaração de Aplicabilidade (SoA).', 'Relatório de Análise Crítica pela Direção.', 'Inventário de Ativos.'],
        correct: 2,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'facil',
        subtopic: 'SoA', tags: ['ISO 27001', 'SoA'],
        comment: 'SoA e Plano de Tratamento de Riscos são documentos distintos e ambos obrigatórios.',
        justification: 'Requisito 6.1.3, alínea "d" da ISO/IEC 27001. O Plano de Tratamento de Riscos define as ações; a SoA declara quais controles se aplicam e por quê.',
      },
      {
        statement: 'Na família ISO/IEC 27000, a norma que fornece diretrizes para a gestão de riscos de segurança da informação, apoiando os requisitos do SGSI, é a:',
        options: ['ISO/IEC 27002.', 'ISO/IEC 27004.', 'ISO/IEC 27005.', 'ISO/IEC 27017.', 'ISO/IEC 27701.'],
        correct: 2,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'facil',
        subtopic: 'Família 27000', tags: ['ISO 27005', 'riscos'],
        comment: 'Decore o mapa da família: 27002 controles, 27004 métricas, 27005 riscos, 27017/27018 nuvem, 27701 privacidade, 27035 incidentes.',
        justification: 'A ISO/IEC 27005 trata especificamente da gestão de riscos de segurança da informação.',
      },
    ],
  },

  {
    subject: 'ISO/IEC 27002:2022',
    summary: `
<h1>ABNT NBR ISO/IEC 27002:2022 — Controles</h1>
<p>Norma de <strong>diretrizes</strong> (não certificável). Título atual: <em>Segurança da informação, cibersegurança e proteção à privacidade — Controles de segurança da informação</em>. Serve como guia de implementação do Anexo A da 27001.</p>

<h2>1. Os 4 temas e 93 controles</h2>
<table><tbody>
<tr><td><strong>5 — Organizacionais</strong></td><td>37</td><td>Políticas, papéis, contato com autoridades, <strong>inteligência de ameaças</strong>, classificação, gestão de fornecedores, <strong>nuvem</strong>, continuidade, conformidade legal</td></tr>
<tr><td><strong>6 — Pessoas</strong></td><td>8</td><td>Triagem, termos de contratação, conscientização, processo disciplinar, responsabilidades pós-encerramento, acordos de confidencialidade, <strong>trabalho remoto</strong>, comunicação de eventos</td></tr>
<tr><td><strong>7 — Físicos</strong></td><td>14</td><td>Perímetro, entrada física, <strong>monitoramento de segurança física</strong>, proteção contra ameaças externas e ambientais, mesa limpa e tela limpa, cabeamento, descarte seguro</td></tr>
<tr><td><strong>8 — Tecnológicos</strong></td><td>34</td><td>Endpoint, privilégios, <strong>mascaramento</strong>, <strong>DLP</strong>, backup, redundância, logs, <strong>monitoramento de atividades</strong>, <strong>filtragem web</strong>, criptografia, <strong>codificação segura</strong>, testes, <strong>gestão de configuração</strong>, <strong>exclusão de informações</strong></td></tr>
</tbody></table>

<h2>2. Novidade estrutural: os cinco atributos</h2>
<p>Cada controle recebe <em>hashtags</em> que permitem filtrar e montar visões diferentes:</p>
<ol>
<li><strong>Tipo de controle</strong>: preventivo, detectivo, corretivo;</li>
<li><strong>Propriedades de segurança</strong>: confidencialidade, integridade, disponibilidade;</li>
<li><strong>Conceitos de cibersegurança</strong>: identificar, proteger, detectar, responder, recuperar (alinhado ao <strong>NIST CSF</strong>);</li>
<li><strong>Capacidades operacionais</strong>: governança, gestão de ativos, proteção da informação, segurança de RH, segurança física, segurança de sistemas e redes, etc.;</li>
<li><strong>Domínios de segurança</strong>: governança e ecossistema, proteção, defesa, resiliência.</li>
</ol>

<h2>3. Os 11 controles novos (memorize — caem em lista)</h2>
<p>5.7 Inteligência de ameaças · 5.23 Segurança para uso de serviços em nuvem · 5.30 Prontidão de TIC para continuidade de negócios · 7.4 Monitoramento de segurança física · 8.9 Gestão de configuração · 8.10 Exclusão de informações · 8.11 Mascaramento de dados · 8.12 Prevenção de vazamento de dados · 8.16 Atividades de monitoramento · 8.23 Filtragem web · 8.28 Codificação segura.</p>

<h2>4. Controles que mais aparecem em questão</h2>
<ul>
<li><strong>5.12 Classificação</strong> e <strong>5.13 Rotulagem</strong> das informações;</li>
<li><strong>5.15 Controle de acesso</strong> + <strong>8.2 Direitos de acesso privilegiado</strong> + <strong>8.3 Restrição de acesso à informação</strong>;</li>
<li><strong>8.5 Autenticação segura</strong> (MFA);</li>
<li><strong>8.13 Backup</strong> — cópias, teste de restauração e retenção definidos por política;</li>
<li><strong>8.15 Registro (logs)</strong> e <strong>8.17 Sincronização dos relógios</strong> — sem NTP não há correlação forense confiável;</li>
<li><strong>8.24 Uso de criptografia</strong> — exige política de uso e <strong>gestão de chaves</strong>;</li>
<li><strong>8.31 Separação dos ambientes</strong> de desenvolvimento, teste e produção.</li>
</ul>

<h2>Erros clássicos de prova</h2>
<ol>
<li>Chamar a 27002 de norma de requisitos ou certificável.</li>
<li>Confundir os 4 temas (2022) com os 14 domínios (2013).</li>
<li>Esquecer que os atributos de "conceitos de cibersegurança" espelham as funções do NIST CSF.</li>
</ol>
`,
    questions: [
      {
        statement: 'A ISO/IEC 27002:2022 introduziu o conceito de atributos para os controles. Assinale a alternativa que apresenta corretamente um dos conjuntos de atributos previstos na norma.',
        options: [
          'Conceitos de cibersegurança: identificar, proteger, detectar, responder e recuperar.',
          'Tipos de controle: obrigatório, recomendado e opcional.',
          'Propriedades de segurança: autenticidade, legalidade e privacidade.',
          'Domínios de segurança: estratégico, tático e operacional.',
          'Capacidades operacionais: planejar, fazer, checar e agir.',
        ],
        correct: 0,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'Atributos dos controles', tags: ['ISO 27002', 'NIST CSF'],
        comment: 'O alinhamento explícito com as cinco funções do NIST CSF é a novidade conceitual mais cobrada da 27002:2022.',
        justification: 'Os cinco atributos são: tipo de controle (preventivo/detectivo/corretivo); propriedades (C, I, D); conceitos de cibersegurança (identificar, proteger, detectar, responder, recuperar); capacidades operacionais; e domínios de segurança (governança e ecossistema, proteção, defesa, resiliência).',
      },
      {
        statement: 'Entre os controles introduzidos pela ISO/IEC 27002:2022, encontram-se:',
        options: [
          'Gestão de ativos, controle de acesso e criptografia.',
          'Inteligência de ameaças, mascaramento de dados e prevenção de vazamento de dados.',
          'Política de segurança, segregação de funções e classificação da informação.',
          'Backup, registro de eventos e gestão de vulnerabilidades técnicas.',
          'Acordos de confidencialidade, mesa limpa e descarte de mídias.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'Controles novos', tags: ['ISO 27002', 'DLP'],
        comment: 'Todos os itens das demais alternativas já existiam na versão 2013.',
        justification: 'Inteligência de ameaças (5.7), mascaramento de dados (8.11) e prevenção de vazamento de dados (8.12) estão entre os 11 controles inéditos da versão 2022.',
      },
      {
        statement: 'Sobre a relação entre a ISO/IEC 27001 e a ISO/IEC 27002, é correto afirmar que:',
        options: [
          'Ambas são normas de requisitos e conferem certificação à organização.',
          'A 27001 estabelece requisitos auditáveis do SGSI, enquanto a 27002 fornece diretrizes de implementação dos controles, não sendo certificável.',
          'A 27002 estabelece os requisitos do SGSI e a 27001 detalha os controles.',
          'A 27002 substituiu a 27001 a partir da revisão de 2022.',
          'Nenhuma das duas trata de controles de segurança da informação.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'facil',
        subtopic: 'Relação entre normas', tags: ['ISO 27001', 'ISO 27002'],
        comment: 'Regra simples: 27001 = "shall" (requisito). 27002 = "should" (diretriz).',
        justification: 'A 27001 é a norma certificável de requisitos; a 27002 é guia de boas práticas para implementar os controles do Anexo A.',
      },
    ],
  },

  {
    subject: 'Segurança de Redes e Redes Sem Fio',
    summary: `
<h1>Segurança de redes e redes sem fio</h1>

<h2>1. Segmentação e arquitetura</h2>
<ul>
<li><strong>DMZ</strong> — zona desmilitarizada para serviços expostos (web, e-mail, DNS externo). Nunca hospede banco de dados na DMZ.</li>
<li><strong>VLAN</strong> — segmentação lógica na camada 2. Ataques: <strong>VLAN hopping</strong> por <em>switch spoofing</em> (desabilite DTP) e por <em>double tagging</em> (não use a VLAN nativa em portas de acesso).</li>
<li><strong>Microssegmentação</strong> — política por carga de trabalho, base do Zero Trust.</li>
<li><strong>Zero Trust</strong> — "nunca confie, sempre verifique". Sem perímetro implícito; autenticação e autorização contínuas por sessão, contexto e postura do dispositivo.</li>
</ul>

<h2>2. Controles de camada 2</h2>
<table><tbody>
<tr><td><strong>Port security</strong></td><td>Limita MACs por porta — contra MAC flooding (CAM overflow)</td></tr>
<tr><td><strong>DHCP Snooping</strong></td><td>Contra DHCP rogue/starvation; cria a binding table</td></tr>
<tr><td><strong>Dynamic ARP Inspection (DAI)</strong></td><td>Contra <strong>ARP spoofing/poisoning</strong>; depende do DHCP snooping</td></tr>
<tr><td><strong>IP Source Guard</strong></td><td>Contra IP spoofing na porta</td></tr>
<tr><td><strong>BPDU Guard / Root Guard</strong></td><td>Contra manipulação de STP</td></tr>
<tr><td><strong>IEEE 802.1X</strong></td><td>NAC por porta: <em>supplicant</em> → <em>authenticator</em> → <em>authentication server</em> (RADIUS), usando EAP</td></tr>
</tbody></table>

<h2>3. Redes sem fio — evolução da segurança</h2>
<table><tbody>
<tr><td><strong>WEP</strong></td><td>RC4 + CRC-32, IV de 24 bits</td><td><strong>Quebrado</strong> (ataque FMS/PTW)</td></tr>
<tr><td><strong>WPA</strong></td><td>TKIP + RC4 + MIC (Michael)</td><td>Paliativo, obsoleto</td></tr>
<tr><td><strong>WPA2</strong></td><td><strong>CCMP com AES</strong> (IEEE 802.11i)</td><td>Vulnerável ao <strong>KRACK</strong> (reinstalação de chave no 4-way handshake)</td></tr>
<tr><td><strong>WPA3</strong></td><td><strong>SAE</strong> (Dragonfly) substitui a PSK; <strong>PFS</strong>; <strong>OWE</strong> em redes abertas; 192 bits no modo Enterprise; protege quadros de gerenciamento (PMF obrigatório)</td><td>Estado da arte</td></tr>
</tbody></table>
<p>Modos: <strong>Personal (PSK/SAE)</strong> e <strong>Enterprise (802.1X/EAP + RADIUS)</strong>. Métodos EAP: <strong>EAP-TLS</strong> (certificado nos dois lados — o mais seguro), <strong>PEAP</strong> e <strong>EAP-TTLS</strong> (túnel TLS + credencial interna), <strong>EAP-MD5</strong> (inseguro, sem mútua autenticação).</p>

<h2>4. Ataques em redes sem fio</h2>
<ul>
<li><strong>Rogue AP</strong> e <strong>Evil Twin</strong> — AP falso com o mesmo SSID;</li>
<li><strong>Deauthentication / disassociation</strong> — força reconexão para capturar handshake (mitigado por PMF/802.11w);</li>
<li><strong>Wardriving</strong>, <strong>jamming</strong>, ataque ao <strong>WPS PIN</strong> (Reaver) — desabilite o WPS;</li>
<li><strong>KRACK</strong> (WPA2) e <strong>Dragonblood</strong> (implementações iniciais do WPA3).</li>
</ul>
<div data-callout="warning"><p>Ocultar o SSID e filtrar por MAC <strong>não são controles de segurança efetivos</strong>: o SSID trafega em quadros de <em>probe</em> e o MAC é facilmente clonado. Questão clássica.</p></div>

<h2>5. Protocolos seguros x inseguros</h2>
<table><tbody>
<tr><td>Telnet (23) → <strong>SSH (22)</strong></td><td>FTP (20/21) → <strong>SFTP/FTPS</strong></td></tr>
<tr><td>HTTP (80) → <strong>HTTPS (443)</strong></td><td>SNMPv1/v2c → <strong>SNMPv3</strong> (autenticação + criptografia)</td></tr>
<tr><td>DNS → <strong>DNSSEC</strong> (integridade/autenticidade, <em>não</em> confidencialidade), <strong>DoT/DoH</strong> (confidencialidade)</td><td>LDAP → <strong>LDAPS</strong></td></tr>
</tbody></table>

<h2>Erros clássicos de prova</h2>
<ol>
<li>Dizer que WPA2 usa TKIP obrigatoriamente — usa <strong>CCMP/AES</strong>.</li>
<li>Afirmar que DNSSEC criptografa consultas — ele só assina.</li>
<li>Achar que esconder SSID protege a rede.</li>
<li>Confundir 802.1X (controle de acesso à rede) com 802.11i (segurança Wi-Fi) e 802.11w (proteção de quadros de gerenciamento).</li>
</ol>
`,
    questions: [
      {
        statement: 'Sobre os protocolos de segurança de redes sem fio, assinale a alternativa correta.',
        options: [
          'O WPA2 emprega, obrigatoriamente, o protocolo TKIP com a cifra RC4.',
          'O WPA3 substitui a autenticação por chave pré-compartilhada pelo SAE (Simultaneous Authentication of Equals), oferecendo sigilo perfeito futuro (PFS).',
          'O WEP é seguro desde que utilizado com chaves de 128 bits.',
          'A ocultação do SSID impede que um atacante identifique a rede.',
          'A filtragem por endereço MAC constitui mecanismo criptográfico de autenticação.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'Redes sem fio', tags: ['WPA3', 'SAE', '802.11'],
        comment: 'SAE (Dragonfly) resiste a ataques de dicionário offline, o calcanhar de Aquiles do WPA2-PSK.',
        justification: 'O WPA3-Personal usa SAE em vez da PSK do WPA2, garantindo PFS. O WPA2 usa CCMP/AES (TKIP é do WPA). WEP é quebrado em qualquer tamanho de chave. SSID oculto e filtro de MAC são facilmente contornados.',
      },
      {
        statement: 'Um atacante conectado à rede local envia respostas ARP forjadas para associar seu próprio endereço MAC ao endereço IP do gateway, interceptando o tráfego dos demais hosts. O controle de switch mais adequado para mitigar esse ataque é:',
        options: ['BPDU Guard.', 'Port Security com limite de 1 MAC.', 'Dynamic ARP Inspection (DAI), apoiado no DHCP Snooping.', 'Storm Control.', 'Root Guard.'],
        correct: 2,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'Segurança de camada 2', tags: ['ARP spoofing', 'DAI', 'switch'],
        comment: 'DAI valida cada pacote ARP contra a binding table construída pelo DHCP Snooping. Sem snooping, é preciso ARP ACL estática.',
        justification: 'O ataque descrito é ARP spoofing/poisoning (man-in-the-middle). O DAI inspeciona pacotes ARP e descarta os que não correspondem à tabela de vinculação IP-MAC-porta. BPDU e Root Guard protegem o STP; Port Security atua contra MAC flooding.',
      },
      {
        statement: 'A respeito do padrão IEEE 802.1X, assinale a alternativa correta.',
        options: [
          'É o padrão que define a criptografia CCMP para redes sem fio.',
          'Implementa controle de acesso à rede baseado em porta, envolvendo suplicante, autenticador e servidor de autenticação, geralmente RADIUS.',
          'Aplica-se exclusivamente a redes sem fio.',
          'Dispensa o uso do protocolo EAP.',
          'Substitui o protocolo STP na prevenção de loops de camada 2.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'NAC e 802.1X', tags: ['802.1X', 'RADIUS', 'EAP'],
        comment: 'O 802.1X funciona em redes cabeadas e sem fio; o CCMP/AES é definido no 802.11i.',
        justification: 'O IEEE 802.1X é o padrão de Port-Based Network Access Control, com três papéis (supplicant, authenticator e authentication server) e uso do EAP como framework de autenticação.',
      },
    ],
  },

  {
    subject: 'Vulnerabilidades e Ataques',
    summary: `
<h1>Vulnerabilidades e ataques a sistemas computacionais</h1>

<h2>1. Vocabulário de risco</h2>
<p><strong>Ativo</strong> → tem valor. <strong>Ameaça</strong> → evento potencial. <strong>Vulnerabilidade</strong> → fraqueza explorável. <strong>Exploit</strong> → código que explora. <strong>Risco</strong> = probabilidade × impacto. <strong>Impacto</strong> → consequência. <strong>Zero-day</strong> → vulnerabilidade sem correção disponível.</p>

<h2>2. Catálogos e métricas</h2>
<table><tbody>
<tr><td><strong>CVE</strong></td><td>Identificador único da vulnerabilidade (CVE-AAAA-NNNN) — MITRE</td></tr>
<tr><td><strong>CWE</strong></td><td>Catálogo de <strong>tipos de fraqueza</strong> (ex.: CWE-89 SQL Injection)</td></tr>
<tr><td><strong>CVSS</strong></td><td>Escore 0–10: Base, Temporal e Ambiental. Severidade: Baixa 0,1–3,9 · Média 4,0–6,9 · <strong>Alta 7,0–8,9</strong> · <strong>Crítica 9,0–10,0</strong></td></tr>
<tr><td><strong>CAPEC</strong></td><td>Padrões de ataque</td></tr>
<tr><td><strong>EPSS</strong></td><td>Probabilidade de exploração nos próximos 30 dias</td></tr>
<tr><td><strong>KEV (CISA)</strong></td><td>Catálogo de vulnerabilidades <em>comprovadamente exploradas</em> — prioridade máxima</td></tr>
</tbody></table>

<h2>3. OWASP Top 10 (2021)</h2>
<ol>
<li><strong>A01 Broken Access Control</strong> (subiu para 1º)</li>
<li>A02 Cryptographic Failures</li>
<li>A03 Injection (inclui XSS)</li>
<li><strong>A04 Insecure Design</strong> (novo)</li>
<li>A05 Security Misconfiguration</li>
<li>A06 Vulnerable and Outdated Components</li>
<li>A07 Identification and Authentication Failures</li>
<li><strong>A08 Software and Data Integrity Failures</strong> (novo — inclui ataques à cadeia de suprimentos)</li>
<li>A09 Security Logging and Monitoring Failures</li>
<li><strong>A10 SSRF</strong> (novo)</li>
</ol>

<h2>4. Ataques a aplicações web</h2>
<table><tbody>
<tr><td><strong>SQL Injection</strong></td><td>Mitigação: <strong>consultas parametrizadas / prepared statements</strong> (não é "escapar aspas")</td></tr>
<tr><td><strong>XSS</strong> (refletido, armazenado, DOM)</td><td>Codificação de saída conforme o contexto + <strong>CSP</strong> + cookie HttpOnly</td></tr>
<tr><td><strong>CSRF</strong></td><td><strong>Token anti-CSRF</strong> + SameSite. <em>Não</em> se mitiga com HttpOnly</td></tr>
<tr><td><strong>SSRF</strong></td><td>Allowlist de destinos, bloqueio de IP interno e do metadata endpoint (169.254.169.254)</td></tr>
<tr><td><strong>Path traversal</strong></td><td>Canonicalização e allowlist</td></tr>
<tr><td><strong>XXE</strong></td><td>Desabilitar entidades externas no parser XML</td></tr>
<tr><td><strong>Deserialização insegura</strong></td><td>Evitar desserializar dado não confiável; usar formatos de dados puros</td></tr>
<tr><td><strong>IDOR</strong></td><td>Autorização por objeto no servidor</td></tr>
</tbody></table>

<h2>5. Ataques de rede e infraestrutura</h2>
<ul>
<li><strong>DoS / DDoS</strong>: volumétrico (UDP flood, <strong>amplificação</strong> DNS/NTP/memcached), de protocolo (<strong>SYN flood</strong>, mitigado com <em>SYN cookies</em>) e de aplicação (HTTP flood, Slowloris);</li>
<li><strong>MITM</strong>, <strong>ARP spoofing</strong>, <strong>DNS cache poisoning</strong>, <strong>session hijacking</strong>, <strong>replay</strong> (mitigado por nonce/timestamp);</li>
<li><strong>Buffer overflow</strong> — mitigações: <strong>DEP/NX</strong>, <strong>ASLR</strong>, <strong>stack canary</strong>, compilação com proteção;</li>
<li><strong>Privilege escalation</strong> vertical (ganha mais privilégio) e horizontal (acessa outro usuário do mesmo nível);</li>
<li><strong>Supply chain</strong> — comprometimento de dependência ou do pipeline (SolarWinds, XZ Utils);</li>
<li><strong>Engenharia social</strong>: phishing, <strong>spear phishing</strong> (alvo específico), <strong>whaling</strong> (alta direção), vishing, smishing, <strong>pretexting</strong>, <strong>baiting</strong>, tailgating.</li>
</ul>

<h2>6. Gestão de vulnerabilidades — o ciclo</h2>
<p>Descobrir ativos → varrer (autenticada e não autenticada) → <strong>priorizar</strong> (CVSS + EPSS + KEV + criticidade do ativo + exposição) → remediar/mitigar/aceitar → <strong>verificar</strong> → reportar métricas (MTTR, taxa de recorrência, cobertura).</p>
<p>Ferramentas típicas: Nessus, OpenVAS, Qualys, Nexpose, Nuclei, Trivy/Grype (contêineres e SBOM).</p>

<h2>Erros clássicos de prova</h2>
<ol>
<li>Confundir <strong>vulnerabilidade</strong> (fraqueza) com <strong>ameaça</strong> (agente/evento).</li>
<li>Dizer que CVE classifica a gravidade — quem pontua é o <strong>CVSS</strong>; CVE só identifica.</li>
<li>Propor HttpOnly como defesa contra CSRF.</li>
<li>Confundir XSS (executa no navegador da vítima) com SQLi (executa no banco).</li>
<li>Achar que scanner de vulnerabilidade explora a falha — quem explora é o <strong>pentest</strong>.</li>
</ol>
`,
    questions: [
      {
        statement: 'Um sistema web permite que o usuário informe uma URL que será acessada pelo servidor para importar uma imagem. Um atacante fornece a URL http://169.254.169.254/latest/meta-data/ e obtém credenciais do ambiente de nuvem. Trata-se de:',
        options: [
          'Cross-Site Scripting (XSS) armazenado.',
          'Server-Side Request Forgery (SSRF).',
          'Cross-Site Request Forgery (CSRF).',
          'Injeção de comandos de sistema operacional.',
          'Path traversal.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'Ataques web', tags: ['SSRF', 'OWASP', 'nuvem'],
        comment: 'O endereço 169.254.169.254 é o serviço de metadados de instâncias em AWS/Azure/GCP — alvo clássico de SSRF.',
        justification: 'No SSRF o atacante induz o servidor a fazer requisições em seu nome, alcançando recursos internos inacessíveis externamente. É o item A10 do OWASP Top 10 2021.',
      },
      {
        statement: 'Sobre a defesa contra injeção de SQL em aplicações, a medida mais efetiva é:',
        options: [
          'Ocultar as mensagens de erro do banco de dados.',
          'Utilizar consultas parametrizadas (prepared statements) com vinculação de variáveis.',
          'Remover as aspas simples da entrada do usuário.',
          'Limitar o tamanho dos campos do formulário no navegador.',
          'Utilizar o método POST em vez de GET.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'facil',
        subtopic: 'Injeção', tags: ['SQLi', 'OWASP', 'desenvolvimento seguro'],
        comment: 'As demais são medidas de superfície: reduzem ruído, mas não separam código de dado.',
        justification: 'Consultas parametrizadas separam estruturalmente o comando SQL dos dados, tornando a injeção inviável. Validação no cliente é contornável; ocultar erros apenas dificulta o SQLi baseado em erro (resta o blind/time-based).',
      },
      {
        statement: 'No processo de gestão de vulnerabilidades, considere: a vulnerabilidade A tem CVSS 9,8, mas não há exploração conhecida; a vulnerabilidade B tem CVSS 7,2 e consta no catálogo KEV da CISA, afetando um servidor exposto à internet. A priorização mais adequada, sob a ótica de risco, é:',
        options: [
          'Corrigir apenas A, por possuir maior escore CVSS.',
          'Corrigir B primeiro, pois há exploração ativa comprovada em ativo exposto, o que eleva a probabilidade de materialização do risco.',
          'Corrigir ambas simultaneamente, pois o CVSS é o único critério válido.',
          'Aceitar ambos os riscos, uma vez que nenhuma alcança o escore 10.',
          'Corrigir A e aceitar B, pois o escore de B é inferior a 8,0.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'dificil',
        subtopic: 'Gestão de vulnerabilidades', tags: ['CVSS', 'KEV', 'priorização'],
        comment: 'CVSS mede severidade técnica, não risco. Risco combina severidade, probabilidade de exploração (EPSS/KEV) e contexto do ativo.',
        justification: 'A presença no catálogo KEV indica exploração ativa in the wild; somada à exposição na internet, isso eleva a probabilidade. A priorização baseada apenas no escore base do CVSS é uma das falhas mais comuns em programas de gestão de vulnerabilidades.',
      },
    ],
  },

  {
    subject: 'Firewalls, Proxies e VPNs',
    summary: `
<h1>Firewalls, proxies e VPNs</h1>

<h2>1. Gerações de firewall</h2>
<table><tbody>
<tr><td><strong>Filtro de pacotes (stateless)</strong></td><td>Camadas 3/4. Avalia cada pacote isoladamente. Rápido, mas não entende sessão</td></tr>
<tr><td><strong>Stateful inspection</strong></td><td>Mantém <strong>tabela de estados</strong> das conexões; permite retorno automático do tráfego estabelecido</td></tr>
<tr><td><strong>Proxy / gateway de aplicação</strong></td><td>Camada 7; termina a conexão e reabre em nome do cliente</td></tr>
<tr><td><strong>NGFW</strong></td><td>Stateful + <strong>identificação de aplicação</strong> independente de porta + <strong>identidade de usuário</strong> + IPS + inspeção TLS + filtragem de URL</td></tr>
<tr><td><strong>WAF</strong></td><td>Específico para <strong>HTTP/HTTPS</strong>: protege contra SQLi, XSS, etc. Modelos positivo (allowlist) e negativo (assinaturas)</td></tr>
</tbody></table>
<div data-callout="info"><p>Firewall <strong>não</strong> substitui WAF nem antivírus. NGFW e WAF atuam em camadas diferentes: NGFW controla <em>quem fala com quem</em>; WAF entende a <em>semântica da requisição HTTP</em>.</p></div>

<h2>2. Política e regras</h2>
<ul>
<li>Postura recomendada: <strong>deny all</strong> como regra padrão (default deny) e liberação explícita;</li>
<li>Ordem das regras importa — a primeira que casa é aplicada;</li>
<li><strong>Implicit deny</strong> ao final da ACL;</li>
<li>Revisão periódica de regras órfãs, sombreadas (shadowed) e redundantes.</li>
</ul>

<h2>3. Proxies</h2>
<table><tbody>
<tr><td><strong>Forward proxy</strong></td><td>Protege e controla os <strong>clientes</strong> saindo para a internet: filtragem de URL, cache, DLP, inspeção TLS</td></tr>
<tr><td><strong>Reverse proxy</strong></td><td>Fica na frente dos <strong>servidores</strong>: balanceamento, terminação TLS, cache, ocultação da topologia; base do WAF</td></tr>
<tr><td><strong>Proxy transparente</strong></td><td>Sem configuração no cliente (redirecionamento no gateway)</td></tr>
<tr><td><strong>SOCKS</strong></td><td>Proxy genérico de circuito (camada 5), agnóstico ao protocolo</td></tr>
</tbody></table>

<h2>4. VPN — IPsec</h2>
<ul>
<li><strong>Modos</strong>: <em>transporte</em> (cifra apenas o payload, host-a-host) e <em>túnel</em> (encapsula o pacote IP inteiro, gateway-a-gateway) — <strong>site-to-site usa modo túnel</strong>.</li>
<li><strong>Protocolos</strong>: <strong>AH</strong> (protocolo 51) = integridade e autenticação, <strong>sem confidencialidade</strong>; <strong>ESP</strong> (protocolo 50) = confidencialidade + integridade + autenticação.</li>
<li><strong>IKE</strong> (UDP 500; NAT-T em UDP 4500): fase 1 estabelece o canal seguro (ISAKMP SA), fase 2 negocia as SAs de dados. Usa <strong>Diffie-Hellman</strong> — daí o <strong>PFS</strong>.</li>
<li><strong>SA</strong> é unidirecional; identificada pelo <strong>SPI</strong>.</li>
<li><strong>AH quebra com NAT</strong> (protege o cabeçalho IP) — por isso NAT-T encapsula ESP em UDP.</li>
</ul>

<h2>5. VPN — SSL/TLS</h2>
<p>Opera sobre TCP 443, atravessa firewalls com facilidade. Modalidades: <strong>portal</strong> (clientless, via navegador), <strong>túnel</strong> (cliente instalado, acesso amplo) e <strong>aplicação/proxy</strong>. Comparativo típico de prova:</p>
<table><tbody>
<tr><td></td><td><strong>IPsec</strong></td><td><strong>SSL/TLS</strong></td></tr>
<tr><td>Camada</td><td>Rede (3)</td><td>Sessão/Transporte (4–5)</td></tr>
<tr><td>Uso típico</td><td>Site-to-site</td><td>Acesso remoto de usuário</td></tr>
<tr><td>Cliente</td><td>Requer cliente/config</td><td>Pode ser clientless</td></tr>
<tr><td>NAT/firewall</td><td>Problemático (NAT-T)</td><td>Transparente (443)</td></tr>
<tr><td>Granularidade</td><td>Toda a rede</td><td>Por aplicação</td></tr>
</tbody></table>

<h2>6. Evolução: ZTNA, SASE e SSE</h2>
<p><strong>ZTNA</strong> substitui a VPN tradicional dando acesso por <em>aplicação</em>, não por rede, após verificação contínua de identidade e postura. <strong>SASE</strong> = SD-WAN + segurança em nuvem (SWG + CASB + ZTNA + FWaaS). <strong>SSE</strong> é o subconjunto de segurança do SASE, sem a parte de rede.</p>

<h2>Erros clássicos de prova</h2>
<ol>
<li>Dizer que AH oferece confidencialidade — <strong>não oferece</strong>.</li>
<li>Trocar modo transporte por modo túnel em VPN site-to-site.</li>
<li>Afirmar que firewall stateful inspeciona conteúdo de aplicação — quem faz isso é NGFW/proxy/WAF.</li>
<li>Confundir forward com reverse proxy.</li>
</ol>
`,
    questions: [
      {
        statement: 'A respeito do conjunto de protocolos IPsec, assinale a alternativa correta.',
        options: [
          'O protocolo AH (Authentication Header) fornece confidencialidade, integridade e autenticação da origem.',
          'O protocolo ESP (Encapsulating Security Payload) fornece confidencialidade, além de integridade e autenticação da origem.',
          'O modo transporte é o utilizado em VPNs site-to-site entre gateways.',
          'As associações de segurança (SA) são bidirecionais e identificadas pelo endereço MAC.',
          'O IKE dispensa o algoritmo Diffie-Hellman na negociação de chaves.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'IPsec', tags: ['VPN', 'IPsec', 'ESP', 'AH'],
        comment: 'AH x ESP é a pergunta mais frequente sobre IPsec. AH = sem cifra.',
        justification: 'O ESP (protocolo 50) provê confidencialidade; o AH (protocolo 51) não. Site-to-site usa modo túnel. As SAs são unidirecionais e identificadas pelo SPI. O IKE usa Diffie-Hellman, o que viabiliza o PFS.',
      },
      {
        statement: 'Um servidor é posicionado à frente de um conjunto de servidores web internos, terminando as conexões TLS, distribuindo a carga e ocultando a topologia interna. Esse componente é um:',
        options: ['Forward proxy.', 'Reverse proxy.', 'Firewall stateless.', 'Servidor RADIUS.', 'Proxy SOCKS.'],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'facil',
        subtopic: 'Proxies', tags: ['reverse proxy', 'WAF', 'arquitetura'],
        comment: 'Regra prática: forward protege quem sai; reverse protege quem recebe.',
        justification: 'O reverse proxy atua em nome dos servidores, recebendo requisições dos clientes externos. É a base arquitetural de WAFs e balanceadores de camada 7.',
      },
      {
        statement: 'Sobre a diferença entre um NGFW e um WAF, assinale a alternativa correta.',
        options: [
          'São sinônimos: ambos inspecionam requisições HTTP em busca de SQL injection.',
          'O NGFW identifica aplicações e usuários e aplica políticas de rede, enquanto o WAF é especializado na proteção de aplicações web contra ataques como SQLi e XSS.',
          'O WAF opera exclusivamente nas camadas 3 e 4 do modelo OSI.',
          'O NGFW substitui integralmente a necessidade de um WAF.',
          'O WAF é um firewall stateless posicionado na borda da rede.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'Firewalls', tags: ['NGFW', 'WAF'],
        comment: 'Camadas complementares: um controla o fluxo, o outro entende a semântica da aplicação.',
        justification: 'O WAF opera na camada 7 e conhece a estrutura de requisições HTTP; o NGFW agrega identificação de aplicação, identidade e IPS às funções de firewall stateful, mas não substitui a proteção especializada de aplicações web.',
      },
    ],
  },

  {
    subject: 'Segurança Física e Lógica',
    summary: `
<h1>Segurança física e lógica dos ativos de TI</h1>

<h2>1. Segurança física em camadas</h2>
<p><strong>Dissuadir → Retardar → Detectar → Responder</strong>. Perímetro externo (cercas, iluminação, barreiras veiculares) → perímetro do edifício (recepção, catracas, <strong>mantrap/eclusa</strong>) → sala segura → rack.</p>
<ul>
<li><strong>Mantrap (eclusa/gaiola)</strong> — porta dupla intertravada; combate <strong>tailgating/piggybacking</strong>;</li>
<li><strong>CFTV</strong> — controle detectivo e dissuasivo; atenção à LGPD (base legal, aviso, retenção);</li>
<li><strong>Mesa limpa e tela limpa</strong> (ISO 27002, 7.7);</li>
<li><strong>Áreas de entrega e carregamento</strong> segregadas das áreas seguras;</li>
<li><strong>Descarte seguro</strong>: fragmentação (shredding), desmagnetização (<strong>degaussing</strong>, não funciona em SSD), destruição física, <strong>sanitização criptográfica</strong> (crypto erase) para SSD.</li>
</ul>

<h2>2. Data center — infraestrutura</h2>
<table><tbody>
<tr><td><strong>Energia</strong></td><td>Alimentação redundante (A/B), <strong>no-break (UPS)</strong> para transição, <strong>gerador</strong> para longa duração, aterramento</td></tr>
<tr><td><strong>Climatização</strong></td><td>Controle de temperatura e umidade; <strong>corredor quente / corredor frio</strong> com contenção</td></tr>
<tr><td><strong>Incêndio</strong></td><td>Detecção precoce (VESDA); supressão por <strong>agente limpo</strong> (FM-200, Novec 1230, inergen) — não use água em sala de equipamentos</td></tr>
<tr><td><strong>Classificação Uptime</strong></td><td>Tier I (básico) · Tier II (componentes redundantes) · <strong>Tier III (manutenção concorrente, N+1, ~99,982%)</strong> · <strong>Tier IV (tolerante a falhas, 2N/2N+1, ~99,995%)</strong></td></tr>
</tbody></table>

<h2>3. Segurança lógica</h2>
<ul>
<li><strong>Identificação → autenticação → autorização → auditoria (IAAA)</strong>;</li>
<li>Fatores de autenticação: <strong>o que você sabe</strong> (senha, PIN), <strong>o que você tem</strong> (token, smartcard), <strong>o que você é</strong> (biometria). Fatores complementares: onde você está, o que você faz (comportamento);</li>
<li><strong>MFA</strong> exige fatores de <strong>categorias diferentes</strong> — senha + pergunta secreta <strong>não</strong> é MFA;</li>
<li>Modelos de controle de acesso: <strong>DAC</strong> (o dono define), <strong>MAC</strong> (rótulos e níveis, definido pelo sistema — ambientes militares), <strong>RBAC</strong> (por papel), <strong>ABAC</strong> (por atributos e contexto), <strong>RuBAC</strong> (por regras);</li>
<li>Biometria: métricas <strong>FAR</strong> (falsa aceitação — pior erro de segurança), <strong>FRR</strong> (falsa rejeição — pior erro de usabilidade) e <strong>CER/EER</strong> (ponto de igualdade; quanto <strong>menor</strong>, melhor o sistema).</li>
</ul>

<h2>4. Proteção do endpoint e da mídia</h2>
<p>Criptografia de disco (BitLocker, LUKS), <strong>TPM</strong> para armazenamento de chaves e <em>secure boot</em>, bloqueio de portas USB, MDM para dispositivos móveis, <strong>remote wipe</strong>, DLP para mídias removíveis.</p>

<h2>Erros clássicos de prova</h2>
<ol>
<li>Chamar de MFA a combinação de dois fatores da <strong>mesma</strong> categoria.</li>
<li>Achar que degaussing apaga SSD — não apaga (memória flash não é magnética).</li>
<li>Confundir FAR com FRR, ou dizer que CER alto é melhor.</li>
<li>Trocar MAC (mandatório, por rótulos) com DAC (discricionário, pelo proprietário).</li>
</ol>
`,
    questions: [
      {
        statement: 'Em um sistema biométrico, a métrica que indica a proporção de indivíduos não autorizados que são indevidamente aceitos e que representa o erro mais grave sob a ótica da segurança é a:',
        options: ['FRR (False Rejection Rate).', 'FAR (False Acceptance Rate).', 'CER (Crossover Error Rate).', 'FTE (Failure to Enroll).', 'EER invertida.'],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'Biometria', tags: ['autenticação', 'biometria', 'FAR'],
        comment: 'FAR = tipo II (aceita quem não devia) — falha de segurança. FRR = tipo I (rejeita quem devia) — falha de usabilidade.',
        justification: 'A FAR mede aceitações indevidas de impostores. A CER é o ponto em que FAR e FRR se igualam e serve para comparar sistemas: quanto menor, melhor.',
      },
      {
        statement: 'Assinale a alternativa que caracteriza corretamente uma autenticação multifator (MFA).',
        options: [
          'Senha da rede seguida de resposta a uma pergunta secreta.',
          'Senha seguida de código gerado por aplicativo autenticador no smartphone do usuário.',
          'Duas senhas distintas, uma para o sistema operacional e outra para a aplicação.',
          'PIN de 4 dígitos seguido de PIN de 6 dígitos.',
          'Impressão digital seguida de leitura da íris.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'facil',
        subtopic: 'Autenticação', tags: ['MFA', 'IAM'],
        comment: 'Duas biometrias também não formam MFA: ambas são "o que você é".',
        justification: 'MFA exige fatores de categorias distintas. Senha ("o que você sabe") + código no dispositivo ("o que você tem") atende ao requisito. As demais combinam fatores da mesma categoria.',
      },
      {
        statement: 'Sobre o descarte seguro de mídias de armazenamento, assinale a alternativa correta.',
        options: [
          'A desmagnetização (degaussing) é o método mais indicado para unidades de estado sólido (SSD).',
          'A formatação rápida do sistema de arquivos é suficiente para inviabilizar a recuperação dos dados.',
          'Para SSDs, a sanitização criptográfica (crypto erase) ou a destruição física são métodos apropriados, pois o degaussing não é eficaz em memória flash.',
          'A sobrescrita de dados é ineficaz em discos rígidos magnéticos.',
          'O descarte de mídias não integra o escopo da segurança física.',
        ],
        correct: 2,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'Descarte de mídias', tags: ['sanitização', 'SSD', 'ISO 27002'],
        comment: 'Referência: NIST SP 800-88 (Guidelines for Media Sanitization) — clear, purge e destroy.',
        justification: 'SSDs armazenam dados em células flash, sem magnetismo, o que torna o degaussing inócuo. As técnicas adequadas são o crypto erase (destruição da chave de criptografia interna) e a destruição física.',
      },
    ],
  },

  {
    subject: 'Criptografia',
    summary: `
<h1>Criptografia</h1>

<h2>1. Simétrica x assimétrica</h2>
<table><tbody>
<tr><td></td><td><strong>Simétrica</strong></td><td><strong>Assimétrica</strong></td></tr>
<tr><td>Chaves</td><td>Uma chave secreta compartilhada</td><td>Par: pública e privada</td></tr>
<tr><td>Desempenho</td><td><strong>Rápida</strong> — usada para o volume de dados</td><td>Lenta — usada para chaves e assinaturas</td></tr>
<tr><td>Nº de chaves para n pessoas</td><td><strong>n(n−1)/2</strong></td><td>2n</td></tr>
<tr><td>Serviços</td><td>Confidencialidade (e integridade via MAC)</td><td>Confidencialidade, autenticidade, <strong>não repúdio</strong> e troca de chaves</td></tr>
<tr><td>Exemplos</td><td>AES, 3DES, ChaCha20, Blowfish, IDEA, RC4</td><td>RSA, ECC, ElGamal, DSA/ECDSA, Diffie-Hellman</td></tr>
</tbody></table>
<p><strong>Criptografia híbrida</strong>: assimétrica para transportar a chave de sessão; simétrica para os dados. É o que TLS, PGP e S/MIME fazem.</p>

<h2>2. Algoritmos que caem</h2>
<table><tbody>
<tr><td><strong>DES</strong></td><td>Bloco de 64 bits, chave de <strong>56 bits</strong> efetivos (64 com paridade), 16 rodadas Feistel. <strong>Inseguro</strong></td></tr>
<tr><td><strong>3DES</strong></td><td>EDE com 2 ou 3 chaves (112/168 bits). Descontinuado pelo NIST</td></tr>
<tr><td><strong>AES (Rijndael)</strong></td><td>Bloco de <strong>128 bits</strong>; chaves de <strong>128/192/256</strong> bits; <strong>10/12/14 rodadas</strong>. Rede de <strong>substituição-permutação</strong> (não é Feistel)</td></tr>
<tr><td><strong>RSA</strong></td><td>Fatoração de inteiros grandes. Cifra e assina</td></tr>
<tr><td><strong>ECC</strong></td><td>Logaritmo discreto em curvas elípticas. Chave de <strong>256 bits ≈ RSA de 3072 bits</strong></td></tr>
<tr><td><strong>Diffie-Hellman</strong></td><td>Só <strong>acordo de chaves</strong> — não cifra nem assina. Vulnerável a MITM sem autenticação</td></tr>
</tbody></table>

<h2>3. Modos de operação de cifra de bloco</h2>
<table><tbody>
<tr><td><strong>ECB</strong></td><td>Blocos independentes. <strong>Nunca use</strong>: blocos iguais geram cifras iguais (o "pinguim ECB")</td></tr>
<tr><td><strong>CBC</strong></td><td>XOR com o bloco cifrado anterior; usa <strong>IV</strong>. Propaga erro; não paralelizável na cifragem</td></tr>
<tr><td><strong>CFB / OFB</strong></td><td>Transformam a cifra de bloco em <strong>cifra de fluxo</strong></td></tr>
<tr><td><strong>CTR</strong></td><td>Contador + nonce; <strong>paralelizável</strong>, acesso aleatório</td></tr>
<tr><td><strong>GCM</strong></td><td>CTR + GMAC → <strong>AEAD</strong>: confidencialidade <em>e</em> autenticidade. Padrão em TLS 1.3</td></tr>
<tr><td><strong>XTS</strong></td><td>Criptografia de disco</td></tr>
</tbody></table>

<h2>4. Funções hash</h2>
<p>Propriedades: <strong>unidirecionalidade</strong> (resistência à pré-imagem), resistência à <strong>segunda pré-imagem</strong> e resistência a <strong>colisão</strong>. Saída de tamanho fixo; <strong>efeito avalanche</strong>.</p>
<table><tbody>
<tr><td><strong>MD5</strong></td><td>128 bits</td><td><strong>Quebrado</strong> (colisões práticas desde 2004)</td></tr>
<tr><td><strong>SHA-1</strong></td><td>160 bits</td><td><strong>Quebrado</strong> (SHAttered, 2017)</td></tr>
<tr><td><strong>SHA-2</strong></td><td>224/256/384/512</td><td>Seguro</td></tr>
<tr><td><strong>SHA-3 (Keccak)</strong></td><td>Construção <em>sponge</em></td><td>Seguro; alternativa estrutural ao SHA-2</td></tr>
</tbody></table>
<p>Para <strong>senhas</strong>, hash rápido é ruim: use <strong>bcrypt, scrypt, PBKDF2 ou Argon2</strong>, com <strong>salt</strong> (contra rainbow tables) e fator de custo. <strong>HMAC</strong> = hash com chave → integridade + autenticidade (mas <strong>não</strong> não repúdio, pois a chave é compartilhada).</p>

<h2>5. Assinatura digital</h2>
<p>Fluxo: hash da mensagem → cifrado com a <strong>chave privada do emissor</strong>. Verificação: decifra com a <strong>chave pública</strong> e compara com o hash recalculado. Garante <strong>autenticidade, integridade e não repúdio</strong> — <strong>não</strong> garante confidencialidade. Para confidencialidade, cifra-se com a <strong>chave pública do destinatário</strong>.</p>
<div data-callout="info"><p>Regra de ouro: <strong>cifrar para o destinatário = chave pública dele</strong>; <strong>assinar = sua chave privada</strong>.</p></div>

<h2>6. Outros conceitos</h2>
<ul>
<li><strong>PFS (Perfect Forward Secrecy)</strong>: chaves efêmeras (DHE/ECDHE) — comprometer a chave de longo prazo não revela sessões passadas;</li>
<li><strong>Tokens e smartcards</strong>: armazenam a chave privada; smartcard com chip criptográfico realiza a operação <em>internamente</em>, sem expor a chave. <strong>HSM</strong> faz o mesmo em escala corporativa, com certificação FIPS 140-2/3;</li>
<li><strong>Esteganografia</strong>: <em>oculta a existência</em> da mensagem (LSB em imagem, áudio, vídeo). Criptografia oculta o <em>conteúdo</em>. São complementares, não sinônimos. Detecção: <strong>esteganálise</strong>;</li>
<li><strong>Criptografia pós-quântica</strong>: o algoritmo de Shor ameaça RSA/ECC; Grover reduz a segurança simétrica pela metade (por isso AES-256). Padrões NIST 2024: <strong>ML-KEM (Kyber)</strong>, <strong>ML-DSA (Dilithium)</strong> e <strong>SLH-DSA (SPHINCS+)</strong>.</li>
</ul>

<h2>Erros clássicos de prova</h2>
<ol>
<li>Dizer que assinatura digital garante confidencialidade.</li>
<li>Afirmar que Diffie-Hellman cifra dados.</li>
<li>Chamar AES de cifra de Feistel (é SPN) ou dizer que tem bloco de 256 bits.</li>
<li>Dizer que HMAC oferece não repúdio.</li>
<li>Tratar esteganografia como tipo de criptografia.</li>
</ol>
`,
    questions: [
      {
        statement: 'Sobre o algoritmo AES (Advanced Encryption Standard), assinale a alternativa correta.',
        options: [
          'Utiliza blocos de 128 bits e chaves de 128, 192 ou 256 bits, com 10, 12 ou 14 rodadas, respectivamente.',
          'Utiliza estrutura de rede de Feistel, assim como o DES.',
          'Utiliza blocos de tamanho variável, iguais ao tamanho da chave.',
          'É um algoritmo assimétrico baseado na dificuldade de fatoração de números primos.',
          'Foi descontinuado pelo NIST em razão de colisões encontradas em 2017.',
        ],
        correct: 0,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'Cifras simétricas', tags: ['AES', 'criptografia simétrica'],
        comment: 'Bloco SEMPRE 128 bits. O que varia é a chave e, com ela, o número de rodadas.',
        justification: 'O AES (Rijndael) opera sobre blocos fixos de 128 bits, com chaves de 128/192/256 bits e 10/12/14 rodadas. Sua estrutura é de substituição-permutação (SPN), diferentemente do DES, que é Feistel.',
      },
      {
        statement: 'Ana deseja enviar um documento a Bruno de modo que apenas Bruno possa lê-lo e que Bruno tenha certeza de que o documento foi enviado por Ana e não sofreu alteração. Ana deve:',
        options: [
          'Cifrar o documento com a chave privada de Bruno e assinar com a chave pública de Ana.',
          'Cifrar o documento com a chave pública de Bruno e assinar o hash do documento com a chave privada de Ana.',
          'Cifrar o documento com a própria chave pública e assinar com a chave pública de Bruno.',
          'Cifrar e assinar o documento utilizando a mesma chave simétrica compartilhada.',
          'Apenas calcular o hash SHA-256 do documento e enviá-lo em anexo.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'Assinatura digital', tags: ['PKI', 'assinatura digital', 'RSA'],
        comment: 'Memorize: cifra-se com a pública de QUEM VAI LER; assina-se com a privada de QUEM ENVIA.',
        justification: 'A confidencialidade exige cifrar com a chave pública do destinatário (só a privada de Bruno decifra). A autenticidade, integridade e não repúdio exigem assinar o hash com a chave privada da emissora. A letra E não oferece autenticidade nem confidencialidade.',
      },
      {
        statement: 'O modo de operação de cifra de bloco que combina o modo contador com autenticação, provendo simultaneamente confidencialidade e autenticidade dos dados (AEAD), e adotado no TLS 1.3, é o:',
        options: ['ECB.', 'CBC.', 'OFB.', 'GCM.', 'XTS.'],
        correct: 3,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'Modos de operação', tags: ['GCM', 'AEAD', 'TLS'],
        comment: 'ECB é o distrator preferido da banca em questões sobre modo inseguro.',
        justification: 'O GCM (Galois/Counter Mode) une o modo CTR à autenticação GMAC, formando um esquema AEAD. O XTS é voltado à criptografia de disco; ECB não deve ser usado por preservar padrões do texto claro.',
      },
      {
        statement: 'A técnica que consiste em ocultar a própria existência de uma mensagem, inserindo-a em um arquivo portador como uma imagem ou áudio, é denominada:',
        options: ['Criptografia assimétrica.', 'Esteganografia.', 'Ofuscação de código.', 'Tokenização.', 'Hashing com salt.'],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'facil',
        subtopic: 'Esteganografia', tags: ['esteganografia'],
        comment: 'Criptografia esconde o conteúdo; esteganografia esconde a existência. A análise para detectá-la é a esteganálise.',
        justification: 'Esteganografia. A técnica mais conhecida é a substituição do bit menos significativo (LSB) dos pixels de uma imagem.',
      },
    ],
  },

  {
    subject: 'Softwares Maliciosos',
    summary: `
<h1>Softwares maliciosos (malware)</h1>

<h2>1. Taxonomia</h2>
<table><tbody>
<tr><td><strong>Vírus</strong></td><td>Precisa de <strong>hospedeiro</strong> e de ação do usuário para executar</td></tr>
<tr><td><strong>Worm</strong></td><td><strong>Autorreplicante</strong> e autônomo; propaga-se pela rede sem interação (WannaCry/EternalBlue)</td></tr>
<tr><td><strong>Trojan (cavalo de Troia)</strong></td><td>Disfarçado de software legítimo; <strong>não se autorreplica</strong></td></tr>
<tr><td><strong>Backdoor</strong></td><td>Acesso remoto persistente e não autorizado</td></tr>
<tr><td><strong>Rootkit</strong></td><td>Oculta a presença do atacante; atua em <strong>modo usuário, kernel, bootkit, hypervisor ou firmware</strong>. Difícil de detectar pelo próprio SO comprometido</td></tr>
<tr><td><strong>Spyware</strong></td><td>Coleta informações. Subtipos: <strong>keylogger</strong>, <strong>screenlogger</strong>, <strong>adware</strong>, stalkerware</td></tr>
<tr><td><strong>Ransomware</strong></td><td>Cifra dados e exige resgate</td></tr>
<tr><td><strong>Bot / Botnet</strong></td><td>Máquina zumbi sob comando de C2; usada em DDoS, spam, mineração</td></tr>
<tr><td><strong>Rogueware / Scareware</strong></td><td>Falso antivírus que induz o pagamento</td></tr>
<tr><td><strong>Fileless</strong></td><td>Vive em memória e abusa de ferramentas legítimas (PowerShell, WMI) — <em>living off the land</em></td></tr>
<tr><td><strong>Logic bomb</strong></td><td>Dispara em condição/data específica</td></tr>
</tbody></table>

<h2>2. Ransomware — anatomia atual</h2>
<ol>
<li><strong>Acesso inicial</strong>: phishing, RDP exposto, credencial vazada, exploração de VPN/edge;</li>
<li><strong>Reconhecimento e movimentação lateral</strong>: Mimikatz, PsExec, Cobalt Strike;</li>
<li><strong>Escalada</strong> até Domain Admin;</li>
<li><strong>Exfiltração</strong> — <strong>dupla extorsão</strong> (vazamento + cifragem); há ainda tripla (DDoS) e quádrupla (contato com clientes e reguladores);</li>
<li><strong>Destruição de backups e shadow copies</strong>;</li>
<li><strong>Cifragem</strong> — normalmente híbrida: AES para arquivos, RSA para a chave AES;</li>
<li><strong>Nota de resgate</strong> e negociação.</li>
</ol>
<p><strong>RaaS</strong> (Ransomware as a Service): afiliados usam a plataforma e dividem o lucro com o operador.</p>

<h2>3. Defesas</h2>
<table><tbody>
<tr><td><strong>Backup 3-2-1-1-0</strong></td><td>3 cópias, 2 mídias, 1 fora do site, <strong>1 imutável/offline (air gap)</strong>, <strong>0 erros na restauração testada</strong></td></tr>
<tr><td><strong>EDR/XDR</strong></td><td>Detecção comportamental, isolamento do host, rollback</td></tr>
<tr><td><strong>Segmentação</strong></td><td>Limita a movimentação lateral</td></tr>
<tr><td><strong>MFA</strong></td><td>Corta o acesso inicial por credencial vazada</td></tr>
<tr><td><strong>Patching e desativação de serviços expostos</strong></td><td>RDP e SMB nunca na internet</td></tr>
<tr><td><strong>Menor privilégio e LAPS</strong></td><td>Sem admin local reutilizado</td></tr>
<tr><td><strong>Application allowlisting</strong></td><td>Bloqueia binários não aprovados</td></tr>
</tbody></table>

<h2>4. Técnicas de detecção antimalware</h2>
<ul>
<li><strong>Assinatura</strong> — precisa, mas cega para variantes e zero-day;</li>
<li><strong>Heurística</strong> — regras sobre características suspeitas;</li>
<li><strong>Comportamental</strong> — observa ações em execução (base do EDR);</li>
<li><strong>Sandbox</strong> — detonação em ambiente isolado; malware moderno faz <em>sandbox evasion</em>;</li>
<li><strong>Aprendizado de máquina</strong> e reputação de arquivo/domínio;</li>
<li><strong>Integridade de arquivos (FIM)</strong>.</li>
</ul>
<p>Técnicas de evasão do malware: <strong>polimorfismo</strong> (muda a forma cifrando-se com chaves diferentes), <strong>metamorfismo</strong> (reescreve o próprio código), packing/ofuscação, anti-VM, <strong>process hollowing</strong>, DLL injection, timestomping.</p>

<h2>Erros clássicos de prova</h2>
<ol>
<li>Chamar worm de vírus — worm <strong>não</strong> precisa de hospedeiro nem de ação do usuário.</li>
<li>Dizer que trojan se autorreplica.</li>
<li>Achar que backup comum protege contra ransomware — precisa ser <strong>imutável/offline</strong> e testado.</li>
<li>Confundir polimorfismo (cifra-se) com metamorfismo (reescreve-se).</li>
</ol>
`,
    questions: [
      {
        statement: 'Assinale a alternativa que distingue corretamente vírus e worm.',
        options: [
          'Ambos necessitam de um arquivo hospedeiro para se propagar.',
          'O vírus necessita de um hospedeiro e, em geral, de ação do usuário, enquanto o worm é autorreplicante e propaga-se autonomamente pela rede.',
          'O worm necessita de hospedeiro, enquanto o vírus se propaga de forma autônoma.',
          'Ambos são subtipos de cavalo de Troia.',
          'O worm, por definição, sempre cifra os arquivos da vítima.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'facil',
        subtopic: 'Taxonomia de malware', tags: ['vírus', 'worm'],
        comment: 'WannaCry é o exemplo canônico de worm-ransomware: propagou-se sozinho via SMB (EternalBlue).',
        justification: 'A autorreplicação autônoma é a característica definidora do worm; o vírus depende de hospedeiro e, tipicamente, de execução pelo usuário.',
      },
      {
        statement: 'Uma organização foi vítima de ransomware. Além da cifragem dos arquivos, o grupo criminoso ameaça publicar dados sensíveis exfiltrados antes da cifragem. Essa prática é conhecida como:',
        options: ['Ataque de força bruta.', 'Dupla extorsão.', 'Ataque de dia zero.', 'Envenenamento de cache.', 'Ataque de repetição (replay).'],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'facil',
        subtopic: 'Ransomware', tags: ['ransomware', 'extorsão', 'LGPD'],
        comment: 'Em dupla extorsão o backup deixa de ser suficiente: há incidente de segurança com dados pessoais, com dever de comunicação à ANPD (art. 48 da LGPD).',
        justification: 'A dupla extorsão combina a indisponibilidade (cifragem) com a ameaça de vazamento dos dados exfiltrados, pressionando a vítima mesmo quando há backup íntegro.',
      },
      {
        statement: 'Sobre a estratégia de backup recomendada como defesa contra ransomware, assinale a alternativa correta.',
        options: [
          'Basta manter uma cópia diária em compartilhamento de rede acessível ao servidor de arquivos.',
          'A regra 3-2-1-1-0 recomenda 3 cópias, em 2 mídias diferentes, 1 fora do site, 1 imutável ou offline e 0 erros na verificação de restauração.',
          'Backups incrementais dispensam testes de restauração.',
          'A retenção de backups deve ser a menor possível para reduzir a superfície de ataque.',
          'Backups em nuvem são imunes a ransomware por padrão.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'Backup e recuperação', tags: ['backup', 'ransomware', 'resiliência'],
        comment: 'Ransomware moderno procura e apaga backups acessíveis pela rede e shadow copies. Imutabilidade e air gap são o que sustenta a recuperação.',
        justification: 'A regra 3-2-1-1-0 acrescenta à clássica 3-2-1 a exigência de uma cópia imutável ou offline e a verificação de que a restauração ocorre sem erros. Backups acessíveis por rede a partir do host comprometido são alvo preferencial.',
      },
    ],
  },

  {
    subject: 'IDS, IPS e SIEM',
    summary: `
<h1>IDS, IPS e SIEM</h1>

<h2>1. IDS x IPS</h2>
<table><tbody>
<tr><td></td><td><strong>IDS</strong></td><td><strong>IPS</strong></td></tr>
<tr><td>Posição</td><td><strong>Fora de linha</strong> (out-of-band), recebe cópia via SPAN/TAP</td><td><strong>Em linha</strong> (in-line), o tráfego atravessa</td></tr>
<tr><td>Ação</td><td>Detecta e <strong>alerta</strong></td><td>Detecta e <strong>bloqueia/descarta</strong></td></tr>
<tr><td>Impacto no tráfego</td><td>Nenhum (não introduz latência nem ponto único de falha)</td><td>Latência; falha pode derrubar a rede (fail-open x fail-closed)</td></tr>
<tr><td>Risco do falso positivo</td><td>Alerta indevido</td><td><strong>Bloqueio de tráfego legítimo</strong></td></tr>
</tbody></table>
<p><strong>Por localização</strong>: <strong>NIDS/NIPS</strong> (rede) e <strong>HIDS/HIPS</strong> (host — monitora logs, integridade de arquivos, chamadas de sistema). Exemplos: Snort, Suricata, Zeek (NIDS); OSSEC/Wazuh (HIDS).</p>

<h2>2. Métodos de detecção</h2>
<table><tbody>
<tr><td><strong>Por assinatura</strong> (knowledge-based)</td><td>Compara com padrões conhecidos</td><td>Poucos falsos positivos; <strong>não detecta zero-day</strong></td></tr>
<tr><td><strong>Por anomalia</strong> (behavior-based)</td><td>Compara com uma <strong>linha de base</strong> do comportamento normal</td><td>Detecta o desconhecido; <strong>muitos falsos positivos</strong>; exige período de aprendizado</td></tr>
<tr><td><strong>Por análise de protocolo com estado</strong></td><td>Compara com perfis de uso normal do protocolo definidos pelo fabricante</td><td>Intermediário</td></tr>
<tr><td><strong>Honeypot / honeynet</strong></td><td>Isca deliberada para estudar o atacante</td><td>Baixíssimo falso positivo — qualquer acesso é suspeito</td></tr>
</tbody></table>

<h2>3. Matriz de erros (cai sempre)</h2>
<table><tbody>
<tr><td><strong>Verdadeiro positivo</strong></td><td>Ataque real → alerta gerado</td></tr>
<tr><td><strong>Falso positivo</strong></td><td>Tráfego legítimo → alerta gerado (ruído, fadiga de alerta)</td></tr>
<tr><td><strong>Verdadeiro negativo</strong></td><td>Tráfego legítimo → sem alerta</td></tr>
<tr><td><strong>Falso negativo</strong></td><td>Ataque real → <strong>sem alerta</strong>. É o <strong>mais perigoso</strong></td></tr>
</tbody></table>
<p>Técnicas de evasão de IDS/IPS: fragmentação, sobreposição de fragmentos, ofuscação/codificação, inserção e evasão de TTL, <strong>tráfego cifrado</strong> (exige inspeção TLS ou análise de metadados/JA3), tunelamento.</p>

<h2>4. SIEM</h2>
<p><strong>Security Information and Event Management</strong> = SIM (armazenamento, análise histórica, relatórios de conformidade) + SEM (monitoramento em tempo real, correlação, alerta).</p>
<p><strong>Pipeline</strong>: coleta (agentes, syslog, API) → <strong>normalização e parsing</strong> → enriquecimento (ativo, usuário, threat intel, geo) → <strong>correlação</strong> por regras/estatística/ML → alerta → <strong>caso/investigação</strong> → resposta (com SOAR) → retenção e relatório.</p>
<ul>
<li><strong>Sincronização de tempo (NTP)</strong> é pré-requisito: sem relógios alinhados, a correlação e a linha do tempo forense ficam inválidas;</li>
<li><strong>Integridade e retenção dos logs</strong>: armazenamento WORM, hash, controle de acesso — o atacante tenta apagar rastros;</li>
<li>Casos de uso típicos: força bruta, viagem impossível, elevação de privilégio, exfiltração, acesso fora de horário, comunicação com C2 conhecido;</li>
<li>Métricas do SOC: <strong>MTTD</strong> (detecção), <strong>MTTR</strong> (resposta), taxa de falsos positivos, cobertura MITRE ATT&amp;CK;</li>
<li>Evoluções: <strong>UEBA</strong> (comportamento de usuários e entidades), <strong>SOAR</strong> (orquestração e automação), <strong>XDR</strong> (telemetria integrada de endpoint, rede, nuvem e identidade), <em>data lake</em> de segurança.</li>
</ul>

<h2>Erros clássicos de prova</h2>
<ol>
<li>Dizer que o IDS bloqueia o ataque — quem bloqueia é o <strong>IPS</strong>.</li>
<li>Afirmar que detecção por assinatura identifica zero-day.</li>
<li>Confundir falso positivo com falso negativo.</li>
<li>Tratar SIEM como ferramenta de <em>prevenção</em> — ele é de <strong>detecção, correlação e resposta</strong>.</li>
<li>Esquecer que IPS in-line introduz latência e ponto único de falha.</li>
</ol>
`,
    questions: [
      {
        statement: 'Um dispositivo de segurança foi instalado recebendo uma cópia do tráfego por meio de uma porta espelhada (SPAN) do switch. Ele identifica atividades suspeitas e gera alertas, mas não interrompe as conexões. Trata-se de um:',
        options: ['IPS de rede em modo in-line.', 'IDS de rede (NIDS).', 'Firewall stateful.', 'Proxy reverso.', 'HIPS.'],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'facil',
        subtopic: 'IDS x IPS', tags: ['IDS', 'NIDS', 'SPAN'],
        comment: 'A pista é sempre a topologia: cópia do tráfego = IDS; tráfego atravessa = IPS.',
        justification: 'O NIDS opera out-of-band, a partir de porta espelhada ou TAP, apenas detectando e alertando. O IPS precisa estar em linha para poder descartar pacotes.',
      },
      {
        statement: 'Em um sistema de detecção de intrusão, a situação em que um ataque efetivamente ocorre mas nenhum alerta é gerado é classificada como:',
        options: ['Verdadeiro positivo.', 'Falso positivo.', 'Verdadeiro negativo.', 'Falso negativo.', 'Alerta correlacionado.'],
        correct: 3,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'facil',
        subtopic: 'Métricas de detecção', tags: ['IDS', 'falso negativo'],
        comment: 'Falso negativo é o pior cenário: o ataque passa despercebido. Reduzir falsos positivos de forma agressiva costuma aumentar os falsos negativos.',
        justification: 'Falso negativo é a ausência de alerta diante de um evento malicioso real.',
      },
      {
        statement: 'Sobre a detecção baseada em anomalia em comparação à detecção baseada em assinatura, assinale a alternativa correta.',
        options: [
          'A detecção por anomalia gera menos falsos positivos que a detecção por assinatura.',
          'A detecção por assinatura é capaz de identificar ataques de dia zero por meio de análise estatística.',
          'A detecção por anomalia exige o estabelecimento de uma linha de base do comportamento normal e é capaz de identificar ameaças previamente desconhecidas, ao custo de maior taxa de falsos positivos.',
          'Ambas dependem exclusivamente de bases de assinaturas atualizadas.',
          'A detecção por anomalia é inaplicável a sistemas baseados em host.',
        ],
        correct: 2,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'Métodos de detecção', tags: ['anomalia', 'assinatura', 'IDS'],
        comment: 'É o trade-off central da detecção: cobertura do desconhecido versus ruído operacional.',
        justification: 'A detecção por anomalia compara o tráfego com um baseline aprendido, o que permite identificar ataques inéditos, mas produz mais alertas indevidos. A detecção por assinatura é precisa apenas para o que já é conhecido.',
      },
      {
        statement: 'A respeito de uma solução de SIEM, assinale a alternativa correta.',
        options: [
          'Sua principal função é bloquear preventivamente conexões maliciosas na borda da rede.',
          'Realiza coleta, normalização, enriquecimento e correlação de eventos de múltiplas fontes, apoiando detecção, investigação e conformidade.',
          'Dispensa a sincronização de relógios entre as fontes de log, pois normaliza automaticamente os fusos.',
          'Substitui integralmente as funções de EDR e de firewall.',
          'Armazena os eventos apenas em memória volátil, para garantir desempenho.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'SIEM', tags: ['SIEM', 'SOC', 'correlação'],
        comment: 'Sem NTP não existe correlação confiável: dois eventos do mesmo ataque parecem não relacionados se os relógios divergem.',
        justification: 'O SIEM é solução de detecção, correlação e apoio à resposta, não de bloqueio preventivo. A sincronização temporal via NTP é pré-requisito para correlação e para a validade da linha do tempo forense.',
      },
    ],
  },
];
