import type { Metadata } from 'next';
import Link from 'next/link';
import { AceitoJesus } from '@/components/AceitoJesus';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { site, whatsappLink } from '@/data/site';

export const metadata: Metadata = {
  title: 'Jesus',
  description:
    'Sou cristão, e essa página é o motivo. O que eu creio sobre Jesus, por que isso muda tudo e o que você pode fazer com isso hoje.',
  alternates: { canonical: '/jesus' },
};

function Verse({ cite, children }: { cite: string; children: React.ReactNode }) {
  return (
    <figure className="my-8 border-l-4 border-sun pl-5">
      <blockquote className="font-display text-xl leading-snug text-white md:text-2xl">{children}</blockquote>
      <figcaption className="mt-2 text-sm font-bold text-sun">{cite}</figcaption>
    </figure>
  );
}

export default function JesusPage() {
  return (
    <div className="bg-navy-deep">
      <article className="mx-auto max-w-2xl px-4 pb-20 pt-12 text-lg leading-relaxed text-white/85">
        <p className="text-mist">A parte do site que não é sobre trabalho</p>
        <h1 className="mt-3 font-display text-5xl font-black italic leading-none tracking-tight text-sun md:text-7xl">
          Jesus.
        </h1>
        <p className="mt-6 text-xl text-white">
          Eu sou cristão. Isso não é um detalhe da minha vida, é o centro dela, e por isso não daria pra ter um site meu
          sem essa página. Se você chegou aqui procurando um orçamento, tudo bem seguir pro resto do site. Mas se quiser
          saber o que eu creio, é isso aqui.
        </p>

        <p className="mt-4">
          Eu venho de família cristã e cresci dentro da igreja. Hoje toco guitarra há alguns anos na{' '}
          <strong className="text-white">Igreja Pentecostal do Salvador</strong>, no Guaibim. É o que eu faço quando
          não estou no código: subir no palco pra tocar pra Ele.
        </p>

        <h2 className="mt-12 font-display text-3xl font-extrabold tracking-tight text-white">
          Começa com uma notícia ruim
        </h2>
        <p className="mt-4">
          A Bíblia diz que todo mundo erra. Não é sobre ser uma pessoa pior que as outras, é sobre ninguém conseguir
          alcançar Deus pelo próprio esforço. A régua não é o seu vizinho, é o próprio Deus.
        </p>
        <Verse cite="Romanos 3:23">
          Pois todos pecaram e carecem da glória de Deus.
        </Verse>
        <p>
          E isso tem preço. Não é multa, nem susto: é separação de Deus, agora e pra sempre.
        </p>
        <Verse cite="Romanos 6:23">
          Porque o salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna em Cristo Jesus, nosso
          Senhor.
        </Verse>

        <h2 className="mt-12 font-display text-3xl font-extrabold tracking-tight text-white">
          Aí entra a notícia boa
        </h2>
        <p className="mt-4">
          Deus não esperou você melhorar pra te amar. Ele mandou o próprio Filho pagar uma conta que era sua. Jesus
          viveu sem pecado, morreu na cruz no seu lugar e ressuscitou no terceiro dia.
        </p>
        <Verse cite="Romanos 5:8">
          Mas Deus demonstra seu amor por nós: Cristo morreu em nosso favor quando ainda éramos pecadores.
        </Verse>
        <p>
          Repara numa coisa: a Bíblia chama isso de <strong className="text-white">presente</strong>. Presente não se
          paga, não se merece e não se parcela. Só se recebe.
        </p>
        <Verse cite="Efésios 2:8-9">
          Pois vocês são salvos pela graça, por meio da fé, e isto não vem de vocês, é dom de Deus; não por obras, para
          que ninguém se glorie.
        </Verse>

        <h2 className="mt-12 font-display text-3xl font-extrabold tracking-tight text-white">
          Como receber isso
        </h2>
        <p className="mt-4">
          Não tem ritual, nem fila, nem valor mínimo. Tem uma decisão: crer de coração e assumir com a boca.
        </p>
        <Verse cite="Romanos 10:9">
          Se você confessar com a sua boca que Jesus é Senhor e crer em seu coração que Deus o ressuscitou dentre os
          mortos, será salvo.
        </Verse>
        <p>Se quiser fazer isso agora, pode falar com Deus com as suas palavras mesmo. Se ajudar, ora assim:</p>
        <div className="cut-tr my-8 bg-navy-soft p-6 text-white">
          <p className="font-display text-xl italic leading-snug md:text-2xl">
            &ldquo;Senhor Jesus, eu reconheço que errei e que preciso de Ti. Eu creio que Tu morreste por mim e
            ressuscitaste. Hoje eu Te entrego a minha vida e Te aceito como meu Salvador e Senhor. Obrigado por me
            perdoar. Amém.&rdquo;
          </p>
        </div>
        <p>
          Se você orou isso de coração, não foi uma frase bonita: foi o começo de uma vida nova. E eu queria muito
          saber.
        </p>

        <AceitoJesus />

        <h2 className="mt-12 font-display text-3xl font-extrabold tracking-tight text-white">E agora?</h2>
        <ol className="mt-4 space-y-4">
          <li>
            <strong className="text-white">Conversa com Deus todo dia.</strong> Oração não é discurso, é conversa. Fala
            do seu dia, do medo, do que você não entende.
          </li>
          <li>
            <strong className="text-white">Começa a ler a Bíblia pelo evangelho de João.</strong> São 21 capítulos, e é
            o melhor lugar pra conhecer quem é Jesus.
          </li>
          <li>
            <strong className="text-white">Procura uma igreja que ensine a Bíblia.</strong> Ninguém cresce sozinho, e
            você vai precisar de gente por perto.
          </li>
        </ol>
        <p className="mt-6">
          Se você mora no Guaibim ou vai passar um fim de semana por lá, aparece na minha:{' '}
          <strong className="text-white">Igreja Pentecostal do Salvador</strong>, na avenida principal, sentido a
          praça. Pode chegar do jeito que você está. Me avisa que eu te encontro lá, e sou o da guitarra.
        </p>

        <div className="mt-12 border-t border-white/15 pt-8">
          <p className="text-white">
            Se você decidiu seguir Jesus hoje, ou se ficou com dúvida, ou se só quer desabafar e pedir oração, me chama.
            Eu respondo, e o que você falar fica entre a gente.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={whatsappLink('Oi Jessé! Vi a página sobre Jesus no seu site e queria conversar.')}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full bg-sun px-6 py-3.5 font-bold text-navy hover:bg-white"
            >
              <WhatsAppIcon className="size-5" /> Falar comigo
            </a>
            <Link
              href="/"
              className="inline-flex items-center rounded-full border-2 border-white/25 px-6 py-3 font-bold hover:border-sun hover:text-sun"
            >
              Voltar pro site
            </Link>
          </div>
          <p className="mt-8 text-sm text-mist">
            {site.name} — {site.city}/{site.region}. Essa página não tem formulário nem cadastro: é só uma conversa.
          </p>
        </div>
      </article>
    </div>
  );
}
