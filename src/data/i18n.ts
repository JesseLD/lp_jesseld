export type Locale = 'pt' | 'en' | 'es';

export const locales: Locale[] = ['pt', 'en', 'es'];

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
  loader: 'Carregando experiência...',
  contact: 'Contato',
  cvLabel: 'Currículo',
  explore: 'Explorar',
  heroSub: 'Transformando ideias em soluções digitais funcionais e intuitivas.',
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
    'Olá! Me chamo Jessé Oliveira e sou um desenvolvedor Full Stack com atuação também em projetos Mobile e um bom domínio de ambientes Linux. Tenho paixão por transformar ideias em soluções funcionais e intuitivas, unindo tecnologia e criatividade no dia a dia.',
    'Minha trajetória na programação começou de um jeito bem divertido: desenvolvendo plugins e mods para Minecraft usando Java. Desde então, minha curiosidade só cresceu, e hoje trabalho com uma stack que inclui <strong>React, Tailwind, PHP, MySQL, Node.js, Dart/Flutter, Python,</strong> entre outras tecnologias que me ajudam a dar vida a projetos completos — tanto no back quanto no front-end.',
    'O que mais me motiva é criar algo novo e saber que isso vai impactar a vida de alguém de forma positiva. Gosto de desafios, de pensar fora da caixa e, claro, de um bom café enquanto desenvolvo.',
  ],
  aboutLocation: 'Valença, BA — Brasil',
  divider1: ['Código com', '<em class="serif-italic">propósito</em>,', 'design com', '<em class="serif-italic">intenção</em>.'],
  skillsLabel: '// Skills & Habilidades',
  skillsHeading: ['Meu <i class="serif-accent">arsenal</i>', 'tecnológico<span class="accent">.</span>'],
  skillCats: {
    frontend: 'Interfaces modernas e responsivas',
    backend: 'APIs robustas e escaláveis',
    mobile: 'Apps nativos multiplataforma',
    tools: { title: 'DevOps & Tools', desc: 'Workflow e infraestrutura' },
  },
  skillFrontendDesc: 'Interfaces modernas e responsivas',
  skillBackendDesc: 'APIs robustas e escaláveis',
  skillMobileDesc: 'Apps nativos multiplataforma',
  divider2: ['Do conceito', 'à <em class="serif-italic">produção</em>.'],
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
  experienceDesc: 'Desenvolvimento de soluções web completas e manutenção de sistemas para clientes corporativos. Responsável por projetos end-to-end, desde o levantamento de requisitos até o deploy em produção.',
  experiencePresent: 'Atual',
  experienceSkills: ['Desenvolvimento Web', 'Mobile', 'Banco de Dados', 'Versionamento'],
  footerCtaLabel: '// Vamos conversar?',
  footerCtaHeading: ['Tem um projeto', 'em mente<span class="accent">?</span>'],
  footerCtaBtn: 'Entre em contato',
  footerTagline: 'Full Stack & Mobile Developer criando experiências digitais de impacto.',
  footerNav: 'Navegação',
  footerContact: 'Contato',
  footerSocial: 'Social',
  footerBy: 'Desenvolvido por',
};

const en: UI = {
  loader: 'Loading experience...',
  contact: 'Contact',
  cvLabel: 'Resume',
  explore: 'Explore',
  heroSub: 'Turning ideas into functional and intuitive digital solutions.',
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
    "Hi! I'm Jessé Oliveira, a Full Stack Developer also working on Mobile projects with a solid command of Linux environments. I'm passionate about turning ideas into functional and intuitive solutions, blending technology and creativity every day.",
    'My programming journey started in a fun way: building Minecraft plugins and mods in Java. Since then, my curiosity has only grown, and today I work with a stack that includes <strong>React, Tailwind, PHP, MySQL, Node.js, Dart/Flutter, Python,</strong> among other technologies that help me bring complete projects to life — both back and front-end.',
    "What motivates me most is creating something new and knowing it will positively impact someone's life. I love challenges, thinking outside the box and, of course, a good coffee while I code.",
  ],
  aboutLocation: 'Valença, BA — Brazil',
  divider1: ['Code with', '<em class="serif-italic">purpose</em>,', 'design with', '<em class="serif-italic">intent</em>.'],
  skillsLabel: '// Skills & Expertise',
  skillsHeading: ['My tech', '<i class="serif-accent">arsenal</i><span class="accent">.</span>'],
  skillCats: {
    frontend: 'Modern and responsive interfaces',
    backend: 'Robust and scalable APIs',
    mobile: 'Cross-platform native apps',
    tools: { title: 'DevOps & Tools', desc: 'Workflow and infrastructure' },
  },
  skillFrontendDesc: 'Modern and responsive interfaces',
  skillBackendDesc: 'Robust and scalable APIs',
  skillMobileDesc: 'Cross-platform native apps',
  divider2: ['From concept', 'to <em class="serif-italic">production</em>.'],
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
  experienceDesc: 'Development of complete web solutions and system maintenance for corporate clients. Responsible for end-to-end projects, from requirements gathering to production deployment.',
  experiencePresent: 'Present',
  experienceSkills: ['Web Development', 'Mobile', 'Databases', 'Version Control'],
  footerCtaLabel: "// Let's talk?",
  footerCtaHeading: ['Got a project', 'in mind<span class="accent">?</span>'],
  footerCtaBtn: 'Get in touch',
  footerTagline: 'Full Stack & Mobile Developer creating impactful digital experiences.',
  footerNav: 'Navigation',
  footerContact: 'Contact',
  footerSocial: 'Social',
  footerBy: 'Developed by',
};

const es: UI = {
  loader: 'Cargando experiencia...',
  contact: 'Contacto',
  cvLabel: 'Currículum',
  explore: 'Explorar',
  heroSub: 'Transformando ideas en soluciones digitales funcionales e intuitivas.',
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
    '¡Hola! Me llamo Jessé Oliveira y soy un desarrollador Full Stack con actuación también en proyectos Mobile y un buen dominio de entornos Linux. Tengo pasión por transformar ideas en soluciones funcionales e intuitivas, uniendo tecnología y creatividad en el día a día.',
    'Mi trayectoria en la programación comenzó de una forma muy divertida: desarrollando plugins y mods para Minecraft usando Java. Desde entonces, mi curiosidad solo ha crecido, y hoy trabajo con un stack que incluye <strong>React, Tailwind, PHP, MySQL, Node.js, Dart/Flutter, Python,</strong> entre otras tecnologías que me ayudan a dar vida a proyectos completos — tanto en back como en front-end.',
    'Lo que más me motiva es crear algo nuevo y saber que impactará la vida de alguien de forma positiva. Me gustan los desafíos, pensar fuera de la caja y, claro, un buen café mientras desarrollo.',
  ],
  aboutLocation: 'Valença, BA — Brasil',
  divider1: ['Código con', '<em class="serif-italic">propósito</em>,', 'diseño con', '<em class="serif-italic">intención</em>.'],
  skillsLabel: '// Skills y Habilidades',
  skillsHeading: ['Mi <i class="serif-accent">arsenal</i>', 'tecnológico<span class="accent">.</span>'],
  skillCats: {
    frontend: 'Interfaces modernas y responsivas',
    backend: 'APIs robustas y escalables',
    mobile: 'Apps nativas multiplataforma',
    tools: { title: 'DevOps & Tools', desc: 'Workflow e infraestructura' },
  },
  skillFrontendDesc: 'Interfaces modernas y responsivas',
  skillBackendDesc: 'APIs robustas y escalables',
  skillMobileDesc: 'Apps nativas multiplataforma',
  divider2: ['Del concepto', 'a la <em class="serif-italic">producción</em>.'],
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
  experienceDesc: 'Desarrollo de soluciones web completas y mantenimiento de sistemas para clientes corporativos. Responsable de proyectos end-to-end, desde el levantamiento de requisitos hasta el despliegue en producción.',
  experiencePresent: 'Actual',
  experienceSkills: ['Desarrollo Web', 'Mobile', 'Bases de Datos', 'Versionado'],
  footerCtaLabel: '// ¿Hablamos?',
  footerCtaHeading: ['¿Tienes un proyecto', 'en mente<span class="accent">?</span>'],
  footerCtaBtn: 'Contáctame',
  footerTagline: 'Full Stack & Mobile Developer creando experiencias digitales de impacto.',
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
