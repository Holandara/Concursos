/**
 * Conteúdo programático extraído do Edital DATAPREV 001/2026 (Anexo I)
 * exclusivamente para o cargo/perfil:
 *   ANALISTA DE TECNOLOGIA DA INFORMAÇÃO — PERFIL 5: SEGURANÇA CIBERNÉTICA E PROTEÇÃO DE DADOS
 *
 * Estrutura: Módulo I (Conhecimentos Gerais — comum a todos os cargos, portanto
 * cobrado deste perfil) + Módulo II (Conhecimentos Específicos do Perfil 5).
 *
 * Para adicionar um NOVO CONCURSO: crie outro arquivo neste diretório seguindo o
 * mesmo formato `ContestSeed` e registre-o em `seed.ts` — nada mais precisa mudar.
 */

export interface SubjectSeed {
  title: string;
  topics?: string[];
  children?: SubjectSeed[];
}

export interface ContestSeed {
  slug: string;
  name: string;
  role: string;
  year: number;
  tree: SubjectSeed[];
}

export const EDITAL_DATAPREV_SEGURANCA: ContestSeed = {
  slug: 'dataprev-2026-seguranca',
  name: 'DATAPREV 2026',
  role: 'Segurança Cibernética e Proteção de Dados (Perfil 5)',
  year: 2026,
  tree: [
    {
      title: 'Conhecimentos Gerais (Módulo I)',
      children: [
        {
          title: 'Língua Portuguesa',
          topics: [
            'Compreensão e interpretação de textos de gêneros variados',
            'Reconhecimento de tipos e gêneros textuais',
            'Domínio da ortografia oficial',
            'Mecanismos de coesão textual: referenciação, substituição, repetição, conectores e sequenciação',
            'Emprego de tempos e modos verbais',
            'Estrutura morfossintática do período: classes de palavras, coordenação e subordinação',
            'Emprego dos sinais de pontuação',
            'Concordância verbal e nominal',
            'Regência verbal e nominal',
            'Emprego do sinal indicativo de crase',
            'Colocação dos pronomes átonos',
            'Reescrita de frases e parágrafos: significação, substituição, reorganização e níveis de formalidade',
          ],
        },
        {
          title: 'Língua Inglesa',
          topics: [
            'Compreensão de textos em língua inglesa',
            'Itens gramaticais relevantes para o entendimento dos sentidos dos textos',
          ],
        },
        {
          title: 'Raciocínio Lógico',
          topics: [
            'Estruturas lógicas',
            'Lógica de argumentação: analogias, inferências, deduções e conclusões',
            'Lógica sentencial (proposicional): proposições simples e compostas',
            'Tabelas-verdade',
            'Equivalências',
            'Diagramas lógicos',
            'Lógica de primeira ordem',
            'Problemas aritméticos, geométricos e matriciais',
          ],
        },
        {
          title: 'Atualidades e Inteligência Artificial',
          topics: [
            'Tópicos relevantes e atuais: segurança, transportes, política, economia, sociedade, educação, saúde, cultura, tecnologia, energia, relações internacionais, desenvolvimento sustentável e ecologia',
            'Conceitos de inteligência artificial',
            'Aprendizado de máquina',
            'Introdução aos modelos generativos e modelos de linguagem',
            'Ética, governança e privacidade em IA',
          ],
        },
        {
          title: 'Legislação de SI e Proteção de Dados',
          children: [
            {
              title: 'Lei nº 12.527/2011 — Lei de Acesso à Informação',
              topics: ['Capítulos I, II, III, IV e V', 'Decreto nº 7.724/2012', 'Decreto nº 7.845/2012'],
            },
            {
              title: 'Lei nº 12.737/2012 — Delitos Informáticos',
              topics: ['Art. 2º (invasão de dispositivo informático — art. 154-A e 154-B do CP)'],
            },
            {
              title: 'Lei nº 12.965/2014 — Marco Civil da Internet',
              topics: ['Capítulo II, Seção I', 'Capítulo III, Seções I e II'],
            },
            {
              title: 'Lei nº 13.709/2018 — LGPD',
              topics: ['Capítulos I, II, III, IV, VII, VIII e IX'],
            },
          ],
        },
      ],
    },
    {
      title: 'Redes de Computadores',
      children: [
        {
          title: 'Conceitos de Redes',
          topics: [
            'Meios de transmissão',
            'Classificação de redes',
            'Topologia de redes',
            'Redes de longa distância (WAN)',
            'Redes locais (LAN)',
            'Redes sem fio',
          ],
        },
        {
          title: 'Interconexão de Redes',
          topics: ['Hubs repetidores', 'Switches', 'Roteadores', 'VLANs', 'Cabeamento estruturado'],
        },
        {
          title: 'Modelo de Referência OSI',
          topics: ['Noções do modelo OSI (Open System Interconnection Reference Model) e suas camadas'],
        },
        {
          title: 'Padrões IEEE 802',
          topics: ['IEEE 802.1', 'IEEE 802.3', 'IEEE 802.11 a/b/g/n/ac'],
        },
        {
          title: 'Arquitetura TCP/IP',
          topics: [
            'Camada de rede: IPv4, IPv6 e IPsec',
            'Conceitos básicos de endereçamento e roteamento',
            'Camada de transporte: TCP e UDP',
            'Camada de aplicação: FTP, SSH, DNS, SMTP, POP, IMAP, HTTP, HTTPS, SSL, RDP, DHCP',
            'Sistemas de nomes (DNS)',
          ],
        },
        {
          title: 'Gerência de Redes',
          topics: ['Conceitos do protocolo SNMP', 'Conceitos do protocolo RMON'],
        },
      ],
    },
    {
      title: 'Segurança da Informação',
      children: [
        { title: 'Políticas de Segurança da Informação', topics: ['Políticas de segurança da informação', 'Procedimentos de segurança', 'Conceitos gerais de gerenciamento', 'Políticas de segurança e regulamentos afins'] },
        { title: 'ISO/IEC 27001:2022', topics: ['Sistema de Gestão de Segurança da Informação (SGSI)', 'Requisitos da norma ABNT NBR ISO/IEC 27001:2022'] },
        { title: 'ISO/IEC 27002:2022', topics: ['Controles de segurança da informação', 'Categorias: organizacionais, de pessoas, físicos e tecnológicos'] },
        { title: 'Segurança de Redes e Redes Sem Fio', topics: ['Segurança de redes de computadores', 'Segurança em redes sem fio', 'Redes de computadores e protocolos de comunicação'] },
        { title: 'Vulnerabilidades e Ataques', topics: ['Vulnerabilidades e ataques a sistemas computacionais', 'Análise de vulnerabilidade', 'Gestão de vulnerabilidades'] },
        { title: 'Firewalls, Proxies e VPNs', topics: ['Ataques e proteções relativos a hardware, software, sistemas operacionais, aplicações, bancos de dados e redes', 'Firewalls e proxies', 'IPSEC VPN e SSL VPN', 'Proteção em computação em nuvem'] },
        { title: 'Segurança Física e Lógica', topics: ['Segurança física e lógica dos ativos de TI'] },
        {
          title: 'Criptografia',
          topics: [
            'Conceitos de criptografia e aplicações',
            'Sistemas criptográficos simétricos e assimétricos (chave pública)',
            'Modos de operação de cifras',
            'Certificação e assinatura digital',
            'Tokens e smartcards',
            'Protocolos criptográficos',
            'Características do RSA, DES e AES',
            'Funções hash: MD5 e SHA-1',
            'Esteganografia',
          ],
        },
        { title: 'Softwares Maliciosos', topics: ['Ransomware', 'Vírus', 'Worms', 'Spywares', 'Rootkits', 'Proteção contra softwares maliciosos'] },
        { title: 'IDS, IPS e SIEM', topics: ['IDS (Intrusion Detection System)', 'IPS (Intrusion Prevention System)', 'SIEM (Security Information and Event Management)', 'Sistemas de detecção de intrusão'] },
        { title: 'Segurança de Servidores e SO', topics: ['Segurança de servidores', 'Segurança de sistemas operacionais'] },
        { title: 'Certificação Digital', topics: ['Certificação digital', 'ICP-Brasil', 'Assinatura digital'] },
        {
          title: 'Gestão de Riscos',
          topics: [
            'ABNT NBR ISO/IEC 27005:2019',
            'ABNT NBR ISO 31000:2018 — Gestão de riscos: diretrizes',
            'Planejamento, identificação e análise de riscos',
          ],
        },
        {
          title: 'Continuidade de Negócio',
          topics: [
            'Plano de continuidade de negócio',
            'ABNT NBR ISO 22301:2020 — Sistema de gestão de continuidade de negócios: requisitos',
            'ABNT NBR ISO 22313:2020 — Orientações para uso da ISO 22301',
          ],
        },
        { title: 'LGPD — Lei nº 13.709/2018', topics: ['Lei Geral de Proteção de Dados Pessoais e suas alterações', 'Fundamentos, princípios e bases legais', 'Direitos dos titulares', 'Agentes de tratamento', 'ANPD e sanções'] },
        { title: 'NIST Cybersecurity Framework 1.1', topics: ['Funções: Identify, Protect, Detect, Respond, Recover', 'Categorias e subcategorias', 'Tiers e profiles'] },
        { title: 'Defesa Moderna: BAS, XDR, SOAR, CASB, UEBA', topics: ['Breach and Attack Simulation (BAS)', 'Extended Detection and Response (XDR)', 'Security Orchestration, Automation and Response (SOAR)', 'Cloud Access Security Brokers (CASB)', 'User and Entity Behavior Analytics (UEBA)'] },
        {
          title: 'Operação de Segurança (SOC)',
          topics: [
            'Firewall, Proxy, IPS/IDS',
            'DLP e CASB',
            'SIEM, Antivírus, EDR, WAF',
            'Gestão de vulnerabilidades',
            'Monitoração',
            'Backup',
          ],
        },
        { title: 'Desenvolvimento Seguro', topics: ['Técnicas de desenvolvimento seguro', 'SAST (Static Application Security Testing)', 'DAST (Dynamic Application Security Testing)', 'IAST (Interactive Application Security Testing)'] },
        { title: 'Gestão de Identidade e Acesso', topics: ['Gestão de identidade e acesso (IAM)', 'Gerenciamento de acessos privilegiados (PAM)'] },
        {
          title: 'Resposta a Incidentes',
          topics: [
            'Gerenciamento de resposta a incidente (NIST SP 800-61)',
            'Prevenção e tratamento de incidentes',
            'Detecção, resposta, tratamento e recuperação de incidentes cibernéticos',
          ],
        },
        { title: 'Threat Intelligence e Threat Hunting', topics: ['Threat intel', 'Threat hunting'] },
        { title: 'Testes de Penetração (Pentest)', topics: ['Testes de penetração em aplicações web, infraestrutura, APIs e dispositivos móveis'] },
        { title: 'Modelagem de Ameaças', topics: ['STRIDE e outras metodologias de modelagem de ameaças'] },
        { title: 'MITRE ATT&CK', topics: ['Conhecimento das táticas do framework MITRE ATT&CK', 'Técnicas e procedimentos (TTPs)'] },
        { title: 'Segurança em IoT', topics: ['Segurança em dispositivos e ecossistemas IoT'] },
        {
          title: 'Programação para Segurança',
          topics: [
            'Perl, Python, C, C++, C#',
            'Shell Script e PowerShell',
            'Gitlab, HTML5, CSS3',
            'Java e JavaScript (React.js)',
            'Spring Boot e Spring Cloud',
            'Confluent Kafka',
          ],
        },
        { title: 'Direito Digital', topics: ['Direito digital aplicado à segurança da informação'] },
        { title: 'GDPR', topics: ['General Data Protection Regulation (Regulamento Geral de Proteção de Dados da UE)'] },
        { title: 'Containers', topics: ['Conceitos de containers', 'Segurança em containers'] },
        { title: 'Anonimização e Pseudonimização', topics: ['Conceitos e técnicas de anonimização', 'Pseudonimização', 'Reidentificação'] },
        { title: 'Blockchain', topics: ['Conceitos de blockchain'] },
        { title: 'Microsoft 365 E5 — Proteção da Informação', topics: ['Funcionalidades de proteção da informação da suíte Microsoft 365 E5'] },
      ],
    },
    {
      title: 'Gestão e Governança de TI',
      children: [
        { title: 'Gerenciamento Ágil de Projetos', topics: ['Gerenciamento ágil de projetos', 'Frameworks ágeis (Scrum, Kanban)'] },
        { title: 'Processos e Grupos de Processos', topics: ['Processos, grupos de processos e áreas de conhecimento'] },
        { title: 'Gestão de Riscos de TI', topics: ['Gestão de riscos em projetos e serviços de TI'] },
        { title: 'ITIL v4', topics: ['Conceitos básicos, disciplinas, estrutura e objetivos', 'Cadeia de valor de serviço', 'Práticas de gerenciamento'] },
        { title: 'COBIT 2019', topics: ['Conceitos básicos, estrutura e objetivos', 'Princípios de governança', 'Objetivos de governança e gestão'] },
      ],
    },
    {
      title: 'Computação em Nuvem',
      children: [
        { title: 'Conceitos e Tipologia', topics: ['Conceitos básicos de computação em nuvem', 'Tipologia: IaaS, PaaS, SaaS', 'Modelos: nuvem privada, pública e híbrida'] },
        {
          title: 'Arquitetura em Nuvem',
          topics: [
            'Benefícios: alta disponibilidade, escalabilidade, elasticidade, agilidade e recuperação de desastres',
            'Distribuição geográfica, regiões e zonas de disponibilidade',
            'Subscrições, grupos de gestão e recursos',
          ],
        },
        { title: 'Identidade e Segurança na Nuvem', topics: ['Características gerais de identidade, privacidade, conformidade e segurança na nuvem'] },
        { title: 'IaC e Automação', topics: ['Infrastructure as Code (IaC)', 'Automação'] },
        { title: 'AWS, Google Cloud e Azure', topics: ['Principais produtos e soluções da AWS', 'Principais produtos e soluções do Google Cloud', 'Principais produtos e soluções da Azure'] },
      ],
    },
  ],
};
