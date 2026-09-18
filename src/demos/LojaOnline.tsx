'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Backpack,
  Bike,
  Blender,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Coffee,
  CookingPot,
  Copy,
  Droplet,
  Dumbbell,
  Footprints,
  Headphones,
  LampDesk,
  MapPin,
  MessageCircle,
  Minus,
  PackageCheck,
  PlugZap,
  Plus,
  Search,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  Smartphone,
  Sofa,
  Sparkles,
  Star,
  Ticket,
  Trash2,
  Truck,
  Watch,
  Wind,
  X,
  Zap,
  type LucideIcon,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Dados de exemplo                                                    */
/* ------------------------------------------------------------------ */

const FREE_SHIPPING_FROM = 199;
const SHIPPING_PRICE = 12.9;
const COUPON = 'JESSE10';

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const fmt = (v: number) => brl.format(v);

type CatId = 'celulares' | 'casa' | 'moda' | 'beleza' | 'esporte' | 'mercado';

const CATEGORIES: { id: CatId; label: string; icon: LucideIcon; bg: string; fg: string }[] = [
  { id: 'celulares', label: 'Celulares', icon: Smartphone, bg: '#E8EEFF', fg: '#2F5BD3' },
  { id: 'casa', label: 'Casa', icon: Sofa, bg: '#E3F6F1', fg: '#138A72' },
  { id: 'moda', label: 'Moda', icon: Shirt, bg: '#FFE9E0', fg: '#D9480F' },
  { id: 'beleza', label: 'Beleza', icon: Sparkles, bg: '#FCE7F3', fg: '#BE185D' },
  { id: 'esporte', label: 'Esporte', icon: Dumbbell, bg: '#EDE9FE', fg: '#6D28D9' },
  { id: 'mercado', label: 'Mercado', icon: ShoppingBasket, bg: '#FEF3C7', fg: '#B45309' },
];

type Option = { label: string; values: string[] };

type Product = {
  id: string;
  name: string;
  cat: CatId;
  price: number;
  old: number;
  rating: number;
  reviews: number;
  sold: number;
  free: boolean;
  icon: LucideIcon;
  tile: [string, string];
  ink: string;
  desc: string;
  options?: Option[];
  flash?: { sold: number; stock: number };
};

const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Smartphone Galaxy A15 128GB 4GB RAM Tela 6.5" Câmera Tripla 50MP',
    cat: 'celulares',
    price: 1099,
    old: 1399,
    rating: 4.8,
    reviews: 2314,
    sold: 5800,
    free: true,
    icon: Smartphone,
    tile: ['#E8EEFF', '#C9D6FF'],
    ink: '#2F5BD3',
    desc: 'Tela Super AMOLED de 6.5", bateria de 5000mAh e câmera tripla de 50MP. Acompanha cabo USB-C e nota fiscal.',
    options: [{ label: 'Cor', values: ['Preto', 'Azul', 'Verde-água'] }],
  },
  {
    id: 'p2',
    name: 'Fone de Ouvido Bluetooth TWS com Case Carregador e Cancelamento de Ruído',
    cat: 'celulares',
    price: 89.9,
    old: 159.9,
    rating: 4.6,
    reviews: 8120,
    sold: 12400,
    free: false,
    icon: Headphones,
    tile: ['#F1F5F9', '#DDE3EA'],
    ink: '#334155',
    desc: 'Até 24h de bateria com o case, pareamento automático e microfone embutido pra chamadas.',
    options: [{ label: 'Cor', values: ['Branco', 'Preto'] }],
    flash: { sold: 34, stock: 50 },
  },
  {
    id: 'p3',
    name: 'Smartwatch Fitness D20 Monitor Cardíaco à Prova d’Água',
    cat: 'celulares',
    price: 129.9,
    old: 219.9,
    rating: 4.5,
    reviews: 3402,
    sold: 7300,
    free: true,
    icon: Watch,
    tile: ['#EDE9FE', '#D8CEFB'],
    ink: '#6D28D9',
    desc: 'Conta passos, monitora sono e batimentos e mostra notificações do WhatsApp no pulso.',
    options: [{ label: 'Cor', values: ['Preto', 'Rosa', 'Azul'] }],
    flash: { sold: 41, stock: 60 },
  },
  {
    id: 'p4',
    name: 'Carregador Turbo 25W USB-C com Cabo 1m Original',
    cat: 'celulares',
    price: 49.9,
    old: 79.9,
    rating: 4.7,
    reviews: 1987,
    sold: 9100,
    free: false,
    icon: PlugZap,
    tile: ['#FEF9C3', '#FDE68A'],
    ink: '#A16207',
    desc: 'Carregamento rápido de 0 a 50% em 30 minutos. Compatível com Android e iPhone 15.',
    flash: { sold: 88, stock: 100 },
  },
  {
    id: 'p5',
    name: 'Air Fryer 4L Antiaderente 1500W Timer Digital',
    cat: 'casa',
    price: 329.9,
    old: 499.9,
    rating: 4.9,
    reviews: 5210,
    sold: 15600,
    free: true,
    icon: CookingPot,
    tile: ['#E3F6F1', '#BFEBDF'],
    ink: '#138A72',
    desc: 'Frita sem óleo, assa e reaquece. Cesto removível que pode ir na lava-louças.',
    options: [
      { label: 'Voltagem', values: ['127V', '220V'] },
      { label: 'Cor', values: ['Preto', 'Branco'] },
    ],
    flash: { sold: 19, stock: 40 },
  },
  {
    id: 'p6',
    name: 'Jogo de Panelas Antiaderente 5 Peças com Tampa de Vidro',
    cat: 'casa',
    price: 219.9,
    old: 349.9,
    rating: 4.7,
    reviews: 1420,
    sold: 3900,
    free: true,
    icon: CookingPot,
    tile: ['#FFE4E6', '#FECDD3'],
    ink: '#BE123C',
    desc: 'Revestimento que não gruda, cabos que não esquentam e tampas com saída de vapor.',
    options: [{ label: 'Cor', values: ['Vermelho', 'Preto'] }],
  },
  {
    id: 'p7',
    name: 'Liquidificador 3L 12 Velocidades 900W com Filtro',
    cat: 'casa',
    price: 149.9,
    old: 229.9,
    rating: 4.6,
    reviews: 980,
    sold: 2600,
    free: false,
    icon: Blender,
    tile: ['#E0F2FE', '#BAE6FD'],
    ink: '#0369A1',
    desc: 'Copo de 3 litros, lâminas em inox e função pulsar. Ideal pra sucos e vitaminas.',
    options: [{ label: 'Voltagem', values: ['127V', '220V'] }],
  },
  {
    id: 'p8',
    name: 'Luminária de Mesa LED Articulada Touch 3 Tons de Luz',
    cat: 'casa',
    price: 69.9,
    old: 99.9,
    rating: 4.8,
    reviews: 640,
    sold: 1800,
    free: false,
    icon: LampDesk,
    tile: ['#FFF7ED', '#FED7AA'],
    ink: '#C2410C',
    desc: 'Luz quente, neutra ou fria com um toque. Braço articulado e entrada USB.',
    options: [{ label: 'Cor', values: ['Branco', 'Preto'] }],
  },
  {
    id: 'p9',
    name: 'Camiseta Básica Algodão Premium Unissex Gola Redonda',
    cat: 'moda',
    price: 39.9,
    old: 59.9,
    rating: 4.7,
    reviews: 4410,
    sold: 21000,
    free: false,
    icon: Shirt,
    tile: ['#FFE9E0', '#FFD2C0'],
    ink: '#D9480F',
    desc: '100% algodão fio 30.1, não desbota e não encolhe. Modelagem regular.',
    options: [
      { label: 'Cor', values: ['Preto', 'Branco', 'Bege', 'Azul'] },
      { label: 'Tamanho', values: ['P', 'M', 'G', 'GG'] },
    ],
  },
  {
    id: 'p10',
    name: 'Tênis Casual Masculino Leve e Confortável Solado Antiderrapante',
    cat: 'moda',
    price: 159.9,
    old: 249.9,
    rating: 4.5,
    reviews: 1320,
    sold: 4200,
    free: true,
    icon: Footprints,
    tile: ['#F1F5F9', '#E2E8F0'],
    ink: '#1E293B',
    desc: 'Cabedal em tecido respirável e palmilha macia. Vai do trabalho ao fim de semana.',
    options: [
      { label: 'Cor', values: ['Preto', 'Cinza', 'Branco'] },
      { label: 'Tamanho', values: ['38', '39', '40', '41', '42', '43'] },
    ],
  },
  {
    id: 'p11',
    name: 'Mochila para Notebook 15.6" Impermeável com Saída USB',
    cat: 'moda',
    price: 119.9,
    old: 189.9,
    rating: 4.8,
    reviews: 2760,
    sold: 6700,
    free: false,
    icon: Backpack,
    tile: ['#E2E8F0', '#CBD5E1'],
    ink: '#334155',
    desc: 'Compartimento acolchoado pro notebook, bolso antifurto nas costas e saída USB pro carregador.',
    options: [{ label: 'Cor', values: ['Preto', 'Cinza', 'Azul'] }],
  },
  {
    id: 'p12',
    name: 'Kit Skincare Vitamina C: Sérum + Hidratante + Tônico Facial',
    cat: 'beleza',
    price: 99.9,
    old: 169.9,
    rating: 4.9,
    reviews: 3150,
    sold: 8800,
    free: false,
    icon: Droplet,
    tile: ['#FCE7F3', '#FBCFE8'],
    ink: '#BE185D',
    desc: 'Rotina completa pra pele mais uniforme e iluminada. Dermatologicamente testado.',
    flash: { sold: 57, stock: 80 },
  },
  {
    id: 'p13',
    name: 'Secador de Cabelo 2000W Íons com Difusor e Bico Concentrador',
    cat: 'beleza',
    price: 139.9,
    old: 199.9,
    rating: 4.6,
    reviews: 870,
    sold: 2300,
    free: false,
    icon: Wind,
    tile: ['#FDF2F8', '#F5D0FE'],
    ink: '#A21CAF',
    desc: '3 temperaturas, 2 velocidades e jato frio. Reduz o frizz e seca mais rápido.',
    options: [
      { label: 'Voltagem', values: ['127V', '220V'] },
      { label: 'Cor', values: ['Rosa', 'Preto'] },
    ],
  },
  {
    id: 'p14',
    name: 'Kit Halteres Emborrachados 2x 3kg para Treino em Casa',
    cat: 'esporte',
    price: 79.9,
    old: 119.9,
    rating: 4.8,
    reviews: 1540,
    sold: 5100,
    free: false,
    icon: Dumbbell,
    tile: ['#EDE9FE', '#DDD6FE'],
    ink: '#5B21B6',
    desc: 'Par de halteres com revestimento emborrachado que não risca o piso.',
    options: [{ label: 'Peso', values: ['2x 1kg', '2x 3kg', '2x 5kg'] }],
  },
  {
    id: 'p15',
    name: 'Bicicleta Aro 29 Alumínio 21 Marchas Freio a Disco',
    cat: 'esporte',
    price: 1299.9,
    old: 1799.9,
    rating: 4.7,
    reviews: 690,
    sold: 1100,
    free: true,
    icon: Bike,
    tile: ['#DCFCE7', '#BBF7D0'],
    ink: '#15803D',
    desc: 'Quadro em alumínio, câmbio Shimano de 21 marchas e suspensão dianteira. Chega 95% montada.',
    options: [
      { label: 'Cor', values: ['Preto', 'Vermelho', 'Azul'] },
      { label: 'Quadro', values: ['15"', '17"', '19"'] },
    ],
  },
  {
    id: 'p16',
    name: 'Café em Grãos Especial Torra Média 1kg Sul de Minas',
    cat: 'mercado',
    price: 64.9,
    old: 84.9,
    rating: 4.9,
    reviews: 2210,
    sold: 9900,
    free: false,
    icon: Coffee,
    tile: ['#FEF3C7', '#FDE68A'],
    ink: '#92400E',
    desc: 'Notas de chocolate e caramelo, 84 pontos SCA. Torrado na semana do envio.',
    options: [{ label: 'Moagem', values: ['Em grãos', 'Moído'] }],
  },
];

const SWATCH: Record<string, string> = {
  Preto: '#1F1F1F',
  Branco: '#F4F4F5',
  Azul: '#2F5BD3',
  'Verde-água': '#2BB3A3',
  Rosa: '#E879A6',
  Cinza: '#9CA3AF',
  Bege: '#D6BF97',
  Vermelho: '#DC2626',
};

const off = (p: Product) => Math.round((1 - p.price / p.old) * 100);
const soldLabel = (n: number) =>
  n >= 1000 ? `${(n / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} mil vendidos` : `${n} vendidos`;
const normalize = (s: string) =>
  s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();

/* QR "de mentira" gerado de forma determinística (sem Math.random no render) */
const QR_SIZE = 29;
const QR_CELLS: [number, number][] = (() => {
  const cells: [number, number][] = [];
  let seed = 1234;
  const rnd = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };
  const inFinder = (x: number, y: number) => {
    const zones = [
      [0, 0],
      [QR_SIZE - 7, 0],
      [0, QR_SIZE - 7],
    ];
    return zones.some(([zx, zy]) => x >= zx - 1 && x <= zx + 7 && y >= zy - 1 && y <= zy + 7);
  };
  for (let y = 0; y < QR_SIZE; y++) {
    for (let x = 0; x < QR_SIZE; x++) {
      if (inFinder(x, y)) continue;
      if (y === 6 || x === 6) {
        if ((x + y) % 2 === 0) cells.push([x, y]);
        continue;
      }
      if (rnd() > 0.52) cells.push([x, y]);
    }
  }
  return cells;
})();

/* ------------------------------------------------------------------ */
/* Tipos de estado                                                     */
/* ------------------------------------------------------------------ */

type CartItem = { key: string; id: string; variant: string; qty: number };
type Screen = { name: 'home' } | { name: 'product'; id: string } | { name: 'cart' } | { name: 'pix' };

/* ------------------------------------------------------------------ */
/* Componente principal                                                */
/* ------------------------------------------------------------------ */

export default function LojaOnline() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [screen, setScreen] = useState<Screen>({ name: 'home' });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<{ id: number; text: string } | null>(null);
  const [bump, setBump] = useState(0);

  // cupom e frete ficam aqui pra sobreviver às trocas de tela
  const [coupon, setCoupon] = useState<string | null>(null);
  const [cep, setCep] = useState<string | null>(null);
  const [order, setOrder] = useState<{ total: number } | null>(null);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const go = (s: Screen) => {
    setScreen(s);
    rootRef.current?.parentElement?.scrollTo({ top: 0 });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const addToCart = (id: string, variant: string, qty: number) => {
    const key = `${id}|${variant}`;
    setCart((c) => {
      const found = c.find((i) => i.key === key);
      if (found) return c.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
      return [...c, { key, id, variant, qty }];
    });
    setBump((b) => b + 1);
  };

  const totals = useMemo(() => {
    const subtotal = cart.reduce((s, i) => s + PRODUCTS.find((p) => p.id === i.id)!.price * i.qty, 0);
    const discount = coupon ? Math.round(subtotal * 0.1 * 100) / 100 : 0;
    const base = subtotal - discount;
    const shipping = cep ? (base >= FREE_SHIPPING_FROM ? 0 : SHIPPING_PRICE) : null;
    return { subtotal, discount, base, shipping, total: base + (shipping ?? 0) };
  }, [cart, coupon, cep]);

  return (
    <div
      ref={rootRef}
      className="min-h-full bg-[#F5F5F5] font-sans text-neutral-900 [&_:focus-visible]:outline-[#111]"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={screen.name === 'product' ? `product-${screen.id}` : screen.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
        >
          {screen.name === 'home' && (
            <Home cartCount={cartCount} bump={bump} onOpen={(id) => go({ name: 'product', id })} onCart={() => go({ name: 'cart' })} />
          )}
          {screen.name === 'product' && (
            <ProductScreen
              product={PRODUCTS.find((p) => p.id === screen.id)!}
              cartCount={cartCount}
              bump={bump}
              onBack={() => go({ name: 'home' })}
              onCart={() => go({ name: 'cart' })}
              onOpen={(id) => go({ name: 'product', id })}
              onAdd={(variant, qty, buyNow) => {
                addToCart(screen.id, variant, qty);
                if (buyNow) go({ name: 'cart' });
                else setToast({ id: Date.now(), text: 'Adicionado ao carrinho' });
              }}
            />
          )}
          {screen.name === 'cart' && (
            <CartScreen
              cart={cart}
              setCart={setCart}
              totals={totals}
              coupon={coupon}
              setCoupon={setCoupon}
              cep={cep}
              setCep={setCep}
              onBack={() => go({ name: 'home' })}
              onOpen={(id) => go({ name: 'product', id })}
              onPix={() => {
                setOrder({ total: totals.total });
                go({ name: 'pix' });
              }}
            />
          )}
          {screen.name === 'pix' && (
            <PixScreen
              total={order?.total ?? totals.total}
              onDone={() => {
                setCart([]);
                setCoupon(null);
                setOrder(null);
                go({ name: 'home' });
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            role="status"
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
            className="fixed inset-x-0 top-16 z-50 mx-auto flex w-fit items-center gap-2 rounded-full bg-neutral-900/90 px-4 py-2.5 text-sm font-semibold text-white shadow-lg"
          >
            <span className="grid size-5 place-items-center rounded-full bg-[#22A06B]">
              <Check className="size-3.5" strokeWidth={3} />
            </span>
            {toast.text}
            <button
              type="button"
              onClick={() => go({ name: 'cart' })}
              className="-my-2 -mr-2 ml-1 min-h-11 rounded-full px-3 text-[#FFB08F] underline-offset-2 hover:underline"
            >
              Ver carrinho
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Peças compartilhadas                                                */
/* ------------------------------------------------------------------ */

function CartButton({ count, bump, onClick }: { count: number; bump: number; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Carrinho, ${count} ${count === 1 ? 'item' : 'itens'}`}
      className="relative grid size-11 shrink-0 place-items-center rounded-full text-white hover:bg-white/15"
    >
      <ShoppingCart className="size-6" />
      {count > 0 && (
        <motion.span
          key={bump}
          initial={{ scale: 0.4 }}
          animate={{ scale: [1.35, 1] }}
          transition={{ duration: 0.35 }}
          className="absolute right-0.5 top-0.5 grid h-5 min-w-5 place-items-center rounded-full border-2 border-[#FF5A1F] bg-white px-1 text-[11px] font-extrabold leading-none text-[#E0400C]"
        >
          {count > 99 ? '99+' : count}
        </motion.span>
      )}
    </button>
  );
}

function ProductArt({ p, size = 'md', color }: { p: Product; size?: 'sm' | 'md' | 'lg'; color?: string }) {
  const Icon = p.icon;
  const iconCls = size === 'lg' ? 'size-32' : size === 'md' ? 'size-16' : 'size-12';
  return (
    <div
      className="relative grid aspect-square w-full place-items-center overflow-hidden"
      style={{ background: `linear-gradient(145deg, ${p.tile[0]}, ${p.tile[1]})` }}
      aria-hidden
    >
      <div className="absolute -right-6 -top-6 size-24 rounded-full bg-white/40" />
      <div className="absolute -bottom-8 -left-4 size-20 rounded-full bg-white/25" />
      <div className="relative flex flex-col items-center">
        <Icon className={iconCls} strokeWidth={1.4} style={{ color: color ?? p.ink }} />
        <div className={`mt-1 h-2 rounded-[50%] bg-black/10 blur-[2px] ${size === 'lg' ? 'w-28' : 'w-12'}`} />
      </div>
    </div>
  );
}

function Rating({ p }: { p: Product }) {
  return (
    <div className="flex items-center gap-1 text-[11px] text-neutral-500">
      <Star className="size-3 fill-[#FFB400] text-[#FFB400]" />
      <span className="font-semibold text-neutral-700">{p.rating.toLocaleString('pt-BR')}</span>
      <span className="text-neutral-300">|</span>
      <span>{soldLabel(p.sold)}</span>
    </div>
  );
}

function FreeBadge({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded bg-[#E6F6EE] px-1.5 py-0.5 text-[10px] font-bold text-[#0F7A48] ${className}`}>
      <Truck className="size-3" /> Frete grátis
    </span>
  );
}

function ProductCard({ p, onOpen }: { p: Product; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex flex-col overflow-hidden rounded-lg bg-white text-left shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition active:scale-[0.98]"
    >
      <div className="relative">
        <ProductArt p={p} />
        <span className="absolute right-0 top-0 rounded-bl-md bg-[#FFE14D] px-1.5 py-1 text-center text-[10px] font-extrabold leading-none text-[#C2410C]">
          {off(p)}%
          <br />
          OFF
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-2">
        <p className="line-clamp-2 min-h-[2.5rem] text-[13px] leading-5 text-neutral-800">{p.name}</p>
        <div className="mt-auto">
          <p className="text-[11px] text-neutral-400 line-through">{fmt(p.old)}</p>
          <p className="font-display text-base font-bold leading-tight text-[#E0400C]">{fmt(p.price)}</p>
        </div>
        {p.free && <FreeBadge className="w-fit" />}
        <Rating p={p} />
      </div>
    </button>
  );
}

function SubHeader({
  title,
  onBack,
  right,
}: {
  title: string;
  onBack: () => void;
  right?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-1 bg-[#FF5A1F] px-1.5 py-1.5 text-white shadow-sm">
      <button type="button" onClick={onBack} aria-label="Voltar" className="grid size-11 place-items-center rounded-full hover:bg-white/15">
        <ChevronLeft className="size-6" />
      </button>
      <h1 className="flex-1 truncate font-display text-lg font-bold">{title}</h1>
      {right}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Home                                                                */
/* ------------------------------------------------------------------ */

function Home({
  cartCount,
  bump,
  onOpen,
  onCart,
}: {
  cartCount: number;
  bump: number;
  onOpen: (id: string) => void;
  onCart: () => void;
}) {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState<CatId | null>(null);

  const q = normalize(query.trim());
  const list = PRODUCTS.filter((p) => (!cat || p.cat === cat) && (!q || normalize(p.name).includes(q)));
  const browsing = !q && !cat;
  const catLabel = CATEGORIES.find((c) => c.id === cat)?.label;

  return (
    <div className="pb-8">
      <header className="sticky top-0 z-30 bg-[#FF5A1F] px-3 pb-2.5 pt-2 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="flex shrink-0 items-center gap-1 font-display text-lg font-extrabold tracking-tight text-white">
            <ShoppingBag className="size-5" strokeWidth={2.4} />
            Feirão
          </span>
          <div className="relative flex-1">
            <label htmlFor="feirao-busca" className="sr-only">
              Buscar produtos
            </label>
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-[#FF5A1F]" />
            <input
              id="feirao-busca"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar no Feirão"
              autoComplete="off"
              className="h-10 w-full rounded-md border-0 bg-white pl-8 pr-9 text-sm text-neutral-900 placeholder:text-neutral-400 [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Limpar busca"
                className="absolute right-0 top-1/2 grid size-10 -translate-y-1/2 place-items-center text-neutral-400"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
          <CartButton count={cartCount} bump={bump} onClick={onCart} />
        </div>
      </header>

      {browsing && (
        <>
          <div className="bg-gradient-to-b from-[#FF5A1F] to-[#F5F5F5] pb-1 pt-1">
            <BannerCarousel />
          </div>
          <div className="mx-3 mt-1 flex items-center justify-between rounded-md bg-white px-3 py-2 text-[11px] text-neutral-600 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="size-3.5 text-[#0F7A48]" /> Compra garantida
            </span>
            <span className="flex items-center gap-1">
              <Truck className="size-3.5 text-[#0F7A48]" /> Grátis acima de R$ 199
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="size-3.5 text-[#FF5A1F]" /> Valença, BA
            </span>
          </div>
        </>
      )}

      <nav aria-label="Categorias" className="no-scrollbar mt-3 flex gap-1 overflow-x-auto px-2">
        {CATEGORIES.map((c) => {
          const Icon = c.icon;
          const active = cat === c.id;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={active}
              onClick={() => setCat(active ? null : c.id)}
              className="flex w-[4.4rem] shrink-0 flex-col items-center gap-1 rounded-lg py-1.5"
            >
              <span
                className={`grid size-12 place-items-center rounded-2xl transition ${active ? 'ring-2 ring-[#FF5A1F] ring-offset-2 ring-offset-[#F5F5F5]' : ''}`}
                style={{ background: c.bg, color: c.fg }}
              >
                <Icon className="size-6" />
              </span>
              <span className={`text-[11px] ${active ? 'font-bold text-[#E0400C]' : 'text-neutral-700'}`}>{c.label}</span>
            </button>
          );
        })}
      </nav>

      {browsing && <FlashDeals onOpen={onOpen} />}

      <section className="mt-3 px-2">
        <div className="mb-2 flex min-h-8 items-center justify-between px-1">
          <h2 className="font-display text-[15px] font-bold text-neutral-900">
            {q ? `Resultados para “${query.trim()}”` : catLabel ? catLabel : 'Descobertas do dia'}
          </h2>
          {cat && (
            <button
              type="button"
              onClick={() => setCat(null)}
              className="flex min-h-11 items-center gap-1 rounded-full px-2 text-xs font-semibold text-[#E0400C]"
            >
              Limpar filtro <X className="size-3.5" />
            </button>
          )}
        </div>
        <p className="sr-only" aria-live="polite">
          {list.length} produtos encontrados
        </p>
        {list.length === 0 ? (
          <div className="mx-1 flex flex-col items-center rounded-lg bg-white px-6 py-10 text-center">
            <Search className="size-10 text-neutral-300" />
            <p className="mt-3 font-semibold text-neutral-800">Nada encontrado por aqui</p>
            <p className="mt-1 text-sm text-neutral-500">Tente outra palavra, tipo “fone”, “panela” ou “café”.</p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setCat(null);
              }}
              className="mt-4 min-h-11 rounded-md bg-[#FF5A1F] px-5 text-sm font-bold text-white"
            >
              Ver todos os produtos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {list.map((p) => (
              <ProductCard key={p.id} p={p} onOpen={() => onOpen(p.id)} />
            ))}
          </div>
        )}
      </section>

      <p className="mt-6 text-center text-[11px] text-neutral-400">Feirão, loja de demonstração. Nenhuma compra é real.</p>
    </div>
  );
}

/* ---------- Banner ---------- */

const BANNERS = [
  {
    id: 'celular',
    kicker: 'Semana do Celular',
    title: 'Até 35% OFF',
    sub: 'em smartphones e acessórios',
    bg: 'linear-gradient(120deg,#3B1FA8 0%,#6D28D9 55%,#A855F7 100%)',
    art: 'phone' as const,
  },
  {
    id: 'casa',
    kicker: 'Casa & Cozinha',
    title: 'até 40% OFF',
    sub: 'air fryer, panelas e mais',
    bg: 'linear-gradient(120deg,#0F766E 0%,#14B8A6 60%,#5EEAD4 100%)',
    art: 'pot' as const,
  },
  {
    id: 'cupom',
    kicker: 'Primeira compra',
    title: '10% OFF',
    sub: 'com o cupom JESSE10',
    bg: 'linear-gradient(120deg,#E0400C 0%,#FF5A1F 50%,#FFB020 100%)',
    art: 'ticket' as const,
  },
];

function BannerArt({ kind }: { kind: 'phone' | 'pot' | 'ticket' }) {
  if (kind === 'phone')
    return (
      <svg viewBox="0 0 120 120" className="h-full w-auto" aria-hidden>
        <circle cx="70" cy="62" r="46" fill="#fff" opacity=".12" />
        <rect x="46" y="18" width="46" height="88" rx="9" fill="#1E1B4B" transform="rotate(12 69 62)" />
        <rect x="50" y="24" width="38" height="74" rx="5" fill="#C4B5FD" transform="rotate(12 69 62)" />
        <rect x="56" y="34" width="26" height="18" rx="3" fill="#fff" opacity=".85" transform="rotate(12 69 62)" />
        <rect x="56" y="58" width="26" height="4" rx="2" fill="#fff" opacity=".7" transform="rotate(12 69 62)" />
        <rect x="56" y="66" width="18" height="4" rx="2" fill="#fff" opacity=".5" transform="rotate(12 69 62)" />
        <rect x="24" y="52" width="22" height="40" rx="5" fill="#FDE047" transform="rotate(-14 35 72)" />
        <rect x="27" y="56" width="16" height="30" rx="3" fill="#FEF9C3" transform="rotate(-14 35 72)" />
        <path d="M100 20l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#FDE047" />
      </svg>
    );
  if (kind === 'pot')
    return (
      <svg viewBox="0 0 120 120" className="h-full w-auto" aria-hidden>
        <circle cx="64" cy="64" r="46" fill="#fff" opacity=".15" />
        <path d="M52 30c0-6 6-6 6-12M64 30c0-6 6-6 6-12M76 30c0-6 6-6 6-12" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".8" />
        <rect x="30" y="50" width="68" height="46" rx="10" fill="#FB7185" />
        <rect x="30" y="50" width="68" height="12" rx="6" fill="#E11D48" />
        <rect x="20" y="58" width="14" height="6" rx="3" fill="#881337" />
        <rect x="94" y="58" width="14" height="6" rx="3" fill="#881337" />
        <rect x="38" y="36" width="52" height="10" rx="5" fill="#FECDD3" />
        <rect x="58" y="30" width="12" height="8" rx="3" fill="#881337" />
        <rect x="40" y="72" width="30" height="5" rx="2.5" fill="#fff" opacity=".5" />
      </svg>
    );
  return (
    <svg viewBox="0 0 120 120" className="h-full w-auto" aria-hidden>
      <circle cx="62" cy="62" r="46" fill="#fff" opacity=".15" />
      <g transform="rotate(-12 60 62)">
        <path d="M20 40h80v14a8 8 0 0 0 0 16v14H20V70a8 8 0 0 0 0-16z" fill="#fff" />
        <path d="M44 42v40" stroke="#FF5A1F" strokeWidth="2" strokeDasharray="4 4" />
        <text x="72" y="68" textAnchor="middle" fontSize="20" fontWeight="800" fill="#E0400C" fontFamily="sans-serif">
          10%
        </text>
        <circle cx="32" cy="62" r="5" fill="#FFB020" />
      </g>
      <path d="M100 24l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#fff" />
    </svg>
  );
}

function BannerCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' });
  };

  return (
    <div className="relative" role="region" aria-roledescription="carrossel" aria-label="Promoções">
      <div
        ref={ref}
        onScroll={(e) => {
          const el = e.currentTarget;
          const i = Math.round(el.scrollLeft / el.clientWidth);
          if (i !== index) setIndex(i);
        }}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
      >
        {BANNERS.map((b, i) => (
          <div
            key={b.id}
            className="w-full shrink-0 snap-center px-3"
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${BANNERS.length}: ${b.kicker}`}
          >
            <div className="relative flex h-36 items-center overflow-hidden rounded-xl px-4 text-white shadow-md" style={{ background: b.bg }}>
              <div className="absolute -left-10 -top-12 size-40 rounded-full bg-white/10" />
              <div className="relative z-10 max-w-[58%]">
                <p className="w-fit rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">{b.kicker}</p>
                <p className="mt-1.5 font-display text-[1.7rem] font-extrabold leading-none">{b.title}</p>
                <p className="mt-1 text-xs text-white/90">{b.sub}</p>
              </div>
              <div className="absolute bottom-0 right-1 top-0 py-2">
                <BannerArt kind={b.art} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-1 flex justify-center">
        {BANNERS.map((b, i) => (
          <button
            key={b.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ir para o banner ${i + 1}`}
            aria-current={i === index}
            className="grid h-6 w-7 place-items-center"
          >
            <span className={`block h-1.5 rounded-full transition-all ${i === index ? 'w-4 bg-[#FF5A1F]' : 'w-1.5 bg-neutral-300'}`} />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- Ofertas relâmpago ---------- */

function useCountdown(startSeconds: number) {
  const [left, setLeft] = useState(startSeconds);
  useEffect(() => {
    const t = setInterval(() => setLeft((s) => (s <= 1 ? startSeconds : s - 1)), 1000);
    return () => clearInterval(t);
  }, [startSeconds]);
  const h = Math.floor(left / 3600);
  const m = Math.floor((left % 3600) / 60);
  const s = left % 60;
  return [h, m, s].map((n) => String(n).padStart(2, '0'));
}

function FlashDeals({ onOpen }: { onOpen: (id: string) => void }) {
  const [h, m, s] = useCountdown(2 * 3600 + 47 * 60 + 13);
  const deals = PRODUCTS.filter((p) => p.flash);
  return (
    <section className="mt-3 bg-white py-3" aria-labelledby="flash-title">
      <div className="flex items-center gap-2 px-3">
        <h2 id="flash-title" className="flex items-center gap-1 font-display text-[15px] font-extrabold italic tracking-tight text-[#E0400C]">
          <Zap className="size-4 fill-[#FF5A1F] text-[#FF5A1F]" />
          OFERTAS RELÂMPAGO
        </h2>
        <div className="flex items-center gap-0.5" aria-label={`Termina em ${h} horas, ${m} minutos e ${s} segundos`} role="timer">
          {[h, m, s].map((v, i) => (
            <span key={i} className="flex items-center gap-0.5">
              {i > 0 && <span className="text-xs font-bold text-neutral-900">:</span>}
              <span className="min-w-[1.4rem] rounded bg-neutral-900 px-1 py-0.5 text-center font-mono text-xs font-bold tabular-nums text-white">
                {v}
              </span>
            </span>
          ))}
        </div>
      </div>
      <div className="no-scrollbar mt-3 flex gap-2.5 overflow-x-auto px-3">
        {deals.map((p) => {
          const pct = Math.round((p.flash!.sold / p.flash!.stock) * 100);
          const almost = pct >= 80;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onOpen(p.id)}
              className="flex w-[7.5rem] shrink-0 flex-col text-left"
            >
              <div className="relative overflow-hidden rounded-md">
                <ProductArt p={p} size="sm" />
                <span className="absolute left-0 top-0 rounded-br-md bg-[#E0400C] px-1.5 py-0.5 text-[11px] font-extrabold text-white">
                  -{off(p)}%
                </span>
              </div>
              <p className="mt-1.5 text-center font-display text-[15px] font-bold text-[#E0400C]">{fmt(p.price)}</p>
              <div className="relative mt-1 h-4 overflow-hidden rounded-full bg-[#FFD6C7]">
                <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#FF8A3D] to-[#E0400C]" style={{ width: `${pct}%` }} />
                <span className="relative z-10 block text-center text-[10px] font-bold uppercase leading-4 text-white [text-shadow:0_1px_1px_rgba(0,0,0,0.25)]">
                  {almost ? 'Quase esgotado' : `Vendidos ${p.flash!.sold}`}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Detalhe do produto                                                  */
/* ------------------------------------------------------------------ */

function ProductScreen({
  product: p,
  cartCount,
  bump,
  onBack,
  onCart,
  onOpen,
  onAdd,
}: {
  product: Product;
  cartCount: number;
  bump: number;
  onBack: () => void;
  onCart: () => void;
  onOpen: (id: string) => void;
  onAdd: (variant: string, qty: number, buyNow: boolean) => void;
}) {
  const [sel, setSel] = useState<Record<string, string>>(() =>
    Object.fromEntries((p.options ?? []).map((o) => [o.label, o.values[0]])),
  );
  const [qty, setQty] = useState(1);
  const colorName = sel['Cor'];
  const artColor = colorName ? (colorName === 'Branco' ? '#A1A1AA' : SWATCH[colorName]) : undefined;
  const variant = (p.options ?? []).map((o) => sel[o.label]).join(' · ');
  const related = PRODUCTS.filter((x) => x.cat === p.cat && x.id !== p.id).slice(0, 4);

  return (
    <div className="pb-28">
      <SubHeader title="Detalhes do produto" onBack={onBack} right={<CartButton count={cartCount} bump={bump} onClick={onCart} />} />

      <div className="relative">
        <ProductArt p={p} size="lg" color={artColor} />
        <span className="absolute bottom-3 right-3 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-semibold text-white">1/1</span>
      </div>

      <section className="bg-white px-3 pb-3 pt-3">
        <div className="flex flex-wrap items-end gap-x-2">
          <p className="font-display text-[1.7rem] font-extrabold leading-none text-[#E0400C]">{fmt(p.price)}</p>
          <p className="pb-0.5 text-sm text-neutral-400 line-through">{fmt(p.old)}</p>
          <span className="mb-0.5 rounded bg-[#FFE9E0] px-1.5 py-0.5 text-xs font-bold text-[#E0400C]">-{off(p)}%</span>
        </div>
        <p className="mt-1.5 text-sm text-neutral-700">
          ou <strong>12x de {fmt(p.price / 12)}</strong> sem juros
        </p>
        <h1 className="mt-2 text-[15px] leading-snug text-neutral-900">{p.name}</h1>
        <div className="mt-2 flex items-center gap-2">
          <Rating p={p} />
          <span className="text-[11px] text-neutral-400">({p.reviews.toLocaleString('pt-BR')} avaliações)</span>
        </div>
      </section>

      <section className="mt-2 flex items-start gap-3 bg-white px-3 py-3 text-sm">
        <Truck className="mt-0.5 size-5 shrink-0 text-[#0F7A48]" />
        <div>
          {p.free || p.price >= FREE_SHIPPING_FROM ? (
            <p className="font-semibold text-[#0F7A48]">Frete grátis</p>
          ) : (
            <p className="text-neutral-800">
              Frete {fmt(SHIPPING_PRICE)} <span className="text-neutral-500">· grátis acima de {fmt(FREE_SHIPPING_FROM)}</span>
            </p>
          )}
          <p className="text-xs text-neutral-500">Chega em 3 a 5 dias úteis em Valença e região</p>
        </div>
      </section>

      {(p.options ?? []).length > 0 && (
        <section className="mt-2 space-y-3 bg-white px-3 py-3">
          {p.options!.map((o) => (
            <fieldset key={o.label}>
              <legend className="text-sm text-neutral-600">
                {o.label}: <span className="font-semibold text-neutral-900">{sel[o.label]}</span>
              </legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {o.values.map((v) => {
                  const active = sel[o.label] === v;
                  return (
                    <button
                      key={v}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setSel((s) => ({ ...s, [o.label]: v }))}
                      className={`relative flex min-h-11 min-w-11 items-center gap-1.5 rounded-md border px-3 text-sm transition ${
                        active ? 'border-[#FF5A1F] bg-[#FFF3EE] font-semibold text-[#E0400C]' : 'border-neutral-200 bg-neutral-50 text-neutral-800'
                      }`}
                    >
                      {o.label === 'Cor' && SWATCH[v] && (
                        <span className="size-4 rounded-full border border-black/15" style={{ background: SWATCH[v] }} />
                      )}
                      {v}
                      {active && (
                        <span className="absolute -bottom-px -right-px grid size-3.5 place-items-center rounded-tl-md rounded-br-md bg-[#FF5A1F]">
                          <Check className="size-2.5 text-white" strokeWidth={4} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </section>
      )}

      <section className="mt-2 flex items-center justify-between bg-white px-3 py-2">
        <span className="text-sm text-neutral-600">Quantidade</span>
        <Stepper value={qty} onChange={setQty} label="Quantidade" />
      </section>

      <section className="mt-2 bg-white px-3 py-3">
        <h2 className="font-display text-[15px] font-bold">Sobre o produto</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-neutral-700">{p.desc}</p>
        <ul className="mt-3 space-y-1.5 text-[13px] text-neutral-600">
          <li className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-[#0F7A48]" /> Garantia de 90 dias e nota fiscal
          </li>
          <li className="flex items-center gap-2">
            <PackageCheck className="size-4 text-[#0F7A48]" /> Devolução grátis em até 7 dias
          </li>
        </ul>
      </section>

      {related.length > 0 && (
        <section className="mt-2 px-2 pt-2">
          <h2 className="mb-2 px-1 font-display text-[15px] font-bold">Você também pode gostar</h2>
          <div className="grid grid-cols-2 gap-2">
            {related.map((r) => (
              <ProductCard key={r.id} p={r} onOpen={() => onOpen(r.id)} />
            ))}
          </div>
        </section>
      )}

      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-neutral-200 bg-white px-3 pb-[calc(0.6rem+env(safe-area-inset-bottom,0px))] pt-2.5">
        <button
          type="button"
          onClick={() => onAdd(variant, qty, false)}
          className="flex min-h-12 flex-1 items-center justify-center gap-1.5 rounded-md border border-[#FF5A1F] bg-[#FFF3EE] px-2 text-sm font-bold text-[#E0400C] active:scale-[0.98]"
        >
          <ShoppingCart className="size-4" /> Adicionar ao carrinho
        </button>
        <button
          type="button"
          onClick={() => onAdd(variant, qty, true)}
          className="min-h-12 flex-1 rounded-md bg-[#FF5A1F] px-2 text-sm font-bold text-white active:scale-[0.98]"
        >
          Comprar agora
        </button>
      </div>
    </div>
  );
}

function Stepper({
  value,
  onChange,
  label,
  min = 1,
  max = 10,
}: {
  value: number;
  onChange: (n: number) => void;
  label: string;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex items-center overflow-hidden rounded-md border border-neutral-200" role="group" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Diminuir quantidade"
        className="grid size-11 place-items-center text-neutral-700 disabled:text-neutral-300"
      >
        <Minus className="size-4" />
      </button>
      <span className="min-w-9 border-x border-neutral-200 text-center text-sm font-semibold tabular-nums leading-[2.75rem]" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Aumentar quantidade"
        className="grid size-11 place-items-center text-neutral-700 disabled:text-neutral-300"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Carrinho                                                            */
/* ------------------------------------------------------------------ */

type Totals = { subtotal: number; discount: number; base: number; shipping: number | null; total: number };

function CartScreen({
  cart,
  setCart,
  totals,
  coupon,
  setCoupon,
  cep,
  setCep,
  onBack,
  onOpen,
  onPix,
}: {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  totals: Totals;
  coupon: string | null;
  setCoupon: (c: string | null) => void;
  cep: string | null;
  setCep: (c: string | null) => void;
  onBack: () => void;
  onOpen: (id: string) => void;
  onPix: () => void;
}) {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [cepInput, setCepInput] = useState(cep ?? '');
  const [cepError, setCepError] = useState('');
  const cepRef = useRef<HTMLInputElement>(null);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) {
      setCouponError('Digite um código de cupom.');
      return;
    }
    if (code === COUPON) {
      setCoupon(code);
      setCouponError('');
      setCouponInput('');
    } else {
      setCouponError(`O cupom “${code}” é inválido ou expirou.`);
    }
  };

  const calcShipping = () => {
    const digits = cepInput.replace(/\D/g, '');
    if (digits.length !== 8) {
      setCepError('Digite um CEP com 8 números.');
      setCep(null);
      return;
    }
    setCepError('');
    setCep(`${digits.slice(0, 5)}-${digits.slice(5)}`);
  };

  const needCep = () => {
    if (cep) return false;
    setCepError('Calcule o frete antes de finalizar.');
    cepRef.current?.focus();
    cepRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    return true;
  };

  const waText = useMemo(() => {
    const lines = cart.map((i) => {
      const p = PRODUCTS.find((x) => x.id === i.id)!;
      return `• ${i.qty}x ${p.name}${i.variant ? ` (${i.variant})` : ''}: ${fmt(p.price * i.qty)}`;
    });
    return [
      'Olá, Feirão! Quero fechar este pedido:',
      '',
      ...lines,
      '',
      `Subtotal: ${fmt(totals.subtotal)}`,
      ...(coupon ? [`Cupom ${coupon}: -${fmt(totals.discount)}`] : []),
      `Frete (CEP ${cep ?? '-'}): ${totals.shipping === 0 ? 'grátis' : fmt(totals.shipping ?? 0)}`,
      `*Total: ${fmt(totals.total)}*`,
    ].join('\n');
  }, [cart, totals, coupon, cep]);

  if (cart.length === 0) {
    return (
      <div className="min-h-full">
        <SubHeader title="Carrinho" onBack={onBack} />
        <div className="flex flex-col items-center px-8 py-16 text-center">
          <div className="grid size-24 place-items-center rounded-full bg-[#FFE9E0]">
            <ShoppingCart className="size-11 text-[#FF5A1F]" strokeWidth={1.6} />
          </div>
          <p className="mt-5 font-display text-lg font-bold">Seu carrinho está vazio</p>
          <p className="mt-1 text-sm text-neutral-500">Dá uma olhada nas ofertas relâmpago, tem coisa boa com até 45% OFF.</p>
          <button type="button" onClick={onBack} className="mt-6 min-h-12 rounded-md bg-[#FF5A1F] px-6 text-sm font-bold text-white">
            Ver ofertas
          </button>
        </div>
      </div>
    );
  }

  const missing = FREE_SHIPPING_FROM - totals.base;

  return (
    <div className="pb-44">
      <SubHeader title={`Carrinho (${count})`} onBack={onBack} />

      <div className="flex items-center gap-2 bg-[#E6F6EE] px-3 py-2 text-xs text-[#0F7A48]">
        <Truck className="size-4 shrink-0" />
        {missing > 0 ? (
          <span>
            Faltam <strong>{fmt(missing)}</strong> pra ganhar frete grátis
          </span>
        ) : (
          <span className="font-semibold">Oba! Seu pedido tem frete grátis</span>
        )}
      </div>

      <ul className="mt-2 space-y-2">
        <AnimatePresence initial={false}>
          {cart.map((i) => {
            const p = PRODUCTS.find((x) => x.id === i.id)!;
            return (
              <motion.li
                key={i.key}
                layout
                exit={{ opacity: 0, x: -40, transition: { duration: 0.2 } }}
                className="flex gap-3 bg-white px-3 py-3"
              >
                <button
                  type="button"
                  onClick={() => onOpen(p.id)}
                  className="w-20 shrink-0 self-start overflow-hidden rounded-md"
                  aria-label={`Ver ${p.name}`}
                >
                  <ProductArt p={p} size="sm" color={i.variant.includes('Branco') ? '#A1A1AA' : SWATCH[i.variant.split(' · ').find((v) => SWATCH[v]) ?? '']} />
                </button>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-[13px] leading-5 text-neutral-800">{p.name}</p>
                  {i.variant && (
                    <p className="mt-1 w-fit rounded bg-neutral-100 px-1.5 py-0.5 text-[11px] text-neutral-600">{i.variant}</p>
                  )}
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <p className="font-display text-[15px] font-bold text-[#E0400C]">{fmt(p.price)}</p>
                    <p className="text-[11px] text-neutral-400 line-through">{fmt(p.old)}</p>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between">
                    <Stepper
                      value={i.qty}
                      label={`Quantidade de ${p.name}`}
                      onChange={(n) => setCart((c) => c.map((x) => (x.key === i.key ? { ...x, qty: n } : x)))}
                    />
                    <button
                      type="button"
                      onClick={() => setCart((c) => c.filter((x) => x.key !== i.key))}
                      aria-label={`Remover ${p.name}`}
                      className="grid size-11 place-items-center rounded-full text-neutral-400 hover:bg-neutral-100 hover:text-[#DC2626]"
                    >
                      <Trash2 className="size-5" />
                    </button>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>

      {/* Cupom */}
      <section className="mt-2 bg-white px-3 py-3">
        <label htmlFor="feirao-cupom" className="flex items-center gap-1.5 text-sm font-semibold text-neutral-800">
          <Ticket className="size-4 text-[#FF5A1F]" /> Cupom de desconto
        </label>
        {coupon ? (
          <div className="mt-2 flex items-center justify-between rounded-md border border-dashed border-[#22A06B] bg-[#E6F6EE] px-3 py-1">
            <span className="flex items-center gap-1.5 text-sm text-[#0F7A48]">
              <Check className="size-4" strokeWidth={3} />
              <strong>{coupon}</strong> aplicado: 10% OFF
            </span>
            <button
              type="button"
              onClick={() => setCoupon(null)}
              className="min-h-11 px-1 text-xs font-semibold text-neutral-500 underline underline-offset-2"
            >
              Remover
            </button>
          </div>
        ) : (
          <>
            <form
              className="mt-2 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                applyCoupon();
              }}
            >
              <input
                id="feirao-cupom"
                value={couponInput}
                onChange={(e) => {
                  setCouponInput(e.target.value);
                  if (couponError) setCouponError('');
                }}
                placeholder="Ex.: JESSE10"
                autoCapitalize="characters"
                autoComplete="off"
                aria-invalid={!!couponError}
                aria-describedby={couponError ? 'feirao-cupom-erro' : 'feirao-cupom-dica'}
                className={`h-11 min-w-0 flex-1 rounded-md border px-3 text-sm uppercase placeholder:normal-case placeholder:text-neutral-400 ${
                  couponError ? 'border-[#DC2626] bg-[#FEF2F2]' : 'border-neutral-300'
                }`}
              />
              <button type="submit" className="h-11 shrink-0 rounded-md bg-neutral-900 px-4 text-sm font-bold text-white">
                Aplicar
              </button>
            </form>
            {couponError ? (
              <p id="feirao-cupom-erro" role="alert" className="mt-1.5 text-xs font-medium text-[#DC2626]">
                {couponError}
              </p>
            ) : (
              <p id="feirao-cupom-dica" className="mt-1.5 text-xs text-neutral-500">
                Dica: use <strong className="text-neutral-700">JESSE10</strong> e ganhe 10% OFF.
              </p>
            )}
          </>
        )}
      </section>

      {/* Frete */}
      <section className="mt-2 bg-white px-3 py-3">
        <label htmlFor="feirao-cep" className="flex items-center gap-1.5 text-sm font-semibold text-neutral-800">
          <MapPin className="size-4 text-[#FF5A1F]" /> Calcular frete
        </label>
        <form
          className="mt-2 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            calcShipping();
          }}
        >
          <input
            ref={cepRef}
            id="feirao-cep"
            inputMode="numeric"
            autoComplete="postal-code"
            value={cepInput}
            onChange={(e) => {
              const d = e.target.value.replace(/\D/g, '').slice(0, 8);
              setCepInput(d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d);
              if (cepError) setCepError('');
            }}
            placeholder="00000-000"
            aria-invalid={!!cepError}
            aria-describedby={cepError ? 'feirao-cep-erro' : undefined}
            className={`h-11 min-w-0 flex-1 rounded-md border px-3 text-sm tabular-nums placeholder:text-neutral-400 ${
              cepError ? 'border-[#DC2626] bg-[#FEF2F2]' : 'border-neutral-300'
            }`}
          />
          <button type="submit" className="h-11 shrink-0 rounded-md bg-neutral-900 px-4 text-sm font-bold text-white">
            Calcular
          </button>
        </form>
        {cepError && (
          <p id="feirao-cep-erro" role="alert" className="mt-1.5 text-xs font-medium text-[#DC2626]">
            {cepError}
          </p>
        )}
        {cep && totals.shipping !== null && (
          <div className="mt-2 flex items-center justify-between rounded-md bg-neutral-50 px-3 py-2 text-sm">
            <span className="text-neutral-700">
              Entrega padrão · <span className="text-neutral-500">3 a 5 dias úteis</span>
            </span>
            {totals.shipping === 0 ? (
              <span className="font-bold text-[#0F7A48]">Grátis</span>
            ) : (
              <span className="font-semibold">{fmt(totals.shipping)}</span>
            )}
          </div>
        )}
      </section>

      {/* Resumo */}
      <section className="mt-2 bg-white px-3 py-3 text-sm">
        <h2 className="font-display text-[15px] font-bold">Resumo do pedido</h2>
        <dl className="mt-2 space-y-1.5">
          <div className="flex justify-between">
            <dt className="text-neutral-600">Produtos ({count})</dt>
            <dd>{fmt(totals.subtotal)}</dd>
          </div>
          {coupon && (
            <div className="flex justify-between text-[#0F7A48]">
              <dt>Cupom {coupon}</dt>
              <dd>-{fmt(totals.discount)}</dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt className="text-neutral-600">Frete</dt>
            <dd>
              {totals.shipping === null ? (
                <span className="text-neutral-400">informe o CEP</span>
              ) : totals.shipping === 0 ? (
                <span className="font-semibold text-[#0F7A48]">Grátis</span>
              ) : (
                fmt(totals.shipping)
              )}
            </dd>
          </div>
          <div className="flex justify-between border-t border-neutral-100 pt-2 text-base font-bold">
            <dt>Total</dt>
            <dd className="font-display text-[#E0400C]">{fmt(totals.total)}</dd>
          </div>
        </dl>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white px-3 pb-[calc(0.6rem+env(safe-area-inset-bottom,0px))] pt-2">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-neutral-600">Total</span>
          <span className="font-display text-xl font-extrabold text-[#E0400C]">{fmt(totals.total)}</span>
        </div>
        <div className="mt-2 flex gap-2">
          <button
            type="button"
            onClick={() => {
              if (!needCep()) onPix();
            }}
            className="flex min-h-12 flex-1 items-center justify-center gap-1.5 rounded-md bg-[#FF5A1F] px-2 text-sm font-bold text-white active:scale-[0.98]"
          >
            <PixIcon className="size-4" /> Pagar no Pix
          </button>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(waText)}`}
            target="_blank"
            rel="noopener"
            onClick={(e) => {
              if (needCep()) e.preventDefault();
            }}
            className="flex min-h-12 flex-1 items-center justify-center gap-1.5 rounded-md bg-[#1FA855] px-2 text-center text-sm font-bold text-white active:scale-[0.98]"
          >
            <MessageCircle className="size-4" /> Finalizar pelo WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

function PixIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2.5 8.4 6.1a2.6 2.6 0 0 1 1.8.8L12 8.7l1.8-1.8a2.6 2.6 0 0 1 1.8-.8L12 2.5Zm-5.9 5L3.5 10.1a2.7 2.7 0 0 0 0 3.8l2.6 2.6h1.3c.5 0 1-.2 1.3-.5L11 13.7a1.4 1.4 0 0 1 2 0l2.3 2.3c.3.3.8.5 1.3.5h1.3l2.6-2.6a2.7 2.7 0 0 0 0-3.8l-2.6-2.6h-1.3c-.5 0-1 .2-1.3.5L13 10.3a1.4 1.4 0 0 1-2 0L8.7 8c-.3-.3-.8-.5-1.3-.5H6.1Zm2.3 10.4L12 21.5l3.6-3.6a2.6 2.6 0 0 1-1.8-.8L12 15.3l-1.8 1.8a2.6 2.6 0 0 1-1.8.8Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Pix                                                                 */
/* ------------------------------------------------------------------ */

function PixScreen({ total, onDone }: { total: number; onDone: () => void }) {
  const [copied, setCopied] = useState(false);
  const amount = total.toFixed(2);
  const code = `00020126580014BR.GOV.BCB.PIX0136feirao-demo@pix.jesseoliveira.com.br52040000530398654${String(amount.length).padStart(2, '0')}${amount}5802BR5913FEIRAO DEMO6007VALENCA62080504123463041D3A`;

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      /* sem permissão de clipboard: segue só com o feedback visual */
    }
    setCopied(true);
  };

  return (
    <div className="min-h-full pb-10">
      <header className="sticky top-0 z-30 flex items-center gap-2 bg-[#FF5A1F] px-3 py-3 text-white">
        <PixIcon className="size-5" />
        <h1 className="font-display text-lg font-bold">Pagamento via Pix</h1>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-3 mt-3 rounded-xl bg-white p-4 text-center shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
      >
        <div className="mx-auto grid size-12 place-items-center rounded-full bg-[#E6F6EE]">
          <Check className="size-6 text-[#0F7A48]" strokeWidth={3} />
        </div>
        <p className="mt-2 font-display text-xl font-extrabold">Pedido #1234 recebido</p>
        <p className="mt-1 text-sm text-neutral-600">
          Pague <strong className="text-neutral-900">{fmt(total)}</strong> com o Pix abaixo pra confirmar.
        </p>
        <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#FFF3EE] px-2.5 py-1 text-xs font-semibold text-[#C2410C]">
          <Clock className="size-3.5" /> O código vence em 30 minutos
        </p>

        <div className="mx-auto mt-4 w-52 rounded-lg border border-neutral-200 bg-white p-2.5">
          <svg viewBox={`-1 -1 ${QR_SIZE + 2} ${QR_SIZE + 2}`} className="w-full" role="img" aria-label="QR Code Pix de exemplo" shapeRendering="crispEdges">
            <rect x="-1" y="-1" width={QR_SIZE + 2} height={QR_SIZE + 2} fill="#fff" />
            {[
              [0, 0],
              [QR_SIZE - 7, 0],
              [0, QR_SIZE - 7],
            ].map(([x, y]) => (
              <g key={`${x}-${y}`}>
                <rect x={x} y={y} width="7" height="7" fill="#111" />
                <rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" />
                <rect x={x + 2} y={y + 2} width="3" height="3" fill="#111" />
              </g>
            ))}
            {QR_CELLS.map(([x, y]) => (
              <rect key={`${x}.${y}`} x={x} y={y} width="1" height="1" fill="#111" />
            ))}
            <rect x={QR_SIZE / 2 - 3} y={QR_SIZE / 2 - 3} width="6" height="6" rx="1.2" fill="#fff" />
            <g transform={`translate(${QR_SIZE / 2 - 2.5} ${QR_SIZE / 2 - 2.5}) scale(0.21)`} fill="#32BCAD">
              <path d="M12 2.5 8.4 6.1a2.6 2.6 0 0 1 1.8.8L12 8.7l1.8-1.8a2.6 2.6 0 0 1 1.8-.8L12 2.5Zm-5.9 5L3.5 10.1a2.7 2.7 0 0 0 0 3.8l2.6 2.6h1.3c.5 0 1-.2 1.3-.5L11 13.7a1.4 1.4 0 0 1 2 0l2.3 2.3c.3.3.8.5 1.3.5h1.3l2.6-2.6a2.7 2.7 0 0 0 0-3.8l-2.6-2.6h-1.3c-.5 0-1 .2-1.3.5L13 10.3a1.4 1.4 0 0 1-2 0L8.7 8c-.3-.3-.8-.5-1.3-.5H6.1Zm2.3 10.4L12 21.5l3.6-3.6a2.6 2.6 0 0 1-1.8-.8L12 15.3l-1.8 1.8a2.6 2.6 0 0 1-1.8.8Z" />
            </g>
          </svg>
        </div>
        <p className="mt-2 text-xs text-neutral-500">Abra o app do seu banco e escaneie o código</p>
      </motion.div>

      <section className="mx-3 mt-3 rounded-xl bg-white p-4">
        <label htmlFor="feirao-pix" className="text-sm font-semibold text-neutral-800">
          Pix copia e cola
        </label>
        <textarea
          id="feirao-pix"
          readOnly
          value={code}
          rows={3}
          onFocus={(e) => e.currentTarget.select()}
          className="mt-2 w-full resize-none break-all rounded-md border border-neutral-200 bg-neutral-50 p-2.5 font-mono text-[11px] leading-4 text-neutral-600"
        />
        <button
          type="button"
          onClick={copy}
          className={`mt-2 flex min-h-12 w-full items-center justify-center gap-2 rounded-md text-sm font-bold text-white transition-colors ${
            copied ? 'bg-[#1FA855]' : 'bg-[#FF5A1F]'
          }`}
        >
          {copied ? <Check className="size-4" strokeWidth={3} /> : <Copy className="size-4" />}
          <span aria-live="polite">{copied ? 'Código copiado!' : 'Copiar código Pix'}</span>
        </button>
      </section>

      <ol className="mx-3 mt-3 space-y-2 rounded-xl bg-white p-4 text-sm text-neutral-700">
        {['Copie o código ou escaneie o QR', 'Pague no app do seu banco', 'A confirmação chega aqui e no seu WhatsApp'].map((t, i) => (
          <li key={t} className="flex items-center gap-2.5">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#FFE9E0] text-xs font-bold text-[#E0400C]">{i + 1}</span>
            {t}
          </li>
        ))}
      </ol>

      <div className="mx-3 mt-4">
        <button
          type="button"
          onClick={onDone}
          className="flex min-h-12 w-full items-center justify-center gap-1 rounded-md border border-neutral-300 bg-white text-sm font-bold text-neutral-800"
        >
          Voltar para a loja <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

