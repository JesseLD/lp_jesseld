import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/cn';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('flex items-center gap-2.5', className)} aria-label="Jessé Oliveira, página inicial">
      <Image src="/brand/logo-circle.png" alt="" width={40} height={40} priority className="size-9 md:size-10" />
      <span className="leading-none">
        <span className="block font-display text-[1.05rem] font-bold tracking-tight text-sun">Jessé Oliveira</span>
        <span className="mt-1 block text-[0.62rem] tracking-[0.14em] text-mist">SITES, SISTEMAS E APLICATIVOS</span>
      </span>
    </Link>
  );
}
