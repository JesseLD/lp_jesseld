'use client';

import { useRef, useState, useSyncExternalStore } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import {
  BellRing,
  CalendarCheck,
  CalendarPlus,
  CalendarX,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  House,
  MapPin,
  RotateCcw,
  Scissors,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Dados de exemplo                                                    */
/* ------------------------------------------------------------------ */

type Service = { id: string; name: string; desc: string; price: number; min: number; popular?: boolean };
type Barber = {
  id: string;
  name: string;
  full: string;
  initials: string;
  specialty: string;
  rating: number;
  reviews: number;
  since: number;
  grad: string;
};
type Booking = {
  id: string;
  code: string;
  serviceId: string;
  barberId: string;
  auto: boolean;
  dateKey: string;
  time: string;
  name: string;
  phone: string;
  reminder: boolean;
};

const SERVICES: Service[] = [
  { id: 'corte', name: 'Corte', desc: 'Máquina e tesoura, lavagem e finalização', price: 35, min: 40 },
  { id: 'barba', name: 'Barba', desc: 'Navalha, toalha quente e balm', price: 25, min: 30 },
  { id: 'combo', name: 'Corte + Barba', desc: 'O pacote completo, sai mais em conta', price: 55, min: 70, popular: true },
  { id: 'pezinho', name: 'Pezinho', desc: 'Acabamento da nuca e costeleta', price: 10, min: 15 },
  { id: 'sobrancelha', name: 'Sobrancelha', desc: 'Na navalha ou na linha', price: 12, min: 15 },
];

const BARBERS: Barber[] = [
  {
    id: 'tonho',
    name: 'Tonho',
    full: 'Antônio Brito',
    initials: 'TB',
    specialty: 'Degradê e navalhado',
    rating: 4.9,
    reviews: 312,
    since: 2011,
    grad: 'linear-gradient(135deg,#E8C27A,#9A6B22)',
  },
  {
    id: 'caique',
    name: 'Caíque',
    full: 'Caíque Santana',
    initials: 'CS',
    specialty: 'Barba e toalha quente',
    rating: 4.8,
    reviews: 187,
    since: 2017,
    grad: 'linear-gradient(135deg,#C97B5A,#6E2F22)',
  },
  {
    id: 'rafa',
    name: 'Rafa',
    full: 'Rafael Bonfim',
    initials: 'RB',
    specialty: 'Social e corte infantil',
    rating: 4.7,
    reviews: 96,
    since: 2020,
    grad: 'linear-gradient(135deg,#8FA37A,#3E4E32)',
  },
];

const SLOTS_AM = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30'];
const SLOTS_PM = ['13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'];

const DOW = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const DOW_LONG = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

const EXAMPLE_NAME = 'Lucas Andrade';
const EXAMPLE_PHONE = '(75) 99812-4471';

/* ------------------------------------------------------------------ */
/* Utilitários                                                         */
/* ------------------------------------------------------------------ */

const pad = (n: number) => String(n).padStart(2, '0');
const brl = (n: number) => `R$ ${n.toFixed(2).replace('.', ',')}`;
const toMin = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5));
const serviceById = (id: string) => SERVICES.find((s) => s.id === id)!;
const barberById = (id: string) => BARBERS.find((b) => b.id === id)!;

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function keyOf(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function parseKey(key: string) {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function shiftKey(key: string, days: number) {
  const d = parseKey(key);
  d.setDate(d.getDate() + days);
  return keyOf(d);
}

function dayDiff(from: string, to: string) {
  return Math.round((parseKey(to).getTime() - parseKey(from).getTime()) / 86400000);
}

function dateLabel(key: string, today: string) {
  const diff = dayDiff(today, key);
  if (diff === 0) return 'Hoje';
  if (diff === 1) return 'Amanhã';
  const d = parseKey(key);
  return `${DOW[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

function longDate(key: string) {
  const d = parseKey(key);
  return `${DOW_LONG[d.getDay()]}, ${d.getDate()} de ${MONTHS[d.getMonth()]}`;
}

function maskPhone(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (!d.length) return '';
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/** Relógio lido só no navegador (o servidor não sabe o fuso de quem abre). */
function readNow() {
  const d = new Date();
  return `${keyOf(d)} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
let seq = 0;
const newId = () => `${Date.now().toString(36)}-${++seq}`;

function subscribeClock(cb: () => void) {
  const t = setInterval(cb, 30_000);
  return () => clearInterval(t);
}

/* ------------------------------------------------------------------ */
/* Estilos base                                                        */
/* ------------------------------------------------------------------ */

const focus = 'focus-visible:outline-[#E8C27A]!';
const card = 'rounded-2xl border border-white/[0.07] bg-[#1B1B1F]';
const brassBtn = `flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#D4A24C] px-5 font-display text-[15px] font-bold text-[#141417] transition active:scale-[0.98] hover:bg-[#E0B15C] disabled:cursor-not-allowed disabled:bg-[#3A3528] disabled:text-[#F3EBDD]/40 ${focus}`;
const ghostBtn = `flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 px-5 font-display text-[15px] font-semibold text-[#F3EBDD] transition active:scale-[0.98] hover:bg-white/5 ${focus}`;

const slide = {
  enter: (d: number) => ({ x: d * 56, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d * -56, opacity: 0 }),
};

/* ------------------------------------------------------------------ */
/* Peças visuais                                                       */
/* ------------------------------------------------------------------ */

function Logo({ className = 'size-11' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="22.5" fill="#141417" stroke="#D4A24C" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="18.5" fill="none" stroke="#D4A24C" strokeOpacity=".35" strokeDasharray="1.5 2.5" />
      {/* navalha aberta */}
      <path d="M13 29.5 L29.5 13 C32 11 35.5 12.5 35 15.5 L20.5 30.5 Z" fill="#D4A24C" />
      <path d="M15.5 28 L30 13.6" stroke="#141417" strokeOpacity=".35" strokeWidth="1" />
      <path d="M20.5 30.5 L34 36.5" stroke="#F3EBDD" strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="20.8" cy="30.3" r="1.4" fill="#141417" />
    </svg>
  );
}

function BarberPole() {
  return (
    <div
      aria-hidden="true"
      className="relative h-20 w-4 overflow-hidden rounded-full border-2 border-[#D4A24C]/70 shadow-[0_0_24px_rgba(212,162,76,.25)]"
      style={{
        background:
          'repeating-linear-gradient(-35deg,#F3EBDD 0 6px,#9E2B25 6px 12px,#F3EBDD 12px 18px,#1F3B6E 18px 24px)',
      }}
    >
      <div className="absolute inset-0 bg-linear-to-r from-black/30 via-transparent to-white/25" />
    </div>
  );
}

function Avatar({ barber, size = 'size-14' }: { barber: Barber; size?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`${size} relative grid shrink-0 place-items-center rounded-full font-display text-lg font-extrabold text-[#141417] ring-2 ring-[#141417] ring-offset-2 ring-offset-[#D4A24C]/40`}
      style={{ background: barber.grad }}
    >
      <span className="relative">{barber.initials}</span>
      {/* brilho */}
      <span className="absolute left-2 top-1.5 h-2.5 w-4 rotate-[-25deg] rounded-full bg-white/35 blur-[1px]" />
    </div>
  );
}

function AnyAvatar({ size = 'size-14' }: { size?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`${size} grid shrink-0 place-items-center rounded-full border-2 border-dashed border-[#D4A24C]/60 bg-[#D4A24C]/10 text-[#E8C27A]`}
    >
      <Users className="size-6" />
    </div>
  );
}

function Stars({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#E8C27A]">
      <Star className="size-3.5 fill-current" aria-hidden="true" />
      {value.toFixed(1).replace('.', ',')}
    </span>
  );
}

function ServiceGlyph({ id }: { id: string }) {
  const common = { viewBox: '0 0 32 32', className: 'size-7', 'aria-hidden': true as const, fill: 'none', stroke: '#E8C27A', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (id) {
    case 'barba':
      return (
        <svg {...common}>
          <path d="M7 10c0 9 4 15 9 15s9-6 9-15" />
          <path d="M11 16c1.5 1.2 3 1.8 5 1.8s3.5-.6 5-1.8" />
          <path d="M13 21h6" />
        </svg>
      );
    case 'combo':
      return (
        <svg {...common}>
          <circle cx="9" cy="23" r="3.5" />
          <circle cx="17" cy="23" r="3.5" />
          <path d="M11.5 20.5 22 6M14.5 20.5 7 9" />
          <path d="M22 17l5-5M24 19l5-5" />
        </svg>
      );
    case 'pezinho':
      return (
        <svg {...common}>
          <path d="M8 8c3 2 5 6 5 11v5" />
          <path d="M24 8c-3 2-5 6-5 11v5" />
          <path d="M11 26h10" strokeDasharray="1.5 2.5" />
        </svg>
      );
    case 'sobrancelha':
      return (
        <svg {...common}>
          <path d="M5 15c4-5 9-6 14-4" />
          <path d="M8 20c2-1.6 4.2-2.4 6.5-2.4s4.5.8 6.5 2.4" />
          <circle cx="14.5" cy="20.5" r="1.6" fill="#E8C27A" stroke="none" />
          <path d="M22 9l5-3" />
        </svg>
      );
    default:
      return <Scissors className="size-6 text-[#E8C27A]" aria-hidden="true" />;
  }
}

/* ------------------------------------------------------------------ */
/* App                                                                 */
/* ------------------------------------------------------------------ */

type Tab = 'inicio' | 'agendar' | 'meus';
const TAB_ORDER: Tab[] = ['inicio', 'agendar', 'meus'];
const STEP_TITLES = ['Escolha o serviço', 'Escolha o barbeiro', 'Dia e horário', 'Confirme seu horário'];

export default function Barbearia() {
  const now = useSyncExternalStore(subscribeClock, readNow, () => null);
  const rootRef = useRef<HTMLDivElement>(null);

  const [tab, setTab] = useState<Tab>('inicio');
  const [tabDir, setTabDir] = useState(1);

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [barberId, setBarberId] = useState<string | null>(null); // 'any' ou id
  const [dateKey, setDateKey] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState(EXAMPLE_NAME);
  const [phone, setPhone] = useState(EXAMPLE_PHONE);
  const [reminder, setReminder] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [lastBooking, setLastBooking] = useState<Booking | null>(null);
  const [confirmCancel, setConfirmCancel] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  if (!now) {
    return (
      <div className="grid min-h-full place-items-center bg-[#141417]">
        <Logo className="size-16 opacity-80" />
      </div>
    );
  }

  const today = now.slice(0, 10);
  const nowMin = toMin(now.slice(11, 16));
  const hour = Number(now.slice(11, 13));
  const todayDow = parseKey(today).getDay();

  const days = Array.from({ length: 7 }, (_, i) => {
    const key = shiftKey(today, i);
    const d = parseKey(key);
    return { key, dow: d.getDay(), day: d.getDate(), month: d.getMonth(), closed: d.getDay() === 0 };
  });

  /* ---- disponibilidade (determinística por dia + barbeiro) ---- */
  const slotsFor = (key: string) => {
    const dow = parseKey(key).getDay();
    if (dow === 0) return { am: [], pm: [] };
    const pm = dow === 6 ? SLOTS_PM.filter((t) => toMin(t) < 16 * 60) : SLOTS_PM;
    return { am: SLOTS_AM, pm };
  };
  const barberFree = (key: string, bId: string, t: string) => {
    if (key === today && toMin(t) < nowMin + 30) return false;
    if (bookings.some((b) => b.dateKey === key && b.time === t && b.barberId === bId)) return false;
    return hash(`${key}|${bId}|${t}`) % 100 >= 40;
  };
  const whoIsFree = (key: string, bId: string, t: string): string | null => {
    if (bId !== 'any') return barberFree(key, bId, t) ? bId : null;
    const start = hash(`${key}|${t}`) % BARBERS.length;
    for (let i = 0; i < BARBERS.length; i++) {
      const b = BARBERS[(start + i) % BARBERS.length];
      if (barberFree(key, b.id, t)) return b.id;
    }
    return null;
  };
  const freeCount = (key: string, bId: string) => {
    const { am, pm } = slotsFor(key);
    return [...am, ...pm].filter((t) => whoIsFree(key, bId, t)).length;
  };

  /* ---- navegação ---- */
  const scrollTop = () => rootRef.current?.parentElement?.scrollTo({ top: 0 });

  const goTab = (next: Tab) => {
    if (next === tab) {
      if (next === 'agendar' && step > 0 && step < 4) return;
      scrollTop();
      return;
    }
    setTabDir(TAB_ORDER.indexOf(next) > TAB_ORDER.indexOf(tab) ? 1 : -1);
    if (next === 'agendar' && step === 4) resetWizard();
    setConfirmCancel(null);
    setTab(next);
    scrollTop();
  };

  const goStep = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
    scrollTop();
  };

  function resetWizard(preset?: { barberId?: string; serviceId?: string }) {
    setServiceId(preset?.serviceId ?? null);
    setBarberId(preset?.barberId ?? null);
    setDateKey(null);
    setTime(null);
    setFormError(null);
    setDir(1);
    setStep(0);
  }

  const firstOpenDay = (bId: string) => days.find((d) => !d.closed && freeCount(d.key, bId) > 0)?.key ?? days[0].key;

  const enterSchedule = (bId: string) => {
    setBarberId(bId);
    const keep = dateKey && freeCount(dateKey, bId) > 0 ? dateKey : firstOpenDay(bId);
    setDateKey(keep);
    if (time && !(keep && whoIsFree(keep, bId, time))) setTime(null);
    goStep(2);
  };

  const startBooking = (preset?: { barberId?: string; serviceId?: string }) => {
    resetWizard(preset);
    setTabDir(1);
    setTab('agendar');
    if (preset?.barberId && preset.serviceId) {
      setDateKey(firstOpenDay(preset.barberId));
      setStep(2);
    }
    scrollTop();
  };

  const pickService = (id: string) => {
    setServiceId(id);
    if (barberId) enterSchedule(barberId);
    else goStep(1);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast((t) => (t === msg ? null : t)), 2600);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceId || !barberId || !dateKey || !time) return;
    if (name.trim().length < 2) return setFormError('Digite seu nome pra gente te chamar na cadeira.');
    if (phone.replace(/\D/g, '').length < 10) return setFormError('Confira o WhatsApp: precisa do DDD + número.');
    const assigned = whoIsFree(dateKey, barberId, time);
    if (!assigned) {
      setFormError('Esse horário acabou de ser ocupado. Escolha outro, por favor.');
      return;
    }
    const id = newId();
    const booking: Booking = {
      id,
      code: `NV-${(hash(id) % 9000) + 1000}`,
      serviceId,
      barberId: assigned,
      auto: barberId === 'any',
      dateKey,
      time,
      name: name.trim(),
      phone,
      reminder,
    };
    setBookings((bs) => [...bs, booking]);
    setLastBooking(booking);
    setFormError(null);
    goStep(4);
  };

  const cancelBooking = (id: string) => {
    setBookings((bs) => bs.filter((b) => b.id !== id));
    setConfirmCancel(null);
    showToast('Horário cancelado. A vaga voltou pra agenda.');
  };

  /* ---- derivados ---- */
  const upcoming = bookings
    .filter((b) => b.dateKey > today || (b.dateKey === today && toMin(b.time) >= nowMin - 30))
    .sort((a, b) => (a.dateKey + a.time).localeCompare(b.dateKey + b.time));
  const next = upcoming[0];
  const firstName = name.trim().split(' ')[0] || 'cliente';
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
  const closeHour = todayDow === 6 ? 16 : 19;
  const isOpen = todayDow !== 0 && hour >= 9 && hour < closeHour;
  const openLabel = isOpen
    ? `Aberto agora · fecha às ${closeHour}h`
    : todayDow !== 0 && hour < 9
      ? 'Fechado · abre hoje às 9h'
      : todayDow === 6
        ? 'Fechado · abre segunda às 9h'
        : 'Fechado · abre amanhã às 9h';

  const history = [
    { key: shiftKey(today, -26), serviceId: 'combo', barberId: 'tonho', note: 'Degradê navalhado, barba baixa' },
    { key: shiftKey(today, -54), serviceId: 'corte', barberId: 'tonho', note: 'Degradê médio, risquinho do lado' },
    { key: shiftKey(today, -83), serviceId: 'combo', barberId: 'caique', note: 'Barba com toalha quente' },
  ];

  const service = serviceId ? serviceById(serviceId) : null;
  const chosenBarber = barberId && barberId !== 'any' ? barberById(barberId) : null;
  const previewAssigned = dateKey && time && barberId ? whoIsFree(dateKey, barberId, time) : null;

  /* ------------------------------------------------------------------ */
  /* Telas                                                               */
  /* ------------------------------------------------------------------ */

  const homeScreen = (
    <div className="pb-28">
      {/* topo */}
      <header className="relative overflow-hidden px-5 pb-6 pt-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 80% at 100% 0%,rgba(212,162,76,.22),transparent 60%),repeating-linear-gradient(135deg,rgba(255,255,255,.025) 0 2px,transparent 2px 14px)',
          }}
        />
        <div className="relative flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo />
            <div>
              <p className="font-display text-[11px] font-bold uppercase tracking-[0.22em] text-[#D4A24C]">Barbearia</p>
              <h1 className="font-display text-2xl font-extrabold leading-none tracking-tight">Navalha</h1>
            </div>
          </div>
          <BarberPole />
        </div>
        <div className="relative -mt-6">
          <p className="text-[15px] text-[#F3EBDD]/70">
            {greeting}, <span className="font-semibold text-[#F3EBDD]">{firstName}</span>.
          </p>
          <p className="mt-1 max-w-[16rem] font-display text-[26px] font-extrabold leading-[1.1] tracking-tight">
            Cadeira reservada sem mandar mensagem.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-[#F3EBDD]/75">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4 text-[#D4A24C]" aria-hidden="true" />
              R. Marquês de Herval, 112 · Centro, Valença
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className={`size-2 rounded-full ${isOpen ? 'bg-emerald-400' : 'bg-[#F3EBDD]/40'}`} aria-hidden="true" />
              {openLabel}
            </span>
          </div>
        </div>
      </header>

      <div className="space-y-6 px-4">
        {/* próximo horário */}
        {next ? (
          <section aria-labelledby="prox" className="relative overflow-hidden rounded-2xl bg-[#D4A24C] p-4 text-[#141417]">
            <div aria-hidden="true" className="absolute -right-6 -top-6 size-28 rounded-full border-[14px] border-[#141417]/10" />
            <p id="prox" className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#141417]/70">
              Seu próximo horário
            </p>
            <div className="mt-2 flex items-end justify-between gap-3">
              <div>
                <p className="font-display text-[28px] font-extrabold leading-none">
                  {dateLabel(next.dateKey, today)} · {next.time}
                </p>
                <p className="mt-1.5 text-[14px] font-medium">
                  {serviceById(next.serviceId).name} com {barberById(next.barberId).name}
                </p>
              </div>
              <Avatar barber={barberById(next.barberId)} size="size-12" />
            </div>
            <button
              type="button"
              onClick={() => goTab('meus')}
              className={`mt-3 inline-flex min-h-11 items-center gap-1 rounded-lg text-[14px] font-bold underline-offset-4 hover:underline ${focus}`}
            >
              Ver detalhes <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </section>
        ) : (
          <section className={`${card} flex items-center gap-4 p-4`}>
            <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#D4A24C]/12 text-[#E8C27A]">
              <CalendarPlus className="size-6" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="font-display text-[15px] font-bold">Nenhum horário marcado</p>
              <p className="text-[13px] text-[#F3EBDD]/65">Seu último corte foi há {dayDiff(history[0].key, today)} dias. Bora dar um trato?</p>
            </div>
          </section>
        )}

        <button type="button" onClick={() => startBooking()} className={`${brassBtn} w-full text-base`}>
          <CalendarPlus className="size-5" aria-hidden="true" />
          Agendar horário
        </button>

        {/* barbeiros */}
        <section aria-labelledby="equipe">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 id="equipe" className="font-display text-lg font-bold">
              Nossos barbeiros
            </h2>
            <span className="text-[12px] text-[#F3EBDD]/55">Toque pra agendar</span>
          </div>
          <ul className="space-y-2.5">
            {BARBERS.map((b) => (
              <li key={b.id}>
                <button
                  type="button"
                  onClick={() => startBooking({ barberId: b.id })}
                  className={`${card} flex w-full items-center gap-3.5 p-3.5 text-left transition hover:border-[#D4A24C]/40 active:scale-[0.99] ${focus}`}
                  aria-label={`Agendar com ${b.full}, ${b.specialty}, nota ${b.rating}`}
                >
                  <Avatar barber={b} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-display text-[16px] font-bold">{b.full}</p>
                    </div>
                    <p className="truncate text-[13px] text-[#F3EBDD]/65">{b.specialty}</p>
                    <p className="mt-1 flex items-center gap-2 text-[12px] text-[#F3EBDD]/55">
                      <Stars value={b.rating} />
                      <span>{b.reviews} avaliações</span>
                      <span aria-hidden="true">·</span>
                      <span>desde {b.since}</span>
                    </p>
                  </div>
                  <ChevronRight className="size-5 shrink-0 text-[#D4A24C]" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* tabela */}
        <section aria-labelledby="precos" className={`${card} p-4`}>
          <h2 id="precos" className="font-display text-lg font-bold">
            Tabela
          </h2>
          <ul className="mt-2 divide-y divide-white/[0.06]">
            {SERVICES.map((s) => (
              <li key={s.id} className="flex items-center justify-between py-2.5 text-[14px]">
                <span>
                  {s.name} <span className="text-[12px] text-[#F3EBDD]/50">· {s.min} min</span>
                </span>
                <span className="font-display font-bold text-[#E8C27A]">{brl(s.price)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 flex items-center gap-2 border-t border-white/[0.06] pt-3 text-[12px] text-[#F3EBDD]/55">
            <Clock className="size-4 text-[#D4A24C]" aria-hidden="true" />
            Seg a sex 9h–19h · Sáb 9h–16h · Pix, cartão e dinheiro
          </p>
        </section>
      </div>
    </div>
  );

  /* ---- passos do agendamento ---- */

  const stepService = (
    <ul className="space-y-2.5">
      {SERVICES.map((s) => {
        const active = serviceId === s.id;
        return (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => pickService(s.id)}
              aria-pressed={active}
              className={`flex w-full items-center gap-3.5 rounded-2xl border bg-[#1B1B1F] p-3.5 text-left transition active:scale-[0.99] ${
                active ? 'border-[#D4A24C] bg-[#D4A24C]/[0.07]' : 'border-white/[0.07] hover:border-white/20'
              } ${focus}`}
            >
              <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#141417]">
                <ServiceGlyph id={s.id} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-center gap-2 font-display text-[16px] font-bold">
                  {s.name}
                  {s.popular && (
                    <span className="rounded-full bg-[#D4A24C] px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wide text-[#141417]">
                      Mais pedido
                    </span>
                  )}
                </p>
                <p className="text-[13px] leading-snug text-[#F3EBDD]/60">{s.desc}</p>
                <p className="mt-1 inline-flex items-center gap-1 text-[12px] text-[#F3EBDD]/55">
                  <Clock className="size-3.5" aria-hidden="true" /> {s.min} min
                </p>
              </div>
              <p className="shrink-0 font-display text-[17px] font-extrabold text-[#E8C27A]">{brl(s.price)}</p>
            </button>
          </li>
        );
      })}
    </ul>
  );

  const barberOptions: { id: string; title: string; sub: string; barber?: Barber }[] = [
    { id: 'any', title: 'Qualquer um', sub: 'Mais horários livres: fica com quem estiver disponível' },
    ...BARBERS.map((b) => ({ id: b.id, title: b.full, sub: b.specialty, barber: b })),
  ];

  const stepBarber = (
    <ul className="space-y-2.5">
      {barberOptions.map((o) => {
        const active = barberId === o.id;
        const free = days.slice(0, 3).reduce((n, d) => n + freeCount(d.key, o.id), 0);
        return (
          <li key={o.id}>
            <button
              type="button"
              onClick={() => enterSchedule(o.id)}
              aria-pressed={active}
              className={`flex w-full items-center gap-3.5 rounded-2xl border bg-[#1B1B1F] p-3.5 text-left transition active:scale-[0.99] ${
                active ? 'border-[#D4A24C] bg-[#D4A24C]/[0.07]' : 'border-white/[0.07] hover:border-white/20'
              } ${focus}`}
            >
              {o.barber ? <Avatar barber={o.barber} /> : <AnyAvatar />}
              <div className="min-w-0 flex-1">
                <p className="font-display text-[16px] font-bold">{o.title}</p>
                <p className="text-[13px] leading-snug text-[#F3EBDD]/60">{o.sub}</p>
                <p className="mt-1 flex flex-wrap items-center gap-2 text-[12px] text-[#F3EBDD]/55">
                  {o.barber && <Stars value={o.barber.rating} />}
                  <span className={free > 0 ? 'text-emerald-300/90' : ''}>
                    {free > 0 ? `${free} horários livres nos próximos 3 dias` : 'Agenda cheia nos próximos dias'}
                  </span>
                </p>
              </div>
              <ChevronRight className="size-5 shrink-0 text-[#D4A24C]" aria-hidden="true" />
            </button>
          </li>
        );
      })}
    </ul>
  );

  const slots = dateKey ? slotsFor(dateKey) : { am: [], pm: [] };
  const renderSlots = (label: string, list: string[]) =>
    list.length > 0 && (
      <fieldset className="mt-5">
        <legend className="mb-2.5 text-[12px] font-bold uppercase tracking-[0.16em] text-[#F3EBDD]/55">{label}</legend>
        <div className="grid grid-cols-4 gap-2">
          {list.map((t) => {
            const free = !!(dateKey && barberId && whoIsFree(dateKey, barberId, t));
            const active = time === t;
            return (
              <button
                key={t}
                type="button"
                disabled={!free}
                onClick={() => setTime(t)}
                aria-pressed={active}
                aria-label={`${t}${free ? '' : ', ocupado'}`}
                className={`min-h-11 rounded-xl border font-display text-[15px] font-semibold tabular-nums transition ${
                  active
                    ? 'border-[#D4A24C] bg-[#D4A24C] text-[#141417]'
                    : free
                      ? 'border-white/10 bg-[#1B1B1F] text-[#F3EBDD] hover:border-[#D4A24C]/60 active:scale-95'
                      : 'cursor-not-allowed border-transparent bg-white/[0.03] text-[#F3EBDD]/35 line-through'
                } ${focus}`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </fieldset>
    );
  const dayHasFree = dateKey && barberId ? freeCount(dateKey, barberId) > 0 : false;

  const stepSchedule = (
    <div>
      <div className="-mx-4 overflow-x-auto px-4 pb-1 no-scrollbar" role="group" aria-label="Dia">
        <div className="flex gap-2">
          {days.map((d, i) => {
            const active = dateKey === d.key;
            return (
              <button
                key={d.key}
                type="button"
                disabled={d.closed}
                onClick={() => {
                  setDateKey(d.key);
                  setTime(null);
                }}
                aria-pressed={active}
                aria-label={`${i === 0 ? 'Hoje, ' : ''}${longDate(d.key)}${d.closed ? ', fechado' : ''}`}
                className={`relative flex h-[78px] w-[58px] shrink-0 flex-col items-center justify-center rounded-2xl border transition ${
                  active
                    ? 'border-[#D4A24C] bg-[#D4A24C] text-[#141417]'
                    : d.closed
                      ? 'cursor-not-allowed border-white/[0.05] text-[#F3EBDD]/30'
                      : 'border-white/10 bg-[#1B1B1F] text-[#F3EBDD] hover:border-[#D4A24C]/50'
                } ${focus}`}
              >
                <span className={`text-[11px] font-bold uppercase ${active ? 'text-[#141417]/75' : i === 0 ? 'text-[#E8C27A]' : 'text-[#F3EBDD]/55'}`}>
                  {i === 0 ? 'Hoje' : DOW[d.dow]}
                </span>
                <span className="font-display text-[22px] font-extrabold leading-tight">{d.day}</span>
                <span className="text-[10px] font-semibold uppercase opacity-70">{d.closed ? 'fechado' : MONTHS[d.month]}</span>
                {i === 0 && !active && <span aria-hidden="true" className="absolute bottom-1.5 size-1 rounded-full bg-[#D4A24C]" />}
              </button>
            );
          })}
        </div>
      </div>

      {dateKey && !dayHasFree ? (
        <div className={`${card} mt-5 flex flex-col items-center gap-2 px-6 py-8 text-center`}>
          <CalendarX className="size-8 text-[#D4A24C]" aria-hidden="true" />
          <p className="font-display font-bold">Sem horário livre nesse dia</p>
          <p className="text-[13px] text-[#F3EBDD]/60">Tenta outro dia ou escolha &ldquo;Qualquer um&rdquo; pra ver mais opções.</p>
        </div>
      ) : (
        <>
          {renderSlots('Manhã', slots.am)}
          {renderSlots('Tarde', slots.pm)}
          <div className="mt-4 flex items-center gap-4 text-[12px] text-[#F3EBDD]/55">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-3 rounded border border-white/15 bg-[#1B1B1F]" aria-hidden="true" /> Livre
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-3 rounded bg-white/[0.06]" aria-hidden="true" /> Ocupado
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-3 rounded bg-[#D4A24C]" aria-hidden="true" /> Seu horário
            </span>
          </div>
        </>
      )}
    </div>
  );

  const assignedBarber = previewAssigned ? barberById(previewAssigned) : chosenBarber;
  const inputCls = `mt-1.5 block min-h-12 w-full rounded-xl border border-white/10 bg-[#141417] px-4 text-[16px] text-[#F3EBDD] placeholder:text-[#F3EBDD]/35 focus:border-[#D4A24C] ${focus}`;

  const stepConfirm = service && dateKey && time && (
    <form id="navalha-form" onSubmit={submit} noValidate className="space-y-4">
      <div className={`${card} p-4`}>
        <div className="flex items-center gap-3.5">
          {assignedBarber ? <Avatar barber={assignedBarber} size="size-12" /> : <AnyAvatar size="size-12" />}
          <div>
            <p className="font-display text-[17px] font-bold">{service.name}</p>
            <p className="text-[13px] text-[#F3EBDD]/65">
              com {assignedBarber?.full ?? 'quem estiver livre'}
              {barberId === 'any' && assignedBarber && <span className="text-[#E8C27A]"> · primeiro livre</span>}
            </p>
          </div>
        </div>
        <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-dashed border-white/10 pt-4 text-center">
          <div>
            <dt className="text-[11px] uppercase tracking-wide text-[#F3EBDD]/50">Dia</dt>
            <dd className="mt-0.5 font-display text-[15px] font-bold">{dateLabel(dateKey, today)}</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-wide text-[#F3EBDD]/50">Horário</dt>
            <dd className="mt-0.5 font-display text-[15px] font-bold tabular-nums">{time}</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-wide text-[#F3EBDD]/50">Duração</dt>
            <dd className="mt-0.5 font-display text-[15px] font-bold">{service.min} min</dd>
          </div>
        </dl>
        <div className="mt-4 flex items-center justify-between rounded-xl bg-[#141417] px-4 py-3">
          <span className="text-[13px] text-[#F3EBDD]/65">Total (paga na barbearia)</span>
          <span className="font-display text-xl font-extrabold text-[#E8C27A]">{brl(service.price)}</span>
        </div>
      </div>

      <div className={`${card} space-y-4 p-4`}>
        <div>
          <label htmlFor="nv-name" className="text-[13px] font-semibold text-[#F3EBDD]/80">
            Seu nome
          </label>
          <input
            id="nv-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className={inputCls}
            placeholder="Como te chamam na cadeira"
          />
        </div>
        <div>
          <label htmlFor="nv-phone" className="text-[13px] font-semibold text-[#F3EBDD]/80">
            WhatsApp
          </label>
          <input
            id="nv-phone"
            value={phone}
            onChange={(e) => setPhone(maskPhone(e.target.value))}
            inputMode="tel"
            autoComplete="tel"
            className={`${inputCls} tabular-nums`}
            placeholder="(75) 90000-0000"
          />
        </div>
        <div className="flex items-center justify-between gap-3">
          <span id="nv-rem-label" className="flex items-center gap-2.5 text-[14px]">
            <BellRing className="size-5 text-[#D4A24C]" aria-hidden="true" />
            Lembrete no WhatsApp 1h antes
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={reminder}
            aria-labelledby="nv-rem-label"
            onClick={() => setReminder((r) => !r)}
            className={`relative flex h-11 w-14 shrink-0 items-center rounded-full ${focus}`}
          >
            <span className={`absolute inset-x-0 top-1/2 h-7 -translate-y-1/2 rounded-full transition ${reminder ? 'bg-[#D4A24C]' : 'bg-white/15'}`} />
            <span
              className={`absolute top-1/2 size-5 -translate-y-1/2 rounded-full bg-[#F3EBDD] shadow transition-all ${reminder ? 'left-[calc(100%-1.5rem)]' : 'left-1'}`}
            />
          </button>
        </div>
        {formError && (
          <p role="alert" className="rounded-lg bg-red-500/10 px-3 py-2 text-[13px] text-red-300">
            {formError}
          </p>
        )}
      </div>
      <p className="px-1 text-center text-[12px] text-[#F3EBDD]/45">Precisa desmarcar? Dá pra cancelar pelo app até 2h antes.</p>
    </form>
  );

  const successScreen = lastBooking && (
    <div className="pt-2">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 380, damping: 18, delay: 0.05 }}
        className="mx-auto grid size-16 place-items-center rounded-full bg-[#D4A24C] text-[#141417] shadow-[0_0_0_8px_rgba(212,162,76,.15)]"
      >
        <Check className="size-8" strokeWidth={3} aria-hidden="true" />
      </motion.div>
      <h2 className="mt-4 text-center font-display text-[28px] font-extrabold tracking-tight">Horário marcado!</h2>
      <p className="mt-1 text-center text-[14px] text-[#F3EBDD]/65">
        Tá tudo certo, {lastBooking.name.split(' ')[0]}. Te esperamos na cadeira.
      </p>

      {/* ticket */}
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, delay: 0.15 }}
        className="relative mt-6 overflow-hidden rounded-2xl bg-[#F3EBDD] text-[#141417]"
      >
        <div className="flex items-center justify-between bg-[#141417] px-4 py-3 text-[#F3EBDD]">
          <div className="flex items-center gap-2">
            <Logo className="size-7" />
            <span className="font-display text-[14px] font-extrabold tracking-wide">NAVALHA BARBEARIA</span>
          </div>
          <span className="font-mono text-[12px] text-[#E8C27A]">{lastBooking.code}</span>
        </div>
        <div className="px-5 pb-4 pt-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#141417]/55">{longDate(lastBooking.dateKey)}</p>
          <p className="font-display text-[44px] font-black leading-none tracking-tight tabular-nums">{lastBooking.time}</p>
          <p className="mt-2 text-[15px] font-semibold">{serviceById(lastBooking.serviceId).name}</p>
          <p className="text-[13px] text-[#141417]/65">
            com {barberById(lastBooking.barberId).full}
            {lastBooking.auto && ' (primeiro livre)'}
          </p>
        </div>
        {/* picote */}
        <div className="relative h-5" aria-hidden="true">
          <span className="absolute -left-2.5 top-0 size-5 rounded-full bg-[#141417]" />
          <span className="absolute -right-2.5 top-0 size-5 rounded-full bg-[#141417]" />
          <span className="absolute inset-x-4 top-1/2 border-t-2 border-dashed border-[#141417]/20" />
        </div>
        <div className="flex items-center justify-between px-5 pb-4 pt-1 text-[13px]">
          <span className="text-[#141417]/65">
            R. Marquês de Herval, 112
            <br />
            Centro, Valença
          </span>
          <span className="font-display text-xl font-extrabold">{brl(serviceById(lastBooking.serviceId).price)}</span>
        </div>
        {/* "código de barras" */}
        <div className="flex h-9 items-stretch gap-[2px] px-5 pb-4" aria-hidden="true">
          {Array.from({ length: 44 }, (_, i) => (
            <span key={i} className="bg-[#141417]" style={{ width: (hash(`${lastBooking.code}${i}`) % 3) + 1, opacity: 0.85 }} />
          ))}
        </div>
      </motion.div>

      <div className={`${card} mt-4 flex items-start gap-3 p-4`}>
        <div className="grid size-10 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-300">
          <BellRing className="size-5" aria-hidden="true" />
        </div>
        <p className="text-[14px] leading-snug text-[#F3EBDD]/80">
          {lastBooking.reminder ? (
            <>
              Você vai receber um lembrete no WhatsApp <strong className="text-[#F3EBDD]">1h antes</strong>, no número{' '}
              <span className="tabular-nums">{lastBooking.phone}</span>.
            </>
          ) : (
            <>Lembrete desligado. Seu horário fica salvo em &ldquo;Meus horários&rdquo;.</>
          )}
        </p>
      </div>

      <div className="mt-5 grid gap-2.5">
        <button type="button" onClick={() => goTab('meus')} className={brassBtn}>
          <CalendarCheck className="size-5" aria-hidden="true" /> Ver meus horários
        </button>
        <button type="button" onClick={() => goTab('inicio')} className={ghostBtn}>
          Voltar ao início
        </button>
      </div>
    </div>
  );

  const wizardStepContent = [stepService, stepBarber, stepSchedule, stepConfirm, successScreen][step];
  const hasBar = step === 2 || step === 3;

  const bookScreen = (
    <div className={hasBar ? 'pb-48' : 'pb-28'}>
      {step < 4 && (
        <header className="sticky top-0 z-20 border-b border-white/[0.06] bg-[#141417]/95 px-4 pb-3 pt-3 backdrop-blur">
          <div className="flex min-h-11 items-center gap-2">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => goStep(step - 1)}
                className={`-ml-2 grid size-11 place-items-center rounded-full hover:bg-white/5 ${focus}`}
                aria-label="Voltar um passo"
              >
                <ChevronLeft className="size-6" aria-hidden="true" />
              </button>
            ) : (
              <span className="grid size-9 place-items-center">
                <Logo className="size-8" />
              </span>
            )}
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D4A24C]">Passo {step + 1} de 4</p>
              <h1 className="font-display text-[19px] font-extrabold leading-tight tracking-tight">{STEP_TITLES[step]}</h1>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-1.5" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={`h-1 rounded-full transition-colors ${i <= step ? 'bg-[#D4A24C]' : 'bg-white/10'}`} />
            ))}
          </div>
          {step > 0 && (service || barberId) && (
            <div className="mt-3 flex flex-wrap gap-1.5 text-[12px]">
              {service && (
                <button
                  type="button"
                  onClick={() => goStep(0)}
                  className={`inline-flex min-h-8 items-center gap-1.5 rounded-full border border-white/10 bg-[#1B1B1F] px-3 hover:border-[#D4A24C]/60 ${focus}`}
                  aria-label={`Serviço: ${service.name}. Trocar`}
                >
                  <Scissors className="size-3.5 text-[#D4A24C]" aria-hidden="true" /> {service.name} · {brl(service.price)}
                </button>
              )}
              {barberId && step > 1 && (
                <button
                  type="button"
                  onClick={() => goStep(1)}
                  className={`inline-flex min-h-8 items-center gap-1.5 rounded-full border border-white/10 bg-[#1B1B1F] px-3 hover:border-[#D4A24C]/60 ${focus}`}
                  aria-label={`Barbeiro: ${chosenBarber?.name ?? 'qualquer um'}. Trocar`}
                >
                  <Users className="size-3.5 text-[#D4A24C]" aria-hidden="true" /> {chosenBarber?.name ?? 'Qualquer um'}
                </button>
              )}
            </div>
          )}
        </header>
      )}

      <div className="overflow-hidden px-4 pt-4">
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
          >
            {wizardStepContent}
          </motion.div>
        </AnimatePresence>
      </div>

      {hasBar && (
        <div className="fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom,0px))] z-30 bg-linear-to-t from-[#141417] via-[#141417] to-[#141417]/0 px-4 pb-3 pt-6">
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1 text-[13px] leading-tight">
              {step === 2 ? (
                time && dateKey ? (
                  <>
                    <p className="text-[#F3EBDD]/55">{assignedBarber ? `com ${assignedBarber.name}` : 'Horário'}</p>
                    <p className="font-display text-[16px] font-bold">
                      {dateLabel(dateKey, today)} · {time}
                    </p>
                  </>
                ) : (
                  <p className="text-[#F3EBDD]/60">Toque num horário livre</p>
                )
              ) : (
                service && (
                  <>
                    <p className="text-[#F3EBDD]/55">Total</p>
                    <p className="font-display text-[18px] font-extrabold text-[#E8C27A]">{brl(service.price)}</p>
                  </>
                )
              )}
            </div>
            {step === 2 ? (
              <button type="button" disabled={!time} onClick={() => goStep(3)} className={`${brassBtn} shrink-0`}>
                Continuar <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            ) : (
              <button type="submit" form="navalha-form" className={`${brassBtn} shrink-0`}>
                <Check className="size-5" aria-hidden="true" /> Confirmar
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );

  /* ---- meus horários ---- */

  const mineScreen = (
    <div className="pb-28">
      <header className="sticky top-0 z-20 border-b border-white/[0.06] bg-[#141417]/95 px-4 py-3 backdrop-blur">
        <div className="flex min-h-11 items-center gap-2">
          <Logo className="size-8" />
          <h1 className="font-display text-[19px] font-extrabold tracking-tight">Meus horários</h1>
        </div>
      </header>

      <div className="space-y-7 px-4 pt-4">
        <section aria-labelledby="proximos">
          <h2 id="proximos" className="mb-3 text-[12px] font-bold uppercase tracking-[0.16em] text-[#F3EBDD]/55">
            Próximos
          </h2>
          {upcoming.length === 0 ? (
            <div className={`${card} flex flex-col items-center px-6 py-8 text-center`}>
              <svg viewBox="0 0 120 90" className="h-20 w-28" aria-hidden="true">
                {/* cadeira de barbeiro */}
                <rect x="36" y="14" width="34" height="34" rx="8" fill="#232328" stroke="#D4A24C" strokeOpacity=".6" />
                <rect x="30" y="44" width="50" height="12" rx="5" fill="#2B2B31" stroke="#D4A24C" strokeOpacity=".6" />
                <path d="M26 44h8M76 44h8" stroke="#D4A24C" strokeWidth="3" strokeLinecap="round" />
                <path d="M55 56v18M40 78h30" stroke="#D4A24C" strokeWidth="3" strokeLinecap="round" />
                <path d="M78 60l14 8" stroke="#F3EBDD" strokeOpacity=".4" strokeWidth="3" strokeLinecap="round" />
                <circle cx="96" cy="20" r="3" fill="#D4A24C" opacity=".5" />
                <circle cx="18" cy="30" r="2" fill="#D4A24C" opacity=".35" />
              </svg>
              <p className="mt-3 font-display font-bold">A cadeira tá te esperando</p>
              <p className="mt-1 text-[13px] text-[#F3EBDD]/60">Você não tem nenhum horário marcado.</p>
              <button type="button" onClick={() => startBooking()} className={`${brassBtn} mt-4`}>
                <CalendarPlus className="size-5" aria-hidden="true" /> Agendar agora
              </button>
            </div>
          ) : (
            <ul className="space-y-2.5">
              <AnimatePresence initial={false}>
                {upcoming.map((b) => {
                  const d = parseKey(b.dateKey);
                  const s = serviceById(b.serviceId);
                  const br = barberById(b.barberId);
                  const asking = confirmCancel === b.id;
                  return (
                    <motion.li
                      key={b.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -40, transition: { duration: 0.2 } }}
                      className={`${card} overflow-hidden`}
                    >
                      <div className="flex gap-3.5 p-3.5">
                        <div className="flex w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-[#D4A24C] py-2 text-[#141417]">
                          <span className="text-[10px] font-bold uppercase">{DOW[d.getDay()]}</span>
                          <span className="font-display text-[22px] font-black leading-none">{d.getDate()}</span>
                          <span className="text-[10px] font-bold uppercase">{MONTHS[d.getMonth()]}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-display text-[16px] font-bold">
                            {dateLabel(b.dateKey, today)} · <span className="tabular-nums">{b.time}</span>
                          </p>
                          <p className="text-[13px] text-[#F3EBDD]/70">
                            {s.name} com {br.name} · {brl(s.price)}
                          </p>
                          <p className="mt-1 flex items-center gap-1.5 text-[12px] text-[#F3EBDD]/50">
                            {b.reminder ? (
                              <>
                                <BellRing className="size-3.5 text-emerald-300" aria-hidden="true" /> Lembrete 1h antes
                              </>
                            ) : (
                              <>Sem lembrete</>
                            )}
                            <span aria-hidden="true">·</span> {b.code}
                          </p>
                        </div>
                      </div>
                      {asking ? (
                        <div className="flex items-center gap-2 border-t border-white/[0.06] bg-red-500/[0.06] p-2.5">
                          <p className="flex-1 pl-1 text-[13px] text-[#F3EBDD]/85">Cancelar esse horário?</p>
                          <button
                            type="button"
                            onClick={() => setConfirmCancel(null)}
                            className={`min-h-11 rounded-lg px-3 text-[13px] font-semibold text-[#F3EBDD]/80 hover:bg-white/5 ${focus}`}
                          >
                            Manter
                          </button>
                          <button
                            type="button"
                            onClick={() => cancelBooking(b.id)}
                            className={`min-h-11 rounded-lg bg-red-500/85 px-3 text-[13px] font-bold text-white hover:bg-red-500 ${focus}`}
                          >
                            Sim, cancelar
                          </button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 border-t border-white/[0.06] text-[13px] font-semibold">
                          <button
                            type="button"
                            onClick={() => showToast(`Te esperamos, ${b.name.split(' ')[0]}! Chega 5 min antes.`)}
                            className={`flex min-h-11 items-center justify-center gap-1.5 text-[#E8C27A] hover:bg-white/5 ${focus}`}
                          >
                            <MapPin className="size-4" aria-hidden="true" /> Como chegar
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmCancel(b.id)}
                            className={`flex min-h-11 items-center justify-center gap-1.5 border-l border-white/[0.06] text-[#F3EBDD]/75 hover:bg-white/5 hover:text-red-300 ${focus}`}
                          >
                            <CalendarX className="size-4" aria-hidden="true" /> Cancelar
                          </button>
                        </div>
                      )}
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
          )}
        </section>

        <section aria-labelledby="historico">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 id="historico" className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#F3EBDD]/55">
              Histórico
            </h2>
            <span className="inline-flex items-center gap-1 text-[12px] text-[#E8C27A]">
              <Sparkles className="size-3.5" aria-hidden="true" /> Você volta a cada ~4 semanas
            </span>
          </div>
          <ol className="relative space-y-2.5 before:absolute before:bottom-4 before:left-[21px] before:top-4 before:w-px before:bg-white/10">
            {history.map((h) => {
              const s = serviceById(h.serviceId);
              const br = barberById(h.barberId);
              return (
                <li key={h.key} className="relative flex items-start gap-3">
                  <Avatar barber={br} size="size-11 text-[13px]" />
                  <div className={`${card} min-w-0 flex-1 p-3`}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-display text-[15px] font-bold">
                          {s.name} <span className="font-sans text-[13px] font-normal text-[#F3EBDD]/55">com {br.name}</span>
                        </p>
                        <p className="text-[12px] text-[#F3EBDD]/50">
                          {dateLabel(h.key, today)} · há {dayDiff(h.key, today)} dias
                        </p>
                      </div>
                      <span className="shrink-0 font-display text-[14px] font-bold text-[#F3EBDD]/80">{brl(s.price)}</span>
                    </div>
                    <p className="mt-1.5 text-[13px] italic text-[#F3EBDD]/65">&ldquo;{h.note}&rdquo;</p>
                    <button
                      type="button"
                      onClick={() => startBooking({ barberId: h.barberId, serviceId: h.serviceId })}
                      className={`mt-2 inline-flex min-h-11 items-center gap-1.5 rounded-lg px-1 text-[13px] font-bold text-[#E8C27A] hover:underline ${focus}`}
                    >
                      <RotateCcw className="size-4" aria-hidden="true" /> Repetir esse
                    </button>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      </div>
    </div>
  );

  const screens: Record<Tab, React.ReactNode> = { inicio: homeScreen, agendar: bookScreen, meus: mineScreen };
  const tabs: { id: Tab; label: string; icon: typeof House }[] = [
    { id: 'inicio', label: 'Início', icon: House },
    { id: 'agendar', label: 'Agendar', icon: CalendarPlus },
    { id: 'meus', label: 'Meus horários', icon: CalendarCheck },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <div ref={rootRef} className="relative min-h-full bg-[#141417] font-sans text-[#F3EBDD] antialiased selection:bg-[#D4A24C] selection:text-[#141417]">
        <AnimatePresence mode="wait" initial={false} custom={tabDir}>
          <motion.main
            key={tab}
            custom={tabDir}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
          >
            {screens[tab]}
          </motion.main>
        </AnimatePresence>

        <AnimatePresence>
          {toast && (
            <motion.div
              role="status"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="fixed inset-x-4 bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] z-40 rounded-xl bg-[#F3EBDD] px-4 py-3 text-center text-[14px] font-semibold text-[#141417] shadow-xl"
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>

        <nav
          aria-label="Navegação do app"
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.07] bg-[#1B1B1F]/95 pb-[env(safe-area-inset-bottom,0px)] backdrop-blur"
        >
          <ul className="grid h-16 grid-cols-3">
            {tabs.map(({ id, label, icon: Icon }) => {
              const active = tab === id;
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => goTab(id)}
                    aria-current={active ? 'page' : undefined}
                    className={`relative flex h-full w-full flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors ${
                      active ? 'text-[#E8C27A]' : 'text-[#F3EBDD]/55 hover:text-[#F3EBDD]/85'
                    } ${focus}`}
                  >
                    {active && <span aria-hidden="true" className="absolute top-0 h-0.5 w-10 rounded-full bg-[#D4A24C]" />}
                    <span className="relative">
                      <Icon className="size-[22px]" aria-hidden="true" />
                      {id === 'meus' && upcoming.length > 0 && (
                        <span className="absolute -right-2.5 -top-1.5 grid size-4 place-items-center rounded-full bg-[#D4A24C] text-[10px] font-bold text-[#141417]">
                          {upcoming.length}
                        </span>
                      )}
                    </span>
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </MotionConfig>
  );
}
