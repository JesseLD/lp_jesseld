import Image from 'next/image';
import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { Shelf } from '@/components/Shelf';
import { whatsappLink } from '@/data/site';

const steps = [
  {
    title: 'Você me chama no WhatsApp',
    text: 'Conta o que precisa do jeito que estiver, pode ser áudio. Eu te respondo com o que dá pra fazer, prazo e valor.',
  },
  {
    title: 'Eu construo e você acompanha',
    text: 'Você recebe um link pra ver o projeto andando e pedir ajuste antes de ficar pronto, não depois.',
  },
  {
    title: 'Coloco no ar e continuo por perto',
    text: 'Cuido do domínio, da hospedagem e do suporte depois da entrega. Deu problema, você fala comigo direto.',
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />

      <section id="produtos" className="scroll-mt-20 bg-shelf py-16 text-navy md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-4xl font-black italic tracking-tight md:text-5xl">
                Abre, testa, mexe.
              </h2>
              <p className="mt-3 max-w-xl text-lg text-navy/75">
                Cada produto aqui é uma demo que funciona ou um projeto que está no ar com cliente de verdade. Viu um parecido com o que você precisa? Eu adapto pro seu negócio.
              </p>
            </div>
            <Link href="/produtos" className="font-bold underline decoration-sun decoration-4 underline-offset-4 hover:decoration-navy">
              Ver todos com detalhes
            </Link>
          </div>
          <div className="mt-8">
            <Shelf />
          </div>
        </div>
      </section>

      <section id="como-funciona" className="scroll-mt-20 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-4xl font-black italic tracking-tight md:text-5xl">Como funciona</h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="cut-tr relative bg-navy-soft p-6 pt-5">
                <span className="font-display text-6xl font-black italic text-sun">{i + 1}</span>
                <h3 className="mt-2 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-white/75">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="sobre" className="scroll-mt-20 bg-navy-deep py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-[0.8fr_1.2fr]">
          <div className="cut-tr relative mx-auto aspect-[4/5] w-full max-w-sm bg-sun p-[6px]">
            <div className="cut-tr relative size-full overflow-hidden bg-[linear-gradient(160deg,#0b2c63,#001d49)]">
              <Image src="/brand/jesse-celular.webp" alt="Jessé Oliveira de suéter preto, sorrindo enquanto mexe no celular" fill sizes="(max-width: 768px) 90vw, 384px" className="object-cover object-top" />
            </div>
          </div>
          <div>
            <h2 className="font-display text-4xl font-black italic tracking-tight md:text-5xl">Prazer, Jessé.</h2>
            <div className="mt-5 max-w-xl space-y-4 text-lg text-white/85">
              <p>
                Sou de Valença/BA e é daqui que eu construo sites, sistemas e aplicativos. Tenho mais de 3 anos no mercado. Já fiz sistema de cobrança pra prefeitura, votação online com milhares de votos em tempo real e app de gestão que roda em igrejas toda semana.
              </p>
              <p>
                Hoje eu atendo direto. Você fala comigo, não com um atendente, e quem constrói é a mesma pessoa que vai te ajudar quando precisar mexer em alguma coisa.
              </p>
              <p>
                Trabalho com React, Next.js, Laravel, Flutter e o que mais o projeto pedir.
              </p>
              <p>
                Ah, e sou cristão. Se quiser saber o que eu creio,{' '}
                <Link href="/jesus" className="font-bold text-sun underline decoration-2 underline-offset-4 hover:text-white">
                  escrevi aqui
                </Link>
                .
              </p>
            </div>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener"
              className="mt-8 inline-flex rounded-full bg-sun px-6 py-3.5 font-bold text-navy hover:bg-white"
            >
              Conversar sobre meu projeto
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
