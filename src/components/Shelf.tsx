'use client';

import { useState } from 'react';
import { categories, products, type Category } from '@/data/products';
import { ProductCard } from './ProductCard';
import { cn } from '@/lib/cn';

/** Vitrine com as "categorias" da loja e prateleira deslizável */
export function Shelf() {
  const [active, setActive] = useState<Category | 'all'>('all');
  const list = active === 'all' ? products : products.filter((p) => p.category === active);
  const tabs = [{ id: 'all' as const, label: 'Todos' }, ...categories.map((c) => ({ id: c.id, label: c.plural }))];

  return (
    <div>
      <div role="tablist" aria-label="Categorias" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={active === t.id}
            onClick={() => setActive(t.id)}
            className={cn(
              'shrink-0 rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors',
              active === t.id ? 'border-navy bg-navy text-sun' : 'border-navy/15 text-navy hover:border-navy',
            )}
          >
            {t.label}
            <span className="ml-1.5 opacity-60">
              {t.id === 'all' ? products.length : products.filter((p) => p.category === t.id).length}
            </span>
          </button>
        ))}
      </div>

      <div className="no-scrollbar -mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-3">
        {list.map((p) => (
          <ProductCard
            key={p.slug}
            product={p}
            className="w-[80vw] max-w-[320px] shrink-0 snap-start shadow-[0_18px_40px_-24px_rgba(0,29,73,.45)] md:w-auto md:max-w-none"
          />
        ))}
      </div>
    </div>
  );
}
