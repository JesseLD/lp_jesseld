import type { Metadata } from 'next';
import { ProductCard } from '@/components/ProductCard';
import { categories, productsBy } from '@/data/products';

export const metadata: Metadata = {
  title: 'Produtos: aplicativos, sites e sistemas',
  description:
    'Aplicativo de barbearia, gestão de escolinha, loja online, site institucional, portal de notícias e sistema de garçom. Demos pra testar e projetos no ar.',
  alternates: { canonical: '/produtos' },
};

const anchor = { app: 'aplicativos', site: 'sites', sistema: 'sistemas' } as const;

export default function ProdutosPage() {
  return (
    <div className="bg-shelf pb-20 text-navy">
      <div className="mx-auto max-w-6xl px-4 pt-12">
        <h1 className="font-display text-5xl font-black italic tracking-tight md:text-6xl">Produtos</h1>
        <p className="mt-3 max-w-xl text-lg text-navy/75">
          Tudo aqui pode ser adaptado pro seu negócio: nome, cores, funções e preço do jeito que você trabalha.
        </p>
        <nav aria-label="Categorias" className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <a key={c.id} href={`#${anchor[c.id]}`} className="rounded-full border-2 border-navy/15 px-4 py-2 text-sm font-bold hover:border-navy">
              {c.plural}
            </a>
          ))}
        </nav>

        {categories.map((c) => (
          <section key={c.id} id={anchor[c.id]} className="scroll-mt-24 pt-14">
            <h2 className="font-display text-3xl font-extrabold tracking-tight">{c.plural}</h2>
            <p className="mt-1 text-navy/70">{c.blurb}</p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {productsBy(c.id).map((p) => (
                <ProductCard key={p.slug} product={p} className="shadow-[0_18px_40px_-24px_rgba(0,29,73,.45)]" />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
