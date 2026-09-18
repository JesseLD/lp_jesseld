import Link from 'next/link';
import { Phone } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { categories, productsBy } from '@/data/products';
import { site, whatsappLink } from '@/data/site';

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-sun pb-28 text-navy md:pb-10">
      {/* rampa do cartão de visita */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-24 h-64 w-[34rem] -rotate-[28deg] bg-gold/60" />
      <div className="relative mx-auto max-w-6xl px-4 pt-14">
        <h2 className="max-w-xl font-display text-4xl font-black italic leading-[0.95] tracking-tight md:text-6xl">
          Tem uma ideia rodando na cabeça?
        </h2>
        <p className="mt-4 max-w-md text-lg">
          Me manda do jeito que estiver. Eu te respondo com o que dá pra fazer, o prazo e o valor.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-3 rounded-full bg-navy py-3 pl-6 pr-3 text-lg font-bold text-white hover:bg-navy-soft"
          >
            Fale comigo
            <span className="grid size-9 place-items-center rounded-full bg-white text-navy">
              <WhatsAppIcon className="size-5" />
            </span>
          </a>
          <a href={`tel:+${site.whatsapp}`} className="flex items-center gap-3">
            <Phone className="size-7" />
            <span className="leading-tight">
              <span className="block text-sm">Telefone e WhatsApp</span>
              <span className="block text-xl font-bold">{site.phoneDisplay}</span>
            </span>
          </a>
        </div>

        <div className="mt-14 grid gap-8 border-t-2 border-navy/15 pt-8 text-sm sm:grid-cols-4">
          {categories.map((c) => (
            <div key={c.id}>
              <h3 className="font-bold">{c.plural}</h3>
              <ul className="mt-2 space-y-1.5">
                {productsBy(c.id).map((p) => (
                  <li key={p.slug}>
                    <Link href={`/produtos/${p.slug}`} className="hover:underline">
                      <span className="block font-semibold">{p.name}</span>
                      <span className="block text-navy/65">{p.headline}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="font-bold">{site.name}</h3>
            <p className="mt-2 text-navy/70">
              Desenvolvedor em {site.city}/{site.region}. Atendo o Brasil todo, online.
            </p>
            <div className="mt-2 flex gap-4">
              <a href={site.github} target="_blank" rel="noopener" className="hover:underline">
                GitHub
              </a>
              <a href="/assets/static/Curriculo_Jesse_Oliveira_PT.pdf" className="hover:underline">
                Currículo (PDF)
              </a>
            </div>
          </div>
        </div>
        <p className="mt-10 text-xs text-navy/60">© {new Date().getFullYear()} {site.name}</p>
      </div>
    </footer>
  );
}
