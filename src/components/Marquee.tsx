import { products } from '@/data/products';

/** Faixa amarela correndo com os produtos reais — o "letreiro" da loja */
export function Marquee() {
  const items = products.map((p) => p.headline);
  const row = (hidden?: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-6 pr-6 font-display text-lg font-bold italic md:text-xl">
          {t}
          <svg viewBox="0 0 12 16" className="h-3.5 fill-navy" aria-hidden="true"><path d="M0 0l12 8-12 8 4-8z" /></svg>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-x-clip py-2">
    <div className="-rotate-1 overflow-hidden border-y-4 border-navy bg-sun py-3 text-navy">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {row()}
        {row(true)}
      </div>
    </div>
    </div>
  );
}
