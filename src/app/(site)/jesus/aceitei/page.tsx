import type { Metadata } from 'next';
import Link from 'next/link';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { whatsappLink } from '@/data/site';

export const metadata: Metadata = {
  title: 'Você faz parte da família',
  robots: { index: false, follow: true },
};

export default function AceiteiPage() {
  return (
    <div className="bg-navy-deep">
      <article className="mx-auto max-w-2xl px-4 pb-20 pt-14 text-lg leading-relaxed text-white/85">
        <h1 className="font-display text-4xl font-black italic leading-none tracking-tight text-sun md:text-6xl">
          Você agora faz parte do Corpo de Cristo!
        </h1>
        <p className="mt-6 text-xl text-white">
          Isso que você acabou de fazer é uma confissão de fé. Diante da Palavra de Deus, eu creio que o Senhor Jesus
          também vai te confessar diante do Pai. Amém!
        </p>
        <p className="mt-6">
          Hoje o céu está em festa por você. Não foi sentimento, não foi sorte: foi Deus te chamando, e você
          respondendo.
        </p>

        <h2 className="mt-12 font-display text-3xl font-extrabold tracking-tight text-white">Seus primeiros passos</h2>
        <ol className="mt-4 space-y-4">
          <li>
            <strong className="text-white">Fala com Deus hoje mesmo.</strong> Com as suas palavras, do jeito que você
            fala comigo. Ele entende.
          </li>
          <li>
            <strong className="text-white">Lê o evangelho de João.</strong> Um capítulo por dia dá menos de um mês.
          </li>
          <li>
            <strong className="text-white">Conta pra alguém.</strong> Nem que seja pra mim. Decisão que se fala em voz
            alta cria raiz.
          </li>
          <li>
            <strong className="text-white">Procura uma igreja que ensine a Bíblia.</strong> Se você estiver pelo
            Guaibim, aparece na Igreja Pentecostal do Salvador, na avenida principal, sentido a praça. Eu estou lá, na
            guitarra.
          </li>
        </ol>

        <div className="mt-12 flex flex-wrap gap-3 border-t border-white/15 pt-8">
          <a
            href={whatsappLink('Oi Jessé! Eu aceitei Jesus pelo seu site hoje.')}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-full bg-sun px-6 py-3.5 font-bold text-navy hover:bg-white"
          >
            <WhatsAppIcon className="size-5" /> Me contar isso
          </a>
          <Link
            href="/jesus"
            className="inline-flex items-center rounded-full border-2 border-white/25 px-6 py-3 font-bold hover:border-sun hover:text-sun"
          >
            Voltar pra página
          </Link>
        </div>
      </article>
    </div>
  );
}
