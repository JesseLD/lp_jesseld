import Image from 'next/image';
import { cn } from '@/lib/cn';
import type { Product } from '@/data/products';

/** Moldura de celular ou navegador com o print do produto */
export function Device({ product, className, priority }: { product: Product; className?: string; priority?: boolean }) {
  const src = `/shots/${product.slug}.png`;
  const alt = `Tela do ${product.name}: ${product.headline.toLowerCase()}`;

  if (product.device === 'phone') {
    return (
      <div className={cn('relative aspect-[9/19] w-full rounded-[2rem] bg-navy-deep p-[7px] shadow-2xl ring-1 ring-white/10', className)}>
        <div className="relative size-full overflow-hidden rounded-[1.6rem] bg-navy-deep">
          {/* barra de status: o notch não cobre o topo do app */}
          <div className="absolute inset-x-0 bottom-0 top-[7%]">
            <Image src={src} alt={alt} fill sizes="(max-width: 768px) 60vw, 280px" className="object-cover object-top" priority={priority} />
          </div>
        </div>
        <span aria-hidden="true" className="absolute left-1/2 top-[3.2%] h-[2.2%] w-[34%] -translate-x-1/2 rounded-full bg-navy-deep" />
      </div>
    );
  }

  return (
    <div className={cn('w-full overflow-hidden rounded-xl bg-navy-deep shadow-2xl ring-1 ring-white/10', className)}>
      <div aria-hidden="true" className="flex items-center gap-1.5 px-3 py-2">
        <span className="size-2 rounded-full bg-white/25" />
        <span className="size-2 rounded-full bg-white/25" />
        <span className="size-2 rounded-full bg-white/25" />
        <span className="ml-2 h-3.5 flex-1 rounded-full bg-white/10" />
      </div>
      <div className="relative aspect-[16/10] bg-white">
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 90vw, 560px" className="object-cover object-top" priority={priority} />
      </div>
    </div>
  );
}
