'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Check,
  CheckCheck,
  ChevronRight,
  CircleAlert,
  ClipboardCheck,
  Clock,
  House,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  TrendingUp,
  UserRound,
  Users,
  Wallet,
  X,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Dados de exemplo                                                    */
/* ------------------------------------------------------------------ */

const ESCOLA = 'Espaço Movimento';
const PROFESSORA = 'Prof. Carla';

type Status = 'paga' | 'pendente' | 'atrasada';
type Marca = 'P' | 'F';
type Tab = 'inicio' | 'chamada' | 'mensalidades' | 'alunos';

type Turma = {
  id: string;
  nome: string;
  atividade: string;
  inicio: string;
  fim: string;
  local: string;
  dias: string;
  valor: number;
  cor: string;
};

type Aluno = {
  id: string;
  nome: string;
  turmaId: string;
  responsavel: string;
  relacao: 'Mãe' | 'Pai';
  telefone: string;
  presenca: number;
  historico: boolean[];
  status: Status;
  diaVenc: number;
};

const TURMAS: Turma[] = [
  { id: 'fut9', nome: 'Futsal Sub-9', atividade: 'Futsal', inicio: '14:00', fim: '15:00', local: 'Quadra coberta', dias: 'Seg, qua e qui', valor: 90, cor: '#0E6B4F' },
  { id: 'bale', nome: 'Balé Baby', atividade: 'Balé', inicio: '15:30', fim: '16:30', local: 'Sala de dança', dias: 'Ter e qui', valor: 110, cor: '#B23A63' },
  { id: 'capo', nome: 'Capoeira Infantil', atividade: 'Capoeira', inicio: '17:00', fim: '18:00', local: 'Pátio', dias: 'Seg e qui', valor: 80, cor: '#A2791A' },
  { id: 'fut13', nome: 'Futsal Sub-13', atividade: 'Futsal', inicio: '18:30', fim: '19:45', local: 'Quadra coberta', dias: 'Ter e qui', valor: 100, cor: '#1F5F80' },
];

const NOMES: Record<string, string[]> = {
  fut9: [
    'Davi Lucas Santos', 'Enzo Gabriel Souza', 'Arthur Miguel Bispo', 'Heitor Conceição', 'Ravi Nascimento',
    'Pedro Henrique Barreto', 'João Vitor Cerqueira', 'Kauã Oliveira', 'Luan Pinheiro', 'Ícaro Sacramento',
    'Tainan Reis', 'Iuri Assunção', 'Bernardo Brito', 'Samuel Andrade', 'Caio Menezes', 'Benjamin Rocha',
  ],
  bale: [
    'Maria Clara Dantas', 'Ana Luiza Carvalho', 'Helena Santana', 'Alice Nascimento', 'Valentina Souza',
    'Lara Cerqueira', 'Yasmin Bispo', 'Laura Beatriz Silva', 'Cecília Pinheiro', 'Manuela Reis',
  ],
  capo: [
    'Gabriel Conceição', 'Sofia Barreto', 'Miguel Santos', 'Isis Sacramento', 'Nicolas Oliveira',
    'Ayla Menezes', 'Théo Brito', 'Luna Andrade', 'Kaique Rocha', 'Maria Eduarda Silva', 'Anthony Dantas',
    'Esther Carvalho',
  ],
  fut13: [
    'Guilherme Santana', 'Matheus Assunção', 'Vinícius Bispo', 'Lucas Nascimento', 'Rian Cerqueira',
    'Felipe Souza', 'Emanuel Reis', 'Ruan Pinheiro', 'Cauã Barreto', 'Wesley Conceição', 'Marcos Vinícius Silva',
    'Igor Menezes', 'Ryan Oliveira', 'Otávio Andrade',
  ],
};

const RESPONSAVEIS = [
  'Luciana', 'Fabiana', 'Marcos', 'Adriana', 'Joseane', 'Jailson', 'Rosângela', 'Cristiane', 'Edvaldo', 'Patrícia',
  'Gilmara', 'Roberto', 'Silvana', 'Tatiane', 'Josué', 'Valdirene', 'Elaine', 'Ronaldo', 'Aline', 'Cleber',
];
const PAIS = new Set(['Marcos', 'Jailson', 'Edvaldo', 'Roberto', 'Josué', 'Ronaldo', 'Cleber']);

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const ALUNOS: Aluno[] = (() => {
  let g = 0;
  return TURMAS.flatMap((t) =>
    NOMES[t.id].map((nome) => {
      const i = g++;
      const h = hash(nome);
      const sobrenome = nome.split(' ').at(-1)!;
      const respNome = RESPONSAVEIS[(i * 7 + 3) % RESPONSAVEIS.length];
      const presenca = 68 + (h % 32);
      const status: Status = i % 9 === 4 ? 'atrasada' : i % 7 === 2 ? 'pendente' : 'paga';
      const diaVenc =
        status === 'atrasada' ? [5, 10, 15][i % 3] : status === 'pendente' ? [20, 25][i % 2] : [5, 10, 15, 20][i % 4];
      return {
        id: `a${i}`,
        nome,
        turmaId: t.id,
        responsavel: `${respNome} ${sobrenome}`,
        relacao: PAIS.has(respNome) ? 'Pai' : 'Mãe',
        telefone: `(75) 9${8100 + (h % 900)}-${1000 + ((h >>> 5) % 9000)}`,
        presenca,
        historico: Array.from({ length: 8 }, (_, k) => hash(`${nome}${k}`) % 100 < presenca),
        status,
        diaVenc,
      } satisfies Aluno;
    }),
  );
})();

const turmaDe = (id: string) => TURMAS.find((t) => t.id === id)!;
const alunosDa = (turmaId: string) => ALUNOS.filter((a) => a.turmaId === turmaId);

/** A primeira turma do dia já vem com a chamada feita: 14 de 16 presentes. */
const CHAMADAS_INICIAIS: Record<string, Record<string, Marca>> = {
  fut9: Object.fromEntries(alunosDa('fut9').map((a, i) => [a.id, i === 5 || i === 11 ? 'F' : 'P'])),
};

/* ------------------------------------------------------------------ */
/* Utilidades                                                          */
/* ------------------------------------------------------------------ */

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const dia = (d: number) => String(d).padStart(2, '0');

const AVATAR = [
  ['#D6F0E4', '#0B5A42'],
  ['#DCEBF5', '#1F5F80'],
  ['#FBE3D6', '#9A4520'],
  ['#EADFF5', '#6A3F93'],
  ['#FCEFC7', '#7A5A0B'],
  ['#FADCE5', '#9C2F55'],
];

function iniciais(nome: string) {
  const p = nome.split(' ');
  return (p[0][0] + (p.length > 1 ? p.at(-1)![0] : '')).toUpperCase();
}

function primeiroNome(nome: string) {
  const p = nome.split(' ');
  // nomes compostos comuns ("Davi Lucas", "Maria Clara") ficam inteiros
  return p.length > 2 ? `${p[0]} ${p[1]}` : p[0];
}

const FOCO =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E6B4F] outline-none';

const STATUS_INFO: Record<Status, { label: string; cls: string }> = {
  paga: { label: 'Paga', cls: 'bg-[#E8F5EF] text-[#0B5A42]' },
  pendente: { label: 'Pendente', cls: 'bg-[#FEF3C7] text-[#8A4B08]' },
  atrasada: { label: 'Atrasada', cls: 'bg-[#FEE4E2] text-[#A11B12]' },
};

/** Data e saudação só no cliente, sem divergência de hidratação. */
const noop = () => () => {};
function lerHoje() {
  const d = new Date();
  const h = d.getHours();
  const saud = h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
  const label = d.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  const mes = d.toLocaleDateString('pt-BR', { month: 'long' });
  return `${saud}|${label}|${mes}`;
}
function useHoje() {
  const snap = useSyncExternalStore(noop, lerHoje, () => null);
  if (!snap) return { saudacao: 'Olá', data: 'Hoje', mes: 'deste mês' };
  const [saudacao, data, mes] = snap.split('|');
  return { saudacao, data: data[0].toUpperCase() + data.slice(1), mes };
}

/* ------------------------------------------------------------------ */
/* Peças                                                               */
/* ------------------------------------------------------------------ */

function Avatar({ nome, size = 'md' }: { nome: string; size?: 'md' | 'lg' }) {
  const [bg, fg] = AVATAR[hash(nome) % AVATAR.length];
  return (
    <span
      aria-hidden
      className={`grid shrink-0 place-items-center rounded-full font-display font-bold ${
        size === 'lg' ? 'size-20 text-2xl' : 'size-11 text-sm'
      }`}
      style={{ background: bg, color: fg }}
    >
      {iniciais(nome)}
    </span>
  );
}

function Badge({ status }: { status: Status }) {
  const s = STATUS_INFO[status];
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${s.cls}`}>{s.label}</span>;
}

function Header({
  titulo,
  sub,
  onBack,
  children,
}: {
  titulo: string;
  sub?: string;
  onBack?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-[#0E6B4F]/10 bg-white/95 px-4 pt-3 pb-3 backdrop-blur">
      <div className="flex items-center gap-2">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Voltar"
            className={`-ml-2 grid size-11 place-items-center rounded-full text-[#0E6B4F] hover:bg-[#E8F5EF] ${FOCO}`}
          >
            <ArrowLeft className="size-5" />
          </button>
        )}
        <div className="min-w-0">
          <h1 className="truncate font-display text-xl font-extrabold text-[#0B2A21]">{titulo}</h1>
          {sub && <p className="truncate text-sm text-[#4A5F57]">{sub}</p>}
        </div>
      </div>
      {children}
    </header>
  );
}

function TurmaCard({
  turma,
  marcas,
  onOpen,
}: {
  turma: Turma;
  marcas?: Record<string, Marca>;
  onOpen: () => void;
}) {
  const total = alunosDa(turma.id).length;
  const presentes = marcas ? Object.values(marcas).filter((m) => m === 'P').length : 0;
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`flex w-full items-center gap-3 rounded-2xl border border-[#0E6B4F]/10 bg-white p-3 text-left shadow-[0_1px_2px_rgba(11,42,33,0.06)] transition active:scale-[0.99] ${FOCO}`}
    >
      <div className="flex w-14 shrink-0 flex-col items-center rounded-xl py-2" style={{ background: `${turma.cor}14` }}>
        <span className="font-display text-base font-extrabold" style={{ color: turma.cor }}>
          {turma.inicio}
        </span>
        <span className="text-[11px] text-[#4A5F57]">{turma.fim}</span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-display font-bold text-[#0B2A21]">{turma.nome}</p>
        <p className="mt-0.5 flex items-center gap-1 truncate text-sm text-[#4A5F57]">
          <MapPin className="size-3.5 shrink-0" aria-hidden /> {turma.local} · {total} alunos
        </p>
        <p className="mt-1.5">
          {marcas ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#E8F5EF] px-2 py-0.5 text-xs font-bold text-[#0B5A42]">
              <CheckCheck className="size-3.5" aria-hidden /> Chamada feita · {presentes}/{total}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#F1F4F3] px-2 py-0.5 text-xs font-bold text-[#4A5F57]">
              <Clock className="size-3.5" aria-hidden /> Chamada a fazer
            </span>
          )}
        </p>
      </div>
      <ChevronRight className="size-5 shrink-0 text-[#0E6B4F]/50" aria-hidden />
    </button>
  );
}

function Sheet({
  aberto,
  onClose,
  titulo,
  children,
}: {
  aberto: boolean;
  onClose: () => void;
  titulo: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!aberto) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [aberto, onClose]);

  return (
    <AnimatePresence>
      {aberto && (
        <>
          <motion.div
            key="fundo"
            className="fixed inset-0 z-40 bg-[#0B2A21]/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            key="painel"
            role="dialog"
            aria-modal="true"
            aria-label={titulo}
            className="fixed inset-x-0 bottom-0 z-50 max-h-[88%] overflow-y-auto rounded-t-3xl bg-white px-5 pt-3 pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-2xl"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
          >
            <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-[#D5DEDA]" aria-hidden />
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* Telas                                                               */
/* ------------------------------------------------------------------ */

function Inicio({
  chamadas,
  statusPag,
  onAbrirTurma,
  onIr,
}: {
  chamadas: Record<string, Record<string, Marca>>;
  statusPag: Record<string, Status>;
  onAbrirTurma: (id: string) => void;
  onIr: (tab: Tab, opts?: { filtro?: Filtro }) => void;
}) {
  const hoje = useHoje();
  const media = Math.round(ALUNOS.reduce((s, a) => s + a.presenca, 0) / ALUNOS.length);
  const atrasados = ALUNOS.filter((a) => statusPag[a.id] === 'atrasada');
  const valorAtraso = atrasados.reduce((s, a) => s + turmaDe(a.turmaId).valor, 0);
  const proxima = TURMAS.find((t) => !chamadas[t.id]);

  return (
    <div className="pb-28">
      <section className="bg-[#0E6B4F] px-4 pt-5 pb-16 text-white">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-white font-display text-sm font-black text-[#0E6B4F]">
            EM
          </span>
          <span className="font-display text-sm font-bold tracking-wide text-white/90">{ESCOLA}</span>
        </div>
        <h1 className="mt-5 font-display text-[1.7rem] leading-tight font-extrabold">
          {hoje.saudacao}, {PROFESSORA}
        </h1>
        <p className="mt-1 text-sm text-white/80">
          {hoje.data} · {TURMAS.length} turmas hoje
        </p>
      </section>

      <div className="-mt-11 grid grid-cols-2 gap-3 px-4">
        <div className="rounded-2xl bg-white p-3.5 shadow-[0_6px_20px_rgba(11,42,33,0.12)]">
          <p className="text-xs font-semibold text-[#4A5F57]">Presença média da semana</p>
          <p className="mt-1 font-display text-3xl font-extrabold text-[#0B2A21]">{media}%</p>
          <p className="mt-0.5 flex items-center gap-1 text-xs font-bold text-[#0B5A42]">
            <TrendingUp className="size-3.5" aria-hidden /> +3% que a anterior
          </p>
        </div>
        <button
          type="button"
          onClick={() => onIr('mensalidades', { filtro: 'atrasada' })}
          className={`rounded-2xl bg-white p-3.5 text-left shadow-[0_6px_20px_rgba(11,42,33,0.12)] ${FOCO}`}
        >
          <p className="text-xs font-semibold text-[#4A5F57]">Mensalidades em atraso</p>
          <p className="mt-1 font-display text-3xl font-extrabold text-[#A11B12]">{atrasados.length}</p>
          <p className="mt-0.5 text-xs font-bold text-[#A11B12]">
            {atrasados.length ? `${brl.format(valorAtraso)} a receber` : 'Tudo em dia'}
          </p>
        </button>
      </div>

      <section className="mt-6 px-4" aria-labelledby="atalhos">
        <h2 id="atalhos" className="sr-only">
          Atalhos
        </h2>
        <div className="grid grid-cols-3 gap-2.5">
          {[
            {
              label: 'Fazer chamada',
              icon: ClipboardCheck,
              on: () => (proxima ? onAbrirTurma(proxima.id) : onIr('chamada')),
            },
            { label: 'Cobrar atrasados', icon: Wallet, on: () => onIr('mensalidades', { filtro: 'atrasada' }) },
            { label: 'Buscar aluno', icon: Search, on: () => onIr('alunos') },
          ].map(({ label, icon: Icon, on }) => (
            <button
              key={label}
              type="button"
              onClick={on}
              className={`flex min-h-[88px] flex-col items-center justify-center gap-2 rounded-2xl bg-[#E8F5EF] px-2 text-center text-[13px] leading-tight font-bold text-[#0B5A42] transition active:scale-[0.97] ${FOCO}`}
            >
              <span className="grid size-10 place-items-center rounded-full bg-white">
                <Icon className="size-5 text-[#0E6B4F]" aria-hidden />
              </span>
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-7 px-4" aria-labelledby="turmas-hoje">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 id="turmas-hoje" className="font-display text-lg font-extrabold text-[#0B2A21]">
            Turmas de hoje
          </h2>
          <span className="text-sm font-semibold text-[#4A5F57]">
            {Object.keys(chamadas).length} de {TURMAS.length} feitas
          </span>
        </div>
        <ul className="space-y-2.5">
          {TURMAS.map((t) => (
            <li key={t.id}>
              <TurmaCard turma={t} marcas={chamadas[t.id]} onOpen={() => onAbrirTurma(t.id)} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function ListaTurmas({
  chamadas,
  onAbrirTurma,
}: {
  chamadas: Record<string, Record<string, Marca>>;
  onAbrirTurma: (id: string) => void;
}) {
  const hoje = useHoje();
  const feitas = Object.keys(chamadas).length;
  return (
    <div className="pb-28">
      <Header titulo="Chamada" sub={`${hoje.data} · ${feitas} de ${TURMAS.length} feitas`} />
      <div className="px-4 pt-4">
        <div className="mb-4 h-2 overflow-hidden rounded-full bg-[#E8F5EF]" aria-hidden>
          <motion.div
            className="h-full rounded-full bg-[#0E6B4F]"
            initial={false}
            animate={{ width: `${(feitas / TURMAS.length) * 100}%` }}
          />
        </div>
        <p className="mb-3 text-sm text-[#4A5F57]">Toque numa turma para fazer ou revisar a chamada.</p>
        <ul className="space-y-2.5">
          {TURMAS.map((t) => (
            <li key={t.id}>
              <TurmaCard turma={t} marcas={chamadas[t.id]} onOpen={() => onAbrirTurma(t.id)} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Chamada({
  turma,
  inicial,
  onVoltar,
  onSalvar,
}: {
  turma: Turma;
  inicial?: Record<string, Marca>;
  onVoltar: () => void;
  onSalvar: (marcas: Record<string, Marca>) => void;
}) {
  const alunos = alunosDa(turma.id);
  const [marcas, setMarcas] = useState<Record<string, Marca>>(() => ({ ...inicial }));
  const presentes = alunos.filter((a) => marcas[a.id] === 'P').length;
  const faltas = alunos.filter((a) => marcas[a.id] === 'F').length;
  const semMarcar = alunos.length - presentes - faltas;

  const alternar = (id: string) =>
    setMarcas((m) => ({ ...m, [id]: m[id] === 'P' ? 'F' : 'P' }));
  const todosPresentes = () => setMarcas(Object.fromEntries(alunos.map((a) => [a.id, 'P' as Marca])));

  return (
    <div className="pb-32">
      <Header titulo={turma.nome} sub={`${turma.inicio} às ${turma.fim} · ${turma.local}`} onBack={onVoltar}>
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-sm text-[#4A5F57]" aria-live="polite">
            <span className="font-display text-lg font-extrabold text-[#0B2A21]">{presentes}</span> de{' '}
            {alunos.length} presentes
            {faltas > 0 && <span className="text-[#A11B12]"> · {faltas} {faltas === 1 ? 'falta' : 'faltas'}</span>}
          </p>
          <button
            type="button"
            onClick={todosPresentes}
            className={`flex min-h-11 items-center gap-1.5 rounded-full bg-[#E8F5EF] px-3.5 text-sm font-bold text-[#0B5A42] active:scale-[0.97] ${FOCO}`}
          >
            <CheckCheck className="size-4" aria-hidden /> Todos presentes
          </button>
        </div>
        <div className="mt-2.5 flex h-1.5 overflow-hidden rounded-full bg-[#EEF2F0]" aria-hidden>
          <motion.div className="h-full bg-[#0E6B4F]" animate={{ width: `${(presentes / alunos.length) * 100}%` }} />
          <motion.div className="h-full bg-[#E5484D]" animate={{ width: `${(faltas / alunos.length) * 100}%` }} />
        </div>
      </Header>

      <ul className="divide-y divide-[#0E6B4F]/8 px-4">
        {alunos.map((a) => {
          const m = marcas[a.id];
          return (
            <li key={a.id} className="flex items-center gap-3 py-2.5">
              <Avatar nome={a.nome} />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-[#0B2A21]">{a.nome}</p>
                <p className="text-xs text-[#4A5F57]">{a.presenca}% de presença</p>
              </div>
              <button
                type="button"
                onClick={() => alternar(a.id)}
                aria-label={`${a.nome}: ${m === 'P' ? 'presente' : m === 'F' ? 'falta' : 'sem marcar'}. Toque para alternar.`}
                className={`relative flex h-12 w-[7.5rem] shrink-0 items-center justify-center gap-1.5 rounded-full border-2 text-sm font-bold transition-colors active:scale-[0.96] ${FOCO} ${
                  m === 'P'
                    ? 'border-[#0E6B4F] bg-[#0E6B4F] text-white'
                    : m === 'F'
                      ? 'border-[#E5484D] bg-[#FEE4E2] text-[#A11B12]'
                      : 'border-dashed border-[#B8C6C0] bg-white text-[#4A5F57]'
                }`}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={m ?? 'vazio'}
                    className="flex items-center gap-1.5"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.16 }}
                  >
                    {m === 'P' ? (
                      <>
                        <Check className="size-4" aria-hidden /> Presente
                      </>
                    ) : m === 'F' ? (
                      <>
                        <X className="size-4" aria-hidden /> Falta
                      </>
                    ) : (
                      'Marcar'
                    )}
                  </motion.span>
                </AnimatePresence>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#0E6B4F]/10 bg-white px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <button
          type="button"
          disabled={semMarcar > 0}
          onClick={() => onSalvar(marcas)}
          className={`flex min-h-13 w-full items-center justify-center gap-2 rounded-2xl bg-[#0E6B4F] px-4 py-3.5 font-display text-base font-bold text-white transition active:scale-[0.99] disabled:bg-[#C9D6D0] disabled:text-[#3F524A] ${FOCO}`}
        >
          {semMarcar > 0 ? (
            `Faltam ${semMarcar} ${semMarcar === 1 ? 'aluno' : 'alunos'} para marcar`
          ) : (
            <>
              <Check className="size-5" aria-hidden /> Salvar chamada
            </>
          )}
        </button>
      </div>
    </div>
  );
}

type Filtro = 'todas' | Status;

function Mensalidades({
  statusPag,
  filtro,
  setFiltro,
  onAbrir,
}: {
  statusPag: Record<string, Status>;
  filtro: Filtro;
  setFiltro: (f: Filtro) => void;
  onAbrir: (id: string) => void;
}) {
  const hoje = useHoje();
  const contagem = { todas: ALUNOS.length, paga: 0, pendente: 0, atrasada: 0 };
  let recebido = 0;
  let previsto = 0;
  for (const a of ALUNOS) {
    const s = statusPag[a.id];
    contagem[s]++;
    const v = turmaDe(a.turmaId).valor;
    previsto += v;
    if (s === 'paga') recebido += v;
  }
  const ordem: Record<Status, number> = { atrasada: 0, pendente: 1, paga: 2 };
  const lista = ALUNOS.filter((a) => filtro === 'todas' || statusPag[a.id] === filtro).sort(
    (x, y) => ordem[statusPag[x.id]] - ordem[statusPag[y.id]] || x.diaVenc - y.diaVenc,
  );
  const chips: { id: Filtro; label: string }[] = [
    { id: 'todas', label: 'Todas' },
    { id: 'paga', label: 'Pagas' },
    { id: 'pendente', label: 'Pendentes' },
    { id: 'atrasada', label: 'Atrasadas' },
  ];

  return (
    <div className="pb-28">
      <Header titulo="Mensalidades" sub={`Referência: ${hoje.mes}`}>
        <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-0.5 [scrollbar-width:none]" role="group" aria-label="Filtrar mensalidades">
          {chips.map((c) => {
            const ativo = filtro === c.id;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={ativo}
                onClick={() => setFiltro(c.id)}
                className={`flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-sm font-bold transition-colors ${FOCO} ${
                  ativo ? 'border-[#0E6B4F] bg-[#0E6B4F] text-white' : 'border-[#0E6B4F]/20 bg-white text-[#0B5A42]'
                }`}
              >
                {c.label}
                <span
                  className={`rounded-full px-1.5 text-xs tabular-nums ${
                    ativo ? 'bg-white/20' : c.id === 'atrasada' ? 'bg-[#FEE4E2] text-[#A11B12]' : 'bg-[#E8F5EF]'
                  }`}
                >
                  {contagem[c.id]}
                </span>
              </button>
            );
          })}
        </div>
      </Header>

      <div className="px-4 pt-4">
        <div className="rounded-2xl bg-[#E8F5EF] p-4">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-sm font-semibold text-[#0B5A42]">Recebido no mês</p>
            <p className="text-xs text-[#3F524A]">de {brl.format(previsto)}</p>
          </div>
          <p className="mt-0.5 font-display text-2xl font-extrabold text-[#0B2A21]">{brl.format(recebido)}</p>
          <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-white" aria-hidden>
            <motion.div
              className="h-full rounded-full bg-[#0E6B4F]"
              initial={false}
              animate={{ width: `${(recebido / previsto) * 100}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-[#3F524A]">
            {contagem.paga} pagas · {contagem.pendente} a vencer · {contagem.atrasada} em atraso
          </p>
        </div>

        <ul className="mt-4 space-y-2">
          <AnimatePresence initial={false}>
            {lista.map((a) => {
              const s = statusPag[a.id];
              const t = turmaDe(a.turmaId);
              const conteudo = (
                <>
                  <Avatar nome={a.nome} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-[#0B2A21]">{a.nome}</p>
                    <p className="truncate text-xs text-[#4A5F57]">Resp.: {a.responsavel}</p>
                    <p className="truncate text-xs text-[#4A5F57]">
                      {s === 'paga' ? 'Venceu' : s === 'atrasada' ? 'Venceu' : 'Vence'} dia {dia(a.diaVenc)} · {t.nome}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span className="font-display font-bold text-[#0B2A21] tabular-nums">{brl.format(t.valor)}</span>
                    <Badge status={s} />
                  </div>
                </>
              );
              return (
                <motion.li
                  key={a.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ duration: 0.2 }}
                >
                  {s === 'paga' ? (
                    <div className="flex items-center gap-3 rounded-2xl border border-[#0E6B4F]/10 bg-white p-3">
                      {conteudo}
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onAbrir(a.id)}
                      className={`flex w-full items-center gap-3 rounded-2xl border bg-white p-3 text-left active:scale-[0.99] ${FOCO} ${
                        s === 'atrasada' ? 'border-[#E5484D]/35' : 'border-[#0E6B4F]/10'
                      }`}
                    >
                      {conteudo}
                    </button>
                  )}
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
        {lista.length === 0 && (
          <div className="mt-8 flex flex-col items-center text-center text-[#4A5F57]">
            <span className="grid size-14 place-items-center rounded-full bg-[#E8F5EF]">
              <CheckCheck className="size-7 text-[#0E6B4F]" aria-hidden />
            </span>
            <p className="mt-3 font-display font-bold text-[#0B2A21]">Nada por aqui</p>
            <p className="text-sm">Nenhuma mensalidade nesse filtro.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Alunos({
  busca,
  setBusca,
  turmaFiltro,
  setTurmaFiltro,
  onAbrir,
}: {
  busca: string;
  setBusca: (s: string) => void;
  turmaFiltro: string;
  setTurmaFiltro: (s: string) => void;
  onAbrir: (id: string) => void;
}) {
  const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const q = norm(busca.trim());
  const lista = ALUNOS.filter(
    (a) =>
      (turmaFiltro === 'todas' || a.turmaId === turmaFiltro) &&
      (!q || norm(a.nome).includes(q) || norm(a.responsavel).includes(q)),
  ).sort((x, y) => x.nome.localeCompare(y.nome, 'pt-BR'));

  return (
    <div className="pb-28">
      <Header titulo="Alunos" sub={`${ALUNOS.length} alunos em ${TURMAS.length} turmas`}>
        <label htmlFor="busca-aluno" className="sr-only">
          Buscar aluno ou responsável
        </label>
        <div className="relative mt-3">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2 text-[#4A5F57]" aria-hidden />
          <input
            id="busca-aluno"
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar aluno ou responsável"
            autoComplete="off"
            className="h-12 w-full rounded-2xl border border-[#0E6B4F]/15 bg-[#F6FAF8] pr-3 pl-10 text-base text-[#0B2A21] placeholder:text-[#6B7F77] focus:border-[#0E6B4F] focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E6B4F]/30"
          />
        </div>
        <div className="-mx-4 mt-2.5 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none]" role="group" aria-label="Filtrar por turma">
          {[{ id: 'todas', nome: 'Todas' }, ...TURMAS].map((t) => {
            const ativo = turmaFiltro === t.id;
            return (
              <button
                key={t.id}
                type="button"
                aria-pressed={ativo}
                onClick={() => setTurmaFiltro(t.id)}
                className={`min-h-11 shrink-0 rounded-full border px-3.5 text-sm font-bold transition-colors ${FOCO} ${
                  ativo ? 'border-[#0E6B4F] bg-[#0E6B4F] text-white' : 'border-[#0E6B4F]/20 bg-white text-[#0B5A42]'
                }`}
              >
                {t.nome}
              </button>
            );
          })}
        </div>
      </Header>

      <p className="px-4 pt-3 text-xs font-semibold text-[#4A5F57]" aria-live="polite">
        {lista.length} {lista.length === 1 ? 'aluno encontrado' : 'alunos encontrados'}
      </p>
      <ul className="divide-y divide-[#0E6B4F]/8 px-4">
        {lista.map((a) => (
          <li key={a.id}>
            <button
              type="button"
              onClick={() => onAbrir(a.id)}
              className={`flex w-full items-center gap-3 rounded-xl py-2.5 text-left ${FOCO}`}
            >
              <Avatar nome={a.nome} />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-[#0B2A21]">{a.nome}</p>
                <p className="truncate text-xs text-[#4A5F57]">
                  {turmaDe(a.turmaId).nome} · {a.relacao}: {a.responsavel.split(' ')[0]}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-bold tabular-nums ${
                  a.presenca < 75 ? 'bg-[#FEF3C7] text-[#8A4B08]' : 'bg-[#E8F5EF] text-[#0B5A42]'
                }`}
              >
                {a.presenca}%
              </span>
              <ChevronRight className="size-4 shrink-0 text-[#0E6B4F]/50" aria-hidden />
            </button>
          </li>
        ))}
      </ul>
      {lista.length === 0 && (
        <div className="mt-10 flex flex-col items-center px-8 text-center text-[#4A5F57]">
          <span className="grid size-14 place-items-center rounded-full bg-[#E8F5EF]">
            <Search className="size-6 text-[#0E6B4F]" aria-hidden />
          </span>
          <p className="mt-3 font-display font-bold text-[#0B2A21]">Nenhum aluno encontrado</p>
          <p className="text-sm">Tente outro nome ou limpe o filtro de turma.</p>
        </div>
      )}
    </div>
  );
}

function DetalheAluno({
  aluno,
  status,
  onVoltar,
  onCobrar,
}: {
  aluno: Aluno;
  status: Status;
  onVoltar: () => void;
  onCobrar: () => void;
}) {
  const t = turmaDe(aluno.turmaId);
  const msg = `Olá, ${aluno.responsavel.split(' ')[0]}! Tudo bem? Aqui é a ${PROFESSORA}, do ${ESCOLA}. Passando pra falar sobre ${primeiroNome(aluno.nome)} na turma de ${t.nome}.`;
  const faltas = aluno.historico.filter((p) => !p).length;

  return (
    <div className="pb-28">
      <Header titulo="Ficha do aluno" onBack={onVoltar} />
      <div className="flex flex-col items-center px-4 pt-6 text-center">
        <Avatar nome={aluno.nome} size="lg" />
        <h2 className="mt-3 font-display text-xl font-extrabold text-[#0B2A21]">{aluno.nome}</h2>
        <span
          className="mt-1.5 rounded-full px-3 py-1 text-xs font-bold"
          style={{ background: `${t.cor}18`, color: t.cor }}
        >
          {t.nome}
        </span>
      </div>

      <div className="mx-4 mt-5 rounded-2xl bg-[#E8F5EF] p-4">
        <div className="flex items-baseline justify-between">
          <p className="text-sm font-semibold text-[#0B5A42]">Presença no semestre</p>
          <p className="font-display text-2xl font-extrabold text-[#0B2A21]">{aluno.presenca}%</p>
        </div>
        <div
          className="mt-2 h-2.5 overflow-hidden rounded-full bg-white"
          role="progressbar"
          aria-valuenow={aluno.presenca}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Percentual de presença"
        >
          <motion.div
            className={`h-full rounded-full ${aluno.presenca < 75 ? 'bg-[#D97706]' : 'bg-[#0E6B4F]'}`}
            initial={{ width: 0 }}
            animate={{ width: `${aluno.presenca}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
        <p className="mt-3 text-xs font-semibold text-[#3F524A]">
          Últimas 8 aulas · {faltas} {faltas === 1 ? 'falta' : 'faltas'}
        </p>
        <ol className="mt-1.5 flex gap-1.5" aria-label="Presença nas últimas 8 aulas">
          {aluno.historico.map((p, i) => (
            <li
              key={i}
              className={`grid size-7 place-items-center rounded-lg ${p ? 'bg-[#0E6B4F] text-white' : 'bg-[#FEE4E2] text-[#A11B12]'}`}
              aria-label={`Aula ${i + 1}: ${p ? 'presente' : 'falta'}`}
            >
              {p ? <Check className="size-3.5" aria-hidden /> : <X className="size-3.5" aria-hidden />}
            </li>
          ))}
        </ol>
      </div>

      <dl className="mx-4 mt-4 divide-y divide-[#0E6B4F]/8 rounded-2xl border border-[#0E6B4F]/10 bg-white px-4">
        {[
          { icon: UserRound, k: `Responsável (${aluno.relacao.toLowerCase()})`, v: aluno.responsavel },
          { icon: Phone, k: 'Telefone', v: aluno.telefone },
          { icon: Clock, k: 'Horário', v: `${t.dias}, ${t.inicio} às ${t.fim}` },
          { icon: MapPin, k: 'Local', v: t.local },
        ].map(({ icon: Icon, k, v }) => (
          <div key={k} className="flex items-center gap-3 py-3">
            <Icon className="size-4.5 shrink-0 text-[#0E6B4F]" aria-hidden />
            <dt className="text-sm text-[#4A5F57]">{k}</dt>
            <dd className="ml-auto text-right text-sm font-semibold text-[#0B2A21]">{v}</dd>
          </div>
        ))}
        <div className="flex items-center gap-3 py-3">
          <Wallet className="size-4.5 shrink-0 text-[#0E6B4F]" aria-hidden />
          <dt className="text-sm text-[#4A5F57]">Mensalidade</dt>
          <dd className="ml-auto flex items-center gap-2 text-sm font-semibold text-[#0B2A21]">
            {brl.format(t.valor)} <Badge status={status} />
          </dd>
        </div>
      </dl>

      <div className="mx-4 mt-4 space-y-2.5">
        <a
          href={`https://wa.me/?text=${encodeURIComponent(msg)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#0E6B4F] px-4 font-bold text-white active:scale-[0.99] ${FOCO}`}
        >
          <MessageCircle className="size-5" aria-hidden /> Falar com o responsável
        </a>
        {status !== 'paga' && (
          <button
            type="button"
            onClick={onCobrar}
            className={`flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#0E6B4F]/25 px-4 font-bold text-[#0B5A42] active:scale-[0.99] ${FOCO}`}
          >
            <Wallet className="size-5" aria-hidden /> Ver mensalidade em aberto
          </button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* App                                                                 */
/* ------------------------------------------------------------------ */

export default function Escolinha() {
  const rootRef = useRef<HTMLDivElement>(null);
  const toastId = useRef(0);
  const hoje = useHoje();

  const [tab, setTab] = useState<Tab>('inicio');
  const [turmaAberta, setTurmaAberta] = useState<string | null>(null);
  const [alunoAberto, setAlunoAberto] = useState<string | null>(null);
  const [chamadas, setChamadas] = useState(CHAMADAS_INICIAIS);
  const [statusPag, setStatusPag] = useState<Record<string, Status>>(() =>
    Object.fromEntries(ALUNOS.map((a) => [a.id, a.status])),
  );
  const [filtro, setFiltro] = useState<Filtro>('todas');
  const [busca, setBusca] = useState('');
  const [turmaFiltro, setTurmaFiltro] = useState('todas');
  const [cobranca, setCobranca] = useState<string | null>(null);
  const [toast, setToast] = useState<{ id: number; msg: string } | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  const avisar = (msg: string) => setToast({ id: ++toastId.current, msg });
  const topo = () => rootRef.current?.parentElement?.scrollTo({ top: 0 });

  const irPara = (t: Tab, opts?: { filtro?: Filtro }) => {
    setTab(t);
    setTurmaAberta(null);
    if (t !== 'alunos') setAlunoAberto(null);
    if (opts?.filtro) setFiltro(opts.filtro);
    topo();
  };
  const abrirTurma = (id: string) => {
    setTab('chamada');
    setTurmaAberta(id);
    topo();
  };

  const salvarChamada = (id: string, marcas: Record<string, Marca>) => {
    setChamadas((c) => ({ ...c, [id]: marcas }));
    const total = alunosDa(id).length;
    const p = Object.values(marcas).filter((m) => m === 'P').length;
    setTurmaAberta(null);
    topo();
    avisar(`Chamada salva: ${p} de ${total} presentes`);
  };

  const marcarPaga = (id: string) => {
    setStatusPag((s) => ({ ...s, [id]: 'paga' }));
    setCobranca(null);
    const a = ALUNOS.find((x) => x.id === id)!;
    avisar(`Mensalidade de ${primeiroNome(a.nome)} marcada como paga`);
  };

  const fecharCobranca = useCallback(() => setCobranca(null), []);

  const turma = turmaAberta ? turmaDe(turmaAberta) : null;
  const aluno = alunoAberto ? ALUNOS.find((a) => a.id === alunoAberto)! : null;
  const cobrado = cobranca ? ALUNOS.find((a) => a.id === cobranca)! : null;
  const telaChamada = tab === 'chamada' && turma;
  const chave = telaChamada ? `ch-${turma.id}` : tab === 'alunos' && aluno ? `al-${aluno.id}` : tab;

  let tela: React.ReactNode;
  if (tab === 'inicio') {
    tela = <Inicio chamadas={chamadas} statusPag={statusPag} onAbrirTurma={abrirTurma} onIr={irPara} />;
  } else if (tab === 'chamada') {
    tela = turma ? (
      <Chamada
        key={turma.id}
        turma={turma}
        inicial={chamadas[turma.id]}
        onVoltar={() => {
          setTurmaAberta(null);
          topo();
        }}
        onSalvar={(m) => salvarChamada(turma.id, m)}
      />
    ) : (
      <ListaTurmas chamadas={chamadas} onAbrirTurma={abrirTurma} />
    );
  } else if (tab === 'mensalidades') {
    tela = <Mensalidades statusPag={statusPag} filtro={filtro} setFiltro={setFiltro} onAbrir={setCobranca} />;
  } else {
    tela = aluno ? (
      <DetalheAluno
        aluno={aluno}
        status={statusPag[aluno.id]}
        onVoltar={() => {
          setAlunoAberto(null);
          topo();
        }}
        onCobrar={() => setCobranca(aluno.id)}
      />
    ) : (
      <Alunos
        busca={busca}
        setBusca={setBusca}
        turmaFiltro={turmaFiltro}
        setTurmaFiltro={setTurmaFiltro}
        onAbrir={(id) => {
          setAlunoAberto(id);
          topo();
        }}
      />
    );
  }

  const abas: { id: Tab; label: string; icon: typeof House }[] = [
    { id: 'inicio', label: 'Início', icon: House },
    { id: 'chamada', label: 'Chamada', icon: ClipboardCheck },
    { id: 'mensalidades', label: 'Mensalidades', icon: Wallet },
    { id: 'alunos', label: 'Alunos', icon: Users },
  ];
  const atrasadas = ALUNOS.filter((a) => statusPag[a.id] === 'atrasada').length;

  const cobT = cobrado ? turmaDe(cobrado.turmaId) : null;
  const cobStatus = cobrado ? statusPag[cobrado.id] : 'paga';
  const msgCobranca =
    cobrado && cobT
      ? `Olá, ${cobrado.responsavel.split(' ')[0]}! Tudo bem? Aqui é do ${ESCOLA}. ` +
        (cobStatus === 'atrasada'
          ? `Passando pra lembrar, com carinho, que a mensalidade de ${hoje.mes === 'deste mês' ? 'este mês' : hoje.mes} de ${primeiroNome(cobrado.nome)} (${cobT.nome}), no valor de ${brl.format(cobT.valor)}, venceu no dia ${dia(cobrado.diaVenc)}. `
          : `Só um lembrete de que a mensalidade de ${primeiroNome(cobrado.nome)} (${cobT.nome}), no valor de ${brl.format(cobT.valor)}, vence no dia ${dia(cobrado.diaVenc)}. `) +
        'Se já tiver feito o pagamento, pode desconsiderar esta mensagem. Qualquer dúvida, estamos à disposição. Obrigado!'
      : '';

  return (
    <div ref={rootRef} className="min-h-full bg-[#F6FAF8] font-sans text-[#0B2A21]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={chave}
          initial={{ opacity: 0, x: telaChamada || (tab === 'alunos' && aluno) ? 24 : 0, y: telaChamada ? 0 : 6 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          {tela}
        </motion.main>
      </AnimatePresence>

      {!telaChamada && (
        <nav
          aria-label="Navegação do app"
          className="fixed inset-x-0 bottom-0 z-30 border-t border-[#0E6B4F]/10 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur"
        >
          <ul className="grid grid-cols-4">
            {abas.map(({ id, label, icon: Icon }) => {
              const ativo = tab === id;
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => irPara(id)}
                    aria-current={ativo ? 'page' : undefined}
                    className={`relative flex min-h-16 w-full flex-col items-center justify-center gap-1 text-[11px] font-bold ${FOCO} ${
                      ativo ? 'text-[#0E6B4F]' : 'text-[#5B6E66]'
                    }`}
                  >
                    <span className="relative grid h-8 w-14 place-items-center">
                      {ativo && (
                        <motion.span
                          layoutId="aba-ativa"
                          className="absolute inset-0 rounded-full bg-[#E8F5EF]"
                          transition={{ type: 'spring', damping: 28, stiffness: 380 }}
                        />
                      )}
                      <Icon className="relative size-5" aria-hidden />
                      {id === 'mensalidades' && atrasadas > 0 && (
                        <span className="absolute top-0 right-2 grid min-w-4 place-items-center rounded-full bg-[#D92D20] px-1 text-[10px] leading-4 text-white">
                          {atrasadas}
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
      )}

      <Sheet aberto={!!cobrado} onClose={fecharCobranca} titulo="Mensalidade em aberto">
        {cobrado && cobT && (
          <div>
            <div className="flex items-center gap-3">
              <Avatar nome={cobrado.nome} />
              <div className="min-w-0 flex-1">
                <h2 className="truncate font-display text-lg font-extrabold text-[#0B2A21]">{cobrado.nome}</h2>
                <p className="text-sm text-[#4A5F57]">{cobT.nome}</p>
              </div>
              <Badge status={cobStatus} />
            </div>

            {cobStatus === 'atrasada' && (
              <p className="mt-4 flex items-start gap-2 rounded-xl bg-[#FEE4E2] p-3 text-sm text-[#A11B12]">
                <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
                Venceu no dia {dia(cobrado.diaVenc)}. Uma mensagem educada costuma resolver.
              </p>
            )}

            <dl className="mt-4 divide-y divide-[#0E6B4F]/8 rounded-2xl border border-[#0E6B4F]/10 px-4">
              {[
                ['Valor', brl.format(cobT.valor)],
                ['Vencimento', `Dia ${dia(cobrado.diaVenc)}`],
                [`Responsável (${cobrado.relacao.toLowerCase()})`, cobrado.responsavel],
                ['Telefone', cobrado.telefone],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                  <dt className="text-[#4A5F57]">{k}</dt>
                  <dd className="text-right font-semibold text-[#0B2A21]">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 space-y-2.5">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(msgCobranca)}`}
                target="_blank"
                rel="noopener noreferrer"
                autoFocus
                className={`flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-[#0E6B4F] px-4 py-3 font-display font-bold text-white active:scale-[0.99] ${FOCO}`}
              >
                <MessageCircle className="size-5" aria-hidden /> Cobrar no WhatsApp
              </a>
              <button
                type="button"
                onClick={() => marcarPaga(cobrado.id)}
                className={`flex min-h-13 w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#0E6B4F]/25 px-4 py-3 font-display font-bold text-[#0B5A42] active:scale-[0.99] ${FOCO}`}
              >
                <Check className="size-5" aria-hidden /> Marcar como paga
              </button>
              <button
                type="button"
                onClick={fecharCobranca}
                className={`min-h-11 w-full rounded-2xl text-sm font-semibold text-[#4A5F57] ${FOCO}`}
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </Sheet>

      <div aria-live="polite" role="status" className="pointer-events-none fixed inset-x-4 bottom-20 z-[60] flex justify-center">
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8 }}
              className="flex items-center gap-2.5 rounded-2xl bg-[#0B2A21] px-4 py-3 text-sm font-semibold text-white shadow-xl"
            >
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#34C38F] text-[#0B2A21]">
                <Check className="size-4" aria-hidden />
              </span>
              {toast.msg}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
