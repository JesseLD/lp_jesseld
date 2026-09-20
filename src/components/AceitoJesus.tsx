'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { whatsappLink } from '@/data/site';

/**
 * Botão de decisão + formulário de pedido de oração.
 * O nome e o pedido vão pra um armazenamento privado que só o Jessé lê.
 */
export function AceitoJesus() {
  const router = useRouter();
  const dialogo = useRef<HTMLDialogElement>(null);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    router.prefetch('/jesus/aceitei');
  }, [router]);

  function abrir() {
    setErro('');
    dialogo.current?.showModal();
  }

  async function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const dados = new FormData(evento.currentTarget);
    setEnviando(true);
    setErro('');
    try {
      const resposta = await fetch('/api/oracao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: dados.get('nome'), pedido: dados.get('pedido') }),
      });
      if (!resposta.ok) {
        const corpo = await resposta.json().catch(() => ({}));
        setErro(corpo.erro ?? 'Não consegui enviar agora. Tenta de novo?');
        setEnviando(false);
        return;
      }
      router.push('/jesus/aceitei');
    } catch {
      setErro('Sua internet caiu no meio do caminho. Tenta de novo?');
      setEnviando(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={abrir}
        className="mt-8 w-full rounded-2xl bg-sun px-6 py-5 font-display text-2xl font-black italic tracking-tight text-navy hover:bg-white md:text-3xl"
      >
        Eu aceito Jesus como meu Salvador!
      </button>

      <dialog
        ref={dialogo}
        aria-labelledby="titulo-decisao"
        className="m-auto w-[min(32rem,92vw)] rounded-2xl bg-white p-0 text-navy backdrop:bg-navy-deep/80 backdrop:backdrop-blur-sm"
      >
        <form onSubmit={enviar} className="p-6 text-base md:p-8">
          <h2 id="titulo-decisao" className="font-display text-3xl font-black italic leading-tight tracking-tight">
            Você agora faz parte do Corpo de Cristo!
          </h2>
          <p className="mt-3 text-navy/80">
            Esse é um ato de confissão de fé. Diante da Palavra de Deus, eu creio que o Senhor Jesus também vai te
            confessar diante do Pai. Amém!
          </p>

          <hr className="my-6 border-navy/15" />

          <h3 className="font-display text-xl font-extrabold tracking-tight">
            Posso anotar seu nome pra orar por você?
          </h3>

          <label htmlFor="nome" className="mt-4 block font-bold">
            Seu nome
          </label>
          <input
            id="nome"
            name="nome"
            required
            maxLength={80}
            autoComplete="given-name"
            className="mt-1.5 w-full rounded-xl border-2 border-navy/20 px-4 py-3 focus:border-navy focus:outline-none"
          />

          <label htmlFor="pedido" className="mt-4 block font-bold">
            Algum pedido de oração especial? <span className="font-normal text-navy/55">(opcional)</span>
          </label>
          <textarea
            id="pedido"
            name="pedido"
            rows={4}
            maxLength={1000}
            className="mt-1.5 w-full rounded-xl border-2 border-navy/20 px-4 py-3 focus:border-navy focus:outline-none"
          />

          {erro && (
            <div role="alert" className="mt-4 rounded-xl bg-[#B3121B]/10 p-4">
              <p className="font-bold text-[#B3121B]">{erro}</p>
              <p className="mt-2 text-sm text-navy/75">
                Sua decisão continua valendo, ela não depende deste formulário.{' '}
                <a
                  href={whatsappLink('Oi Jessé! Eu aceitei Jesus pelo seu site e queria que você orasse por mim.')}
                  target="_blank"
                  rel="noopener"
                  className="font-bold underline underline-offset-4"
                >
                  Me manda no WhatsApp
                </a>{' '}
                ou segue em frente.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={enviando}
            className="mt-6 w-full rounded-full bg-navy px-6 py-4 font-bold text-white hover:bg-navy-soft disabled:opacity-60"
          >
            {enviando ? 'Enviando…' : 'Quero que você ore por mim!'}
          </button>

          <button
            type="button"
            onClick={() => router.push('/jesus/aceitei')}
            className="mx-auto mt-4 block underline underline-offset-4 hover:text-navy-soft"
          >
            {erro ? 'Seguir em frente' : 'Não precisa, obrigado(a)'}
          </button>

          <p className="mt-6 text-sm text-navy/60">
            Não peço e-mail nem telefone, e não vendo nada. O que você escrever fica comigo, só pra oração.
          </p>
        </form>
      </dialog>
    </>
  );
}
