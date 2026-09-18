'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Banknote,
  BellRing,
  Check,
  ChefHat,
  ChevronLeft,
  CircleCheck,
  Clock,
  Coins,
  CreditCard,
  HandPlatter,
  LayoutGrid,
  Lock,
  MessageSquareText,
  Minus,
  Percent,
  Plus,
  QrCode,
  Receipt,
  Send,
  TrendingUp,
  TriangleAlert,
  Users,
  Wallet,
  X,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Tipos e dados de exemplo                                            */
/* ------------------------------------------------------------------ */

type Categoria = 'petiscos' | 'pratos' | 'bebidas' | 'sobremesas';
type MenuItem = { id: string; nome: string; desc: string; preco: number; cat: Categoria };
type ItemStatus = 'cozinha' | 'pronto' | 'entregue';
type PedidoItem = {
  id: string;
  menuId: string;
  qtd: number;
  obs: string;
  status: ItemStatus;
  lote: string;
  enviadoEm: number; // minuto do turno
};
type MesaStatus = 'livre' | 'ocupada' | 'fechando';
type Mesa = { n: number; status: MesaStatus; pessoas: number; abertaEm: number; itens: PedidoItem[] };
type FormaPgto = 'pix' | 'cartao' | 'dinheiro';
type Pagamento = { id: string; mesa: number; total: number; taxa: number; forma: FormaPgto; pessoas: number; em: number };
type Rota = { mesa: number; tela: 'comanda' | 'cardapio' | 'fechar' } | null;
type Aba = 'mesas' | 'cozinha' | 'caixa';

const GARCOM = 'Tiago';
const CASA = 'Barraca do Guaibim';

const CATEGORIAS: { id: Categoria; nome: string }[] = [
  { id: 'petiscos', nome: 'Petiscos' },
  { id: 'pratos', nome: 'Pratos' },
  { id: 'bebidas', nome: 'Bebidas' },
  { id: 'sobremesas', nome: 'Sobremesas' },
];

const CARDAPIO: MenuItem[] = [
  { id: 'acaraje', nome: 'Acarajé completo', desc: 'Vatapá, caruru, salada e camarão seco', preco: 14, cat: 'petiscos' },
  { id: 'casquinha', nome: 'Casquinha de siri', desc: 'Gratinada, com farofa de dendê', preco: 24, cat: 'petiscos' },
  { id: 'camarao', nome: 'Porção de camarão', desc: 'Alho e óleo, 400 g, serve 3', preco: 69, cat: 'petiscos' },
  { id: 'pastel', nome: 'Pastel de siri', desc: '6 unidades', preco: 32, cat: 'petiscos' },
  { id: 'aipim', nome: 'Aipim frito', desc: 'Porção com manteiga de garrafa', preco: 26, cat: 'petiscos' },
  { id: 'moqpeixe', nome: 'Moqueca de peixe', desc: 'Arroz, pirão e farofa. Serve 2', preco: 129, cat: 'pratos' },
  { id: 'moqcamarao', nome: 'Moqueca de camarão', desc: 'Arroz, pirão e farofa. Serve 2', preco: 159, cat: 'pratos' },
  { id: 'peixefrito', nome: 'Peixe frito inteiro', desc: 'Vermelho com arroz, feijão e salada. Serve 2', preco: 98, cat: 'pratos' },
  { id: 'bobo', nome: 'Bobó de camarão', desc: 'Com arroz branco. Serve 2', preco: 139, cat: 'pratos' },
  { id: 'cerveja', nome: 'Cerveja 600 ml', desc: 'Bem gelada', preco: 14, cat: 'bebidas' },
  { id: 'longneck', nome: 'Cerveja long neck', desc: '330 ml', preco: 9, cat: 'bebidas' },
  { id: 'caipirinha', nome: 'Caipirinha de limão', desc: 'Cachaça, limão e açúcar', preco: 18, cat: 'bebidas' },
  { id: 'caipiroska', nome: 'Caipiroska de maracujá', desc: 'Vodka e maracujá', preco: 22, cat: 'bebidas' },
  { id: 'coco', nome: 'Água de coco', desc: 'Direto do coco', preco: 8, cat: 'bebidas' },
  { id: 'suco', nome: 'Suco de cajá', desc: '500 ml', preco: 10, cat: 'bebidas' },
  { id: 'refri', nome: 'Refrigerante lata', desc: '350 ml', preco: 7, cat: 'bebidas' },
  { id: 'agua', nome: 'Água mineral', desc: '500 ml, com ou sem gás', preco: 5, cat: 'bebidas' },
  { id: 'cocada', nome: 'Cocada de forno', desc: 'Feita na casa', preco: 8, cat: 'sobremesas' },
  { id: 'pudim', nome: 'Pudim de leite', desc: 'Fatia', preco: 12, cat: 'sobremesas' },
  { id: 'salada', nome: 'Salada de frutas', desc: 'Com sorvete de tapioca', preco: 14, cat: 'sobremesas' },
];
const MENU = Object.fromEntries(CARDAPIO.map((m) => [m.id, m])) as Record<string, MenuItem>;

const OBS_RAPIDAS: Record<Categoria, string[]> = {
  petiscos: ['sem pimenta', 'sem cebola', 'bem passado', 'pouco sal'],
  pratos: ['sem coentro', 'sem pimenta', 'pirão à parte', 'sem cebola'],
  bebidas: ['sem gelo', 'pouco açúcar', 'com gelo e limão', 'trincando'],
  sobremesas: ['sem calda', 'pra viagem', 'dividir em 2'],
};

function it(menuId: string, qtd: number, status: ItemStatus, lote: string, enviadoEm: number, obs = ''): PedidoItem {
  return { id: `${lote}-${menuId}`, menuId, qtd, obs, status, lote, enviadoEm };
}

const MESAS_INICIAIS: Mesa[] = [
  { n: 1, status: 'livre', pessoas: 0, abertaEm: 0, itens: [] },
  {
    n: 2,
    status: 'ocupada',
    pessoas: 3,
    abertaEm: -32,
    itens: [
      it('cerveja', 2, 'entregue', 's2a', -30),
      it('casquinha', 1, 'entregue', 's2a', -30),
      it('moqpeixe', 1, 'cozinha', 's2b', -9, 'sem coentro'),
    ],
  },
  { n: 3, status: 'livre', pessoas: 0, abertaEm: 0, itens: [] },
  {
    n: 4,
    status: 'fechando',
    pessoas: 4,
    abertaEm: -95,
    itens: [
      it('caipirinha', 4, 'entregue', 's4a', -92),
      it('moqcamarao', 1, 'entregue', 's4b', -80),
      it('cerveja', 3, 'entregue', 's4c', -50),
      it('cocada', 2, 'entregue', 's4d', -20),
    ],
  },
  {
    n: 5,
    status: 'ocupada',
    pessoas: 2,
    abertaEm: -14,
    itens: [
      it('coco', 2, 'entregue', 's5a', -13),
      it('acaraje', 1, 'pronto', 's5b', -10),
      it('camarao', 1, 'cozinha', 's5c', -6, 'bem crocante'),
    ],
  },
  { n: 6, status: 'livre', pessoas: 0, abertaEm: 0, itens: [] },
  {
    n: 7,
    status: 'ocupada',
    pessoas: 6,
    abertaEm: -54,
    itens: [
      it('cerveja', 6, 'entregue', 's7a', -52),
      it('aipim', 1, 'entregue', 's7a', -52),
      it('peixefrito', 2, 'entregue', 's7b', -40),
      it('suco', 2, 'pronto', 's7c', -7, 'pouco açúcar'),
    ],
  },
  { n: 8, status: 'livre', pessoas: 0, abertaEm: 0, itens: [] },
  {
    n: 9,
    status: 'ocupada',
    pessoas: 2,
    abertaEm: -5,
    itens: [it('caipiroska', 2, 'cozinha', 's9a', -3)],
  },
  {
    n: 10,
    status: 'fechando',
    pessoas: 2,
    abertaEm: -71,
    itens: [
      it('longneck', 4, 'entregue', 's10a', -68),
      it('pastel', 1, 'entregue', 's10a', -68),
      it('bobo', 1, 'entregue', 's10b', -55),
    ],
  },
  { n: 11, status: 'livre', pessoas: 0, abertaEm: 0, itens: [] },
  {
    n: 12,
    status: 'ocupada',
    pessoas: 5,
    abertaEm: -40,
    itens: [
      it('cerveja', 4, 'entregue', 's12a', -38),
      it('bobo', 1, 'entregue', 's12b', -30),
      it('acaraje', 3, 'cozinha', 's12c', -4, 'sem pimenta'),
    ],
  },
];

const PAGAMENTOS_INICIAIS: Pagamento[] = [
  { id: 'p1', mesa: 3, total: 186.34, taxa: 16.94, forma: 'pix', pessoas: 3, em: -310 },
  { id: 'p2', mesa: 8, total: 243.1, taxa: 22.1, forma: 'cartao', pessoas: 4, em: -262 },
  { id: 'p3', mesa: 1, total: 98, taxa: 0, forma: 'dinheiro', pessoas: 2, em: -205 },
  { id: 'p4', mesa: 11, total: 134.2, taxa: 12.2, forma: 'pix', pessoas: 2, em: -150 },
  { id: 'p5', mesa: 6, total: 71.5, taxa: 6.5, forma: 'cartao', pessoas: 1, em: -96 },
  { id: 'p6', mesa: 3, total: 312.4, taxa: 28.4, forma: 'pix', pessoas: 6, em: -41 },
];

/* ------------------------------------------------------------------ */
/* Utilidades                                                          */
/* ------------------------------------------------------------------ */

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const r2 = (v: number) => Math.round(v * 100) / 100;
const totalItens = (itens: PedidoItem[]) => itens.reduce((s, i) => s + MENU[i.menuId].preco * i.qtd, 0);
const tempo = (min: number) => {
  const m = Math.max(0, Math.round(min));
  if (m < 1) return 'agora';
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const rest = m % 60;
  return rest ? `${h} h ${rest} min` : `${h} h`;
};
const plural = (n: number, um: string, varios: string) => `${n} ${n === 1 ? um : varios}`;

const FOCO =
  'focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#FFC7A8]';

const STATUS_MESA: Record<MesaStatus, { nome: string; cor: string; texto: string; fundo: string }> = {
  livre: { nome: 'Livre', cor: '#4ADE80', texto: 'text-[#4ADE80]', fundo: 'bg-[#4ADE80]' },
  ocupada: { nome: 'Ocupada', cor: '#FFB020', texto: 'text-[#FFB020]', fundo: 'bg-[#FFB020]' },
  fechando: { nome: 'Fechando', cor: '#FF5A4E', texto: 'text-[#FF7A70]', fundo: 'bg-[#FF5A4E]' },
};

const FORMAS: { id: FormaPgto; nome: string; Icon: typeof QrCode }[] = [
  { id: 'pix', nome: 'Pix', Icon: QrCode },
  { id: 'cartao', nome: 'Cartão', Icon: CreditCard },
  { id: 'dinheiro', nome: 'Dinheiro', Icon: Banknote },
];

/* ------------------------------------------------------------------ */
/* App                                                                 */
/* ------------------------------------------------------------------ */

export default function SistemaGarcom() {
  const [mesas, setMesas] = useState<Mesa[]>(MESAS_INICIAIS);
  const [pagamentos, setPagamentos] = useState<Pagamento[]>(PAGAMENTOS_INICIAIS);
  const [relogio, setRelogio] = useState(0);
  const [aba, setAba] = useState<Aba>('mesas');
  const [rota, setRota] = useState<Rota>(null);
  const [filtro, setFiltro] = useState<MesaStatus | 'todas'>('todas');
  const [abrindo, setAbrindo] = useState<number | null>(null);
  const [toast, setToast] = useState<{ id: number; texto: string } | null>(null);
  const [caixaFechado, setCaixaFechado] = useState(false);
  const raiz = useRef<HTMLDivElement>(null);
  const seq = useRef(100);

  useEffect(() => {
    const t = setInterval(() => setRelogio((c) => c + 1), 60_000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  const avisar = (texto: string) => setToast({ id: ++seq.current, texto });
  const topo = () => raiz.current?.parentElement?.scrollTo({ top: 0 });
  const ir = (r: Rota) => {
    setRota(r);
    topo();
  };
  const trocarAba = (a: Aba) => {
    setAba(a);
    setRota(null);
    topo();
  };
  const alterarMesa = (n: number, fn: (m: Mesa) => Mesa) => setMesas((ms) => ms.map((m) => (m.n === n ? fn(m) : m)));

  const turno = pagamentos.reduce((s, p) => s + p.total, 0);
  const lotesPendentes = new Set(mesas.flatMap((m) => m.itens.filter((i) => i.status === 'cozinha').map((i) => i.lote))).size;
  const mesaAtual = rota ? mesas.find((m) => m.n === rota.mesa)! : null;

  /* ações */
  const abrirMesa = (n: number, pessoas: number) => {
    alterarMesa(n, (m) => ({ ...m, status: 'ocupada', pessoas, abertaEm: relogio, itens: [] }));
    setAbrindo(null);
    avisar(`Mesa ${n} aberta · ${plural(pessoas, 'pessoa', 'pessoas')}`);
    ir({ mesa: n, tela: 'cardapio' });
  };

  const enviarPedido = (n: number, linhas: { menuId: string; qtd: number; obs: string }[]) => {
    const lote = `L${++seq.current}`;
    const novos: PedidoItem[] = linhas.map((l) => ({
      id: `${lote}-${l.menuId}`,
      menuId: l.menuId,
      qtd: l.qtd,
      obs: l.obs,
      status: 'cozinha',
      lote,
      enviadoEm: relogio,
    }));
    alterarMesa(n, (m) => ({ ...m, status: m.status === 'livre' ? 'ocupada' : m.status, itens: [...m.itens, ...novos] }));
    const qtd = linhas.reduce((s, l) => s + l.qtd, 0);
    avisar(`${plural(qtd, 'item enviado', 'itens enviados')} pra cozinha`);
    ir({ mesa: n, tela: 'comanda' });
  };

  const marcarPronto = (lote: string) => {
    const mesa = mesas.find((m) => m.itens.some((i) => i.lote === lote));
    setMesas((ms) =>
      ms.map((m) => ({
        ...m,
        itens: m.itens.map((i) => (i.lote === lote && i.status === 'cozinha' ? { ...i, status: 'pronto' } : i)),
      })),
    );
    if (mesa) avisar(`Pedido da mesa ${mesa.n} pronto · garçom avisado`);
  };

  const entregar = (n: number, ids: string[]) => {
    alterarMesa(n, (m) => ({ ...m, itens: m.itens.map((i) => (ids.includes(i.id) ? { ...i, status: 'entregue' } : i)) }));
    avisar(ids.length === 1 ? 'Item entregue na mesa' : `${ids.length} itens entregues na mesa`);
  };

  const fecharMesa = (n: number, p: Omit<Pagamento, 'id' | 'mesa' | 'em'>) => {
    setPagamentos((ps) => [...ps, { ...p, id: `p${++seq.current}`, mesa: n, em: relogio }]);
    alterarMesa(n, (m) => ({ ...m, status: 'livre', pessoas: 0, itens: [] }));
    avisar(`Mesa ${n} fechada · ${brl(p.total)} no ${FORMAS.find((f) => f.id === p.forma)!.nome}`);
    setFiltro('todas');
    ir(null);
  };

  const liberarMesa = (n: number) => {
    alterarMesa(n, (m) => ({ ...m, status: 'livre', pessoas: 0, itens: [] }));
    avisar(`Mesa ${n} liberada`);
    ir(null);
  };

  const chave = rota ? `${rota.tela}-${rota.mesa}` : aba;

  return (
    <div ref={raiz} className="relative min-h-full bg-[#2A1A12] font-sans text-[#FFF4EA] antialiased">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={chave}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.14 }}
        >
          {rota && mesaAtual ? (
            rota.tela === 'comanda' ? (
              <TelaComanda
                mesa={mesaAtual}
                relogio={relogio}
                onVoltar={() => ir(null)}
                onAdicionar={() => ir({ mesa: mesaAtual.n, tela: 'cardapio' })}
                onFecharConta={() => {
                  alterarMesa(mesaAtual.n, (m) => ({ ...m, status: 'fechando' }));
                  ir({ mesa: mesaAtual.n, tela: 'fechar' });
                }}
                onLiberar={() => liberarMesa(mesaAtual.n)}
                onReabrir={() => {
                  alterarMesa(mesaAtual.n, (m) => ({ ...m, status: 'ocupada' }));
                  avisar(`Mesa ${mesaAtual.n} voltou pra atendimento`);
                }}
                onEntregar={(ids) => entregar(mesaAtual.n, ids)}
              />
            ) : rota.tela === 'cardapio' ? (
              <TelaCardapio
                mesa={mesaAtual}
                onVoltar={() => ir({ mesa: mesaAtual.n, tela: 'comanda' })}
                onEnviar={(linhas) => enviarPedido(mesaAtual.n, linhas)}
              />
            ) : (
              <TelaFechar
                mesa={mesaAtual}
                onVoltar={() => ir({ mesa: mesaAtual.n, tela: 'comanda' })}
                onConfirmar={(p) => fecharMesa(mesaAtual.n, p)}
              />
            )
          ) : aba === 'mesas' ? (
            <TelaMesas
              mesas={mesas}
              relogio={relogio}
              turno={turno}
              filtro={filtro}
              onFiltro={setFiltro}
              onMesa={(m) => (m.status === 'livre' ? setAbrindo(m.n) : ir({ mesa: m.n, tela: 'comanda' }))}
            />
          ) : aba === 'cozinha' ? (
            <TelaCozinha mesas={mesas} relogio={relogio} onPronto={marcarPronto} />
          ) : (
            <TelaCaixa
              pagamentos={pagamentos}
              mesas={mesas}
              relogio={relogio}
              fechado={caixaFechado}
              onFecharCaixa={() => {
                setCaixaFechado(true);
                avisar('Caixa do dia fechado · resumo pronto');
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* barra de abas */}
      {!rota && (
        <nav
          aria-label="Seções"
          className="fixed inset-x-0 bottom-0 z-30 border-t border-[#5C4031] bg-[#22150E]/95 px-2 pt-1.5 pb-[calc(0.375rem+env(safe-area-inset-bottom,0px))] backdrop-blur"
        >
          <ul className="grid grid-cols-3">
            {(
              [
                { id: 'mesas', nome: 'Mesas', Icon: LayoutGrid, badge: 0 },
                { id: 'cozinha', nome: 'Cozinha', Icon: ChefHat, badge: lotesPendentes },
                { id: 'caixa', nome: 'Caixa', Icon: Wallet, badge: 0 },
              ] as const
            ).map(({ id, nome, Icon, badge }) => {
              const ativo = aba === id;
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => trocarAba(id)}
                    aria-current={ativo ? 'page' : undefined}
                    className={`relative flex min-h-14 w-full flex-col items-center justify-center gap-0.5 rounded-xl text-xs font-semibold ${FOCO} ${
                      ativo ? 'text-[#FF8A5C]' : 'text-[#D9BFAE]'
                    }`}
                  >
                    <span className="relative">
                      <Icon className="size-6" strokeWidth={ativo ? 2.4 : 2} aria-hidden />
                      {badge > 0 && (
                        <span className="absolute -top-1.5 -right-3 grid h-5 min-w-5 place-items-center rounded-full bg-[#FF6B3D] px-1 text-[11px] font-bold text-[#2A1A12]">
                          {badge}
                          <span className="sr-only"> pedidos pendentes</span>
                        </span>
                      )}
                    </span>
                    {nome}
                    {ativo && <span className="absolute top-0 h-1 w-8 rounded-full bg-[#FF6B3D]" aria-hidden />}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      {/* abrir mesa */}
      <SheetAbrirMesa mesa={abrindo} onFechar={() => setAbrindo(null)} onAbrir={abrirMesa} />

      {/* toast */}
      <div
        aria-live="polite"
        className={`pointer-events-none fixed inset-x-0 z-[60] flex justify-center px-4 ${rota ? 'bottom-28' : 'bottom-24'}`}
      >
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              className="flex items-center gap-2 rounded-2xl bg-[#FFF4EA] px-4 py-3 text-sm font-semibold text-[#2A1A12] shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
            >
              <CircleCheck className="size-5 shrink-0 text-[#1F9D55]" aria-hidden />
              {toast.texto}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Peças compartilhadas                                                */
/* ------------------------------------------------------------------ */

function Entrada({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ x: 18 }} animate={{ x: 0 }} transition={{ type: 'spring', stiffness: 500, damping: 40 }}>
      {children}
    </motion.div>
  );
}

function TopoTela({
  titulo,
  sub,
  onVoltar,
  direita,
  children,
}: {
  titulo: string;
  sub?: React.ReactNode;
  onVoltar?: () => void;
  direita?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-[#5C4031]/70 bg-[#2A1A12]/95 backdrop-blur">
      <div className="flex min-h-16 items-center gap-2 px-3 py-2">
        {onVoltar && (
          <button
            type="button"
            onClick={onVoltar}
            aria-label="Voltar"
            className={`grid size-11 shrink-0 place-items-center rounded-xl bg-[#3A261B] ${FOCO}`}
          >
            <ChevronLeft className="size-6" aria-hidden />
          </button>
        )}
        <div className={`min-w-0 flex-1 ${onVoltar ? '' : 'pl-1'}`}>
          <h1 className="truncate font-display text-xl font-extrabold tracking-tight">{titulo}</h1>
          {sub && <p className="truncate text-sm text-[#E0C7B5]">{sub}</p>}
        </div>
        {direita}
      </div>
      {children}
    </header>
  );
}

function BarraAcao({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#5C4031] bg-[#22150E]/95 px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] backdrop-blur">
      {children}
    </div>
  );
}

function Stepper({
  valor,
  onChange,
  min = 0,
  max = 99,
  rotulo,
  grande = false,
}: {
  valor: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  rotulo: string;
  grande?: boolean;
}) {
  const btn = `grid size-11 place-items-center rounded-xl bg-[#4A3124] text-[#FFF4EA] disabled:opacity-35 active:scale-95 transition ${FOCO}`;
  return (
    <div className="flex items-center gap-1" role="group" aria-label={rotulo}>
      <button type="button" className={btn} onClick={() => onChange(valor - 1)} disabled={valor <= min} aria-label={`Diminuir ${rotulo}`}>
        <Minus className="size-5" aria-hidden />
      </button>
      <output
        aria-live="polite"
        className={`text-center font-display font-extrabold tabular-nums ${grande ? 'w-14 text-3xl' : 'w-8 text-lg'}`}
      >
        {valor}
      </output>
      <button type="button" className={btn} onClick={() => onChange(valor + 1)} disabled={valor >= max} aria-label={`Aumentar ${rotulo}`}>
        <Plus className="size-5" aria-hidden />
      </button>
    </div>
  );
}

function Sheet({
  aberto,
  onFechar,
  titulo,
  children,
}: {
  aberto: boolean;
  onFechar: () => void;
  titulo: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!aberto) return;
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onFechar();
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [aberto, onFechar]);

  return (
    <AnimatePresence>
      {aberto && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <motion.button
            type="button"
            aria-label="Fechar"
            tabIndex={-1}
            className="absolute inset-0 cursor-default bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onFechar}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={titulo}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 36 }}
            className="relative max-h-[88%] overflow-y-auto rounded-t-3xl border-t border-[#5C4031] bg-[#34221A] px-4 pt-3 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] text-[#FFF4EA]"
          >
            <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-[#6B4B3A]" aria-hidden />
            <div className="mb-4 flex items-center justify-between gap-2">
              <h2 className="font-display text-xl font-extrabold">{titulo}</h2>
              <button
                type="button"
                onClick={onFechar}
                aria-label="Fechar"
                className={`grid size-11 place-items-center rounded-xl bg-[#4A3124] ${FOCO}`}
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function BotaoPrimario({
  children,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className={`flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-[#FF6B3D] px-4 font-display text-base font-extrabold text-[#2A1A12] shadow-[0_6px_20px_rgba(255,107,61,0.3)] transition active:scale-[0.98] disabled:bg-[#5C4031] disabled:text-[#C4A796] disabled:shadow-none ${FOCO} ${className}`}
    >
      {children}
    </button>
  );
}

function BotaoSecundario({
  children,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className={`flex min-h-13 items-center justify-center gap-2 rounded-2xl border-2 border-[#6B4B3A] bg-[#3A261B] px-4 font-display text-base font-bold text-[#FFF4EA] transition active:scale-[0.98] disabled:opacity-40 ${FOCO} ${className}`}
    >
      {children}
    </button>
  );
}

function ChipStatus({ status }: { status: ItemStatus }) {
  const cfg = {
    cozinha: { t: 'Na cozinha', c: 'bg-[#FFB020]/15 text-[#FFC65A] ring-[#FFB020]/40', I: Clock },
    pronto: { t: 'Pronto', c: 'bg-[#4ADE80]/15 text-[#6EE7A0] ring-[#4ADE80]/40', I: BellRing },
    entregue: { t: 'Entregue', c: 'bg-[#FFF4EA]/8 text-[#D9BFAE] ring-[#FFF4EA]/15', I: Check },
  }[status];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold ring-1 ${cfg.c}`}>
      <cfg.I className="size-3.5" aria-hidden />
      {cfg.t}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Mesas                                                            */
/* ------------------------------------------------------------------ */

function TelaMesas({
  mesas,
  relogio,
  turno,
  filtro,
  onFiltro,
  onMesa,
}: {
  mesas: Mesa[];
  relogio: number;
  turno: number;
  filtro: MesaStatus | 'todas';
  onFiltro: (f: MesaStatus | 'todas') => void;
  onMesa: (m: Mesa) => void;
}) {
  const conta = (s: MesaStatus) => mesas.filter((m) => m.status === s).length;
  const chips: { id: MesaStatus | 'todas'; nome: string; n: number; cor?: string }[] = [
    { id: 'todas', nome: 'Todas', n: mesas.length },
    { id: 'livre', nome: 'Livres', n: conta('livre'), cor: STATUS_MESA.livre.cor },
    { id: 'ocupada', nome: 'Ocupadas', n: conta('ocupada'), cor: STATUS_MESA.ocupada.cor },
    { id: 'fechando', nome: 'Fechando', n: conta('fechando'), cor: STATUS_MESA.fechando.cor },
  ];
  const visiveis = filtro === 'todas' ? mesas : mesas.filter((m) => m.status === filtro);

  return (
    <div className="pb-28">
      <header className="sticky top-0 z-20 border-b border-[#5C4031]/70 bg-[#2A1A12]/95 backdrop-blur">
        <div className="flex items-center gap-3 px-4 pt-3 pb-2">
          <div
            className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#FF6B3D] font-display text-lg font-black text-[#2A1A12]"
            aria-hidden
          >
            {GARCOM[0]}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold tracking-wide text-[#E0C7B5] uppercase">{CASA}</p>
            <h1 className="truncate font-display text-xl leading-tight font-extrabold">Olá, {GARCOM}</h1>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold text-[#E0C7B5]">Seu turno</p>
            <p className="font-display text-lg leading-tight font-extrabold text-[#FF8A5C] tabular-nums">{brl(turno)}</p>
          </div>
        </div>
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-3" role="group" aria-label="Filtrar mesas">
          {chips.map((c) => {
            const ativo = filtro === c.id;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={ativo}
                onClick={() => onFiltro(c.id)}
                className={`flex min-h-11 shrink-0 items-center gap-2 rounded-full px-3.5 text-sm font-bold transition ${FOCO} ${
                  ativo ? 'bg-[#FFF4EA] text-[#2A1A12]' : 'bg-[#3A261B] text-[#FFF4EA] ring-1 ring-[#5C4031]'
                }`}
              >
                {c.cor && <span className="size-2.5 rounded-full" style={{ background: c.cor }} aria-hidden />}
                {c.nome}
                <span
                  className={`rounded-full px-1.5 text-xs tabular-nums ${ativo ? 'bg-[#2A1A12] text-[#FFF4EA]' : 'bg-[#5C4031]'}`}
                >
                  {c.n}
                </span>
              </button>
            );
          })}
        </div>
      </header>

      <Entrada>
        <div className="grid grid-cols-2 gap-3 p-4 min-[380px]:grid-cols-3">
          {visiveis.map((m) => {
            const st = STATUS_MESA[m.status];
            const total = totalItens(m.itens);
            const prontos = m.itens.filter((i) => i.status === 'pronto').length;
            return (
              <button
                key={m.n}
                type="button"
                onClick={() => onMesa(m)}
                aria-label={`Mesa ${m.n}, ${st.nome}${m.status !== 'livre' ? `, ${m.pessoas} pessoas, ${brl(total)}` : ', toque para abrir'}`}
                className={`relative flex min-h-[124px] flex-col overflow-hidden rounded-2xl p-3 text-left transition active:scale-[0.97] ${FOCO} ${
                  m.status === 'livre'
                    ? 'border-2 border-dashed border-[#4ADE80]/45 bg-[#2F1F16]'
                    : 'border-2 border-[#5C4031] bg-[#3A261B]'
                }`}
              >
                {m.status !== 'livre' && (
                  <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: st.cor }} aria-hidden />
                )}
                <div className="flex items-start justify-between">
                  <span className="font-display text-3xl leading-none font-black tabular-nums">{String(m.n).padStart(2, '0')}</span>
                  {prontos > 0 && (
                    <span className="grid size-6 place-items-center rounded-full bg-[#4ADE80] text-[#123B22]" title="Pedido pronto">
                      <BellRing className="size-3.5" aria-hidden />
                    </span>
                  )}
                </div>
                <span className={`mt-1 text-xs font-extrabold tracking-wide uppercase ${st.texto}`}>{st.nome}</span>
                {m.status === 'livre' ? (
                  <span className="mt-auto flex items-center gap-1 text-xs font-semibold text-[#E0C7B5]">
                    <Plus className="size-3.5" aria-hidden /> Abrir
                  </span>
                ) : (
                  <div className="mt-auto space-y-0.5 text-xs text-[#E0C7B5]">
                    <p className="flex items-center gap-2">
                      <span className="flex items-center gap-0.5">
                        <Users className="size-3.5" aria-hidden />
                        {m.pessoas}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Clock className="size-3.5" aria-hidden />
                        {tempo(relogio - m.abertaEm)}
                      </span>
                    </p>
                    <p className="font-display text-sm font-extrabold text-[#FFF4EA] tabular-nums">{brl(total)}</p>
                  </div>
                )}
              </button>
            );
          })}
          {visiveis.length === 0 && (
            <p className="col-span-full py-12 text-center text-[#E0C7B5]">Nenhuma mesa com esse status agora.</p>
          )}
        </div>
      </Entrada>
    </div>
  );
}

function SheetAbrirMesa({
  mesa,
  onFechar,
  onAbrir,
}: {
  mesa: number | null;
  onFechar: () => void;
  onAbrir: (n: number, pessoas: number) => void;
}) {
  const [pessoas, setPessoas] = useState(2);
  // guarda o último número de mesa pra não sumir o título durante a animação de saída
  const [ultima, setUltima] = useState(mesa);
  if (mesa !== null && mesa !== ultima) {
    setUltima(mesa);
    setPessoas(2);
  }
  return (
    <Sheet aberto={mesa !== null} onFechar={onFechar} titulo={`Abrir mesa ${ultima ?? ''}`}>
      <p className="mb-3 text-sm text-[#E0C7B5]">Quantas pessoas vão sentar?</p>
      <div className="mb-4 grid grid-cols-4 gap-2" role="group" aria-label="Número de pessoas">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <button
            key={n}
            type="button"
            aria-pressed={pessoas === n}
            onClick={() => setPessoas(n)}
            className={`min-h-12 rounded-xl font-display text-lg font-extrabold transition ${FOCO} ${
              pessoas === n ? 'bg-[#FF6B3D] text-[#2A1A12]' : 'bg-[#4A3124] text-[#FFF4EA]'
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="mb-5 flex items-center justify-between rounded-2xl bg-[#2A1A12] px-3 py-2">
        <span className="flex items-center gap-2 text-sm font-semibold">
          <Users className="size-5 text-[#FF8A5C]" aria-hidden /> Mesa grande?
        </span>
        <Stepper valor={pessoas} onChange={setPessoas} min={1} max={30} rotulo="pessoas" />
      </div>
      <BotaoPrimario className="w-full" onClick={() => ultima !== null && onAbrir(ultima, pessoas)}>
        Abrir mesa e lançar pedido
      </BotaoPrimario>
    </Sheet>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Comanda                                                          */
/* ------------------------------------------------------------------ */

function TelaComanda({
  mesa,
  relogio,
  onVoltar,
  onAdicionar,
  onFecharConta,
  onLiberar,
  onReabrir,
  onEntregar,
}: {
  mesa: Mesa;
  relogio: number;
  onVoltar: () => void;
  onAdicionar: () => void;
  onFecharConta: () => void;
  onLiberar: () => void;
  onReabrir: () => void;
  onEntregar: (ids: string[]) => void;
}) {
  const st = STATUS_MESA[mesa.status];
  const total = totalItens(mesa.itens);
  const itens = [...mesa.itens].sort((a, b) => b.enviadoEm - a.enviadoEm);
  const prontos = mesa.itens.filter((i) => i.status === 'pronto');
  const qtdItens = mesa.itens.reduce((s, i) => s + i.qtd, 0);

  return (
    <>
      <TopoTela
        titulo={`Mesa ${mesa.n}`}
        sub={
          <>
            {plural(mesa.pessoas, 'pessoa', 'pessoas')} · aberta há {tempo(relogio - mesa.abertaEm)}
          </>
        }
        onVoltar={onVoltar}
        direita={
          <span
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-extrabold uppercase"
            style={{ background: `${st.cor}26`, color: st.cor }}
          >
            <span className="size-2 rounded-full" style={{ background: st.cor }} aria-hidden />
            {st.nome}
          </span>
        }
      />
      <Entrada>
        <div className="space-y-4 p-4 pb-32">
          {mesa.status === 'fechando' && (
            <div className="flex items-center gap-3 rounded-2xl border border-[#FF5A4E]/50 bg-[#FF5A4E]/12 p-3">
              <Receipt className="size-6 shrink-0 text-[#FF7A70]" aria-hidden />
              <p className="flex-1 text-sm">
                <strong className="block">Conta pedida</strong>
                <span className="text-[#E0C7B5]">Mesa aguardando o pagamento.</span>
              </p>
              <button
                type="button"
                onClick={onReabrir}
                className={`min-h-11 rounded-xl bg-[#3A261B] px-3 text-sm font-bold ${FOCO}`}
              >
                Reabrir
              </button>
            </div>
          )}

          {prontos.length > 0 && (
            <div className="flex items-center gap-3 rounded-2xl border border-[#4ADE80]/45 bg-[#4ADE80]/10 p-3">
              <BellRing className="size-6 shrink-0 text-[#6EE7A0]" aria-hidden />
              <p className="flex-1 text-sm font-semibold">
                {plural(prontos.length, 'item pronto', 'itens prontos')} pra levar na mesa
              </p>
              <button
                type="button"
                onClick={() => onEntregar(prontos.map((p) => p.id))}
                className={`flex min-h-11 items-center gap-1 rounded-xl bg-[#4ADE80] px-3 text-sm font-extrabold text-[#123B22] ${FOCO}`}
              >
                <HandPlatter className="size-4" aria-hidden /> Entregar
              </button>
            </div>
          )}

          <section aria-labelledby="itens-titulo" className="rounded-2xl bg-[#3A261B]">
            <div className="flex items-center justify-between border-b border-[#5C4031] px-4 py-3">
              <h2 id="itens-titulo" className="font-display font-extrabold">
                Itens lançados
              </h2>
              <span className="text-sm text-[#E0C7B5]">{plural(qtdItens, 'item', 'itens')}</span>
            </div>
            {itens.length === 0 ? (
              <div className="px-4 py-10 text-center">
                <MessageSquareText className="mx-auto mb-2 size-8 text-[#8A6A58]" aria-hidden />
                <p className="font-semibold">Nenhum item lançado ainda</p>
                <p className="text-sm text-[#E0C7B5]">Toque em “Adicionar itens” pra fazer o pedido.</p>
              </div>
            ) : (
              <ul className="divide-y divide-[#5C4031]/70">
                {itens.map((i) => {
                  const m = MENU[i.menuId];
                  return (
                    <li key={i.id} className="flex gap-3 px-4 py-3">
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#4A3124] font-display font-extrabold tabular-nums">
                        {i.qtd}×
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold leading-snug">{m.nome}</p>
                        {i.obs && <p className="text-sm text-[#FFC65A] italic">“{i.obs}”</p>}
                        <div className="mt-1.5 flex flex-wrap items-center gap-2">
                          <ChipStatus status={i.status} />
                          <span className="text-xs text-[#C4A796]">há {tempo(relogio - i.enviadoEm)}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between gap-1">
                        <span className="font-display font-bold tabular-nums">{brl(m.preco * i.qtd)}</span>
                        {i.status === 'pronto' && (
                          <button
                            type="button"
                            onClick={() => onEntregar([i.id])}
                            aria-label={`Marcar ${m.nome} como entregue`}
                            className={`min-h-11 rounded-lg px-2 text-xs font-bold text-[#6EE7A0] underline underline-offset-2 ${FOCO}`}
                          >
                            Entreguei
                          </button>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
            <div className="flex items-center justify-between rounded-b-2xl bg-[#4A3124] px-4 py-3">
              <span className="font-semibold text-[#E0C7B5]">Total parcial</span>
              <span className="font-display text-2xl font-black tabular-nums">{brl(total)}</span>
            </div>
          </section>
        </div>
      </Entrada>
      <BarraAcao>
        <div className="grid grid-cols-2 gap-2">
          <BotaoSecundario onClick={onAdicionar}>
            <Plus className="size-5" aria-hidden /> Adicionar itens
          </BotaoSecundario>
          {mesa.itens.length === 0 ? (
            <BotaoSecundario onClick={onLiberar}>Liberar mesa</BotaoSecundario>
          ) : (
            <BotaoPrimario onClick={onFecharConta}>
              <Receipt className="size-5" aria-hidden /> Fechar conta
            </BotaoPrimario>
          )}
        </div>
      </BarraAcao>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Cardápio                                                            */
/* ------------------------------------------------------------------ */

type Rascunho = Record<string, { qtd: number; obs: string }>;

function TelaCardapio({
  mesa,
  onVoltar,
  onEnviar,
}: {
  mesa: Mesa;
  onVoltar: () => void;
  onEnviar: (linhas: { menuId: string; qtd: number; obs: string }[]) => void;
}) {
  const [cat, setCat] = useState<Categoria>('petiscos');
  const [rascunho, setRascunho] = useState<Rascunho>({});
  const [editandoObs, setEditandoObs] = useState<string | null>(null);

  const linhas = Object.entries(rascunho)
    .filter(([, v]) => v.qtd > 0)
    .map(([menuId, v]) => ({ menuId, qtd: v.qtd, obs: v.obs.trim() }));
  const qtd = linhas.reduce((s, l) => s + l.qtd, 0);
  const valor = linhas.reduce((s, l) => s + MENU[l.menuId].preco * l.qtd, 0);
  const porCat = (c: Categoria) =>
    linhas.filter((l) => MENU[l.menuId].cat === c).reduce((s, l) => s + l.qtd, 0);

  const setQtd = (id: string, q: number) =>
    setRascunho((r) => ({ ...r, [id]: { qtd: Math.max(0, q), obs: r[id]?.obs ?? '' } }));

  return (
    <>
      <TopoTela titulo="Cardápio" sub={`Pedido da mesa ${mesa.n}`} onVoltar={onVoltar}>
        <div className="no-scrollbar flex gap-1 overflow-x-auto px-3 pb-2" role="tablist" aria-label="Categorias">
          {CATEGORIAS.map((c) => {
            const ativo = cat === c.id;
            const n = porCat(c.id);
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={ativo}
                onClick={() => setCat(c.id)}
                className={`relative flex min-h-11 shrink-0 items-center gap-1.5 rounded-xl px-3.5 text-sm font-bold transition ${FOCO} ${
                  ativo ? 'bg-[#FF6B3D] text-[#2A1A12]' : 'text-[#E0C7B5]'
                }`}
              >
                {c.nome}
                {n > 0 && (
                  <span
                    className={`grid h-5 min-w-5 place-items-center rounded-full px-1 text-[11px] ${
                      ativo ? 'bg-[#2A1A12] text-[#FFF4EA]' : 'bg-[#FF6B3D] text-[#2A1A12]'
                    }`}
                  >
                    {n}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </TopoTela>

      <motion.ul
        key={cat}
        role="tabpanel"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className="space-y-2 p-3 pb-32"
      >
        {CARDAPIO.filter((m) => m.cat === cat).map((m) => {
          const r = rascunho[m.id];
          const q = r?.qtd ?? 0;
          return (
            <li
              key={m.id}
              className={`rounded-2xl p-3 transition ${q > 0 ? 'bg-[#4A3124] ring-2 ring-[#FF6B3D]/70' : 'bg-[#3A261B]'}`}
            >
              <div className="flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p className="leading-snug font-bold">{m.nome}</p>
                  <p className="text-sm leading-snug text-[#E0C7B5]">{m.desc}</p>
                  <p className="mt-1 font-display font-extrabold text-[#FF8A5C] tabular-nums">{brl(m.preco)}</p>
                </div>
                {q === 0 ? (
                  <button
                    type="button"
                    onClick={() => setQtd(m.id, 1)}
                    aria-label={`Adicionar ${m.nome}`}
                    className={`grid size-12 shrink-0 place-items-center rounded-xl bg-[#FF6B3D] text-[#2A1A12] transition active:scale-95 ${FOCO}`}
                  >
                    <Plus className="size-6" strokeWidth={2.6} aria-hidden />
                  </button>
                ) : (
                  <Stepper valor={q} onChange={(v) => setQtd(m.id, v)} rotulo={m.nome} />
                )}
              </div>
              {q > 0 && (
                <button
                  type="button"
                  onClick={() => setEditandoObs(m.id)}
                  className={`mt-2 flex min-h-11 w-full items-center gap-2 rounded-xl border border-dashed border-[#8A6A58] px-3 text-left text-sm ${FOCO}`}
                >
                  <MessageSquareText className="size-4 shrink-0 text-[#FFC65A]" aria-hidden />
                  {r?.obs ? (
                    <span className="truncate font-semibold text-[#FFC65A] italic">“{r.obs}”</span>
                  ) : (
                    <span className="text-[#E0C7B5]">Adicionar observação</span>
                  )}
                </button>
              )}
            </li>
          );
        })}
      </motion.ul>

      <BarraAcao>
        <BotaoPrimario className="w-full" disabled={qtd === 0} onClick={() => onEnviar(linhas)}>
          {qtd === 0 ? (
            'Escolha os itens do pedido'
          ) : (
            <>
              <Send className="size-5" aria-hidden />
              Enviar pra cozinha
              <span className="ml-auto rounded-lg bg-[#2A1A12]/15 px-2 py-0.5 text-sm tabular-nums">
                {qtd} · {brl(valor)}
              </span>
            </>
          )}
        </BotaoPrimario>
      </BarraAcao>

      <SheetObs
        item={editandoObs ? MENU[editandoObs] : null}
        valor={editandoObs ? (rascunho[editandoObs]?.obs ?? '') : ''}
        onFechar={() => setEditandoObs(null)}
        onSalvar={(obs) => {
          if (editandoObs) setRascunho((r) => ({ ...r, [editandoObs]: { qtd: r[editandoObs]?.qtd ?? 1, obs } }));
          setEditandoObs(null);
        }}
      />
    </>
  );
}

function SheetObs({
  item,
  valor,
  onFechar,
  onSalvar,
}: {
  item: MenuItem | null;
  valor: string;
  onFechar: () => void;
  onSalvar: (obs: string) => void;
}) {
  const [texto, setTexto] = useState(valor);
  const [ultimo, setUltimo] = useState(item);
  if (item && item !== ultimo) {
    setUltimo(item);
    setTexto(valor);
  }
  const rapidas = ultimo ? OBS_RAPIDAS[ultimo.cat] : [];
  const alternar = (o: string) => {
    const partes = texto
      .split(',')
      .map((p) => p.trim())
      .filter(Boolean);
    const nova = partes.includes(o) ? partes.filter((p) => p !== o) : [...partes, o];
    setTexto(nova.join(', '));
  };

  return (
    <Sheet aberto={item !== null} onFechar={onFechar} titulo="Observação">
      <p className="mb-3 text-sm text-[#E0C7B5]">
        Para: <strong className="text-[#FFF4EA]">{ultimo?.nome}</strong>
      </p>
      <div className="mb-3 flex flex-wrap gap-2">
        {rapidas.map((o) => {
          const ativo = texto.split(',').map((p) => p.trim()).includes(o);
          return (
            <button
              key={o}
              type="button"
              aria-pressed={ativo}
              onClick={() => alternar(o)}
              className={`min-h-11 rounded-full px-3.5 text-sm font-semibold transition ${FOCO} ${
                ativo ? 'bg-[#FFC65A] text-[#2A1A12]' : 'bg-[#4A3124] text-[#FFF4EA]'
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
      <label htmlFor="obs-item" className="mb-1.5 block text-sm font-semibold">
        Escreva a observação
      </label>
      <textarea
        id="obs-item"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        rows={2}
        maxLength={80}
        placeholder="Ex.: sem cebola, molho à parte"
        className="mb-4 w-full resize-none rounded-xl border-2 border-[#5C4031] bg-[#2A1A12] px-3 py-2.5 text-base text-[#FFF4EA] placeholder:text-[#9C7E6C] focus:border-[#FF6B3D] focus:outline-none"
      />
      <BotaoPrimario className="w-full" onClick={() => onSalvar(texto.trim())}>
        <Check className="size-5" aria-hidden /> Salvar observação
      </BotaoPrimario>
    </Sheet>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Fechar conta                                                     */
/* ------------------------------------------------------------------ */

function TelaFechar({
  mesa,
  onVoltar,
  onConfirmar,
}: {
  mesa: Mesa;
  onVoltar: () => void;
  onConfirmar: (p: Omit<Pagamento, 'id' | 'mesa' | 'em'>) => void;
}) {
  const [comTaxa, setComTaxa] = useState(true);
  const [dividir, setDividir] = useState(Math.max(1, mesa.pessoas));
  const [forma, setForma] = useState<FormaPgto>('pix');
  const [recebido, setRecebido] = useState('');

  const subtotal = totalItens(mesa.itens);
  const taxa = comTaxa ? r2(subtotal * 0.1) : 0;
  const total = r2(subtotal + taxa);
  const porPessoa = Math.ceil((total / dividir) * 100) / 100;
  const naCozinha = mesa.itens.filter((i) => i.status !== 'entregue').reduce((s, i) => s + i.qtd, 0);
  const valorRecebido = Number(recebido.replace(/\./g, '').replace(',', '.')) || 0;
  const troco = r2(valorRecebido - total);
  const sugestoes = useMemo(() => {
    const s = new Set<number>([Math.ceil(total / 10) * 10, Math.ceil(total / 50) * 50, Math.ceil(total / 100) * 100]);
    s.delete(total);
    return [...s].sort((a, b) => a - b).slice(0, 3);
  }, [total]);
  const podeFechar = forma !== 'dinheiro' || valorRecebido >= total;

  return (
    <>
      <TopoTela titulo={`Fechar conta · Mesa ${mesa.n}`} sub={plural(mesa.pessoas, 'pessoa', 'pessoas')} onVoltar={onVoltar} />
      <Entrada>
        <div className="space-y-3 p-4 pb-32">
          {naCozinha > 0 && (
            <p className="flex items-start gap-2 rounded-xl bg-[#FFB020]/12 p-3 text-sm text-[#FFD38A]">
              <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
              {plural(naCozinha, 'item ainda não foi entregue', 'itens ainda não foram entregues')}. Confira antes de fechar.
            </p>
          )}

          {/* resumo */}
          <section className="rounded-2xl bg-[#3A261B] p-4" aria-label="Resumo da conta">
            <ul className="mb-3 space-y-1.5 text-sm">
              {mesa.itens.map((i) => (
                <li key={i.id} className="flex justify-between gap-2">
                  <span className="text-[#E0C7B5]">
                    {i.qtd}× {MENU[i.menuId].nome}
                  </span>
                  <span className="tabular-nums">{brl(MENU[i.menuId].preco * i.qtd)}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-2 border-t border-[#5C4031] pt-3">
              <div className="flex justify-between">
                <span className="text-[#E0C7B5]">Subtotal</span>
                <span className="font-semibold tabular-nums">{brl(subtotal)}</span>
              </div>
              <label className="flex min-h-11 cursor-pointer items-center justify-between gap-3">
                <span className="flex items-center gap-2">
                  <Percent className="size-4 text-[#FF8A5C]" aria-hidden />
                  <span>
                    Taxa de serviço 10%
                    {comTaxa && <span className="ml-1 text-[#E0C7B5] tabular-nums">({brl(taxa)})</span>}
                  </span>
                </span>
                <input
                  type="checkbox"
                  role="switch"
                  checked={comTaxa}
                  onChange={(e) => setComTaxa(e.target.checked)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden
                  className={`relative h-7 w-12 shrink-0 rounded-full transition peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#FFC7A8] ${
                    comTaxa ? 'bg-[#FF6B3D]' : 'bg-[#5C4031]'
                  }`}
                >
                  <span
                    className={`absolute top-1 size-5 rounded-full bg-[#FFF4EA] shadow transition-all ${comTaxa ? 'left-6' : 'left-1'}`}
                  />
                </span>
              </label>
              <div className="flex items-end justify-between border-t border-[#5C4031] pt-3">
                <span className="font-display text-lg font-extrabold">Total</span>
                <span className="font-display text-3xl font-black text-[#FF8A5C] tabular-nums">{brl(total)}</span>
              </div>
            </div>
          </section>

          {/* divisão */}
          <section className="rounded-2xl bg-[#3A261B] p-4" aria-label="Dividir a conta">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="font-display font-extrabold">Dividir por</h2>
                <p className="text-sm text-[#E0C7B5]">{dividir === 1 ? 'Uma pessoa paga tudo' : `${dividir} pessoas`}</p>
              </div>
              <Stepper valor={dividir} onChange={setDividir} min={1} max={30} rotulo="pessoas na divisão" grande />
            </div>
            <AnimatePresence initial={false}>
              {dividir > 1 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 flex items-center justify-between rounded-xl bg-[#2A1A12] px-4 py-3">
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      <Users className="size-4 text-[#FF8A5C]" aria-hidden /> Cada um paga
                    </span>
                    <span className="font-display text-2xl font-black tabular-nums">{brl(porPessoa)}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* pagamento */}
          <section className="rounded-2xl bg-[#3A261B] p-4" aria-labelledby="pgto-titulo">
            <h2 id="pgto-titulo" className="mb-3 font-display font-extrabold">
              Forma de pagamento
            </h2>
            <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-labelledby="pgto-titulo">
              {FORMAS.map(({ id, nome, Icon }) => {
                const ativo = forma === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={ativo}
                    onClick={() => setForma(id)}
                    className={`flex min-h-16 flex-col items-center justify-center gap-1 rounded-xl text-sm font-bold transition ${FOCO} ${
                      ativo ? 'bg-[#FFF4EA] text-[#2A1A12]' : 'bg-[#4A3124] text-[#FFF4EA]'
                    }`}
                  >
                    <Icon className="size-5" aria-hidden />
                    {nome}
                  </button>
                );
              })}
            </div>

            {forma === 'pix' && (
              <p className="mt-3 flex items-center gap-2 text-sm text-[#E0C7B5]">
                <QrCode className="size-4 shrink-0" aria-hidden /> O QR Code aparece na maquininha do caixa.
              </p>
            )}
            {forma === 'cartao' && (
              <p className="mt-3 flex items-center gap-2 text-sm text-[#E0C7B5]">
                <CreditCard className="size-4 shrink-0" aria-hidden /> Leve a maquininha até a mesa.
              </p>
            )}
            {forma === 'dinheiro' && (
              <div className="mt-4">
                <label htmlFor="valor-recebido" className="mb-1.5 block text-sm font-semibold">
                  Valor recebido
                </label>
                <div className="flex items-center rounded-xl border-2 border-[#5C4031] bg-[#2A1A12] focus-within:border-[#FF6B3D]">
                  <span className="pl-3 font-display font-bold text-[#E0C7B5]">R$</span>
                  <input
                    id="valor-recebido"
                    inputMode="decimal"
                    autoComplete="off"
                    value={recebido}
                    onChange={(e) => setRecebido(e.target.value.replace(/[^\d,.]/g, ''))}
                    placeholder="0,00"
                    className="min-h-12 w-full bg-transparent px-2 font-display text-xl font-bold text-[#FFF4EA] tabular-nums placeholder:text-[#9C7E6C] focus:outline-none"
                  />
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[total, ...sugestoes].map((v, idx) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setRecebido(v.toFixed(2).replace('.', ','))}
                      className={`min-h-11 rounded-full bg-[#4A3124] px-3.5 text-sm font-bold tabular-nums ${FOCO}`}
                    >
                      {idx === 0 ? 'Valor exato' : brl(v)}
                    </button>
                  ))}
                </div>
                {valorRecebido > 0 && (
                  <div
                    className={`mt-3 flex items-center justify-between rounded-xl px-4 py-3 ${
                      troco >= 0 ? 'bg-[#4ADE80]/12 text-[#6EE7A0]' : 'bg-[#FF5A4E]/12 text-[#FF8A80]'
                    }`}
                  >
                    <span className="flex items-center gap-2 font-semibold">
                      <Coins className="size-5" aria-hidden />
                      {troco >= 0 ? 'Troco' : 'Falta'}
                    </span>
                    <span className="font-display text-2xl font-black tabular-nums">{brl(Math.abs(troco))}</span>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </Entrada>
      <BarraAcao>
        <BotaoPrimario
          className="w-full"
          disabled={!podeFechar}
          onClick={() => onConfirmar({ total, taxa, forma, pessoas: dividir })}
        >
          {podeFechar ? (
            <>
              <Check className="size-5" aria-hidden /> Fechar mesa · {brl(total)}
            </>
          ) : (
            'Informe o valor recebido'
          )}
        </BotaoPrimario>
      </BarraAcao>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Cozinha                                                          */
/* ------------------------------------------------------------------ */

function TelaCozinha({ mesas, relogio, onPronto }: { mesas: Mesa[]; relogio: number; onPronto: (lote: string) => void }) {
  type Ticket = { lote: string; mesa: number; enviadoEm: number; itens: PedidoItem[] };
  const tickets: Ticket[] = [];
  for (const m of mesas) {
    for (const i of m.itens) {
      if (i.status !== 'cozinha') continue;
      let t = tickets.find((x) => x.lote === i.lote);
      if (!t) {
        t = { lote: i.lote, mesa: m.n, enviadoEm: i.enviadoEm, itens: [] };
        tickets.push(t);
      }
      t.itens.push(i);
    }
  }
  tickets.sort((a, b) => a.enviadoEm - b.enviadoEm);
  const aguardando = mesas.reduce((s, m) => s + m.itens.filter((i) => i.status === 'pronto').length, 0);

  return (
    <div className="pb-28">
      <TopoTela
        titulo="Cozinha"
        sub={tickets.length ? `${plural(tickets.length, 'pedido na fila', 'pedidos na fila')}` : 'Tudo em dia'}
        direita={
          aguardando > 0 ? (
            <span className="flex items-center gap-1 rounded-full bg-[#4ADE80]/15 px-3 py-1.5 text-xs font-bold text-[#6EE7A0]">
              <BellRing className="size-3.5" aria-hidden /> {aguardando} no balcão
            </span>
          ) : undefined
        }
      />
      <Entrada>
        <div className="space-y-3 p-4">
          {tickets.length === 0 && (
            <div className="rounded-2xl bg-[#3A261B] px-4 py-14 text-center">
              <ChefHat className="mx-auto mb-3 size-10 text-[#8A6A58]" aria-hidden />
              <p className="font-display text-lg font-extrabold">Nenhum pedido pendente</p>
              <p className="text-sm text-[#E0C7B5]">Quando o garçom lançar, aparece aqui na hora.</p>
            </div>
          )}
          <AnimatePresence initial={false}>
            {tickets.map((t) => {
              const min = relogio - t.enviadoEm;
              const atrasado = min >= 8;
              return (
                <motion.article
                  key={t.lote}
                  layout
                  exit={{ opacity: 0, x: 60, transition: { duration: 0.2 } }}
                  className="overflow-hidden rounded-2xl bg-[#3A261B]"
                  aria-label={`Pedido da mesa ${t.mesa}`}
                >
                  <div
                    className={`flex items-center justify-between px-4 py-2.5 ${atrasado ? 'bg-[#FF5A4E]/20' : 'bg-[#4A3124]'}`}
                  >
                    <span className="font-display text-xl font-black">Mesa {t.mesa}</span>
                    <span
                      className={`flex items-center gap-1 text-sm font-bold ${atrasado ? 'text-[#FF8A80]' : 'text-[#E0C7B5]'}`}
                    >
                      <Clock className="size-4" aria-hidden /> {min < 1 ? 'agora' : `há ${tempo(min)}`}
                    </span>
                  </div>
                  <ul className="space-y-2 px-4 py-3">
                    {t.itens.map((i) => (
                      <li key={i.id} className="flex gap-3">
                        <span className="w-8 shrink-0 font-display text-lg font-black text-[#FF8A5C] tabular-nums">{i.qtd}×</span>
                        <div>
                          <p className="text-lg leading-snug font-bold">{MENU[i.menuId].nome}</p>
                          {i.obs && (
                            <p className="mt-0.5 inline-block rounded-md bg-[#FFC65A] px-1.5 text-sm font-bold text-[#2A1A12] uppercase">
                              {i.obs}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="px-4 pb-4">
                    <button
                      type="button"
                      onClick={() => onPronto(t.lote)}
                      className={`flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#4ADE80] font-display font-extrabold text-[#123B22] transition active:scale-[0.98] ${FOCO}`}
                    >
                      <Check className="size-5" strokeWidth={3} aria-hidden /> Marcar pronto
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </Entrada>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Caixa                                                            */
/* ------------------------------------------------------------------ */

function TelaCaixa({
  pagamentos,
  mesas,
  relogio,
  fechado,
  onFecharCaixa,
}: {
  pagamentos: Pagamento[];
  mesas: Mesa[];
  relogio: number;
  fechado: boolean;
  onFecharCaixa: () => void;
}) {
  const [confirmando, setConfirmando] = useState(false);
  const total = pagamentos.reduce((s, p) => s + p.total, 0);
  const pessoas = pagamentos.reduce((s, p) => s + p.pessoas, 0);
  const taxas = pagamentos.reduce((s, p) => s + p.taxa, 0);
  const ticket = pagamentos.length ? total / pagamentos.length : 0;
  const abertas = mesas.filter((m) => m.status !== 'livre');
  const emAberto = abertas.reduce((s, m) => s + totalItens(m.itens), 0);
  const porForma = FORMAS.map((f) => {
    const ps = pagamentos.filter((p) => p.forma === f.id);
    return { ...f, valor: ps.reduce((s, p) => s + p.total, 0), n: ps.length };
  });
  const maior = Math.max(1, ...porForma.map((f) => f.valor));
  const fechar = () => {
    setConfirmando(false);
    onFecharCaixa();
  };

  return (
    <div className="pb-28">
      <TopoTela titulo="Caixa do dia" sub={`${CASA} · hoje`} />
      <Entrada>
        <div className="space-y-3 p-4">
          {fechado && (
            <p className="flex items-center gap-2 rounded-xl bg-[#4ADE80]/12 p-3 text-sm font-semibold text-[#6EE7A0]">
              <Lock className="size-4 shrink-0" aria-hidden /> Caixa fechado. Os números abaixo são o resumo final do dia.
            </p>
          )}
          <section className="rounded-2xl bg-gradient-to-br from-[#FF6B3D] to-[#E2452A] p-4 text-[#2A1A12]">
            <p className="text-sm font-bold">Total recebido</p>
            <p className="font-display text-4xl font-black tracking-tight tabular-nums">{brl(total)}</p>
            <p className="mt-1 flex items-center gap-1 text-sm font-semibold">
              <TrendingUp className="size-4" aria-hidden /> {plural(pagamentos.length, 'mesa fechada', 'mesas fechadas')} hoje
            </p>
          </section>

          <div className="grid grid-cols-2 gap-3">
            {[
              { r: 'Mesas atendidas', v: String(pagamentos.length) },
              { r: 'Ticket médio', v: brl(ticket) },
              { r: 'Pessoas atendidas', v: String(pessoas) },
              { r: 'Taxa de serviço', v: brl(taxas) },
            ].map((k) => (
              <div key={k.r} className="rounded-2xl bg-[#3A261B] p-3">
                <p className="text-xs font-semibold text-[#E0C7B5]">{k.r}</p>
                <p className="font-display text-xl font-extrabold tabular-nums">{k.v}</p>
              </div>
            ))}
          </div>

          <section className="rounded-2xl bg-[#3A261B] p-4" aria-labelledby="formas-titulo">
            <h2 id="formas-titulo" className="mb-3 font-display font-extrabold">
              Por forma de pagamento
            </h2>
            <ul className="space-y-3">
              {porForma.map(({ id, nome, Icon, valor, n }) => (
                <li key={id}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 font-semibold">
                      <Icon className="size-4 text-[#FF8A5C]" aria-hidden /> {nome}
                      <span className="font-normal text-[#C4A796]">({n})</span>
                    </span>
                    <span className="font-display font-bold tabular-nums">{brl(valor)}</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-[#2A1A12]">
                    <div
                      className="h-full rounded-full bg-[#FF6B3D] transition-[width] duration-500"
                      style={{ width: `${(valor / maior) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {abertas.length > 0 && (
            <div className="flex items-center gap-3 rounded-2xl border border-[#FFB020]/40 bg-[#FFB020]/10 p-3">
              <Clock className="size-5 shrink-0 text-[#FFC65A]" aria-hidden />
              <p className="flex-1 text-sm">
                <strong>{plural(abertas.length, 'mesa ainda aberta', 'mesas ainda abertas')}</strong>
                <span className="block text-[#E0C7B5]">{brl(emAberto)} a receber</span>
              </p>
            </div>
          )}

          <section className="rounded-2xl bg-[#3A261B]" aria-labelledby="fech-titulo">
            <h2 id="fech-titulo" className="border-b border-[#5C4031] px-4 py-3 font-display font-extrabold">
              Últimos fechamentos
            </h2>
            <ul className="divide-y divide-[#5C4031]/70">
              {[...pagamentos].reverse().map((p) => {
                const f = FORMAS.find((x) => x.id === p.forma)!;
                return (
                  <li key={p.id} className="flex items-center gap-3 px-4 py-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#4A3124] font-display font-black tabular-nums">
                      {String(p.mesa).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-1.5 text-sm font-semibold">
                        <f.Icon className="size-4 text-[#FF8A5C]" aria-hidden /> {f.nome} ·{' '}
                        {plural(p.pessoas, 'pessoa', 'pessoas')}
                      </p>
                      <p className="text-xs text-[#C4A796]">{relogio - p.em < 1 ? 'agora' : `há ${tempo(relogio - p.em)}`}</p>
                    </div>
                    <span className="font-display font-bold tabular-nums">{brl(p.total)}</span>
                  </li>
                );
              })}
            </ul>
          </section>

          <BotaoSecundario className="w-full" disabled={fechado} onClick={() => setConfirmando(true)}>
            <Lock className="size-5" aria-hidden /> {fechado ? 'Caixa já fechado' : 'Fechar caixa do dia'}
          </BotaoSecundario>
        </div>
      </Entrada>

      <Sheet aberto={confirmando} onFechar={() => setConfirmando(false)} titulo="Fechar o caixa?">
        <p className="mb-4 text-[#E0C7B5]">
          Total de <strong className="text-[#FFF4EA]">{brl(total)}</strong> em{' '}
          {plural(pagamentos.length, 'mesa', 'mesas')}.
          {abertas.length > 0 && ` Ainda tem ${plural(abertas.length, 'mesa aberta', 'mesas abertas')}; elas entram no caixa de amanhã.`}
        </p>
        <div className="grid grid-cols-2 gap-2">
          <BotaoSecundario onClick={() => setConfirmando(false)}>Cancelar</BotaoSecundario>
          <BotaoPrimario onClick={fechar}>Fechar caixa</BotaoPrimario>
        </div>
      </Sheet>
    </div>
  );
}
