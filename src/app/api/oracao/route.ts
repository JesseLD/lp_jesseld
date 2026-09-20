import { salvarOracao } from '@/lib/oracoes';

export async function POST(request: Request) {
  let corpo: unknown;
  try {
    corpo = await request.json();
  } catch {
    return Response.json({ erro: 'Envio inválido.' }, { status: 400 });
  }

  const { nome, pedido } = (corpo ?? {}) as { nome?: unknown; pedido?: unknown };
  const nomeLimpo = typeof nome === 'string' ? nome.trim().slice(0, 80) : '';
  const pedidoLimpo = typeof pedido === 'string' ? pedido.trim().slice(0, 1000) : '';

  if (nomeLimpo.length < 2) {
    return Response.json({ erro: 'Escreve seu nome pra eu poder orar por você.' }, { status: 400 });
  }

  try {
    await salvarOracao(nomeLimpo, pedidoLimpo);
    return Response.json({ ok: true });
  } catch (erro) {
    console.error('Falha ao salvar pedido de oração', erro);
    return Response.json({ erro: 'Não consegui salvar agora. Tenta de novo?' }, { status: 500 });
  }
}
