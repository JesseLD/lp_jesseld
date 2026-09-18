import Link from 'next/link';
import { ArrowUpRight, Play } from 'lucide-react';
import { Device } from './Device';
import { categoryOf, type Product } from '@/data/products';
import { cn } from '@/lib/cn';

export function openLabel(p: Product) {
  return p.kind === 'demo' ? 'Testar a demo' : 'Visitar o site';
}

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const external = product.kind === 'real';
  return (
    <article className={cn('group flex flex-col overflow-hidden rounded-2xl bg-white text-navy', className)}>
      <Link
        href={`/produtos/${product.slug}`}
        aria-label={`Ver detalhes do ${product.name}`}
        className="relative block h-72 overflow-hidden"
        style={{ backgroundColor: product.tint }}
      >
        <span
          className={cn(
            'absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-xs font-bold',
            external ? 'bg-white text-navy' : 'bg-sun text-navy',
          )}
        >
          {external ? '● No ar com cliente' : 'Demo pra testar'}
        </span>
        {product.device === 'phone' ? (
          <Device
            product={product}
            className="absolute left-1/2 top-12 w-36 -translate-x-1/2 transition-transform duration-500 group-hover:-translate-y-2"
          />
        ) : (
          <Device
            product={product}
            className="absolute left-5 top-14 w-[125%] transition-transform duration-500 group-hover:-translate-y-2"
          />
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm text-navy/60">{categoryOf(product.category).label}</p>
        <h3 className="mt-0.5 font-display text-2xl font-extrabold tracking-tight">{product.name}</h3>
        <p className="mt-1 font-medium">{product.headline}</p>
        <p className="mt-2 text-sm text-navy/65">{product.audience}</p>
        <div className="mt-auto flex items-center gap-2 pt-5">
          <a
            href={product.url}
            {...(external ? { target: '_blank', rel: 'noopener' } : {})}
            className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-navy px-4 py-2.5 text-sm font-bold text-white hover:bg-navy-soft"
          >
            {external ? <ArrowUpRight className="size-4" /> : <Play className="size-4 fill-current" />}
            {openLabel(product)}
          </a>
          <Link
            href={`/produtos/${product.slug}`}
            className="whitespace-nowrap rounded-full border-2 border-navy/15 px-4 py-2 text-sm font-bold hover:border-navy"
          >
            Detalhes
          </Link>
        </div>
      </div>
    </article>
  );
}
