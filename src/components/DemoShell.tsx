import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { products } from '@/data/products';
import { whatsappLink } from '@/data/site';

/**
 * Casco das demos: barra fina da marca no topo + o app.
 * Demos de celular aparecem numa moldura de celular no desktop e em tela cheia no celular.
 */
export function DemoShell({ slug, children }: { slug: string; children: React.ReactNode }) {
  const p = products.find((x) => x.slug === slug)!;
  const bar = (
    <div className="flex h-11 shrink-0 items-center gap-2 bg-navy px-3 text-sm text-white">
      <Link href={`/produtos/${p.slug}`} className="flex items-center gap-1.5 rounded-full px-2 py-1 hover:bg-white/10" aria-label="Voltar para o site">
        <ArrowLeft className="size-4" />
        <span className="font-bold text-sun">Demo</span>
      </Link>
      <span className="truncate text-white/70">{p.name}, dados de exemplo</span>
      <a
        href={whatsappLink(`Oi Jessé! Testei a demo do ${p.name} no seu site e queria um parecido pro meu negócio.`)}
        target="_blank"
        rel="noopener"
        className="ml-auto flex shrink-0 items-center gap-1.5 rounded-full bg-sun px-3 py-1 text-xs font-bold text-navy"
      >
        <WhatsAppIcon className="size-3.5" /> Quero um desse
      </a>
    </div>
  );

  if (p.device === 'desktop') {
    return (
      <div className="flex min-h-dvh flex-col bg-white text-neutral-900">
        <div className="sticky top-0 z-50">{bar}</div>
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-navy md:grid md:place-items-center md:bg-[radial-gradient(circle_at_30%_20%,#0b2c63,#00112e)] md:p-6">
      <div className="flex h-dvh flex-col md:h-[min(860px,94dvh)] md:w-[400px] md:overflow-hidden md:rounded-[2.6rem] md:border-[10px] md:border-neutral-950 md:shadow-2xl">
        {bar}
        {/* transform cria o contexto pros elementos "fixed" do app ficarem dentro da moldura */}
        <div className="relative flex-1 overflow-hidden [transform:translateZ(0)]">
          <div className="absolute inset-0 overflow-y-auto overscroll-contain bg-white text-neutral-900">{children}</div>
        </div>
      </div>
    </div>
  );
}
