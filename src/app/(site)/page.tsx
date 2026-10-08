import Image from 'next/image';
import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { Shelf } from '@/components/Shelf';
import { whatsappLink } from '@/data/site';

const steps = [
  {
    title: 'Você me chama no WhatsApp',
    text: 'Conta o que precisa do jeito que estiver, pode ser áudio. Eu respondo o que dá pra fazer, o prazo e o valor.',
  },
  {
    title: 'Eu construo e você acompanha',
    text: 'Você recebe um link pra ver o projeto andando e pedir ajuste no meio do caminho, não só no fim.',
  },
  {
    title: 'Coloco no ar e continuo por perto',
    text: 'Cuido do domínio e da hospedagem. Depois da entrega, se precisar mexer em alguma coisa, é só me chamar.',
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
                Abre e testa.
              </h2>
              <p className="mt-3 max-w-xl text-lg text-navy/75">
                Uns são demos que montei pra você mexer à vontade, outros são projetos que estão no ar. Se algum parecer com o que você precisa, dá pra adaptar.
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
                Sou de Valença/BA e trabalho com sites, sistemas e aplicativos desde 2023. Os projetos que mais me ensinaram até aqui foram um sistema de cobrança pra prefeitura, uma plataforma de votação online e um app de gestão usado toda semana em igrejas.
              </p>
              <p>
                Trabalho sozinho. Quem conversa com você é quem escreve o código, o que tem o lado bom de não ter intermediário e o limite de eu pegar poucos projetos por vez.
              </p>
              <p>
                Uso React, Next.js, Laravel e Flutter. Se o seu projeto pedir outra coisa, eu falo.
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
