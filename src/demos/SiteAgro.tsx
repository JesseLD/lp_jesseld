'use client';

import { useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  Check,
  CircleCheck,
  ClipboardList,
  Clock,
  LoaderCircle,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sprout,
  Truck,
  X,
} from 'lucide-react';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';

/* Paleta da marca Verde Vale Agro
   cream #F6F1E7 · paper #EDE4D0 · leaf #1F4D2C · forest #133220
   cacao #5A3521 · ochre #C98A2B · sprout #8DB45A · ink #1B2419 */

const condensed: CSSProperties = { fontVariationSettings: "'wdth' 75" };

const NAV = [
  { href: '#empresa', label: 'Empresa' },
  { href: '#produtos', label: 'Produtos' },
  { href: '#como-trabalhamos', label: 'Como trabalhamos' },
  { href: '#atendimento', label: 'Atendimento' },
  { href: '#contato', label: 'Contato' },
];

const MUNICIPIOS = [
  'Valença',
  'Taperoá',
  'Nilo Peçanha',
  'Ituberá',
  'Igrapiúna',
  'Camamu',
  'Presidente Tancredo Neves',
  'Teolândia',
  'Wenceslau Guimarães',
  'Gandu',
  'Piraí do Norte',
  'Cairu',
  'Jaguaripe',
  'Mutuípe',
];

const INTERESSES = [
  'Mudas de cacau clonal',
  'Mudas de cravo-da-índia',
  'Mudas de guaraná',
  'Insumos e adubação',
  'Assistência técnica',
];

/* ------------------------------------------------------------------ */
/* Marca                                                               */
/* ------------------------------------------------------------------ */

function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className}>
      <circle cx="20" cy="20" r="20" fill="#1F4D2C" />
      <path d="M9 27c5-1 9-1 22 0" stroke="#C98A2B" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <path d="M20 26c0-7 1-11 7-15-1 7-3 11-7 15z" fill="#8DB45A" />
      <path d="M20 26c0-5-1-8-6-11 0 5 2 8 6 11z" fill="#F6F1E7" />
    </svg>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className="size-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.35rem] font-extrabold tracking-tight ${light ? 'text-[#F6F1E7]' : 'text-[#133220]'}`}
          style={condensed}
        >
          Verde Vale
        </span>
        <span className={`mt-0.5 text-[0.62rem] font-bold tracking-[0.32em] ${light ? 'text-[#E7B65C]' : 'text-[#C98A2B]'}`}>
          AGRO · BAIXO SUL
        </span>
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Ilustração do hero                                                  */
/* ------------------------------------------------------------------ */

function Palm({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="none" strokeLinecap="round">
      <path d="M0 0 C 1 -14 -1 -28 2 -42" stroke="#4A3A22" strokeWidth="3" />
      <g stroke="#2E5E2F" strokeWidth="3.2">
        <path d="M2 -42 C -8 -48 -18 -44 -24 -36" />
        <path d="M2 -42 C -6 -54 -16 -56 -22 -52" />
        <path d="M2 -42 C 4 -54 12 -58 18 -56" />
        <path d="M2 -42 C 12 -48 22 -44 26 -36" />
        <path d="M2 -42 C 8 -40 14 -34 16 -26" />
        <path d="M2 -42 C -4 -38 -10 -32 -12 -24" />
      </g>
    </g>
  );
}

function CacaoTree({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-4 0 L-3 -34 L3 -34 L4 0Z" fill="#5A3521" />
      <path d="M0 -26 L-12 -38 M0 -30 L10 -42" stroke="#5A3521" strokeWidth="3" strokeLinecap="round" />
      <circle cx="-18" cy="-50" r="20" fill="#24552F" />
      <circle cx="16" cy="-54" r="22" fill="#24552F" />
      <circle cx="0" cy="-68" r="22" fill="#2B6337" />
      <circle cx="-6" cy="-60" r="14" fill="#316E3C" />
      <ellipse cx="-3" cy="-24" rx="3" ry="5.5" fill="#E0A43A" />
      <ellipse cx="4" cy="-18" rx="2.6" ry="5" fill="#C98A2B" />
      <ellipse cx="-4" cy="-12" rx="2.6" ry="4.6" fill="#B5482A" />
    </g>
  );
}

function Seedling({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-7 0 L-6 -12 L6 -12 L7 0Z" fill="#1A1A16" />
      <path d="M0 -12 V-22" stroke="#3F7A3F" strokeWidth="1.8" />
      <path d="M0 -20 C -8 -22 -10 -28 -8 -30 C -3 -28 0 -25 0 -20Z" fill="#8DB45A" />
      <path d="M0 -22 C 7 -24 10 -30 8 -33 C 2 -31 0 -27 0 -22Z" fill="#6E9A4E" />
    </g>
  );
}

function HeroIllustration() {
  const rows = [0, 1, 2, 3, 4, 5];
  return (
    <svg viewBox="0 0 640 560" role="img" aria-label="Ilustração de plantação no Baixo Sul da Bahia, com morros, fileiras de cacau e viveiro de mudas" className="block h-full w-full">
      <defs>
        <linearGradient id="vv-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#EACD96" />
          <stop offset="0.55" stopColor="#F3E4C4" />
          <stop offset="1" stopColor="#F6EEDC" />
        </linearGradient>
        <radialGradient id="vv-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#F2BD55" />
          <stop offset="1" stopColor="#D9932E" />
        </radialGradient>
        <clipPath id="vv-field">
          <path d="M0 392 C 140 342 300 347 420 387 C 500 412 580 398 640 382 L640 560 L0 560Z" />
        </clipPath>
      </defs>

      <rect width="640" height="560" fill="url(#vv-sky)" />

      {/* sol */}
      <circle cx="440" cy="178" r="150" fill="#E6A83F" opacity="0.08" />
      <circle cx="440" cy="178" r="108" fill="#E6A83F" opacity="0.14" />
      <circle cx="440" cy="178" r="70" fill="url(#vv-sun)" />

      {/* pássaros */}
      <g stroke="#5A3521" strokeWidth="2.4" fill="none" strokeLinecap="round">
        <path d="M112 128 q8 -8 16 0 q8 -8 16 0" />
        <path d="M160 102 q6 -6 12 0 q6 -6 12 0" />
      </g>

      {/* morros ao fundo */}
      <path d="M0 292 C 90 244 170 236 260 264 C 340 290 400 226 500 222 C 570 219 610 246 640 256 L640 560 L0 560Z" fill="#C3CF98" />
      <path d="M0 340 C 110 296 220 298 320 326 C 420 354 500 296 640 304 L640 560 L0 560Z" fill="#88AA5B" />

      {/* dendezeiros no morro do meio */}
      <Palm x={478} y={330} s={0.8} />
      <Palm x={520} y={318} s={1} />
      <Palm x={566} y={316} s={0.85} />
      <Palm x={92} y={326} s={0.7} />

      {/* roça com fileiras */}
      <path d="M0 392 C 140 342 300 347 420 387 C 500 412 580 398 640 382 L640 560 L0 560Z" fill="#3F7A3F" />
      <g clipPath="url(#vv-field)" fill="none" stroke="#2A5E33" strokeWidth="7" strokeLinecap="round" strokeDasharray="0.1 15">
        {rows.map((i) => (
          <path
            key={i}
            transform={`translate(0 ${16 + i * 18})`}
            d="M-10 392 C 140 342 300 347 420 387 C 500 412 580 398 650 382"
          />
        ))}
      </g>

      {/* primeiro plano */}
      <path d="M0 470 C 160 448 420 452 640 478 L640 560 L0 560Z" fill="#1F4D2C" />
      <path d="M0 520 C 200 504 440 506 640 526 L640 560 L0 560Z" fill="#133220" />

      <CacaoTree x={72} y={500} s={1.05} />
      <CacaoTree x={168} y={486} s={0.85} />
      <CacaoTree x={250} y={480} s={0.62} />

      {/* viveiro de mudas */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <Seedling key={i} x={390 + i * 30} y={506 - (i % 2) * 4} />
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Seedling key={`b${i}`} x={405 + i * 30} y={534} />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Glifos dos produtos                                                 */
/* ------------------------------------------------------------------ */

function GlyphCacau() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="size-full">
      <path d="M32 4 C 30 2 28 2 27 4" stroke="#5A3521" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M32 6 C 47 12 51 30 47 44 C 44 54 37 59 32 59 C 27 59 20 54 17 44 C 13 30 17 12 32 6Z" fill="#E0A43A" />
      <g stroke="#B7772A" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M32 9 V56" />
        <path d="M25 13 C 20 27 20 42 26 55" />
        <path d="M39 13 C 44 27 44 42 38 55" />
      </g>
    </svg>
  );
}

function GlyphCravo() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="size-full">
      <path d="M12 56 C 24 44 34 30 50 10" stroke="#5A3521" strokeWidth="3" fill="none" strokeLinecap="round" />
      {[
        [24, 44, -35],
        [32, 34, 40],
        [38, 26, -40],
        [45, 16, 30],
      ].map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <rect x="-2" y="-14" width="4" height="12" rx="2" fill="#8A3B22" />
          <circle cx="0" cy="-15" r="4.2" fill="#B5482A" />
        </g>
      ))}
      <path d="M18 50 C 8 50 4 42 6 38 C 14 38 18 44 18 50Z" fill="#6E9A4E" />
    </svg>
  );
}

function GlyphGuarana() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="size-full">
      <path d="M32 6 V16 M32 12 L20 20 M32 12 L44 20" stroke="#5A3521" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      {[
        [20, 30],
        [44, 30],
        [32, 46],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="12" fill="#C0432C" />
          <ellipse cx={x} cy={y + 1} rx="7" ry="7.5" fill="#F6F1E7" />
          <circle cx={x} cy={y + 1.5} r="4.4" fill="#1B2419" />
          <circle cx={x - 1.4} cy={y} r="1.2" fill="#F6F1E7" />
        </g>
      ))}
    </svg>
  );
}

function GlyphInsumos() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="size-full">
      <path d="M20 14 C 24 18 40 18 44 14 L42 22 C 52 30 54 46 50 56 L14 56 C 10 46 12 30 22 22Z" fill="#E4D5B3" />
      <path d="M20 14 C 24 18 40 18 44 14 L42 22 C 36 24 28 24 22 22Z" fill="#C9B68D" />
      <path d="M22 21 C 28 23 36 23 42 21" stroke="#5A3521" strokeWidth="2.4" fill="none" />
      <path d="M32 50 C 32 42 33 38 40 34 C 39 42 37 46 32 50Z" fill="#3F7A3F" />
      <path d="M32 50 C 32 45 31 42 25 39 C 25 44 27 47 32 50Z" fill="#8DB45A" />
    </svg>
  );
}

function GlyphAssistencia() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="size-full">
      <rect x="12" y="10" width="34" height="46" rx="4" fill="#F6F1E7" />
      <rect x="22" y="6" width="14" height="8" rx="2.5" fill="#C98A2B" />
      <g stroke="#1F4D2C" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M18 24 l3 3 l5 -6" />
        <path d="M30 24 H40" />
        <path d="M18 36 l3 3 l5 -6" />
        <path d="M30 36 H40" />
      </g>
      <circle cx="44" cy="44" r="10" fill="#8DB45A" stroke="#133220" strokeWidth="3" />
      <path d="M51 51 L58 58" stroke="#133220" strokeWidth="4" strokeLinecap="round" />
      <path d="M44 49 C 44 44 45 42 48 40 C 48 44 47 46 44 49Z" fill="#133220" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Pequenos componentes                                                */
/* ------------------------------------------------------------------ */

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`flex items-center gap-2 text-xs font-bold tracking-[0.22em] uppercase ${light ? 'text-[#E7B65C]' : 'text-[#9C6420]'}`}>
      <span className={`h-px w-8 ${light ? 'bg-[#E7B65C]' : 'bg-[#C98A2B]'}`} />
      {children}
    </p>
  );
}

function SectionTitle({ children, light = false, className = '' }: { children: ReactNode; light?: boolean; className?: string }) {
  return (
    <h2
      className={`mt-4 font-display text-[2.1rem] leading-[1.02] font-extrabold tracking-tight text-balance sm:text-5xl ${light ? 'text-[#F6F1E7]' : 'text-[#133220]'} ${className}`}
      style={condensed}
    >
      {children}
    </h2>
  );
}

/* ------------------------------------------------------------------ */
/* Página                                                              */
/* ------------------------------------------------------------------ */

type FormState = 'idle' | 'sending' | 'sent';

export default function SiteAgro() {
  const reduce = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [interesse, setInteresse] = useState(INTERESSES[0]);
  const [formState, setFormState] = useState<FormState>('idle');
  const [sentName, setSentName] = useState('');
  const [toast, setToast] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openWhatsApp() {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(true);
    toastTimer.current = setTimeout(() => setToast(false), 4000);
  }

  function pickInteresse(value: string) {
    setInteresse(value);
    setFormState('idle');
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nome = String(data.get('nome') ?? '').trim();
    setSentName(nome.split(' ')[0] || 'produtor');
    setFormState('sending');
    setTimeout(() => setFormState('sent'), 1100);
  }

  const heroItem = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <div className="bg-[#F6F1E7] font-sans text-[#1B2419] selection:bg-[#C98A2B] selection:text-white">
      {/* ------------------------------ Header ------------------------------ */}
      <header className="sticky top-11 z-40 border-b border-[#1F4D2C]/10 bg-[#F6F1E7]/92 backdrop-blur-md">
        <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
          <a href="#inicio" aria-label="Verde Vale Agro, início" onClick={() => setMenuOpen(false)}>
            <Logo />
          </a>
          <nav aria-label="Principal" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="rounded-full px-3.5 py-2 text-[0.94rem] font-semibold text-[#1B2419]/80 transition hover:bg-[#1F4D2C]/8 hover:text-[#133220]"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href="#contato"
            className="ml-auto hidden items-center gap-2 rounded-full bg-[#1F4D2C] px-5 py-2.5 text-sm font-bold text-[#F6F1E7] shadow-[0_6px_18px_-8px_#133220] transition hover:bg-[#133220] sm:flex lg:ml-0"
          >
            Falar com o comercial <ArrowRight className="size-4" />
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="vv-mobile-nav"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="ml-auto grid size-11 place-items-center rounded-full border border-[#1F4D2C]/15 text-[#133220] sm:ml-0 lg:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {menuOpen && (
          <nav id="vv-mobile-nav" aria-label="Menu" className="border-t border-[#1F4D2C]/10 bg-[#F6F1E7] px-4 pt-2 pb-5 lg:hidden">
            <ul className="divide-y divide-[#1F4D2C]/10">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between py-3.5 font-display text-lg font-bold text-[#133220]"
                  >
                    {n.label} <ArrowRight className="size-4 text-[#C98A2B]" />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contato"
              onClick={() => setMenuOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#1F4D2C] px-5 py-3.5 font-bold text-[#F6F1E7]"
            >
              Falar com o comercial <ArrowRight className="size-4" />
            </a>
          </nav>
        )}
      </header>

      <main>
        {/* ------------------------------ Hero ------------------------------ */}
        <section id="inicio" className="relative scroll-mt-28 overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(#C9B68D_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
          />
          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pt-10 pb-14 sm:px-6 sm:pt-14 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pt-16 lg:pb-20">
            <motion.div
              className="lg:col-span-6"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
            >
              <motion.p variants={heroItem} className="inline-flex items-center gap-2 rounded-full border border-[#1F4D2C]/15 bg-white/60 px-3.5 py-1.5 text-xs font-bold text-[#1F4D2C]">
                <Sprout className="size-3.5 text-[#C98A2B]" /> Viveiro e assistência técnica desde 2008
              </motion.p>
              <motion.h1
                variants={heroItem}
                className="mt-6 font-display text-[3.1rem] leading-[0.92] font-black tracking-[-0.02em] text-[#133220] sm:text-7xl lg:text-[5.6rem]"
                style={condensed}
              >
                Muda certa,
                <br />
                roça que{' '}
                <em className="font-extrabold text-[#C98A2B] italic" style={{ fontVariationSettings: "'wdth' 100" }}>
                  rende.
                </em>
              </motion.h1>
              <motion.p variants={heroItem} className="mt-6 max-w-xl text-lg leading-relaxed text-[#1B2419]/75 sm:text-xl">
                Mudas clonais de cacau, cravo e guaraná com procedência, os insumos certos e um agrônomo que vai até a sua propriedade. Tudo isso
                aqui no Baixo Sul da Bahia.
              </motion.p>
              <motion.div variants={heroItem} className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contato"
                  className="flex items-center justify-center gap-2 rounded-full bg-[#1F4D2C] px-7 py-4 font-bold text-[#F6F1E7] shadow-[0_10px_24px_-12px_#133220] transition hover:bg-[#133220]"
                >
                  Falar com o comercial <ArrowRight className="size-4" />
                </a>
                <a
                  href="#produtos"
                  className="flex items-center justify-center gap-2 rounded-full border-2 border-[#1F4D2C]/20 px-7 py-4 font-bold text-[#133220] transition hover:border-[#1F4D2C]/50"
                >
                  Ver produtos
                </a>
              </motion.div>
              <motion.ul variants={heroItem} className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-[#1B2419]/70">
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-[#3F7A3F]" /> Viveiro registrado no RENASEM
                </li>
                <li className="flex items-center gap-1.5">
                  <Truck className="size-4 text-[#3F7A3F]" /> Entrega na propriedade
                </li>
              </motion.ul>
            </motion.div>

            <motion.div
              className="relative lg:col-span-6"
              initial={{ opacity: 0, y: reduce ? 0 : 24, scale: reduce ? 1 : 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="aspect-[640/560] overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-30px_#133220] ring-1 ring-[#1F4D2C]/10">
                <HeroIllustration />
              </div>
              <div className="absolute -bottom-6 left-4 max-w-[17rem] rounded-2xl bg-white p-4 shadow-[0_18px_40px_-18px_#133220] sm:-left-6">
                <p className="text-[0.68rem] font-bold tracking-[0.18em] text-[#9C6420] uppercase">Saindo do viveiro</p>
                <p className="mt-1 font-display text-lg leading-tight font-extrabold text-[#133220]" style={condensed}>
                  4.800 mudas de cacau clonal pra Ituberá
                </p>
                <p className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#3F7A3F]">
                  <CalendarCheck className="size-3.5" /> Entrega agendada pra quinta
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ------------------------------ Números ------------------------------ */}
        <section aria-label="Verde Vale em números" className="bg-[#133220] text-[#F6F1E7]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8 lg:py-14">
            {[
              { n: '18', u: 'anos', d: 'de mercado no Baixo Sul' },
              { n: '2.300', u: '+', d: 'produtores atendidos' },
              { n: '14', u: '', d: 'municípios com visita técnica' },
              { n: '1,2', u: 'mi', d: 'mudas entregues por ano' },
            ].map((s, i) => (
              <div key={s.d} className={`px-2 sm:px-6 ${i > 0 ? 'lg:border-l lg:border-[#F6F1E7]/15' : ''}`}>
                <p className="flex items-baseline gap-1.5 font-display leading-none" style={condensed}>
                  <span className="text-6xl font-black tracking-tight sm:text-7xl">{s.n}</span>
                  <span className="text-2xl font-extrabold text-[#E7B65C]">{s.u}</span>
                </p>
                <p className="mt-3 text-sm leading-snug text-[#F6F1E7]/70 sm:text-base">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------ Empresa ------------------------------ */}
        <section id="empresa" className="scroll-mt-28">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:py-28">
            <div className="lg:col-span-5">
              <Eyebrow>Quem somos</Eyebrow>
              <SectionTitle>Uma empresa de Valença que conhece a terra daqui.</SectionTitle>
            </div>
            <div className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-[#1B2419]/80 sm:text-xl">
                A Verde Vale nasceu em 2008 como um viveiro pequeno na beira da BA-001. Hoje produzimos mudas clonais para cacauicultores de 14
                municípios, vendemos os insumos que a roça precisa e mantemos uma equipe de agrônomos e técnicos que visita a propriedade do
                plantio até a primeira colheita.
              </p>
              <p className="mt-5 leading-relaxed text-[#1B2419]/70">
                Trabalhamos principalmente com pequenos e médios produtores, gente que planta cacau cabruca, consorcia com cravo e banana e
                precisa de orientação que caiba no bolso.
              </p>
              <ul className="mt-9 grid gap-4 sm:grid-cols-3">
                {[
                  { t: 'Procedência', d: 'Clones registrados e matrizes próprias, com nota e certificado.' },
                  { t: 'Perto de você', d: 'Técnico de campo que conhece o seu município pelo nome.' },
                  { t: 'Sem enrolação', d: 'Orçamento claro e prazo de entrega combinado por escrito.' },
                ].map((v) => (
                  <li key={v.t} className="border-t-2 border-[#C98A2B] pt-4">
                    <p className="font-display text-lg font-extrabold text-[#133220]">{v.t}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#1B2419]/70">{v.d}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------ Produtos ------------------------------ */}
        <section id="produtos" className="scroll-mt-28 bg-[#EDE4D0]">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-2xl">
                <Eyebrow>Produtos e serviços</Eyebrow>
                <SectionTitle>Do viveiro à colheita, a gente cuida de cada etapa.</SectionTitle>
              </div>
              <p className="max-w-sm leading-relaxed text-[#1B2419]/70">
                Pedidos a partir de 100 mudas. Para lotes maiores, o comercial monta um plano de entrega por etapas.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {/* Destaque: cacau */}
              <article className="relative flex flex-col overflow-hidden rounded-[1.75rem] bg-[#1F4D2C] p-7 text-[#F6F1E7] sm:p-9 md:col-span-2">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-16 -right-16 size-72 rounded-full bg-[#2B6337]"
                />
                <div aria-hidden="true" className="pointer-events-none absolute -top-2 right-6 size-40 opacity-95 sm:right-12 sm:size-48">
                  <GlyphCacau />
                </div>
                <span className="relative w-fit rounded-full bg-[#E7B65C] px-3 py-1 text-xs font-extrabold text-[#133220]">Carro-chefe</span>
                <h3 className="relative mt-5 max-w-md font-display text-4xl leading-none font-black tracking-tight sm:text-5xl" style={condensed}>
                  Mudas de cacau clonal
                </h3>
                <p className="relative mt-4 max-w-lg leading-relaxed text-[#F6F1E7]/80">
                  Clones produtivos e tolerantes à vassoura-de-bruxa, enxertados no nosso viveiro e prontos para renovar a roça ou abrir área
                  nova.
                </p>
                <ul className="relative mt-6 grid gap-2.5 text-sm sm:grid-cols-2">
                  {['Clones CCN-51, PS-1319 e BN-34', 'Mudas com 5 a 6 meses, enxerto pegado', 'Acompanhamento no 1º ano', 'Entrega em caminhão próprio'].map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-[#8DB45A]" /> {b}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contato"
                  onClick={() => pickInteresse(INTERESSES[0])}
                  className="relative mt-8 flex w-fit items-center gap-2 rounded-full bg-[#F6F1E7] px-6 py-3 text-sm font-bold text-[#133220] transition hover:bg-white"
                >
                  Pedir orçamento de mudas <ArrowRight className="size-4" />
                </a>
              </article>

              {[
                {
                  glyph: <GlyphCravo />,
                  t: 'Mudas de cravo-da-índia',
                  d: 'Cultura tradicional de Valença e Taperoá. Mudas de matrizes selecionadas, boas pra consórcio com cacau.',
                  tag: 'Viveiro próprio',
                  i: 1,
                },
                {
                  glyph: <GlyphGuarana />,
                  t: 'Mudas de guaraná',
                  d: 'Clones de alta produção, adaptados ao clima úmido do Baixo Sul. Orientação de espaçamento incluída.',
                  tag: 'Clones selecionados',
                  i: 2,
                },
                {
                  glyph: <GlyphInsumos />,
                  t: 'Insumos e adubação',
                  d: 'Adubos, calcário, fertilizantes foliares e defensivos registrados. Recomendação feita a partir da análise de solo.',
                  tag: 'Pronta entrega',
                  i: 3,
                },
                {
                  glyph: <GlyphAssistencia />,
                  t: 'Assistência técnica',
                  d: 'Agrônomo na propriedade: análise de solo, plano de manejo, poda, controle de pragas e visitas de acompanhamento.',
                  tag: 'Visita agendada',
                  i: 4,
                },
              ].map((p) => (
                <article key={p.t} className="group flex flex-col rounded-[1.75rem] bg-[#F6F1E7] p-7 ring-1 ring-[#5A3521]/10 transition hover:ring-[#1F4D2C]/30">
                  <div className="flex items-start justify-between gap-4">
                    <div className="size-16 rounded-2xl bg-[#EDE4D0] p-2">{p.glyph}</div>
                    <span className="rounded-full border border-[#5A3521]/15 px-2.5 py-1 text-[0.7rem] font-bold text-[#5A3521]">{p.tag}</span>
                  </div>
                  <h3 className="mt-6 font-display text-2xl leading-tight font-extrabold text-[#133220]" style={condensed}>
                    {p.t}
                  </h3>
                  <p className="mt-2.5 flex-1 text-[0.95rem] leading-relaxed text-[#1B2419]/70">{p.d}</p>
                  <a
                    href="#contato"
                    onClick={() => pickInteresse(INTERESSES[p.i])}
                    className="mt-6 flex w-fit items-center gap-1.5 text-sm font-bold text-[#1F4D2C] underline decoration-[#C98A2B] decoration-2 underline-offset-4 transition group-hover:gap-2.5"
                  >
                    Pedir orçamento <ArrowRight className="size-4" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------ Como trabalhamos ------------------------------ */}
        <section id="como-trabalhamos" className="scroll-mt-28">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <div className="max-w-2xl">
              <Eyebrow>Como trabalhamos</Eyebrow>
              <SectionTitle>Três passos, com o mesmo técnico do começo ao fim.</SectionTitle>
            </div>
            <ol className="relative mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
              <span aria-hidden="true" className="absolute top-7 right-[16%] left-[16%] hidden border-t-2 border-dashed border-[#C98A2B]/50 md:block" />
              {[
                {
                  icon: MapPin,
                  t: 'Visita técnica',
                  d: 'O agrônomo vai até a sua roça, conversa com você, colhe amostra de solo e entende o que já está plantado.',
                  note: 'Sem custo nos 14 municípios atendidos',
                },
                {
                  icon: ClipboardList,
                  t: 'Plano da propriedade',
                  d: 'Você recebe por escrito quais mudas, quantas, a adubação recomendada e o calendário de plantio, com orçamento fechado.',
                  note: 'Pronto em até 7 dias',
                },
                {
                  icon: Sprout,
                  t: 'Plantio e acompanhamento',
                  d: 'Entregamos as mudas na propriedade e voltamos nas fases que importam: pegamento, primeira poda e primeira florada.',
                  note: 'Visitas durante o primeiro ano',
                },
              ].map((s, i) => (
                <li key={s.t} className="relative">
                  <div className="flex items-center gap-4">
                    <span className="relative grid size-14 place-items-center rounded-full bg-[#1F4D2C] text-[#F6F1E7] ring-8 ring-[#F6F1E7]">
                      <s.icon className="size-6" />
                    </span>
                    <span className="font-display text-5xl font-black text-[#C98A2B]/35" style={condensed}>
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-extrabold text-[#133220]">{s.t}</h3>
                  <p className="mt-2.5 leading-relaxed text-[#1B2419]/70">{s.d}</p>
                  <p className="mt-4 flex items-center gap-1.5 text-sm font-bold text-[#3F7A3F]">
                    <Check className="size-4" /> {s.note}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------ Depoimento ------------------------------ */}
        <section aria-label="Depoimento de produtor" className="relative overflow-hidden bg-[#5A3521] text-[#F6F1E7]">
          <svg aria-hidden="true" viewBox="0 0 64 64" className="pointer-events-none absolute -right-24 -bottom-28 size-[30rem] opacity-[0.07]">
            <path d="M32 6 C 47 12 51 30 47 44 C 44 54 37 59 32 59 C 27 59 20 54 17 44 C 13 30 17 12 32 6Z" fill="#F6F1E7" />
          </svg>
          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:py-24">
            <figure className="lg:col-span-8">
              <span aria-hidden="true" className="block font-display text-8xl leading-[0.6] font-black text-[#E7B65C]">
                “
              </span>
              <blockquote className="mt-4 font-display text-2xl leading-snug font-semibold tracking-tight text-balance sm:text-[2.1rem] sm:leading-[1.2]">
                Plantei 3 mil mudas de cacau clonal da Verde Vale em 2021. No começo o agrônomo vinha todo mês, ensinou poda, adubação, tudo.
                Hoje a área nova produz mais do que a roça velha inteira.
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="grid size-14 place-items-center rounded-full bg-[#E7B65C] font-display text-lg font-black text-[#5A3521]">RC</span>
                <span>
                  <span className="block font-bold">Raimundo Conceição</span>
                  <span className="block text-sm text-[#F6F1E7]/70">Produtor de cacau, Ituberá (BA)</span>
                </span>
              </figcaption>
            </figure>
            <dl className="grid grid-cols-3 gap-4 self-end border-t border-[#F6F1E7]/20 pt-8 lg:col-span-4 lg:grid-cols-1 lg:gap-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
              {[
                { n: '3 mil', d: 'mudas plantadas' },
                { n: '4 ha', d: 'de roça renovada' },
                { n: '58 @/ha', d: 'na safra de 2025' },
              ].map((s) => (
                <div key={s.d}>
                  <dt className="sr-only">{s.d}</dt>
                  <dd className="font-display text-3xl leading-none font-black sm:text-5xl" style={condensed}>
                    {s.n}
                  </dd>
                  <dd className="mt-1.5 text-sm text-[#F6F1E7]/70">{s.d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ------------------------------ Área de atendimento ------------------------------ */}
        <section id="atendimento" className="scroll-mt-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:py-28">
            <div className="lg:col-span-5">
              <Eyebrow>Área de atendimento</Eyebrow>
              <SectionTitle>Onde a gente chega com muda e com técnico.</SectionTitle>
              <p className="mt-6 leading-relaxed text-[#1B2419]/70">
                Atendemos o Baixo Sul e parte do Vale do Jiquiriçá. Nesses municípios a visita técnica e a entrega na propriedade não têm
                custo de deslocamento. Fora da lista? Fale com o comercial, a gente vê a melhor forma de chegar até você.
              </p>
              <div className="mt-8 flex items-start gap-4 rounded-2xl bg-[#1F4D2C] p-5 text-[#F6F1E7]">
                <MapPin className="mt-0.5 size-6 shrink-0 text-[#E7B65C]" />
                <div>
                  <p className="font-bold">Sede e viveiro em Valença</p>
                  <p className="mt-1 text-sm text-[#F6F1E7]/75">Rod. BA-001, km 4, Bairro do Tento. Aberto para visita de segunda a sábado.</p>
                </div>
              </div>
            </div>
            <ul className="grid content-start gap-x-6 sm:grid-cols-2 lg:col-span-7">
              {MUNICIPIOS.map((m, i) => (
                <li key={m} className="flex items-center justify-between gap-3 border-b border-[#5A3521]/15 py-4">
                  <span className="flex items-center gap-3">
                    <span className="w-6 font-display text-sm font-bold text-[#C98A2B] tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-display text-lg font-bold text-[#133220]">{m}</span>
                  </span>
                  {m === 'Valença' ? (
                    <span className="rounded-full bg-[#C98A2B] px-2.5 py-0.5 text-[0.68rem] font-extrabold text-white">SEDE</span>
                  ) : (
                    <Check className="size-4 text-[#3F7A3F]" aria-label="atendido" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------ Contato ------------------------------ */}
        <section id="contato" className="scroll-mt-28 bg-[#EDE4D0]">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:py-28">
            <div className="lg:col-span-5">
              <Eyebrow>Contato</Eyebrow>
              <SectionTitle>Fale com o comercial.</SectionTitle>
              <p className="mt-6 leading-relaxed text-[#1B2419]/70">
                Conte o que você planta e o que precisa. Respondemos em até um dia útil, pelo WhatsApp ou por telefone, do jeito que for melhor
                pra você.
              </p>

              <button
                type="button"
                onClick={openWhatsApp}
                className="mt-8 flex w-full items-center justify-center gap-2.5 rounded-full bg-[#1F8A4C] px-6 py-4 font-bold text-white shadow-[0_10px_24px_-12px_#133220] transition hover:bg-[#18743F] sm:w-auto"
              >
                <WhatsAppIcon className="size-5" /> Chamar no WhatsApp
              </button>

              <dl className="mt-10 grid gap-6 text-[0.95rem]">
                {[
                  { icon: MapPin, t: 'Endereço', d: 'Rod. BA-001, km 4, Bairro do Tento, Valença (BA), 45400-000' },
                  { icon: Phone, t: 'Telefone e WhatsApp', d: '(75) 3641-2020 · (75) 99100-2020' },
                  { icon: Mail, t: 'E-mail', d: 'comercial@verdevaleagro.com.br' },
                  { icon: Clock, t: 'Horário', d: 'Segunda a sexta, 7h às 17h · Sábado, 7h às 11h' },
                ].map((c) => (
                  <div key={c.t} className="flex gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#F6F1E7] text-[#1F4D2C]">
                      <c.icon className="size-5" />
                    </span>
                    <div>
                      <dt className="text-xs font-bold tracking-[0.14em] text-[#9C6420] uppercase">{c.t}</dt>
                      <dd className="mt-1 font-semibold text-[#133220]">{c.d}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-[1.75rem] bg-[#F6F1E7] p-6 shadow-[0_24px_50px_-30px_#5A3521] ring-1 ring-[#5A3521]/10 sm:p-9">
                {formState === 'sent' ? (
                  <div className="flex min-h-[26rem] flex-col items-center justify-center text-center" role="status">
                    <span className="grid size-16 place-items-center rounded-full bg-[#1F4D2C] text-[#F6F1E7]">
                      <CircleCheck className="size-8" />
                    </span>
                    <h3 className="mt-6 font-display text-3xl font-black text-[#133220]" style={condensed}>
                      Recebemos seu contato, {sentName}!
                    </h3>
                    <p className="mt-3 max-w-sm leading-relaxed text-[#1B2419]/70">
                      O comercial vai te responder em até um dia útil sobre <strong className="text-[#133220]">{interesse.toLowerCase()}</strong>.
                    </p>
                    <button
                      type="button"
                      onClick={() => setFormState('idle')}
                      className="mt-8 rounded-full border-2 border-[#1F4D2C]/20 px-6 py-3 text-sm font-bold text-[#133220] transition hover:border-[#1F4D2C]/50"
                    >
                      Enviar outra mensagem
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <h3 className="font-display text-2xl font-extrabold text-[#133220]" style={condensed}>
                        Peça seu orçamento
                      </h3>
                      <p className="mt-1 text-sm text-[#1B2419]/60">Campos com * são obrigatórios.</p>
                    </div>
                    <Field label="Nome *" htmlFor="vv-nome">
                      <input id="vv-nome" name="nome" required autoComplete="name" placeholder="Seu nome" className={inputCls} />
                    </Field>
                    <Field label="WhatsApp *" htmlFor="vv-tel">
                      <input
                        id="vv-tel"
                        name="telefone"
                        required
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="(75) 9 0000-0000"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Município" htmlFor="vv-municipio">
                      <select id="vv-municipio" name="municipio" defaultValue="Valença" className={inputCls}>
                        {MUNICIPIOS.map((m) => (
                          <option key={m}>{m}</option>
                        ))}
                        <option>Outro município</option>
                      </select>
                    </Field>
                    <Field label="Tenho interesse em" htmlFor="vv-interesse">
                      <select id="vv-interesse" name="interesse" value={interesse} onChange={(e) => setInteresse(e.target.value)} className={inputCls}>
                        {INTERESSES.map((m) => (
                          <option key={m}>{m}</option>
                        ))}
                      </select>
                    </Field>
                    <div className="sm:col-span-2">
                      <Field label="Mensagem" htmlFor="vv-msg">
                        <textarea
                          id="vv-msg"
                          name="mensagem"
                          rows={4}
                          placeholder="Ex.: tenho 5 hectares de cacau cabruca e quero renovar 2 com clonal."
                          className={`${inputCls} resize-none`}
                        />
                      </Field>
                    </div>
                    <div className="flex flex-col items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs leading-relaxed text-[#1B2419]/55">Seus dados são usados só pra responder este contato.</p>
                      <button
                        type="submit"
                        disabled={formState === 'sending'}
                        className="flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-[#1F4D2C] px-7 py-4 font-bold text-[#F6F1E7] transition hover:bg-[#133220] disabled:opacity-70 sm:w-auto"
                      >
                        {formState === 'sending' ? (
                          <>
                            <LoaderCircle className="size-4 animate-spin" /> Enviando...
                          </>
                        ) : (
                          <>
                            Enviar para o comercial <ArrowUpRight className="size-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ------------------------------ Footer ------------------------------ */}
      <footer className="bg-[#133220] text-[#F6F1E7]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-16 pb-10 sm:px-6 md:grid-cols-12 lg:px-8">
          <div className="md:col-span-5">
            <Logo light />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#F6F1E7]/65">
              Mudas certificadas, insumos e assistência técnica para quem planta no Baixo Sul da Bahia. Desde 2008.
            </p>
          </div>
          <nav aria-label="Rodapé" className="md:col-span-3">
            <p className="text-xs font-bold tracking-[0.18em] text-[#E7B65C] uppercase">Navegação</p>
            <ul className="mt-4 grid gap-2.5 text-sm">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-[#F6F1E7]/75 hover:text-white">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-4">
            <p className="text-xs font-bold tracking-[0.18em] text-[#E7B65C] uppercase">Fale com a gente</p>
            <ul className="mt-4 grid gap-2.5 text-sm text-[#F6F1E7]/75">
              <li>(75) 3641-2020</li>
              <li>comercial@verdevaleagro.com.br</li>
              <li>Rod. BA-001, km 4, Valença (BA)</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl flex-col gap-2 border-t border-[#F6F1E7]/10 px-4 py-6 text-xs text-[#F6F1E7]/45 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 Verde Vale Agro Ltda. · CNPJ 00.000.000/0001-00</p>
          <p>Viveiro registrado no RENASEM nº BA-00000/2014</p>
        </div>
      </footer>

      {/* ------------------------------ WhatsApp flutuante ------------------------------ */}
      <button
        type="button"
        onClick={openWhatsApp}
        aria-label="Falar com o comercial no WhatsApp"
        className="fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full bg-[#1F8A4C] p-4 text-white shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)] transition hover:scale-105 hover:bg-[#18743F] sm:right-6 sm:bottom-6 sm:px-5"
      >
        <WhatsAppIcon className="size-6" />
        <span className="hidden text-sm font-bold sm:inline">Fale com a gente</span>
      </button>

      <div
        role="status"
        aria-live="polite"
        className={`fixed right-4 bottom-24 left-4 z-50 mx-auto max-w-sm rounded-2xl bg-[#1B2419] p-4 text-sm leading-relaxed text-[#F6F1E7] shadow-2xl transition sm:left-auto sm:right-6 ${
          toast ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
        }`}
      >
        {toast && (
          <>
            <strong className="text-[#E7B65C]">Demonstração:</strong> no site de verdade, este botão abre a conversa com o comercial da Verde
            Vale direto no WhatsApp.
          </>
        )}
      </div>
    </div>
  );
}

const inputCls =
  'w-full rounded-xl border border-[#5A3521]/20 bg-white px-4 py-3.5 text-[#1B2419] placeholder:text-[#1B2419]/35 transition outline-none focus:border-[#1F4D2C] focus:ring-4 focus:ring-[#1F4D2C]/15';

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-bold text-[#133220]">
        {label}
      </label>
      {children}
    </div>
  );
}
