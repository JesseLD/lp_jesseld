import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, Check, Play } from 'lucide-react';
import { Device } from '@/components/Device';
import { ProductCard, openLabel } from '@/components/ProductCard';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { categoryOf, products } from '@/data/products';
import { site, whatsappLink } from '@/data/site';
import { JsonLd } from '@/lib/jsonld';

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

const find = (slug: string) => products.find((p) => p.slug === slug);

export async function generateMetadata(props: PageProps<'/produtos/[slug]'>): Promise<Metadata> {
  const p = find((await props.params).slug);
  if (!p) return {};
  return {
    title: `${p.name}: ${p.headline}`,
    description: p.summary,
    alternates: { canonical: `/produtos/${p.slug}` },
  };
}

export default async function ProdutoPage(props: PageProps<'/produtos/[slug]'>) {
  const p = find((await props.params).slug);
  if (!p) notFound();
  const cat = categoryOf(p.category);
  const external = p.kind === 'real';
  const others = products.filter((o) => o.slug !== p.slug && o.category === p.category).concat(
    products.filter((o) => o.category !== p.category),
  ).slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: `${p.name} — ${p.headline}`,
          serviceType: cat.label,
          description: p.summary,
          audience: { '@type': 'Audience', audienceType: p.audience },
          provider: { '@type': 'ProfessionalService', name: site.name, url: site.url },
          url: `${site.url}/produtos/${p.slug}`,
        }}
      />
      <section className="overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-8 md:grid-cols-2 md:items-center md:pt-14">
          <div>
            <nav aria-label="Você está em" className="text-sm text-mist">
              <Link href="/produtos" className="hover:text-sun">Produtos</Link>
              <span className="mx-2">/</span>
              <Link href={`/produtos#${p.category === 'app' ? 'aplicativos' : p.category + 's'}`} className="hover:text-sun">{cat.plural}</Link>
            </nav>
            <h1 className="mt-4 font-display text-5xl font-black italic leading-none tracking-tight text-sun md:text-7xl">{p.name}</h1>
            <p className="mt-3 font-display text-2xl font-medium tracking-tight">{p.headline}</p>
            <p className="mt-5 max-w-lg text-lg text-white/85">{p.summary}</p>
            <p className="mt-4 text-mist">
              <strong className="text-white">Pra quem:</strong> {p.audience}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={p.url}
                {...(external ? { target: '_blank', rel: 'noopener' } : {})}
                className="inline-flex items-center gap-2 rounded-full bg-sun px-6 py-3.5 font-bold text-navy hover:bg-white"
              >
                {external ? <ArrowUpRight className="size-5" /> : <Play className="size-5 fill-current" />}
                {openLabel(p)}
              </a>
              <a
                href={whatsappLink(`Oi Jessé! Vi o ${p.name} (${p.headline.toLowerCase()}) no seu site e queria um parecido pro meu negócio.`)}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/25 px-6 py-3 font-bold hover:border-sun hover:text-sun"
              >
                <WhatsAppIcon className="size-5" /> Quero um desse
              </a>
            </div>
            {!external && (
              <p className="mt-4 text-sm text-mist">A demo usa dados de exemplo. Pode clicar em tudo, nada é salvo.</p>
            )}
          </div>

          <div className="cut-tr relative grid min-h-[26rem] place-items-center p-8" style={{ backgroundColor: p.tint }}>
            {p.device === 'phone' ? (
              <Device product={p} className="w-56" priority />
            ) : (
              <Device product={p} className="w-full" priority />
            )}
          </div>
        </div>
      </section>

      <section className="bg-navy-deep py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-3xl font-extrabold tracking-tight">O que ele faz</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {p.features.map((f) => (
              <li key={f} className="flex gap-3 rounded-xl bg-navy-soft p-4">
                <Check className="mt-0.5 size-5 shrink-0 text-sun" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-shelf py-14 text-navy">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-3xl font-extrabold tracking-tight">Veja também</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <ProductCard key={o.slug} product={o} className="shadow-[0_18px_40px_-24px_rgba(0,29,73,.45)]" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
