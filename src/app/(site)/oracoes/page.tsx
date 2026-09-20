import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { listarOracoes } from '@/lib/oracoes';

export const metadata: Metadata = { title: 'Pedidos de oração', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

const COOKIE = 'oracoes';

async function entrar(formData: FormData) {
  'use server';
  const senha = String(formData.get('senha') ?? '');
  if (senha && senha === process.env.ORACOES_SENHA) {
    (await cookies()).set(COOKIE, senha, { httpOnly: true, sameSite: 'lax', secure: true, maxAge: 60 * 60 * 24 * 30 });
  }
}

const dataHora = (iso: string) =>
  new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short', timeZone: 'America/Bahia' }).format(
    new Date(iso),
  );

export default async function OracoesPage() {
  const senhaConfigurada = process.env.ORACOES_SENHA;
  const autorizado = senhaConfigurada && (await cookies()).get(COOKIE)?.value === senhaConfigurada;

  if (!autorizado) {
    return (
      <div className="mx-auto max-w-sm px-4 py-20">
        <h1 className="font-display text-3xl font-extrabold tracking-tight">Pedidos de oração</h1>
        {senhaConfigurada ? (
          <form action={entrar} className="mt-6">
            <label htmlFor="senha" className="block font-bold">
              Senha
            </label>
            <input
              id="senha"
              name="senha"
              type="password"
              autoComplete="current-password"
              className="mt-1.5 w-full rounded-xl border-2 border-white/20 bg-navy-soft px-4 py-3 focus:border-sun focus:outline-none"
            />
            <button type="submit" className="mt-4 w-full rounded-full bg-sun px-6 py-3 font-bold text-navy hover:bg-white">
              Entrar
            </button>
          </form>
        ) : (
          <p className="mt-4 text-mist">
            Falta configurar a variável <code className="text-sun">ORACOES_SENHA</code> no painel da Vercel.
          </p>
        )}
      </div>
    );
  }

  const oracoes = await listarOracoes();

  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <h1 className="font-display text-4xl font-black italic tracking-tight text-sun">Pedidos de oração</h1>
      <p className="mt-2 text-mist">
        {oracoes.length === 0
          ? 'Nenhum pedido ainda.'
          : `${oracoes.length} ${oracoes.length === 1 ? 'pessoa' : 'pessoas'}, do mais novo pro mais antigo.`}
      </p>
      <ul className="mt-8 space-y-4">
        {oracoes.map((o) => (
          <li key={o.id} className="cut-tr bg-navy-soft p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-xl font-bold">{o.nome}</h2>
              <time dateTime={o.criadoEm} className="text-sm text-mist">
                {dataHora(o.criadoEm)}
              </time>
            </div>
            {o.pedido ? (
              <p className="mt-2 whitespace-pre-wrap text-white/85">{o.pedido}</p>
            ) : (
              <p className="mt-2 text-mist">Sem pedido escrito, só o nome.</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
