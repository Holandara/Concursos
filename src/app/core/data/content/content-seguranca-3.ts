import { SubjectContent } from './content-types';

/* eslint-disable max-len */

/**
 * Segurança da Informação — bloco 3: inteligência de ameaças, ofensiva,
 * frameworks adversariais, IoT, programação, direito digital, containers,
 * blockchain e Microsoft 365.
 */
export const CONTENT_SEGURANCA_3: SubjectContent[] = [
  {
    subject: 'Threat Intelligence e Threat Hunting',
    summary: `
<h1>Threat Intelligence e Threat Hunting</h1>

<h2>1. Níveis de inteligência de ameaças</h2>
<table><tbody>
<tr><td><strong>Estratégica</strong></td><td>Alta direção</td><td>Tendências, motivação de adversários, risco setorial, apoio a decisão de investimento. Longo prazo, sem tecnicidade</td></tr>
<tr><td><strong>Tática</strong></td><td>Arquitetos e defensores</td><td><strong>TTPs</strong> — táticas, técnicas e procedimentos. Orienta controles e detecções</td></tr>
<tr><td><strong>Operacional</strong></td><td>SOC e resposta</td><td>Campanhas específicas, atores, infraestrutura, intenção e timing</td></tr>
<tr><td><strong>Técnica</strong></td><td>Ferramentas</td><td><strong>IoCs</strong>: hashes, IPs, domínios, URLs, mutex. Vida útil curta</td></tr>
</tbody></table>

<h2>2. Ciclo de inteligência</h2>
<p><strong>Direção (requisitos) → Coleta → Processamento → Análise → Disseminação → Feedback.</strong> Sem requisitos definidos (PIRs), o programa vira apenas ingestão de feeds.</p>

<h2>3. Pirâmide da Dor (David Bianco)</h2>
<p>Da base (fácil para o atacante trocar) ao topo (custoso):</p>
<ol>
<li>Valores de hash — trivial;</li>
<li>Endereços IP — fácil;</li>
<li>Nomes de domínio — simples;</li>
<li>Artefatos de rede e de host — irritante;</li>
<li>Ferramentas — desafiador;</li>
<li><strong>TTPs — difícil</strong>: detectar comportamento obriga o adversário a mudar o modo de operar.</li>
</ol>
<div data-callout="info"><p>Conclusão prática: detecções baseadas em <strong>TTP</strong> (ATT&amp;CK) valem muito mais que listas de IoC, que expiram em dias.</p></div>

<h2>4. Padrões e fontes</h2>
<ul>
<li><strong>STIX</strong> — linguagem estruturada para descrever ameaças; <strong>TAXII</strong> — protocolo de transporte/compartilhamento;</li>
<li><strong>MISP</strong> — plataforma aberta de compartilhamento; <strong>OpenCTI</strong> — plataforma de TIP;</li>
<li><strong>Traffic Light Protocol (TLP)</strong>: <strong>RED</strong> (só para os destinatários nomeados) · <strong>AMBER</strong> (organização e clientes, com necessidade de saber; AMBER+STRICT restringe à própria organização) · <strong>GREEN</strong> (comunidade) · <strong>CLEAR</strong> (público, antigo WHITE);</li>
<li>Fontes: OSINT, feeds comerciais, ISACs setoriais, CTIR Gov, dark web, telemetria própria (a mais valiosa).</li>
</ul>

<h2>5. Threat hunting</h2>
<p>Busca <strong>proativa e iterativa</strong> por ameaças que <strong>escaparam</strong> dos controles automatizados. Premissa: assume-se a violação (<em>assume breach</em>).</p>
<table><tbody>
<tr><td><strong>Orientada por hipótese</strong></td><td>Parte de uma TTP do ATT&amp;CK ("um adversário usaria WMI para persistência — há sinais disso?")</td></tr>
<tr><td><strong>Orientada por IoC/IoA</strong></td><td>Parte de inteligência recebida</td></tr>
<tr><td><strong>Orientada por análise avançada</strong></td><td>Estatística, ML, detecção de outliers, <em>stacking</em> e <em>frequency analysis</em></td></tr>
<tr><td><strong>Orientada por entidade/joia da coroa</strong></td><td>Foco nos ativos mais críticos</td></tr>
</tbody></table>
<p>Modelo de maturidade (<strong>HMM</strong>, Sqrrl): HMM0 inicial (sem coleta) → HMM1 mínimo (coleta e uso de IoC) → HMM2 procedimental (segue procedimentos de terceiros) → HMM3 inovador (cria os próprios) → HMM4 líder (automatiza os bem-sucedidos, virando detecção).</p>
<p><strong>Resultado esperado da caçada</strong>: mesmo sem encontrar ameaça, deve gerar <strong>nova detecção</strong>, melhoria de visibilidade ou redução de superfície. Caçada que não vira detecção foi desperdiçada.</p>

<h2>6. Modelos de análise</h2>
<ul>
<li><strong>Cyber Kill Chain (Lockheed Martin)</strong> — 7 etapas: reconhecimento, armamento, entrega, exploração, instalação, comando e controle (C2), ações sobre objetivos;</li>
<li><strong>Diamond Model</strong> — quatro vértices: <strong>adversário, capacidade, infraestrutura e vítima</strong>;</li>
<li><strong>MITRE ATT&amp;CK</strong> — matriz de táticas e técnicas observadas no mundo real.</li>
</ul>

<h2>Erros clássicos de prova</h2>
<ol>
<li>Chamar hunting de atividade reativa — é <strong>proativa</strong>, parte da hipótese, não do alerta.</li>
<li>Confundir STIX (linguagem) com TAXII (transporte).</li>
<li>Trocar os níveis estratégico e técnico.</li>
<li>Achar que TLP:AMBER pode ser divulgado publicamente.</li>
</ol>
`,
    questions: [
      {
        statement: 'Na Pirâmide da Dor de David Bianco, o indicador cuja detecção impõe o maior custo de adaptação ao adversário é:',
        options: ['Valor de hash de arquivo.', 'Endereço IP.', 'Nome de domínio.', 'Táticas, técnicas e procedimentos (TTPs).', 'Artefato de rede.'],
        correct: 3,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'Pirâmide da Dor', tags: ['threat intel', 'TTP', 'IoC'],
        comment: 'Trocar um hash custa segundos ao atacante; mudar o modo de operar custa meses.',
        justification: 'As TTPs ocupam o topo da pirâmide: detectá-las obriga o adversário a reformular seu comportamento, ao contrário de hashes e endereços, que são descartáveis.',
      },
      {
        statement: 'Sobre threat hunting, assinale a alternativa correta.',
        options: [
          'É uma atividade reativa, iniciada exclusivamente a partir de alertas gerados pelo SIEM.',
          'É uma busca proativa e iterativa por ameaças que evadiram os controles automatizados, frequentemente conduzida a partir de hipóteses baseadas em TTPs.',
          'Substitui a necessidade de monitoramento contínuo e de detecção automatizada.',
          'Consiste na varredura automatizada de vulnerabilidades em ativos de rede.',
          'Só pode ser executada por meio de ferramentas comerciais de BAS.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'facil',
        subtopic: 'Threat hunting', tags: ['threat hunting', 'assume breach'],
        comment: 'A caçada parte da premissa de que o adversário já está dentro — por isso não espera alerta.',
        justification: 'O threat hunting é proativo e hipotético-dedutivo, complementando (não substituindo) a detecção automatizada. Toda caçada bem-sucedida deve resultar em nova regra de detecção.',
      },
      {
        statement: 'No compartilhamento de informações de inteligência de ameaças, o padrão que define a linguagem estruturada para descrever objetos como indicadores, campanhas e atores, e o protocolo utilizado para transportá-los são, respectivamente:',
        options: ['MISP e OpenCTI.', 'STIX e TAXII.', 'YARA e Sigma.', 'CVE e CVSS.', 'TLP e PIR.'],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'Padrões de compartilhamento', tags: ['STIX', 'TAXII'],
        comment: 'YARA descreve padrões de arquivos/malware; Sigma descreve regras de detecção em log. Nenhum dos dois é linguagem de CTI estruturada.',
        justification: 'STIX (Structured Threat Information eXpression) é a linguagem; TAXII (Trusted Automated eXchange of Intelligence Information) é o protocolo de transporte.',
      },
    ],
  },

  {
    subject: 'Testes de Penetração (Pentest)',
    summary: `
<h1>Testes de penetração (pentest)</h1>

<h2>1. Modalidades por conhecimento prévio</h2>
<table><tbody>
<tr><td><strong>Black box</strong></td><td>Sem informação. Simula atacante externo; maior tempo gasto em reconhecimento</td></tr>
<tr><td><strong>Gray box</strong></td><td>Informação parcial (credencial de usuário comum, documentação). Melhor custo-benefício</td></tr>
<tr><td><strong>White box / crystal box</strong></td><td>Acesso total: código, arquitetura, credenciais. Máxima cobertura</td></tr>
</tbody></table>
<p>Por conhecimento da equipe defensora: <strong>blind</strong> (só o pentester sabe pouco), <strong>double blind</strong> (a equipe de defesa não sabe do teste — mede a detecção real) e <strong>purple team</strong> (ataque e defesa colaboram em tempo real).</p>

<h2>2. Fases (PTES / EC-Council)</h2>
<ol>
<li><strong>Pré-engajamento</strong> — escopo, regras de engajamento, janela, contatos, <strong>autorização formal por escrito</strong> ("get out of jail card"). Sem isso, o teste é crime (art. 154-A do CP);</li>
<li><strong>Reconhecimento / Inteligência</strong> — passivo (OSINT, whois, DNS, redes sociais, vazamentos) e ativo (varredura, banner grabbing);</li>
<li><strong>Varredura e enumeração</strong> — portas, serviços, versões, usuários, compartilhamentos;</li>
<li><strong>Análise de vulnerabilidades</strong>;</li>
<li><strong>Exploração</strong> — obtenção de acesso;</li>
<li><strong>Pós-exploração</strong> — escalada de privilégio, movimentação lateral, persistência, exfiltração simulada;</li>
<li><strong>Relatório</strong> — sumário executivo, evidências, criticidade, PoC, recomendações e reteste;</li>
<li><strong>Limpeza</strong> — remoção de artefatos, contas e backdoors criados.</li>
</ol>

<h2>3. Ferramentas por fase</h2>
<table><tbody>
<tr><td>Reconhecimento</td><td>theHarvester, Maltego, Shodan, Amass, Recon-ng</td></tr>
<tr><td>Varredura</td><td><strong>Nmap</strong>, Masscan, Nessus, OpenVAS, Nuclei</td></tr>
<tr><td>Web</td><td><strong>Burp Suite</strong>, OWASP ZAP, sqlmap, ffuf/dirsearch, Nikto</td></tr>
<tr><td>Exploração</td><td><strong>Metasploit</strong>, Exploit-DB, searchsploit</td></tr>
<tr><td>Pós-exploração</td><td>Mimikatz, BloodHound, Impacket, Cobalt Strike, CrackMapExec</td></tr>
<tr><td>Senhas</td><td>Hashcat, John the Ripper, Hydra</td></tr>
<tr><td>Sem fio</td><td>Aircrack-ng, Kismet, Bettercap</td></tr>
<tr><td>Mobile</td><td>MobSF, Frida, Objection, apktool</td></tr>
</tbody></table>
<p>Varreduras Nmap frequentes em prova: <code>-sS</code> SYN/half-open (furtiva) · <code>-sT</code> connect · <code>-sU</code> UDP · <code>-sV</code> versão · <code>-O</code> SO · <code>-A</code> agressiva · <code>-Pn</code> sem ping.</p>

<h2>4. Metodologias e referências</h2>
<p><strong>PTES</strong>, <strong>OSSTMM</strong>, <strong>NIST SP 800-115</strong>, <strong>OWASP WSTG</strong> (web), <strong>OWASP MASTG/MASVS</strong> (mobile), <strong>OWASP API Security Top 10</strong>.</p>

<h2>5. Especificidades por alvo</h2>
<ul>
<li><strong>Web</strong>: OWASP Top 10, lógica de negócio, autenticação e sessão, upload, SSRF;</li>
<li><strong>API</strong>: <strong>BOLA/IDOR</strong> (nº 1 do API Top 10), autenticação quebrada, exposição excessiva de dados, falta de rate limiting, mass assignment;</li>
<li><strong>Infraestrutura</strong>: serviços expostos, credenciais padrão, patch, AD (Kerberoasting, AS-REP roasting, delegação, ACL);</li>
<li><strong>Mobile</strong>: armazenamento inseguro, <em>certificate pinning</em>, comunicação, ofuscação, root/jailbreak detection, chaves embutidas no APK/IPA.</li>
</ul>

<h2>6. Pentest x scanner x red team</h2>
<table><tbody>
<tr><td><strong>Scanner</strong></td><td>Automatizado, identifica, não explora, muitos falsos positivos</td></tr>
<tr><td><strong>Pentest</strong></td><td>Explora, escopo e prazo definidos, busca <strong>amplitude</strong> de vulnerabilidades</td></tr>
<tr><td><strong>Red team</strong></td><td>Objetivo específico ("chegar ao banco de dados X"), furtivo, longo, testa <strong>pessoas, processos e tecnologia</strong></td></tr>
</tbody></table>

<h2>Erros clássicos de prova</h2>
<ol>
<li>Achar que pentest dispensa autorização formal.</li>
<li>Confundir black box com double blind.</li>
<li>Dizer que scanner de vulnerabilidade explora falhas.</li>
<li>Esquecer a fase de <strong>limpeza</strong> dos artefatos.</li>
<li>Tratar pentest e red team como sinônimos.</li>
</ol>
`,
    questions: [
      {
        statement: 'Em um teste de intrusão, a modalidade em que a equipe de segurança defensiva da organização não é informada da realização do teste, permitindo avaliar sua capacidade real de detecção e resposta, é denominada:',
        options: ['White box.', 'Gray box.', 'Double blind.', 'Purple team.', 'Teste de conformidade.'],
        correct: 2,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'Modalidades', tags: ['pentest', 'red team', 'double blind'],
        comment: 'Black/gray/white classificam o que o ATACANTE sabe. Blind/double blind classificam o que a DEFESA sabe.',
        justification: 'No double blind (ou teste cego duplo) nem o pentester tem informações detalhadas nem a equipe defensiva é avisada, o que permite medir MTTD e MTTR reais.',
      },
      {
        statement: 'A fase do teste de intrusão em que são definidos escopo, janela de execução, regras de engajamento e obtida a autorização formal por escrito é:',
        options: ['Reconhecimento.', 'Pré-engajamento.', 'Exploração.', 'Pós-exploração.', 'Relatório.'],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'facil',
        subtopic: 'Fases do pentest', tags: ['PTES', 'autorização'],
        comment: 'Sem autorização escrita, a conduta se enquadra no art. 154-A do Código Penal. É o documento que separa o profissional do criminoso.',
        justification: 'O pré-engajamento (pre-engagement interactions, no PTES) formaliza escopo, limites, contatos de emergência e a autorização legal para a execução.',
      },
      {
        statement: 'No OWASP API Security Top 10, a falha em que a aplicação não verifica se o usuário autenticado tem permissão sobre o objeto específico requisitado, permitindo acessar dados de outros usuários pela simples alteração de um identificador, é a:',
        options: [
          'Broken Object Level Authorization (BOLA).',
          'Security Misconfiguration.',
          'Injection.',
          'Unrestricted Resource Consumption.',
          'Server Side Request Forgery.',
        ],
        correct: 0,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'Pentest de API', tags: ['API', 'BOLA', 'IDOR', 'OWASP'],
        comment: 'BOLA é a versão de API do IDOR e ocupa o primeiro lugar do API Security Top 10 desde 2019.',
        justification: 'BOLA ocorre quando o controle de autorização por objeto não é aplicado no servidor, permitindo que o usuário troque o identificador na requisição e acesse recursos alheios.',
      },
    ],
  },

  {
    subject: 'Modelagem de Ameaças',
    summary: `
<h1>Modelagem de ameaças</h1>

<h2>1. As quatro perguntas (Shostack)</h2>
<ol>
<li><strong>No que estamos trabalhando?</strong> — diagrama de fluxo de dados (DFD), ativos, fronteiras de confiança;</li>
<li><strong>O que pode dar errado?</strong> — enumeração de ameaças (STRIDE, árvores de ataque, ATT&amp;CK);</li>
<li><strong>O que vamos fazer a respeito?</strong> — mitigar, transferir, eliminar ou aceitar;</li>
<li><strong>Fizemos um bom trabalho?</strong> — validação e revisão.</li>
</ol>
<p>Melhor momento: <strong>fase de design</strong> — antes de escrever o código. É a prática mais barata do S-SDLC.</p>

<h2>2. STRIDE — a estrela do edital</h2>
<table><tbody>
<tr><td><strong>S</strong>poofing (falsificação de identidade)</td><td>Viola <strong>autenticidade</strong></td><td>Mitigação: autenticação forte, MFA, certificados</td></tr>
<tr><td><strong>T</strong>ampering (adulteração)</td><td>Viola <strong>integridade</strong></td><td>Hash, assinatura digital, controle de acesso, validação</td></tr>
<tr><td><strong>R</strong>epudiation (repúdio)</td><td>Viola o <strong>não repúdio</strong></td><td>Logs seguros, trilha de auditoria, assinatura digital, carimbo do tempo</td></tr>
<tr><td><strong>I</strong>nformation Disclosure (divulgação indevida)</td><td>Viola <strong>confidencialidade</strong></td><td>Criptografia, controle de acesso, mascaramento</td></tr>
<tr><td><strong>D</strong>enial of Service</td><td>Viola <strong>disponibilidade</strong></td><td>Rate limiting, quotas, escalabilidade, filtragem, CDN/anti-DDoS</td></tr>
<tr><td><strong>E</strong>levation of Privilege</td><td>Viola <strong>autorização</strong></td><td>Menor privilégio, validação de entrada, sandbox, isolamento</td></tr>
</tbody></table>
<div data-callout="info"><p>Decore o par ameaça → propriedade violada. A FGV cobra exatamente essa associação.</p></div>

<h2>3. Outras metodologias</h2>
<table><tbody>
<tr><td><strong>DREAD</strong></td><td>Priorização por Damage, Reproducibility, Exploitability, Affected users, Discoverability. Criticado por subjetividade</td></tr>
<tr><td><strong>PASTA</strong></td><td>7 estágios, centrado no <strong>risco de negócio</strong> e simulação de ataque</td></tr>
<tr><td><strong>LINDDUN</strong></td><td>Voltada à <strong>privacidade</strong>: Linkability, Identifiability, Non-repudiation, Detectability, Disclosure, Unawareness, Non-compliance. Excelente para conformidade com LGPD</td></tr>
<tr><td><strong>Attack Trees</strong></td><td>Árvore com o objetivo do atacante na raiz e caminhos nas folhas (nós AND/OR)</td></tr>
<tr><td><strong>OCTAVE</strong></td><td>Orientada a risco organizacional, autodirigida</td></tr>
<tr><td><strong>Trike / VAST</strong></td><td>Baseadas em risco e escaláveis para DevOps</td></tr>
<tr><td><strong>ATT&amp;CK</strong></td><td>Usada como catálogo de "o que pode dar errado" com base em comportamento real</td></tr>
</tbody></table>
<p>Curiosidade de prova: em <strong>LINDDUN</strong>, o <strong>não repúdio</strong> é uma <em>ameaça</em> à privacidade (impede a negação plausível), enquanto em STRIDE o <em>repúdio</em> é a ameaça. Os frameworks têm perspectivas opostas.</p>

<h2>4. DFD — elementos e fronteiras</h2>
<p>Elementos: <strong>entidade externa</strong>, <strong>processo</strong>, <strong>fluxo de dados</strong> e <strong>depósito de dados</strong>. As <strong>fronteiras de confiança</strong> (trust boundaries) são onde as ameaças se concentram — todo cruzamento de fronteira merece análise STRIDE.</p>
<p>Mapeamento STRIDE por elemento: entidade externa (S, R); processo (todas as seis); depósito de dados (T, R, I, D); fluxo de dados (T, I, D).</p>

<h2>Erros clássicos de prova</h2>
<ol>
<li>Associar Tampering à confidencialidade — é <strong>integridade</strong>.</li>
<li>Associar Information Disclosure à integridade — é <strong>confidencialidade</strong>.</li>
<li>Dizer que a modelagem deve ser feita após a implantação.</li>
<li>Confundir STRIDE (identificação de ameaças) com DREAD (priorização).</li>
</ol>
`,
    questions: [
      {
        statement: 'No modelo STRIDE, a ameaça de "Elevation of Privilege" está diretamente associada à violação da propriedade de:',
        options: ['Confidencialidade.', 'Integridade.', 'Disponibilidade.', 'Autorização.', 'Não repúdio.'],
        correct: 3,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'STRIDE', tags: ['STRIDE', 'modelagem de ameaças'],
        comment: 'Tabela completa: S-autenticidade, T-integridade, R-não repúdio, I-confidencialidade, D-disponibilidade, E-autorização.',
        justification: 'A elevação de privilégio corresponde à violação da autorização, permitindo ao sujeito executar ações além das permitidas.',
      },
      {
        statement: 'Sobre a modelagem de ameaças no ciclo de desenvolvimento de software, assinale a alternativa correta.',
        options: [
          'Deve ser realizada preferencialmente após a implantação em produção, quando o sistema já está estável.',
          'É mais efetiva quando realizada na fase de design, antes da codificação, reduzindo significativamente o custo de correção das falhas identificadas.',
          'Substitui integralmente a necessidade de testes SAST e DAST.',
          'Aplica-se exclusivamente a aplicações web voltadas ao público externo.',
          'Consiste na varredura automatizada de bibliotecas de terceiros.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'facil',
        subtopic: 'Momento da modelagem', tags: ['S-SDLC', 'shift left'],
        comment: 'É o exemplo mais puro de shift left: corrigir um erro de arquitetura no diagrama custa uma reunião; em produção, custa um projeto.',
        justification: 'A modelagem de ameaças integra a fase de design do S-SDLC. Corrigir falhas de arquitetura após a implantação tem custo exponencialmente maior.',
      },
      {
        statement: 'A metodologia de modelagem de ameaças orientada especificamente à identificação de riscos à privacidade, adequada para apoiar a conformidade com a LGPD, é a:',
        options: ['STRIDE.', 'DREAD.', 'LINDDUN.', 'PASTA.', 'OCTAVE.'],
        correct: 2,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'dificil',
        subtopic: 'Metodologias', tags: ['LINDDUN', 'privacidade', 'LGPD'],
        comment: 'LINDDUN é a contrapartida de privacidade do STRIDE — vale como diferencial em prova de perfil de proteção de dados.',
        justification: 'LINDDUN (Linkability, Identifiability, Non-repudiation, Detectability, Disclosure of information, Unawareness, Non-compliance) é voltada a ameaças à privacidade. STRIDE foca segurança; DREAD é priorização; PASTA é centrada em risco de negócio.',
      },
    ],
  },

  {
    subject: 'MITRE ATT&CK',
    summary: `
<h1>MITRE ATT&amp;CK</h1>
<p><strong>Adversarial Tactics, Techniques, and Common Knowledge</strong>: base de conhecimento <strong>curada a partir de observações reais</strong> do comportamento de adversários. Não é framework de conformidade nem de maturidade — é um <strong>catálogo comportamental</strong>.</p>

<h2>1. Hierarquia</h2>
<p><strong>Tática</strong> (o "porquê" — objetivo do adversário) → <strong>Técnica</strong> (o "como") → <strong>Subtécnica</strong> (variação específica) → <strong>Procedimento</strong> (implementação concreta por um grupo). Complementos: <strong>Grupos</strong> (APTs), <strong>Software</strong> (malware e ferramentas), <strong>Mitigações</strong>, <strong>Fontes de dados</strong>, <strong>Campanhas</strong> e <strong>Ativos</strong>.</p>

<h2>2. Matrizes</h2>
<p><strong>Enterprise</strong> (Windows, macOS, Linux, Rede, Contêineres, <strong>Nuvem</strong>: IaaS, SaaS, Identity Provider, Office Suite) · <strong>Mobile</strong> (Android/iOS) · <strong>ICS</strong> (sistemas de controle industrial). Há ainda a matriz <strong>PRE</strong> (reconhecimento e desenvolvimento de recursos), incorporada à Enterprise.</p>

<h2>3. As 14 táticas da matriz Enterprise (em ordem)</h2>
<ol>
<li><strong>Reconnaissance</strong> (TA0043) — coleta de informações sobre o alvo</li>
<li><strong>Resource Development</strong> (TA0042) — infraestrutura, contas, capacidades</li>
<li><strong>Initial Access</strong> (TA0001) — phishing, exploração de serviço público, cadeia de suprimentos</li>
<li><strong>Execution</strong> (TA0002) — PowerShell, WMI, interpretadores</li>
<li><strong>Persistence</strong> (TA0003) — tarefas agendadas, serviços, chaves de execução</li>
<li><strong>Privilege Escalation</strong> (TA0004)</li>
<li><strong>Defense Evasion</strong> (TA0005) — a maior tática em número de técnicas</li>
<li><strong>Credential Access</strong> (TA0006) — dumping de credenciais, keylogging, força bruta</li>
<li><strong>Discovery</strong> (TA0007) — enumeração de contas, rede, sistema</li>
<li><strong>Lateral Movement</strong> (TA0008) — RDP, SMB, pass-the-hash</li>
<li><strong>Collection</strong> (TA0009)</li>
<li><strong>Command and Control</strong> (TA0011) — canais de C2, tunelamento, protocolos legítimos</li>
<li><strong>Exfiltration</strong> (TA0010)</li>
<li><strong>Impact</strong> (TA0040) — ransomware (T1486 Data Encrypted for Impact), wiper, DoS</li>
</ol>

<h2>4. Técnicas que mais aparecem</h2>
<table><tbody>
<tr><td>T1566</td><td>Phishing</td><td>Initial Access</td></tr>
<tr><td>T1059</td><td>Command and Scripting Interpreter (.001 PowerShell)</td><td>Execution</td></tr>
<tr><td>T1078</td><td>Valid Accounts</td><td>Múltiplas táticas</td></tr>
<tr><td>T1003</td><td>OS Credential Dumping (.001 LSASS Memory)</td><td>Credential Access</td></tr>
<tr><td>T1055</td><td>Process Injection</td><td>Defense Evasion / Priv. Esc.</td></tr>
<tr><td>T1486</td><td>Data Encrypted for Impact (ransomware)</td><td>Impact</td></tr>
<tr><td>T1071</td><td>Application Layer Protocol</td><td>Command and Control</td></tr>
</tbody></table>

<h2>5. ATT&amp;CK x Cyber Kill Chain</h2>
<table><tbody>
<tr><td></td><td><strong>Cyber Kill Chain</strong></td><td><strong>ATT&amp;CK</strong></td></tr>
<tr><td>Origem</td><td>Lockheed Martin (2011)</td><td>MITRE (2013)</td></tr>
<tr><td>Estrutura</td><td><strong>7 fases lineares</strong></td><td><strong>14 táticas não lineares</strong>, com técnicas detalhadas</td></tr>
<tr><td>Ênfase</td><td>Intrusão até a ação no objetivo</td><td>Comportamento pós-comprometimento em profundidade</td></tr>
<tr><td>Granularidade</td><td>Alta abstração</td><td>Técnicas e procedimentos acionáveis</td></tr>
</tbody></table>

<h2>6. Usos práticos</h2>
<ul>
<li><strong>Cobertura de detecção</strong>: mapear regras do SIEM/EDR às técnicas e visualizar lacunas no <strong>ATT&amp;CK Navigator</strong> (mapa de calor);</li>
<li><strong>Emulação de adversário</strong>: <strong>CALDERA</strong>, Atomic Red Team, plataformas de BAS;</li>
<li><strong>Threat hunting</strong> orientado a hipótese por técnica;</li>
<li><strong>Enriquecimento de inteligência</strong> e comunicação padronizada entre equipes;</li>
<li><strong>ATT&amp;CK Evaluations</strong>: avaliações públicas de produtos de segurança contra TTPs de grupos reais;</li>
<li><strong>D3FEND</strong>: catálogo complementar de <em>contramedidas</em> defensivas.</li>
</ul>

<h2>Erros clássicos de prova</h2>
<ol>
<li>Dizer que o ATT&amp;CK tem 7 fases lineares — isso é a <strong>Kill Chain</strong>.</li>
<li>Inverter tática (por quê) e técnica (como).</li>
<li>Tratar o ATT&amp;CK como norma certificável ou modelo de maturidade.</li>
<li>Esquecer que Reconnaissance e Resource Development são <strong>pré-comprometimento</strong> e abrem a matriz.</li>
</ol>
`,
    questions: [
      {
        statement: 'No framework MITRE ATT&CK, a relação entre tática e técnica é corretamente descrita como:',
        options: [
          'A técnica representa o objetivo do adversário e a tática, o meio empregado.',
          'A tática representa o objetivo tático do adversário (o "porquê") e a técnica descreve como esse objetivo é alcançado.',
          'Tática e técnica são sinônimos, variando apenas conforme a matriz utilizada.',
          'A tática é sempre um subconjunto de uma técnica específica.',
          'A técnica corresponde a um grupo de ameaça (APT) catalogado.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'facil',
        subtopic: 'Estrutura do ATT&CK', tags: ['MITRE ATT&CK', 'táticas', 'técnicas'],
        comment: 'Hierarquia completa: tática → técnica → subtécnica → procedimento.',
        justification: 'As táticas (identificadas por TA) representam objetivos como persistência ou exfiltração; as técnicas (identificadas por T) descrevem os meios para atingi-los.',
      },
      {
        statement: 'Assinale a alternativa que apresenta uma diferença correta entre a Cyber Kill Chain e o MITRE ATT&CK.',
        options: [
          'A Cyber Kill Chain possui 14 táticas não lineares, enquanto o ATT&CK possui 7 fases sequenciais.',
          'A Cyber Kill Chain descreve 7 fases sequenciais da intrusão, enquanto o ATT&CK organiza 14 táticas não necessariamente lineares, com técnicas detalhadas observadas no mundo real.',
          'Ambos são normas certificáveis publicadas pela ISO.',
          'O ATT&CK não contempla comportamentos anteriores ao comprometimento.',
          'A Cyber Kill Chain foi desenvolvida pelo MITRE e o ATT&CK pela Lockheed Martin.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'ATT&CK x Kill Chain', tags: ['MITRE ATT&CK', 'kill chain'],
        comment: 'O ATT&CK contempla, sim, o pré-comprometimento: Reconnaissance (TA0043) e Resource Development (TA0042).',
        justification: 'A Kill Chain (Lockheed Martin) é linear e de alta abstração; o ATT&CK (MITRE) é uma matriz comportamental não linear com técnicas e subtécnicas acionáveis.',
      },
      {
        statement: 'Uma equipe de segurança deseja visualizar graficamente quais técnicas do MITRE ATT&CK já possuem regras de detecção implementadas e quais permanecem sem cobertura. A ferramenta oficial mais adequada é o:',
        options: ['ATT&CK Navigator.', 'CALDERA.', 'D3FEND.', 'ATT&CK Evaluations.', 'CVE Details.'],
        correct: 0,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'Ferramentas', tags: ['ATT&CK Navigator', 'cobertura de detecção'],
        comment: 'Navigator = mapa de calor de cobertura. CALDERA = emulação automatizada. D3FEND = contramedidas.',
        justification: 'O ATT&CK Navigator permite anotar, colorir e sobrepor camadas sobre a matriz, sendo a ferramenta padrão para análise de lacunas de detecção.',
      },
    ],
  },

  {
    subject: 'Segurança em IoT',
    summary: `
<h1>Segurança em IoT</h1>

<h2>1. Por que IoT é diferente</h2>
<ul>
<li><strong>Recursos limitados</strong> — pouca CPU, memória e energia; criptografia forte pode ser inviável (daí a <em>criptografia leve</em>: ASCON, padronizada pelo NIST em 2023);</li>
<li><strong>Ciclo de vida longo</strong> — dispositivos operam por 10 a 15 anos, muitas vezes sem suporte do fabricante;</li>
<li><strong>Atualização difícil</strong> — nem sempre há OTA; muitos nunca recebem patch;</li>
<li><strong>Escala massiva</strong> — bilhões de dispositivos, ideais para <strong>botnets</strong>;</li>
<li><strong>Segurança física ausente</strong> — o atacante costuma ter acesso físico (portas UART/JTAG, extração de firmware);</li>
<li><strong>Convergência TI/TO</strong> — impacto sai do digital e chega ao <strong>físico e à segurança de vidas</strong> (safety).</li>
</ul>

<h2>2. Arquitetura em camadas e ameaças</h2>
<table><tbody>
<tr><td><strong>Percepção / dispositivo</strong></td><td>Adulteração física, extração de firmware, clonagem, ataques de canal lateral</td></tr>
<tr><td><strong>Rede / conectividade</strong></td><td>Interceptação, spoofing, jamming, ataques a Zigbee/BLE/LoRaWAN, DDoS</td></tr>
<tr><td><strong>Processamento / plataforma</strong></td><td>APIs inseguras, autenticação fraca, injeção, exposição de brokers MQTT</td></tr>
<tr><td><strong>Aplicação</strong></td><td>Interface web/mobile insegura, credenciais embutidas, privacidade</td></tr>
</tbody></table>

<h2>3. OWASP IoT Top 10 (2018)</h2>
<ol>
<li><strong>Senhas fracas, previsíveis ou embutidas</strong> — a nº 1;</li>
<li>Serviços de rede inseguros;</li>
<li>Interfaces do ecossistema inseguras;</li>
<li><strong>Falta de mecanismo seguro de atualização</strong>;</li>
<li>Uso de componentes inseguros ou desatualizados;</li>
<li>Proteção insuficiente da privacidade;</li>
<li>Transferência e armazenamento inseguros de dados;</li>
<li>Falta de gerenciamento de dispositivos;</li>
<li>Configurações padrão inseguras;</li>
<li>Falta de robustez física.</li>
</ol>

<h2>4. Caso emblemático: Mirai (2016)</h2>
<p>Varria a internet em busca de dispositivos com <strong>credenciais padrão</strong> via Telnet, formando uma botnet que gerou DDoS de mais de 1 Tbps contra a Dyn, derrubando grandes serviços. Lição: o item 1 do OWASP IoT Top 10 não é teórico.</p>

<h2>5. Protocolos</h2>
<table><tbody>
<tr><td><strong>MQTT</strong></td><td>Publish/subscribe via broker; leve. Segurança: <strong>TLS</strong> (8883), autenticação por usuário/senha ou certificado, ACL por tópico. Por padrão, é <em>aberto</em> — brokers expostos são achado comum no Shodan</td></tr>
<tr><td><strong>CoAP</strong></td><td>REST sobre UDP; segurança com <strong>DTLS</strong>. Suscetível a amplificação</td></tr>
<tr><td><strong>AMQP</strong></td><td>Orientado a mensagens, mais robusto</td></tr>
<tr><td><strong>Zigbee / Z-Wave / BLE / LoRaWAN</strong></td><td>Rádio de curto/longo alcance; atenção a chaves de rede compartilhadas e pareamento</td></tr>
</tbody></table>

<h2>6. Controles recomendados</h2>
<ul>
<li><strong>Segmentação de rede</strong> — VLAN exclusiva de IoT/TO, sem acesso à rede corporativa;</li>
<li><strong>Secure boot</strong>, firmware assinado e <strong>root of trust</strong> em hardware (TPM/SE);</li>
<li><strong>Identidade única por dispositivo</strong> — certificado X.509, sem senha padrão compartilhada;</li>
<li><strong>Atualização OTA assinada</strong> com rollback seguro;</li>
<li>Desabilitar Telnet, UART e portas de depuração em produção;</li>
<li>Inventário e <strong>gestão de ciclo de vida</strong> (incluindo desativação);</li>
<li><strong>Zero Trust</strong> aplicado a dispositivos: autenticar cada um, nunca confiar na rede.</li>
</ul>
<p>Referências: <strong>NIST IR 8259</strong> (capacidades básicas de cibersegurança para fabricantes), <strong>NISTIR 8228</strong> (riscos), <strong>ETSI EN 303 645</strong> (padrão europeu de IoT de consumo), <strong>ISA/IEC 62443</strong> (ambientes industriais).</p>

<h2>Erros clássicos de prova</h2>
<ol>
<li>Achar que MQTT é seguro por padrão — não é; exige TLS e autenticação.</li>
<li>Tratar IoT como problema apenas de confidencialidade — em TO, <strong>disponibilidade e safety</strong> costumam vir primeiro.</li>
<li>Ignorar o acesso físico como vetor.</li>
<li>Confundir NIST IR 8259 (fabricantes) com IEC 62443 (industrial).</li>
</ol>
`,
    questions: [
      {
        statement: 'A botnet Mirai, responsável por ataques DDoS de grande escala em 2016, comprometeu dispositivos IoT explorando principalmente:',
        options: [
          'Vulnerabilidades de dia zero no firmware dos fabricantes.',
          'Credenciais padrão de fábrica, fracas ou embutidas, acessíveis por serviços como Telnet.',
          'Falhas no protocolo TLS 1.3.',
          'Ataques de canal lateral em chips criptográficos.',
          'Interceptação de comunicações LoRaWAN.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'facil',
        subtopic: 'Ameaças IoT', tags: ['Mirai', 'botnet', 'OWASP IoT'],
        comment: 'Item 1 do OWASP IoT Top 10 e item 9 (configurações padrão inseguras) atuando juntos.',
        justification: 'O Mirai usava uma lista reduzida de credenciais padrão para autenticar-se via Telnet em câmeras e roteadores, sem explorar vulnerabilidades sofisticadas.',
      },
      {
        statement: 'Sobre o protocolo MQTT em ambientes IoT, assinale a alternativa correta.',
        options: [
          'Implementa criptografia e autenticação obrigatórias por padrão em todas as implementações.',
          'É um protocolo publish/subscribe leve que, por padrão, não exige criptografia nem autenticação, sendo recomendável o uso de TLS e de controle de acesso por tópico.',
          'Opera exclusivamente sobre UDP, utilizando DTLS.',
          'Substitui o protocolo HTTPS em aplicações web tradicionais.',
          'Não permite o uso de certificados digitais para autenticação de clientes.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'Protocolos IoT', tags: ['MQTT', 'TLS', 'IoT'],
        comment: 'Brokers MQTT abertos na porta 1883 são achado frequente em buscas no Shodan. A porta segura é a 8883.',
        justification: 'O MQTT é leve e opera sobre TCP, deixando a segurança a cargo da implementação: TLS, autenticação e ACL por tópico. O CoAP é que roda sobre UDP com DTLS.',
      },
      {
        statement: 'Em ambientes de tecnologia operacional (TO) e IoT industrial, uma diferença relevante em relação a ambientes de TI tradicionais é que:',
        options: [
          'A confidencialidade é sempre a propriedade prioritária.',
          'A disponibilidade e a segurança física de pessoas (safety) tendem a ter prioridade sobre a confidencialidade, e janelas de atualização são restritas.',
          'Os dispositivos possuem ciclo de vida curto, sendo substituídos anualmente.',
          'A aplicação de patches pode ser realizada a qualquer momento, sem impacto operacional.',
          'A segmentação de rede é desnecessária, pois os protocolos industriais são criptografados por padrão.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'TI x TO', tags: ['IoT', 'TO', 'IEC 62443'],
        comment: 'Em TI a tríade costuma ser lida como CID; em TO, inverte-se para DIC.',
        justification: 'Em ambientes de TO, parar a produção pode causar prejuízo ou risco à vida, o que inverte a prioridade da tríade e restringe janelas de manutenção. A referência normativa é a ISA/IEC 62443.',
      },
    ],
  },

  {
    subject: 'Programação para Segurança',
    summary: `
<h1>Programação para segurança</h1>
<p>O edital lista um conjunto amplo de linguagens e tecnologias. A cobrança costuma ser <strong>conceitual</strong>: para que serve cada uma no contexto de segurança e quais riscos típicas introduzem.</p>

<h2>1. Linguagens e seu papel em segurança</h2>
<table><tbody>
<tr><td><strong>Python</strong></td><td>Automação, parsing de log, integração de API, exploits, ferramentas de análise. Bibliotecas: <code>requests</code>, <code>scapy</code>, <code>impacket</code>, <code>pandas</code>, <code>yara-python</code></td></tr>
<tr><td><strong>Perl</strong></td><td>Legado; excelente em expressões regulares e processamento de texto/log</td></tr>
<tr><td><strong>C / C++</strong></td><td>Baixo nível; leitura de exploits, análise de malware, engenharia reversa. Fonte de <strong>buffer overflow</strong>, <em>use-after-free</em>, <em>format string</em> — gerenciamento manual de memória</td></tr>
<tr><td><strong>C#</strong></td><td>Ecossistema .NET/Windows; ferramentas ofensivas e defensivas em AD</td></tr>
<tr><td><strong>Java</strong></td><td>Aplicações corporativas; vulnerabilidades típicas: <strong>desserialização insegura</strong>, injeção de JNDI (Log4Shell), XXE</td></tr>
<tr><td><strong>JavaScript (React.js)</strong></td><td>Front-end; riscos de <strong>XSS</strong> (<code>dangerouslySetInnerHTML</code>), dependências npm comprometidas, segredos no bundle</td></tr>
<tr><td><strong>Shell Script</strong></td><td>Automação Linux, hardening, coleta forense. Risco: injeção de comando e uso de <code>eval</code></td></tr>
<tr><td><strong>PowerShell</strong></td><td>Automação Windows/AD e, ao mesmo tempo, ferramenta favorita de ataques <em>fileless</em>. Controles: <strong>Constrained Language Mode</strong>, <strong>Script Block Logging</strong>, <strong>Transcription</strong>, <strong>AMSI</strong>, política de execução assinada, JEA</td></tr>
<tr><td><strong>HTML5 / CSS3</strong></td><td>Superfície de front-end: CSP, cabeçalhos de segurança, sandbox de iframe, riscos de clickjacking</td></tr>
</tbody></table>

<h2>2. Spring Boot e Spring Cloud</h2>
<ul>
<li><strong>Spring Security</strong>: autenticação e autorização, proteção CSRF habilitada por padrão em formulários, cabeçalhos de segurança, integração com OAuth2/OIDC e JWT;</li>
<li><strong>Actuator</strong>: endpoints de diagnóstico (<code>/actuator/env</code>, <code>/heapdump</code>) — <strong>expor sem proteção é vazamento crítico</strong>;</li>
<li><strong>Spring Cloud Config</strong> e <strong>Vault</strong> para externalização e proteção de segredos;</li>
<li><strong>Spring Cloud Gateway</strong> para rate limiting, autenticação centralizada e roteamento;</li>
<li>Vulnerabilidades célebres: <strong>Spring4Shell (CVE-2022-22965)</strong> e <strong>Log4Shell (CVE-2021-44228)</strong> — ambas reforçam a necessidade de SCA e SBOM.</li>
</ul>

<h2>3. Confluent Kafka</h2>
<p>Plataforma de streaming distribuída. Conceitos: <strong>broker, tópico, partição, produtor, consumidor, grupo de consumidores, offset, replicação</strong>. Segurança:</p>
<ul>
<li><strong>Criptografia</strong>: TLS entre clientes e brokers e entre brokers;</li>
<li><strong>Autenticação</strong>: SASL (<strong>SASL/PLAIN</strong>, <strong>SASL/SCRAM</strong>, <strong>SASL/GSSAPI-Kerberos</strong>, <strong>SASL/OAUTHBEARER</strong>) ou mTLS;</li>
<li><strong>Autorização</strong>: <strong>ACLs</strong> por recurso (tópico, grupo, cluster) ou RBAC no Confluent Platform;</li>
<li>Auditoria, quotas e criptografia de dados sensíveis no payload;</li>
<li>Em segurança, Kafka costuma ser o <em>backbone</em> de ingestão de eventos para SIEM e data lake.</li>
</ul>

<h2>4. GitLab e pipeline seguro</h2>
<ul>
<li><strong>CI/CD</strong> com estágios de segurança: SAST, <strong>Secret Detection</strong>, Dependency Scanning (SCA), Container Scanning, DAST, IaC Scanning;</li>
<li><strong>Proteção de branch</strong>, aprovação obrigatória em merge request, <strong>commits assinados</strong>;</li>
<li><strong>Variáveis mascaradas e protegidas</strong>; nunca segredo em texto claro no repositório;</li>
<li>Riscos: runner compartilhado comprometido, <em>pipeline poisoning</em>, dependência maliciosa, token de CI com escopo excessivo.</li>
</ul>

<h2>5. Regras de codificação segura que valem para qualquer linguagem</h2>
<ol>
<li>Validação de entrada por <strong>allowlist no servidor</strong>;</li>
<li><strong>Consultas parametrizadas</strong>;</li>
<li>Codificação de saída conforme o contexto;</li>
<li>Segredos em <strong>cofre</strong>, com rotação;</li>
<li>Tratamento de erro sem vazar detalhes internos;</li>
<li>Dependências atualizadas e monitoradas (SCA + SBOM);</li>
<li>Menor privilégio no processo e no contêiner.</li>
</ol>

<h2>Erros clássicos de prova</h2>
<ol>
<li>Achar que PowerShell é só ferramenta administrativa — é vetor central de ataques fileless.</li>
<li>Supor que o Spring Security dispensa configuração dos endpoints do Actuator.</li>
<li>Dizer que o Kafka é criptografado por padrão — não é; exige configuração de TLS e SASL.</li>
<li>Confiar em validação feita apenas no React (cliente).</li>
</ol>
`,
    questions: [
      {
        statement: 'Sobre o uso do PowerShell no contexto de segurança da informação, assinale a alternativa correta.',
        options: [
          'Por ser uma ferramenta nativa e assinada pela Microsoft, sua execução não representa risco de segurança.',
          'É amplamente utilizado em ataques do tipo fileless, sendo recomendável habilitar Script Block Logging, Transcription, AMSI e o Constrained Language Mode.',
          'Sua política de execução (Execution Policy) constitui um controle de segurança robusto e inviolável.',
          'É incompatível com ambientes de Active Directory.',
          'Não permite o registro detalhado dos comandos executados.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'PowerShell', tags: ['PowerShell', 'fileless', 'LOLBin'],
        comment: 'PowerShell é o LOLBin (living off the land binary) por excelência: legítimo, assinado e presente em toda estação Windows.',
        justification: 'O PowerShell é vetor comum de execução em memória. A Execution Policy não é fronteira de segurança (é facilmente contornada com -ExecutionPolicy Bypass); os controles efetivos são logging, AMSI, modo de linguagem restrito e JEA.',
      },
      {
        statement: 'Em uma implantação do Apache Kafka utilizada como barramento de eventos de segurança, os mecanismos adequados para garantir confidencialidade em trânsito, autenticação de clientes e autorização de acesso a tópicos são, respectivamente:',
        options: [
          'Compressão GZIP, offsets e grupos de consumidores.',
          'TLS, SASL (SCRAM, GSSAPI ou OAUTHBEARER) ou mTLS, e ACLs por recurso.',
          'Replicação de partições, particionamento por chave e retenção configurada.',
          'Firewall de borda, VPN e antivírus nos brokers.',
          'Nenhum, pois o Kafka é criptografado e autenticado por padrão.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'dificil',
        subtopic: 'Kafka', tags: ['Kafka', 'TLS', 'SASL', 'ACL'],
        comment: 'Replicação e particionamento tratam de disponibilidade e desempenho, não de segurança.',
        justification: 'Kafka não é seguro por padrão. A confidencialidade vem do TLS; a autenticação, de SASL ou mTLS; e a autorização, de ACLs por tópico, grupo e cluster (ou RBAC na Confluent Platform).',
      },
      {
        statement: 'Em uma aplicação Spring Boot exposta na internet, a exposição pública e não autenticada dos endpoints do Spring Boot Actuator, como /actuator/env e /actuator/heapdump, caracteriza:',
        options: [
          'Boa prática de observabilidade, recomendada pela documentação oficial.',
          'Falha de configuração de segurança que pode resultar em divulgação indevida de variáveis de ambiente, credenciais e conteúdo de memória.',
          'Vulnerabilidade de injeção de SQL.',
          'Ataque de negação de serviço distribuído.',
          'Falha de criptografia em repouso.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'Spring Boot', tags: ['Spring Boot', 'Actuator', 'misconfiguration'],
        comment: 'Enquadra-se em A05 Security Misconfiguration e A02 Cryptographic Failures do OWASP Top 10 2021.',
        justification: 'Os endpoints do Actuator expõem informações sensíveis do ambiente e da memória da aplicação. Devem ser restritos por Spring Security, expostos apenas em rede interna e com o mínimo de endpoints habilitados.',
      },
    ],
  },

  {
    subject: 'Direito Digital',
    summary: `
<h1>Direito digital aplicado à segurança da informação</h1>

<h2>1. Base constitucional</h2>
<ul>
<li><strong>Art. 5º, X</strong> — inviolabilidade da intimidade, vida privada, honra e imagem;</li>
<li><strong>Art. 5º, XII</strong> — sigilo das comunicações; interceptação apenas por <strong>ordem judicial</strong>, nas hipóteses da Lei nº 9.296/1996;</li>
<li><strong>Art. 5º, XXXIII</strong> — direito de acesso a informações públicas (base da LAI);</li>
<li><strong>Art. 5º, LXXII</strong> — <strong>habeas data</strong>;</li>
<li><strong>Art. 5º, LXXIX</strong> (EC 115/2022) — <strong>direito fundamental à proteção de dados pessoais</strong>, inclusive nos meios digitais; a mesma emenda deu à União a competência privativa para legislar sobre o tema.</li>
</ul>

<h2>2. Mapa das leis</h2>
<table><tbody>
<tr><td><strong>MP 2.200-2/2001</strong></td><td>ICP-Brasil; presunção de veracidade da assinatura digital</td></tr>
<tr><td><strong>Lei 9.296/1996</strong></td><td>Interceptação telefônica e de fluxo de comunicações em sistemas de informática</td></tr>
<tr><td><strong>Lei 12.527/2011</strong></td><td>LAI — transparência e classificação de informação</td></tr>
<tr><td><strong>Lei 12.737/2012</strong></td><td>Delitos informáticos (arts. 154-A e 154-B do CP)</td></tr>
<tr><td><strong>Lei 12.965/2014</strong></td><td>Marco Civil da Internet</td></tr>
<tr><td><strong>Lei 13.709/2018</strong></td><td>LGPD</td></tr>
<tr><td><strong>Lei 14.063/2020</strong></td><td>Assinaturas eletrônicas: simples, avançada e qualificada</td></tr>
<tr><td><strong>Lei 14.129/2021</strong></td><td>Governo Digital</td></tr>
<tr><td><strong>Lei 14.155/2021</strong></td><td>Agrava o art. 154-A do CP; cria furto mediante fraude eletrônica (155, § 4º-B) e estelionato eletrônico (171, § 2º-A)</td></tr>
<tr><td><strong>Decreto 10.222/2020</strong></td><td>Estratégia Nacional de Segurança Cibernética (E-Ciber)</td></tr>
<tr><td><strong>Decreto 11.856/2024</strong></td><td>Política Nacional de Cibersegurança (PNCiber) e Comitê Nacional de Cibersegurança</td></tr>
<tr><td><strong>Lei 14.478/2022</strong></td><td>Marco legal dos ativos virtuais; cria o estelionato com uso de ativos virtuais</td></tr>
</tbody></table>

<h2>3. Provas eletrônicas</h2>
<ul>
<li><strong>Cadeia de custódia</strong> — arts. 158-A a 158-F do CPP (Pacote Anticrime, Lei 13.964/2019): rastreamento do vestígio desde o reconhecimento até o descarte;</li>
<li><strong>Ata notarial</strong> (art. 384 do CPC) — meio idôneo de comprovar conteúdo da internet;</li>
<li><strong>Hash</strong> como prova de integridade; preferência por <strong>cópia forense bit a bit</strong>;</li>
<li>Acesso a registros de conexão e de acesso a aplicações depende de <strong>ordem judicial</strong> (arts. 10, 13, 15 e 22 do Marco Civil).</li>
</ul>

<h2>4. Responsabilidades do profissional de segurança</h2>
<ul>
<li><strong>Monitoramento de empregados</strong>: admitido quando há <strong>política prévia, transparência e proporcionalidade</strong>. Monitorar e-mail corporativo é tolerado pela jurisprudência trabalhista; e-mail pessoal, não;</li>
<li><strong>Pentest sem autorização escrita</strong> configura o crime do art. 154-A do CP;</li>
<li><strong>Hack back</strong> (retaliação ativa) é ilícito no Brasil;</li>
<li>Sigilo profissional, conflito de interesses e dever de comunicar incidentes.</li>
</ul>

<h2>5. Interseção LGPD x segurança</h2>
<p>O art. 46 da LGPD é a ponte: obriga medidas técnicas e administrativas de segurança. Falha de segurança que resulte em vazamento gera <strong>responsabilidade civil</strong> (arts. 42 a 45), <strong>sanções administrativas da ANPD</strong> (art. 52) e, eventualmente, responsabilização penal do agente que praticou a conduta típica. As esferas são <strong>independentes</strong>.</p>

<h2>Erros clássicos de prova</h2>
<ol>
<li>Dizer que a proteção de dados é apenas direito legal — desde a EC 115/2022 é <strong>direito fundamental</strong>.</li>
<li>Afirmar que o empregador pode monitorar qualquer comunicação do empregado sem política prévia.</li>
<li>Achar que a LGPD prevê sanções penais — ela prevê sanções <strong>administrativas</strong>.</li>
<li>Supor que a autoridade policial acessa registros de internet sem ordem judicial.</li>
</ol>
`,
    questions: [
      {
        statement: 'A Emenda Constitucional nº 115/2022 promoveu alteração relevante no ordenamento jurídico brasileiro ao:',
        options: [
          'Criar a Autoridade Nacional de Proteção de Dados como órgão constitucional.',
          'Incluir, entre os direitos e garantias fundamentais do art. 5º, o direito à proteção dos dados pessoais, inclusive nos meios digitais.',
          'Revogar a Lei Geral de Proteção de Dados Pessoais.',
          'Tipificar como crime hediondo o vazamento de dados pessoais.',
          'Atribuir aos Estados a competência privativa para legislar sobre proteção de dados.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'Fundamento constitucional', tags: ['EC 115/2022', 'direito digital', 'LGPD'],
        comment: 'A EC 115 acrescentou o inciso LXXIX ao art. 5º e deu à UNIÃO (não aos Estados) a competência privativa sobre o tema.',
        justification: 'A EC 115/2022 inseriu o inciso LXXIX no art. 5º da CF, elevando a proteção de dados pessoais à condição de direito fundamental, e alterou os arts. 21, XXVI, e 22, XXX, fixando competência privativa da União.',
      },
      {
        statement: 'Sobre a responsabilização decorrente de um vazamento de dados pessoais causado por falha de segurança, assinale a alternativa correta.',
        options: [
          'A aplicação de sanção administrativa pela ANPD afasta a responsabilidade civil do controlador perante os titulares.',
          'As esferas administrativa, civil e penal são independentes, podendo haver sanção da ANPD, dever de reparação civil e, se houver conduta típica, responsabilização penal.',
          'A LGPD prevê sanções penais diretamente aplicáveis pela ANPD.',
          'A responsabilidade recai exclusivamente sobre o encarregado (DPO).',
          'A comunicação do incidente à ANPD exclui qualquer responsabilidade do controlador.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'Responsabilização', tags: ['LGPD', 'responsabilidade', 'ANPD'],
        comment: 'A LGPD só traz sanções administrativas. Os tipos penais estão no Código Penal, alterado pelas Leis 12.737/2012 e 14.155/2021.',
        justification: 'A independência das instâncias é regra no direito brasileiro. A comunicação do incidente é dever legal (art. 48) e pode ser considerada como atenuante na dosimetria (art. 52, § 1º), mas não exclui a responsabilidade.',
      },
      {
        statement: 'A respeito do monitoramento de comunicações eletrônicas de empregados pela organização, assinale a alternativa correta.',
        options: [
          'É livre e irrestrito, inclusive sobre contas de e-mail pessoais acessadas em equipamento corporativo.',
          'É admitido quando incide sobre recursos corporativos, desde que haja política prévia, ciência dos empregados, finalidade legítima e proporcionalidade.',
          'É integralmente vedado pela LGPD.',
          'Depende sempre de autorização judicial prévia, ainda que se trate de e-mail corporativo.',
          'Dispensa qualquer base legal, por se tratar de exercício do poder diretivo do empregador.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'dificil',
        subtopic: 'Monitoramento', tags: ['direito digital', 'privacidade', 'LGPD'],
        comment: 'Base legal usual: legítimo interesse ou obrigação legal, sempre com transparência (art. 6º, VI) e minimização (art. 6º, III).',
        justification: 'A jurisprudência trabalhista admite o monitoramento de ferramentas corporativas quando previamente comunicado e proporcional, mas veda o acesso a comunicações estritamente pessoais. A LGPD exige base legal, transparência e necessidade.',
      },
    ],
  },

  {
    subject: 'Containers',
    summary: `
<h1>Containers e segurança em contêineres</h1>

<h2>1. Container x máquina virtual</h2>
<table><tbody>
<tr><td></td><td><strong>Container</strong></td><td><strong>Máquina virtual</strong></td></tr>
<tr><td>Isolamento</td><td><strong>Nível de SO</strong> — compartilha o kernel do host</td><td>Hardware virtualizado — kernel próprio</td></tr>
<tr><td>Tecnologias</td><td><strong>namespaces</strong> (isolamento) + <strong>cgroups</strong> (limite de recursos) + capabilities + seccomp</td><td>Hipervisor tipo 1 ou 2</td></tr>
<tr><td>Peso e inicialização</td><td>Megabytes; segundos</td><td>Gigabytes; minutos</td></tr>
<tr><td>Fronteira de segurança</td><td><strong>Mais fraca</strong> — comprometer o kernel afeta todos os contêineres</td><td>Mais forte</td></tr>
</tbody></table>
<p>Namespaces do Linux: PID, NET, MNT, UTS, IPC, USER e CGROUP.</p>

<h2>2. Superfícies de risco (os 4 Cs)</h2>
<p><strong>Cloud → Cluster → Container → Code.</strong> A segurança de cada camada depende da anterior.</p>

<h2>3. Riscos e controles no ciclo de vida</h2>
<table><tbody>
<tr><td><strong>Imagem</strong></td><td>Base desatualizada, imagem de registro público não confiável, <strong>segredos embutidos em camadas</strong> (permanecem no histórico mesmo após <code>rm</code>)</td><td>Imagem mínima (distroless/alpine), <strong>varredura</strong> (Trivy, Grype, Clair), <strong>assinatura</strong> (Cosign/Sigstore), SBOM, pinagem por digest</td></tr>
<tr><td><strong>Registro</strong></td><td>Registro público, ausência de controle de acesso, <em>typosquatting</em></td><td>Registro privado, autenticação, política de admissão que só aceita imagens assinadas</td></tr>
<tr><td><strong>Runtime</strong></td><td><strong>Contêiner privilegiado</strong>, execução como <strong>root</strong>, montagem do <code>docker.sock</code>, <code>hostPID</code>/<code>hostNetwork</code>, capabilities excessivas</td><td><code>runAsNonRoot</code>, <code>readOnlyRootFilesystem</code>, <code>drop ALL</code> capabilities, seccomp e AppArmor/SELinux, <strong>sem privileged</strong>, limites de CPU e memória</td></tr>
<tr><td><strong>Orquestrador</strong></td><td>RBAC permissivo, <em>etcd</em> sem criptografia, painel exposto, segredos em base64</td><td><strong>RBAC mínimo</strong>, criptografia do etcd em repouso, <strong>Network Policies</strong>, Pod Security Admission/Standards, gestão externa de segredos (Vault, KMS)</td></tr>
</tbody></table>

<h2>4. Kubernetes — pontos que caem</h2>
<ul>
<li><strong>Secrets</strong> são apenas <strong>codificados em base64</strong>, não criptografados por padrão — habilite <em>encryption at rest</em> ou use cofre externo;</li>
<li><strong>Network Policies</strong>: por padrão <em>todo pod fala com todo pod</em>; é preciso negar explicitamente;</li>
<li><strong>Pod Security Standards</strong>: <em>privileged</em>, <em>baseline</em> e <em>restricted</em> (substituíram as PodSecurityPolicies);</li>
<li><strong>Service Account</strong> com token montado automaticamente — desative quando desnecessário;</li>
<li><strong>Admission Controllers</strong> e política como código (<strong>OPA/Gatekeeper</strong>, Kyverno);</li>
<li>Isolamento reforçado: <strong>gVisor</strong>, <strong>Kata Containers</strong>, Firecracker (microVM).</li>
</ul>

<h2>5. Categorias de ferramentas</h2>
<p><strong>CSPM</strong> (postura da nuvem) · <strong>CWPP</strong> (proteção de cargas de trabalho) · <strong>KSPM</strong> (postura do Kubernetes) · <strong>CNAPP</strong> (plataforma integrada) · runtime security (Falco). Referências: <strong>NIST SP 800-190</strong> (Application Container Security Guide), <strong>CIS Docker/Kubernetes Benchmarks</strong>, <strong>OWASP Kubernetes Top 10</strong>.</p>

<h2>Erros clássicos de prova</h2>
<ol>
<li>Dizer que contêineres oferecem o mesmo isolamento de máquinas virtuais.</li>
<li>Afirmar que Secrets do Kubernetes são criptografados por padrão.</li>
<li>Achar que remover um arquivo em um <code>RUN</code> posterior elimina o segredo da imagem — ele permanece na camada anterior.</li>
<li>Supor que pods são isolados por padrão na rede.</li>
</ol>
`,
    questions: [
      {
        statement: 'Sobre o isolamento fornecido por contêineres em comparação com máquinas virtuais, assinale a alternativa correta.',
        options: [
          'Contêineres oferecem isolamento equivalente ao de máquinas virtuais, pois cada um executa seu próprio kernel.',
          'Contêineres compartilham o kernel do sistema hospedeiro, utilizando namespaces e cgroups para isolamento, o que representa fronteira de segurança mais fraca do que a de máquinas virtuais.',
          'Máquinas virtuais compartilham o kernel do host, enquanto contêineres executam kernels independentes.',
          'Contêineres não permitem limitação de recursos de CPU e memória.',
          'A fuga de contêiner (container escape) é tecnicamente impossível.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'Container x VM', tags: ['containers', 'namespaces', 'cgroups'],
        comment: 'Por isso surgiram gVisor, Kata Containers e Firecracker: reforçam a fronteira sem abrir mão da agilidade.',
        justification: 'Contêineres isolam processos no nível do sistema operacional por meio de namespaces (visibilidade) e cgroups (recursos), compartilhando o kernel. Uma vulnerabilidade de kernel pode permitir fuga do contêiner.',
      },
      {
        statement: 'Em um cluster Kubernetes, sobre o objeto Secret, é correto afirmar que, por padrão:',
        options: [
          'Os valores são criptografados com AES-256 antes de serem gravados no etcd.',
          'Os valores são apenas codificados em base64, sendo recomendável habilitar a criptografia em repouso do etcd ou utilizar um cofre externo.',
          'O acesso é automaticamente restrito ao namespace de origem, dispensando configuração de RBAC.',
          'Os valores são armazenados exclusivamente em memória, nunca persistidos.',
          'A rotação das credenciais é executada automaticamente pelo control plane.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'Kubernetes', tags: ['Kubernetes', 'Secrets', 'etcd'],
        comment: 'Base64 é codificação, não criptografia. Quem lê o etcd ou tem RBAC amplo lê o segredo.',
        justification: 'Secrets são objetos codificados em base64 e persistidos no etcd. A proteção efetiva exige EncryptionConfiguration no API Server ou integração com gerenciador externo de segredos, além de RBAC restritivo.',
      },
      {
        statement: 'Entre as práticas recomendadas para a execução segura de contêineres em produção, NÃO se inclui:',
        options: [
          'Executar o processo do contêiner como usuário não root.',
          'Montar o socket do Docker (/var/run/docker.sock) dentro do contêiner para facilitar a automação.',
          'Utilizar sistema de arquivos raiz somente leitura.',
          'Remover todas as capabilities e adicionar apenas as estritamente necessárias.',
          'Definir limites de CPU e memória para o contêiner.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'Runtime seguro', tags: ['Docker', 'hardening', 'NIST 800-190'],
        comment: 'Montar o docker.sock equivale a dar root no host: com ele, o contêiner cria outro contêiner privilegiado.',
        justification: 'Expor o socket do Docker dentro de um contêiner permite controle total do daemon e, portanto, do hospedeiro. As demais alternativas são recomendações do NIST SP 800-190 e dos CIS Benchmarks.',
      },
    ],
  },

  {
    subject: 'Blockchain',
    summary: `
<h1>Blockchain</h1>

<h2>1. Conceito</h2>
<p><strong>Livro-razão distribuído (DLT)</strong> composto por blocos encadeados criptograficamente. Cada bloco contém <strong>hash do bloco anterior</strong>, <strong>timestamp</strong>, <strong>nonce</strong> e a <strong>raiz da árvore de Merkle</strong> das transações. Alterar um bloco antigo exige recalcular todos os posteriores — daí a <strong>imutabilidade prática</strong>.</p>

<h2>2. Propriedades</h2>
<table><tbody>
<tr><td><strong>Descentralização</strong></td><td>Sem autoridade central; cada nó mantém uma cópia</td></tr>
<tr><td><strong>Integridade / imutabilidade</strong></td><td>Encadeamento por hash + consenso</td></tr>
<tr><td><strong>Transparência e auditabilidade</strong></td><td>Histórico verificável</td></tr>
<tr><td><strong>Não repúdio</strong></td><td>Transações assinadas com chave privada (ECDSA/EdDSA)</td></tr>
<tr><td><strong>Pseudonimato</strong></td><td>Endereços não são nomes — mas <strong>não há anonimato</strong>: análise de cadeia permite correlação</td></tr>
</tbody></table>
<div data-callout="warning"><p>Blockchain <strong>não garante confidencialidade</strong>. Ao contrário: em redes públicas, todos veem todas as transações. Confidencialidade exige camadas adicionais (canais privados, ZKP, criptografia do payload).</p></div>

<h2>3. Tipos</h2>
<table><tbody>
<tr><td><strong>Pública / sem permissão</strong></td><td>Qualquer um lê, escreve e participa do consenso (Bitcoin, Ethereum)</td></tr>
<tr><td><strong>Privada / com permissão</strong></td><td>Participantes identificados e autorizados (Hyperledger Fabric)</td></tr>
<tr><td><strong>Consórcio</strong></td><td>Governança compartilhada entre organizações</td></tr>
<tr><td><strong>Híbrida</strong></td><td>Combina elementos públicos e privados</td></tr>
</tbody></table>

<h2>4. Mecanismos de consenso</h2>
<table><tbody>
<tr><td><strong>PoW — Proof of Work</strong></td><td>Trabalho computacional (Bitcoin). Alto consumo energético; segurança pelo custo</td></tr>
<tr><td><strong>PoS — Proof of Stake</strong></td><td>Participação econômica (Ethereum pós-Merge). Eficiente; risco de concentração</td></tr>
<tr><td><strong>DPoS</strong></td><td>Delegação a validadores eleitos</td></tr>
<tr><td><strong>PBFT / Raft</strong></td><td>Redes permissionadas; tolerância a falhas bizantinas com número conhecido de nós</td></tr>
<tr><td><strong>PoA — Proof of Authority</strong></td><td>Validadores identificados e reputados</td></tr>
</tbody></table>
<p><strong>Ataque de 51%</strong>: controle da maioria do poder de mineração (PoW) ou do stake (PoS) permite reordenar transações e realizar <em>double spending</em> — mas <strong>não</strong> permite forjar assinaturas nem roubar moedas de terceiros.</p>

<h2>5. Contratos inteligentes</h2>
<p>Código autoexecutável na blockchain (Solidity na Ethereum, chaincode no Fabric). Vulnerabilidades típicas: <strong>reentrância</strong> (caso The DAO), overflow/underflow, controle de acesso ausente, dependência de <em>oráculo</em> manipulável, <em>front-running</em>. Uma vez implantado, o código é <strong>imutável</strong> — daí a criticidade da auditoria prévia.</p>

<h2>6. Aplicações em segurança e governo</h2>
<ul>
<li><strong>Notarização</strong> e prova de existência de documentos (registrar o hash, não o documento);</li>
<li><strong>Trilha de auditoria à prova de adulteração</strong> para logs críticos;</li>
<li><strong>Identidade autossoberana (SSI)</strong>, DIDs e credenciais verificáveis;</li>
<li>Rastreabilidade de cadeia de suprimentos e de artefatos de software;</li>
<li>No Brasil, iniciativas de blockchain em registros públicos e o <strong>Drex</strong> (real digital) do Banco Central.</li>
</ul>

<h2>7. Blockchain e LGPD — a tensão</h2>
<p>A imutabilidade conflita com o direito à <strong>eliminação</strong> (art. 18, VI) e à correção. Solução recomendada: <strong>não armazenar dado pessoal on-chain</strong> — grave apenas o <em>hash</em> ou ponteiro, mantendo o dado off-chain, onde pode ser corrigido ou eliminado. Atenção: <strong>hash de dado pessoal ainda pode ser dado pessoal</strong> (pseudonimização), pois permite verificação por força bruta em domínios pequenos.</p>

<h2>Erros clássicos de prova</h2>
<ol>
<li>Dizer que blockchain garante confidencialidade ou anonimato.</li>
<li>Afirmar que o ataque de 51% permite roubar carteiras alheias.</li>
<li>Achar que blockchain pública é adequada para armazenar dados pessoais.</li>
<li>Confundir PoW (trabalho) com PoS (participação).</li>
</ol>
`,
    questions: [
      {
        statement: 'Sobre as propriedades de segurança oferecidas por uma blockchain pública, assinale a alternativa correta.',
        options: [
          'Garante confidencialidade das transações, uma vez que os dados são criptografados de ponta a ponta.',
          'Garante integridade e não repúdio das transações registradas, mas não confidencialidade, já que os registros são publicamente verificáveis.',
          'Garante o anonimato completo dos participantes.',
          'Impede tecnicamente qualquer possibilidade de bifurcação (fork) da cadeia.',
          'Dispensa o uso de criptografia assimétrica.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'Propriedades', tags: ['blockchain', 'integridade', 'privacidade'],
        comment: 'Blockchain pública é pseudônima, não anônima: análise de cadeia associa endereços a identidades com frequência.',
        justification: 'O encadeamento por hash e o consenso garantem integridade; as assinaturas digitais garantem autenticidade e não repúdio. A confidencialidade não é propriedade nativa — as transações são públicas por design.',
      },
      {
        statement: 'Uma organização pretende utilizar blockchain para registrar dados pessoais de titulares, buscando garantir a imutabilidade dos registros. Sob a ótica da LGPD, essa arquitetura:',
        options: [
          'É plenamente adequada, pois a imutabilidade atende ao princípio da qualidade dos dados.',
          'Apresenta conflito com os direitos de correção e eliminação previstos no art. 18, sendo recomendável manter os dados pessoais off-chain e registrar apenas hashes ou referências.',
          'É vedada expressamente pela LGPD, que proíbe o uso de tecnologias distribuídas.',
          'Dispensa base legal, pois os dados registrados tornam-se automaticamente anonimizados.',
          'Elimina a figura do controlador, já que não há autoridade central.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'dificil',
        subtopic: 'Blockchain e LGPD', tags: ['blockchain', 'LGPD', 'privacy by design'],
        comment: 'Privacy by design aplicado: escolha de arquitetura é decisão de conformidade, não apenas técnica.',
        justification: 'A imutabilidade impede o atendimento aos direitos de correção (art. 18, III) e eliminação (art. 18, VI). O padrão recomendado é on-chain apenas o hash ou ponteiro, com o dado pessoal off-chain. Registrar hash não anonimiza automaticamente o dado.',
      },
      {
        statement: 'O chamado "ataque de 51%" em uma rede blockchain baseada em prova de trabalho permite ao atacante:',
        options: [
          'Forjar assinaturas digitais e movimentar fundos de carteiras de terceiros.',
          'Reorganizar blocos recentes e realizar gasto duplo (double spending), sem, contudo, conseguir falsificar assinaturas de transações alheias.',
          'Alterar retroativamente todo o histórico da cadeia desde o bloco gênese, sem custo adicional.',
          'Decifrar as chaves privadas dos demais participantes.',
          'Interromper permanentemente o funcionamento da rede.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'dificil',
        subtopic: 'Ataques', tags: ['blockchain', '51%', 'consenso'],
        comment: 'A segurança da assinatura vem da criptografia assimétrica, independente do poder de mineração.',
        justification: 'Com maioria do poder computacional o atacante controla a ordenação de blocos, podendo reverter transações recentes e gastar duas vezes. Não obtém, porém, as chaves privadas alheias, o que impede forjar assinaturas.',
      },
    ],
  },

  {
    subject: 'Microsoft 365 E5 — Proteção da Informação',
    summary: `
<h1>Microsoft 365 E5 — proteção da informação</h1>
<p>A licença <strong>E5</strong> agrega ao E3 as capacidades avançadas de segurança, conformidade e análise. O núcleo do tema é o <strong>Microsoft Purview</strong> (antigo Microsoft 365 Compliance) e o <strong>Microsoft Defender</strong>.</p>

<h2>1. Microsoft Purview Information Protection</h2>
<table><tbody>
<tr><td><strong>Sensitivity Labels</strong> (rótulos de confidencialidade)</td><td>Classificam e protegem o conteúdo; a proteção <strong>viaja com o arquivo</strong> (criptografia + direitos de uso via Azure Rights Management). Podem ser aplicados manual, automática ou recomendadamente</td></tr>
<tr><td><strong>Retention Labels e Policies</strong></td><td>Governança do ciclo de vida: reter, excluir, ou reter e depois excluir</td></tr>
<tr><td><strong>Sensitive Information Types (SITs)</strong></td><td>Padrões de dados sensíveis (CPF, cartão, etc.), com <strong>EDM</strong> (Exact Data Match) e classificadores treináveis</td></tr>
<tr><td><strong>Data Loss Prevention (DLP)</strong></td><td>Políticas em Exchange, SharePoint, OneDrive, Teams, <strong>endpoint</strong> e apps não Microsoft (via Defender for Cloud Apps)</td></tr>
<tr><td><strong>Double Key Encryption (DKE)</strong></td><td>Duas chaves: uma da Microsoft e outra sob controle exclusivo do cliente — para o dado mais sensível</td></tr>
<tr><td><strong>Customer Key / Customer Lockbox</strong></td><td>Chaves gerenciadas pelo cliente; aprovação explícita para acesso de engenheiros Microsoft aos dados</td></tr>
</tbody></table>

<h2>2. Governança e riscos internos</h2>
<ul>
<li><strong>Insider Risk Management</strong> — detecta exfiltração, vazamento e atividades de risco de colaboradores;</li>
<li><strong>Communication Compliance</strong> — monitora comunicações quanto a assédio, vazamento e conduta;</li>
<li><strong>eDiscovery (Premium)</strong> e <strong>Audit (Premium)</strong> — investigação, custódia legal e retenção estendida de logs;</li>
<li><strong>Compliance Manager</strong> — avaliação de conformidade e pontuação;</li>
<li><strong>Information Barriers</strong> — segregação de comunicação entre grupos.</li>
</ul>

<h2>3. Microsoft Defender (XDR)</h2>
<table><tbody>
<tr><td><strong>Defender for Endpoint</strong></td><td>EDR/AV de próxima geração, redução de superfície de ataque, gestão de vulnerabilidades</td></tr>
<tr><td><strong>Defender for Office 365</strong></td><td>Anti-phishing, Safe Links, Safe Attachments, simulação de ataque</td></tr>
<tr><td><strong>Defender for Identity</strong></td><td>Detecção de ataques a Active Directory local (Pass-the-Hash, Golden Ticket)</td></tr>
<tr><td><strong>Defender for Cloud Apps</strong></td><td><strong>CASB</strong> da Microsoft: shadow IT, controle de sessão, DLP em SaaS</td></tr>
<tr><td><strong>Microsoft Sentinel</strong></td><td><strong>SIEM/SOAR</strong> nativo de nuvem (licenciado à parte, por consumo)</td></tr>
</tbody></table>

<h2>4. Identidade (Microsoft Entra ID P2)</h2>
<p><strong>Acesso Condicional</strong> (políticas por risco, dispositivo, localização e aplicação), <strong>Identity Protection</strong> (risco de usuário e de entrada), <strong>Privileged Identity Management (PIM)</strong> — elevação <strong>just-in-time</strong> com aprovação e expiração —, e <strong>revisões de acesso</strong>.</p>

<h2>5. Relação com a LGPD</h2>
<p>Os rótulos de confidencialidade + DLP + retenção operacionalizam os princípios de <strong>segurança (art. 6º, VII)</strong>, <strong>necessidade</strong> e <strong>finalidade</strong>, e o <strong>art. 46</strong>. O Insider Risk apoia a detecção de vazamento; o Audit e o eDiscovery sustentam a <strong>responsabilização e prestação de contas</strong>. Atenção: monitoramento de colaboradores exige base legal, política prévia e proporcionalidade.</p>

<h2>Erros clássicos de prova</h2>
<ol>
<li>Confundir <strong>rótulo de confidencialidade</strong> (classifica e protege) com <strong>rótulo de retenção</strong> (governa o ciclo de vida).</li>
<li>Achar que o Microsoft Sentinel está incluído no E5 — ele é cobrado por consumo, à parte.</li>
<li>Dizer que o DLP atua apenas em e-mail — cobre também SharePoint, OneDrive, Teams e endpoints.</li>
<li>Confundir Defender for Identity (AD local) com Entra ID Protection (identidade em nuvem).</li>
</ol>
`,
    questions: [
      {
        statement: 'No Microsoft Purview, o recurso que classifica um documento e aplica proteção que permanece vinculada ao arquivo mesmo quando ele é copiado para fora do ambiente corporativo, mediante criptografia e definição de direitos de uso, é:',
        options: [
          'Retention Label (rótulo de retenção).',
          'Sensitivity Label (rótulo de confidencialidade).',
          'Communication Compliance.',
          'Information Barrier.',
          'Compliance Manager.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'Purview Information Protection', tags: ['M365', 'Purview', 'rótulos'],
        comment: 'Confidencialidade = protege o conteúdo. Retenção = governa por quanto tempo o conteúdo existe. Um arquivo pode ter os dois.',
        justification: 'Os Sensitivity Labels aplicam criptografia e direitos de uso via Azure Rights Management, mantendo a proteção mesmo fora do perímetro. Os Retention Labels tratam do ciclo de vida da informação.',
      },
      {
        statement: 'O componente do Microsoft Defender que atua como Cloud Access Security Broker (CASB), oferecendo descoberta de shadow IT, controle de sessão em tempo real e políticas de DLP sobre aplicações SaaS, é o:',
        options: [
          'Defender for Endpoint.',
          'Defender for Office 365.',
          'Defender for Identity.',
          'Defender for Cloud Apps.',
          'Microsoft Sentinel.',
        ],
        correct: 3,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'Defender', tags: ['M365', 'CASB', 'Defender'],
        comment: 'Defender for Identity cuida do AD local; Entra ID Protection cuida da identidade em nuvem. São produtos distintos.',
        justification: 'O Microsoft Defender for Cloud Apps é a solução CASB da Microsoft, com os quatro pilares de visibilidade, conformidade, segurança de dados e proteção contra ameaças.',
      },
      {
        statement: 'No Microsoft Entra ID P2, o recurso que permite conceder privilégios administrativos de forma temporária, mediante ativação sob demanda com aprovação e expiração automática, reduzindo a existência de administradores permanentes, é o:',
        options: [
          'Acesso Condicional.',
          'Privileged Identity Management (PIM).',
          'Identity Protection.',
          'Revisões de Acesso.',
          'Autenticação multifator.',
        ],
        correct: 1,
        banca: 'FGV (estilo)', year: 2026, orgao: 'DATAPREV', difficulty: 'media',
        subtopic: 'Identidade', tags: ['Entra ID', 'PIM', 'PAM'],
        comment: 'PIM é a implementação Microsoft do conceito de just-in-time access e zero standing privileges, tratado em PAM.',
        justification: 'O PIM implementa elevação just-in-time com justificativa, aprovação, tempo limitado e trilha de auditoria. Acesso Condicional avalia contexto de entrada; Identity Protection avalia risco; Revisões de Acesso recertificam permissões existentes.',
      },
    ],
  },
];
