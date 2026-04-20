export type Locale = 'pt' | 'en' | 'es';

export const locales: Locale[] = ['pt', 'en', 'es'];

// Ano em que comecei como dev Full Stack na Reale Tech.
// A partir daqui o "Há X anos" do about é calculado dinamicamente em build.
const REALE_START_YEAR = 2023;

export function yearsOfExperience(now = new Date()): number {
  return Math.max(1, now.getFullYear() - REALE_START_YEAR);
}

export function yearsPhrase(locale: Locale, now = new Date()): string {
  const years = yearsOfExperience(now);
  if (locale === 'pt') {
    return years === 1 ? 'Há 1 ano' : `Há ${years} anos`;
  }
  if (locale === 'en') {
    return years === 1 ? '1 year' : `${years} years`;
  }
  // es
  return years === 1 ? 'Hace 1 año' : `Hace ${years} años`;
}

export const cvPath: Record<Locale, string> = {
  pt: '/assets/static/Curriculo_Jesse_Oliveira_PT.pdf',
  en: '/assets/static/Resume_Jesse_Oliveira_EN.pdf',
  es: '/assets/static/CV_Jesse_Oliveira_ES.pdf',
};

export const pageTitle: Record<Locale, string> = {
  pt: 'Jessé Oliveira | Full Stack & Mobile Developer',
  en: 'Jessé Oliveira | Full Stack & Mobile Developer',
  es: 'Jessé Oliveira | Desarrollador Full Stack & Mobile',
};

export const langAttr: Record<Locale, string> = {
  pt: 'pt-br',
  en: 'en',
  es: 'es',
};

type UI = {
  loader: string;
  contact: string;
  cvLabel: string;
  explore: string;
  heroSub: string;
  marqueeDeveloper: string;
  home: string;
  about: string;
  skills: string;
  education: string;
  projects: string;
  experience: string;
  aboutLabel: string;
  aboutHeading: [string, string];
  aboutStat: [string, string, string];
  aboutRole: string;
  aboutParagraphs: [string, string, string];
  aboutLocation: string;
  divider1: [string, string, string, string];
  skillsLabel: string;
  skillsHeading: [string, string];
  skillCats: {
    frontend: string;
    backend: string;
    mobile: string;
    tools: { title: string; desc: string };
  };
  skillFrontendDesc: string;
  skillBackendDesc: string;
  skillMobileDesc: string;
  divider2: [string, string];
  educationLabel: string;
  educationHeading: [string, string];
  educationBadge: string;
  educationTitle: string;
  educationInst: string;
  educationCampus: string;
  educationNow: string;
  educationHighlights: [string, string, string];
  projectsLabel: string;
  projectsHeading: [string, string];
  projectList: {
    tapuia: { type: string; title: string; desc: string; link1: string; link2: string };
    mda: { type: string; title: string; desc: string; link1: string };
    natal: { type: string; title: string; desc: string; link: string };
    ebd: { type: string; title: string; desc: string };
    nivatto: { type: string; title: string; desc: string; link: string };
  };
  experienceLabel: string;
  experienceHeading: [string, string];
  experienceBadge: string;
  experienceRole: string;
  experienceCompany: string;
  experienceDesc: string;
  experiencePresent: string;
  experienceSkills: [string, string, string, string];
  footerCtaLabel: string;
  footerCtaHeading: [string, string];
  footerCtaBtn: string;
  footerTagline: string;
  footerNav: string;
  footerContact: string;
  footerSocial: string;
  footerBy: string;
};

const pt: UI = {
  loader: 'Carregando...',
  contact: 'Contato',
  cvLabel: 'Currículo',
  explore: 'Explorar',
  heroSub: 'Web, mobile e Linux — codando desde 2023.',
  marqueeDeveloper: 'DESENVOLVEDOR',
  home: 'Home',
  about: 'Sobre',
  skills: 'Skills',
  education: 'Educação',
  projects: 'Projetos',
  experience: 'Experiência',
  aboutLabel: '// Sobre Mim',
  aboutHeading: ['Quem está por', 'trás do <i class="serif-accent">código</i><span class="accent">?</span>'],
  aboutStat: ['Anos exp.', 'Tecnologias', 'Projetos'],
  aboutRole: 'Full Stack & Mobile Developer',
  aboutParagraphs: [
    'Sou Jessé, dev em Valença/BA. {{yearsPhrase}} faço Full Stack na Reale Tech — mas código, pra mim, começou com mods de Minecraft em Java pra jogar com os amigos no servidor.',
    'A stack hoje é <strong>React, Tailwind, PHP, MySQL, Node.js, Dart/Flutter, Python</strong> — o que o projeto pedir. Se tem Linux no meio, melhor ainda.',
    'Gosto mais do momento em que o sistema sai do papel e alguém de verdade usa — mesmo que seja pra reclamar. Prefiro projeto com restrição clara a liberdade total. E se você acha café uma personalidade, a gente provavelmente se entende.',
  ],
  aboutLocation: 'Valença, BA — Brasil',
  divider1: ['Código que', '<em class="serif-italic">resolve</em>,', 'código que', '<em class="serif-italic">dura</em>.'],
  skillsLabel: '// Skills & Habilidades',
  skillsHeading: ['Meu <i class="serif-accent">arsenal</i>', 'tecnológico<span class="accent">.</span>'],
  skillCats: {
    frontend: 'O que o usuário toca.',
    backend: 'O que faz a tela existir.',
    mobile: 'Flutter, quando não dá pra ser web.',
    tools: { title: 'DevOps & Tools', desc: 'Linux, git, e a pilha invisível.' },
  },
  skillFrontendDesc: 'O que o usuário toca.',
  skillBackendDesc: 'O que faz a tela existir.',
  skillMobileDesc: 'Flutter, quando não dá pra ser web.',
  divider2: ['Do backlog', 'ao <em class="serif-italic">deploy</em>.'],
  educationLabel: '// Formação Acadêmica',
  educationHeading: ['Minha', '<i class="serif-accent">jornada</i> acadêmica<span class="accent">.</span>'],
  educationBadge: 'Cursando',
  educationTitle: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
  educationInst: 'Instituto Federal de Educação Ciência e Tecnologia da Bahia',
  educationCampus: 'Campus Valença',
  educationNow: 'Agora',
  educationHighlights: ['Desenvolvimento de Software', 'Banco de Dados', 'Segurança da Informação'],
  projectsLabel: '// Projetos Realizados',
  projectsHeading: ['Trabalhos em', '<i class="serif-accent">destaque</i><span class="accent">.</span>'],
  projectList: {
    tapuia: {
      type: 'Projeto Profissional — Reale Tech',
      title: 'Tapuia',
      desc: 'Software de gestão da Tarifa Pública Unificada de Inteligência Administrativa da Prefeitura de Valença/BA. Sistema completo para operadores nos terminais hidroviários, cobrança de tarifas turísticas, relatórios e dashboard administrativo.',
      link1: 'Site institucional',
      link2: 'Sistema de gestão',
    },
    mda: {
      type: 'Projeto Profissional — Reale Tech',
      title: 'Melhores do Ano Valença',
      desc: 'Plataforma web e app mobile para votação do Prêmio Melhores do Ano de Valença/BA. Sistema de votação Top of Mind com diversas categorias de empresas e profissionais locais, apuração em tempo real e ranking.',
      link1: 'Ver site',
    },
    natal: {
      type: 'Projeto Profissional — Reale Tech',
      title: 'Natal Iluminado Valença',
      desc: 'Plataforma de votação online para o concurso de decoração natalina de Valença/BA. Sistema de votação popular, cadastro de empresas participantes, avaliação técnica e ranking em tempo real com premiação de R$ 15 mil.',
      link: 'Ver projeto',
    },
    ebd: {
      type: 'Projeto Profissional — Reale Tech',
      title: 'Sistema EBD',
      desc: 'Aplicativo mobile para gestão de Escolas Bíblicas Dominicais. Controle de presença, cadastro de alunos e professores, relatórios de frequência e gerenciamento de turmas.',
    },
    nivatto: {
      type: 'Projeto Pessoal — Nivatto',
      title: 'Portfolio Nivatto',
      desc: 'Portfolio interativo com 4 aplicações web completas: Dashboard financeiro com gráficos e KPIs, Kanban board estilo Jira com sprints e time tracking, E-commerce com carrinho e checkout, e Landing page SaaS com animações.',
      link: 'Ver portfolio',
    },
  },
  experienceLabel: '// Experiência Profissional',
  experienceHeading: ['Onde eu', '<i class="serif-accent">atuei</i><span class="accent">.</span>'],
  experienceBadge: 'Emprego Atual',
  experienceRole: 'Desenvolvedor Full Stack',
  experienceCompany: 'Reale Tech — Soluções em Tecnologia da Informação',
  experienceDesc: 'Toco projeto do começo — entender o que o cliente precisa de verdade — até o deploy. Stacks que já entreguei: Laravel + React, Flutter + PHP, e bastante manutenção de código legado que ninguém mais queria olhar.',
  experiencePresent: 'Atual',
  experienceSkills: ['Desenvolvimento Web', 'Mobile', 'Banco de Dados', 'Versionamento'],
  footerCtaLabel: '// Vamos conversar?',
  footerCtaHeading: ['Tem um projeto', 'em mente<span class="accent">?</span>'],
  footerCtaBtn: 'Entre em contato',
  footerTagline: 'Dev Full Stack & Mobile. Valença/BA, Brasil.',
  footerNav: 'Navegação',
  footerContact: 'Contato',
  footerSocial: 'Social',
  footerBy: 'Desenvolvido por',
};

const en: UI = {
  loader: 'Loading...',
  contact: 'Contact',
  cvLabel: 'Resume',
  explore: 'Explore',
  heroSub: 'Web, mobile, and Linux — coding since 2023.',
  marqueeDeveloper: 'DEVELOPER',
  home: 'Home',
  about: 'About',
  skills: 'Skills',
  education: 'Education',
  projects: 'Projects',
  experience: 'Experience',
  aboutLabel: '// About Me',
  aboutHeading: ["Who's behind", 'the <i class="serif-accent">code</i><span class="accent">?</span>'],
  aboutStat: ['Years exp.', 'Technologies', 'Projects'],
  aboutRole: 'Full Stack & Mobile Developer',
  aboutParagraphs: [
    "I'm Jessé, a dev based in Valença, Brazil. {{yearsPhrase}} Full Stack at Reale Tech — but for me, code started with Minecraft mods in Java, so I could play with friends on the server.",
    'Today the stack is <strong>React, Tailwind, PHP, MySQL, Node.js, Dart/Flutter, Python</strong> — whatever the project needs. Bonus points if Linux is in the mix.',
    "What I like most is the moment a system leaves the doc and someone actually uses it — even if only to complain. I'd rather work with a clear constraint than total freedom. And if you consider coffee a personality trait, we'll probably get along.",
  ],
  aboutLocation: 'Valença, BA — Brazil',
  divider1: ['Code that', '<em class="serif-italic">works</em>,', 'code that', '<em class="serif-italic">lasts</em>.'],
  skillsLabel: '// Skills & Expertise',
  skillsHeading: ['My tech', '<i class="serif-accent">arsenal</i><span class="accent">.</span>'],
  skillCats: {
    frontend: 'What the user touches.',
    backend: 'What makes the screen exist.',
    mobile: "Flutter — when web won't cut it.",
    tools: { title: 'DevOps & Tools', desc: 'Linux, git, the invisible stack.' },
  },
  skillFrontendDesc: 'What the user touches.',
  skillBackendDesc: 'What makes the screen exist.',
  skillMobileDesc: "Flutter — when web won't cut it.",
  divider2: ['From backlog', 'to <em class="serif-italic">deploy</em>.'],
  educationLabel: '// Academic Background',
  educationHeading: ['My', 'academic <i class="serif-accent">journey</i><span class="accent">.</span>'],
  educationBadge: 'In Progress',
  educationTitle: 'Technologist Degree in Systems Analysis and Development',
  educationInst: 'Federal Institute of Education, Science and Technology of Bahia',
  educationCampus: 'Valença Campus',
  educationNow: 'Now',
  educationHighlights: ['Software Development', 'Databases', 'Information Security'],
  projectsLabel: '// Featured Projects',
  projectsHeading: ['Featured', '<i class="serif-accent">work</i><span class="accent">.</span>'],
  projectList: {
    tapuia: {
      type: 'Professional Project — Reale Tech',
      title: 'Tapuia',
      desc: 'Management software for the Unified Public Administrative Intelligence Fee of the Valença/BA City Hall. Complete system for operators at waterway terminals, tourist fee collection, reports and administrative dashboard.',
      link1: 'Official website',
      link2: 'Management system',
    },
    mda: {
      type: 'Professional Project — Reale Tech',
      title: 'Best of the Year Valença',
      desc: 'Web platform and mobile app for the Best of the Year Award in Valença/BA. Top of Mind voting system with several categories of local companies and professionals, real-time tally and ranking.',
      link1: 'Visit website',
    },
    natal: {
      type: 'Professional Project — Reale Tech',
      title: 'Natal Iluminado Valença',
      desc: 'Online voting platform for the Christmas decoration contest in Valença/BA. Popular voting system, registration of participating companies, technical evaluation and real-time ranking with a R$ 15k prize.',
      link: 'View project',
    },
    ebd: {
      type: 'Professional Project — Reale Tech',
      title: 'EBD System',
      desc: 'Mobile application for managing Sunday Bible Schools. Attendance tracking, student and teacher registration, attendance reports and class management.',
    },
    nivatto: {
      type: 'Personal Project — Nivatto',
      title: 'Portfolio Nivatto',
      desc: 'Interactive portfolio with 4 complete web applications: financial dashboard with charts and KPIs, Jira-style Kanban board with sprints and time tracking, e-commerce with cart and checkout, and a SaaS landing page with animations.',
      link: 'View portfolio',
    },
  },
  experienceLabel: '// Professional Experience',
  experienceHeading: ['Where I', '<i class="serif-accent">worked</i><span class="accent">.</span>'],
  experienceBadge: 'Current Role',
  experienceRole: 'Full Stack Developer',
  experienceCompany: 'Reale Tech — Information Technology Solutions',
  experienceDesc: "I take projects from start — figuring out what the client actually needs — all the way to deploy. Stacks I've shipped: Laravel + React, Flutter + PHP, and plenty of legacy code nobody else wanted to touch.",
  experiencePresent: 'Present',
  experienceSkills: ['Web Development', 'Mobile', 'Databases', 'Version Control'],
  footerCtaLabel: "// Let's talk?",
  footerCtaHeading: ['Got a project', 'in mind<span class="accent">?</span>'],
  footerCtaBtn: 'Get in touch',
  footerTagline: 'Full Stack & Mobile Developer. Valença, Brazil.',
  footerNav: 'Navigation',
  footerContact: 'Contact',
  footerSocial: 'Social',
  footerBy: 'Developed by',
};

const es: UI = {
  loader: 'Cargando...',
  contact: 'Contacto',
  cvLabel: 'Currículum',
  explore: 'Explorar',
  heroSub: 'Web, mobile y Linux — programando desde 2023.',
  marqueeDeveloper: 'DESARROLLADOR',
  home: 'Inicio',
  about: 'Sobre mí',
  skills: 'Skills',
  education: 'Educación',
  projects: 'Proyectos',
  experience: 'Experiencia',
  aboutLabel: '// Sobre mí',
  aboutHeading: ['¿Quién está', 'detrás del <i class="serif-accent">código</i><span class="accent">?</span>'],
  aboutStat: ['Años exp.', 'Tecnologías', 'Proyectos'],
  aboutRole: 'Full Stack & Mobile Developer',
  aboutParagraphs: [
    'Soy Jessé, dev en Valença/BA, Brasil. {{yearsPhrase}} que hago Full Stack en Reale Tech — pero para mí, el código empezó con mods de Minecraft en Java, para jugar con los amigos en el servidor.',
    'El stack hoy es <strong>React, Tailwind, PHP, MySQL, Node.js, Dart/Flutter, Python</strong> — lo que pida el proyecto. Y si hay Linux de por medio, mejor todavía.',
    'Lo que más disfruto es el momento en que el sistema sale del documento y alguien lo usa de verdad — aunque sea para quejarse. Prefiero trabajar con una restricción clara que con libertad total. Y si para vos el café cuenta como personalidad, probablemente nos vamos a entender.',
  ],
  aboutLocation: 'Valença, BA — Brasil',
  divider1: ['Código que', '<em class="serif-italic">funciona</em>,', 'código que', '<em class="serif-italic">perdura</em>.'],
  skillsLabel: '// Skills y Habilidades',
  skillsHeading: ['Mi <i class="serif-accent">arsenal</i>', 'tecnológico<span class="accent">.</span>'],
  skillCats: {
    frontend: 'Lo que el usuario toca.',
    backend: 'Lo que hace que la pantalla exista.',
    mobile: 'Flutter, cuando la web no basta.',
    tools: { title: 'DevOps & Tools', desc: 'Linux, git, el stack invisible.' },
  },
  skillFrontendDesc: 'Lo que el usuario toca.',
  skillBackendDesc: 'Lo que hace que la pantalla exista.',
  skillMobileDesc: 'Flutter, cuando la web no basta.',
  divider2: ['Del backlog', 'al <em class="serif-italic">deploy</em>.'],
  educationLabel: '// Formación Académica',
  educationHeading: ['Mi', '<i class="serif-accent">trayectoria</i> académica<span class="accent">.</span>'],
  educationBadge: 'Cursando',
  educationTitle: 'Tecnólogo en Análisis y Desarrollo de Sistemas',
  educationInst: 'Instituto Federal de Educación, Ciencia y Tecnología de Bahía',
  educationCampus: 'Campus Valença',
  educationNow: 'Ahora',
  educationHighlights: ['Desarrollo de Software', 'Bases de Datos', 'Seguridad de la Información'],
  projectsLabel: '// Proyectos Destacados',
  projectsHeading: ['Trabajos', '<i class="serif-accent">destacados</i><span class="accent">.</span>'],
  projectList: {
    tapuia: {
      type: 'Proyecto Profesional — Reale Tech',
      title: 'Tapuia',
      desc: 'Software de gestión de la Tarifa Pública Unificada de Inteligencia Administrativa de la Alcaldía de Valença/BA. Sistema completo para operadores en los terminales acuáticos, cobro de tarifas turísticas, reportes y dashboard administrativo.',
      link1: 'Sitio institucional',
      link2: 'Sistema de gestión',
    },
    mda: {
      type: 'Proyecto Profesional — Reale Tech',
      title: 'Mejores del Año Valença',
      desc: 'Plataforma web y app mobile para la votación del Premio Mejores del Año de Valença/BA. Sistema de votación Top of Mind con diversas categorías de empresas y profesionales locales, recuento en tiempo real y ranking.',
      link1: 'Ver sitio',
    },
    natal: {
      type: 'Proyecto Profesional — Reale Tech',
      title: 'Natal Iluminado Valença',
      desc: 'Plataforma de votación online para el concurso de decoración navideña de Valença/BA. Sistema de votación popular, registro de empresas participantes, evaluación técnica y ranking en tiempo real con premio de R$ 15 mil.',
      link: 'Ver proyecto',
    },
    ebd: {
      type: 'Proyecto Profesional — Reale Tech',
      title: 'Sistema EBD',
      desc: 'Aplicación móvil para la gestión de Escuelas Bíblicas Dominicales. Control de asistencia, registro de alumnos y profesores, reportes de frecuencia y gestión de clases.',
    },
    nivatto: {
      type: 'Proyecto Personal — Nivatto',
      title: 'Portfolio Nivatto',
      desc: 'Portfolio interactivo con 4 aplicaciones web completas: dashboard financiero con gráficos y KPIs, tablero Kanban estilo Jira con sprints y time tracking, e-commerce con carrito y checkout, y landing SaaS con animaciones.',
      link: 'Ver portfolio',
    },
  },
  experienceLabel: '// Experiencia Profesional',
  experienceHeading: ['Dónde he', '<i class="serif-accent">trabajado</i><span class="accent">.</span>'],
  experienceBadge: 'Empleo Actual',
  experienceRole: 'Desarrollador Full Stack',
  experienceCompany: 'Reale Tech — Soluciones en Tecnologías de la Información',
  experienceDesc: 'Llevo proyectos desde el inicio — entender qué necesita el cliente de verdad — hasta el deploy. Stacks que entregué: Laravel + React, Flutter + PHP, y bastante mantenimiento de código legacy que nadie más quería tocar.',
  experiencePresent: 'Actual',
  experienceSkills: ['Desarrollo Web', 'Mobile', 'Bases de Datos', 'Versionado'],
  footerCtaLabel: '// ¿Hablamos?',
  footerCtaHeading: ['¿Tienes un proyecto', 'en mente<span class="accent">?</span>'],
  footerCtaBtn: 'Contáctame',
  footerTagline: 'Full Stack & Mobile Developer. Valença, Brasil.',
  footerNav: 'Navegación',
  footerContact: 'Contacto',
  footerSocial: 'Social',
  footerBy: 'Desarrollado por',
};

export const ui: Record<Locale, UI> = { pt, en, es };

export const localeHref: Record<Locale, string> = {
  pt: '/',
  en: '/en/',
  es: '/es/',
};
