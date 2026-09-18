'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Device } from './Device';
import { WhatsAppIcon } from './WhatsAppIcon';
import { products, type Category } from '@/data/products';
import { site, whatsappLink } from '@/data/site';

const words: { word: string; category: Category; slug: string }[] = [
  { word: 'SITES', category: 'site', slug: 'loja-online' },
  { word: 'SISTEMAS', category: 'sistema', slug: 'sistema-garcom' },
  { word: 'APPS', category: 'app', slug: 'barbearia' },
];

const bySlug = (slug: string) => products.find((p) => p.slug === slug)!;

export function Hero() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % words.length), 3200);
    return () => clearInterval(t);
  }, [reduce]);

  const current = words[i];
  const product = bySlug(current.slug);

  return (
    <section className="relative overflow-hidden">
      {/* Rampas amarelas do cartão de visita */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%]">
        <div className="absolute bottom-0 right-0 h-full w-full bg-sun [clip-path:polygon(100%_0,100%_100%,30%_100%)] md:[clip-path:polygon(100%_10%,100%_100%,45%_100%)]" />
        <div className="absolute bottom-0 right-0 h-full w-full bg-gold [clip-path:polygon(55%_62%,100%_100%,20%_100%)] md:[clip-path:polygon(62%_60%,100%_100%,38%_100%)]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-10 md:grid-cols-[1.1fr_1fr] md:items-center md:pb-28 md:pt-16">
        <div>
          <p className="text-mist">Dev em {site.city}/{site.region}, atendendo o Brasil todo</p>

          <h1 className="mt-3">
            <span className="sr-only">Sites, sistemas e aplicativos sob medida para o seu negócio</span>
            <span aria-hidden="true" className="relative block h-[0.95em] overflow-hidden font-display text-[clamp(3.6rem,17vw,8.5rem)] font-black italic leading-none tracking-tight text-sun">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={current.word}
                  className="block pr-[0.1em]"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '-100%' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                >
                  {current.word}
                </motion.span>
              </AnimatePresence>
            </span>
            <span aria-hidden="true" className="mt-2 block font-display text-[clamp(1.6rem,6.5vw,2.4rem)] font-medium leading-tight tracking-tight">
              <svg viewBox="0 0 12 16" className="mr-3 inline h-[0.55em] fill-sun align-[0.05em]"><path d="M0 0l12 8-12 8 4-8z" /></svg>
              sob medida pro seu negócio
            </span>
          </h1>

          <p className="mt-6 max-w-md text-lg text-white/85">{site.pitch}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full bg-sun px-6 py-3.5 font-bold text-navy hover:bg-white"
            >
              <WhatsAppIcon className="size-5" /> Pedir orçamento
            </a>
            <Link
              href="#produtos"
              className="inline-flex items-center rounded-full border-2 border-white/25 px-6 py-3 font-bold hover:border-sun hover:text-sun"
            >
              Explorar os produtos
            </Link>
          </div>
        </div>

        {/* Jessé na frente do painel amarelo angulado do post, com o produto do momento ao lado */}
        <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
          <div aria-hidden="true" className="cut-tr absolute inset-x-[6%] bottom-0 top-[16%] bg-sun">
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gold [clip-path:polygon(0_45%,100%_0,100%_100%,0_100%)]" />
          </div>
          <Image
            src="/brand/jesse-hero.webp"
            alt="Jessé Oliveira de blazer azul, sorrindo, com um celular e um tablet na mão"
            width={815}
            height={1300}
            priority
            sizes="(max-width: 768px) 80vw, 400px"
            className="absolute bottom-0 left-[52%] h-full w-auto max-w-none -translate-x-1/2 drop-shadow-[0_20px_30px_rgba(0,17,46,.35)]"
          />
          <Link
            href={`/produtos/${product.slug}`}
            aria-label={`Ver o ${product.name}: ${product.headline.toLowerCase()}`}
            className="absolute bottom-[6%] left-0 w-[30%] md:-left-[6%]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={product.slug}
                initial={reduce ? false : { opacity: 0, y: 16, rotate: -6 }}
                animate={{ opacity: 1, y: 0, rotate: -6 }}
                exit={{ opacity: 0, y: -16, rotate: -6 }}
                transition={{ duration: 0.35 }}
              >
                <Device product={product} priority />
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-navy-deep px-3 py-1 text-xs font-bold text-sun ring-2 ring-sun">
                  {product.name}
                </span>
              </motion.div>
            </AnimatePresence>
          </Link>
        </div>
      </div>
    </section>
  );
}
