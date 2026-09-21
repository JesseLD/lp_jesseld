import 'server-only';
import { get, list, put } from '@vercel/blob';

export type Oracao = {
  id: string;
  nome: string;
  pedido: string;
  criadoEm: string;
};

const PREFIXO = 'oracoes/';

/**
 * Na Vercel o Blob autentica de dois jeitos: pelo token de leitura/escrita ou por OIDC,
 * que injeta só o BLOB_STORE_ID. Rodando local, sem nenhum dos dois, grava em arquivo.
 */
const temBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);

async function localDir() {
  const { mkdir } = await import('node:fs/promises');
  const dir = 'node_modules/.cache/oracoes';
  await mkdir(dir, { recursive: true });
  return dir;
}

export async function salvarOracao(nome: string, pedido: string): Promise<Oracao> {
  const registro: Oracao = {
    id: crypto.randomUUID(),
    nome,
    pedido,
    criadoEm: new Date().toISOString(),
  };
  const nomeArquivo = `${PREFIXO}${registro.criadoEm}-${registro.id}.json`;
  const conteudo = JSON.stringify(registro, null, 2);

  if (temBlob()) {
    await put(nomeArquivo, conteudo, {
      access: 'private',
      contentType: 'application/json',
      addRandomSuffix: false,
    });
  } else {
    const { writeFile } = await import('node:fs/promises');
    await writeFile(`${await localDir()}/${registro.id}.json`, conteudo, 'utf8');
  }
  return registro;
}

export async function listarOracoes(): Promise<Oracao[]> {
  let registros: Oracao[] = [];

  if (temBlob()) {
    const { blobs } = await list({ prefix: PREFIXO, limit: 1000 });
    registros = await Promise.all(
      blobs.map(async (b) => {
        const arquivo = await get(b.pathname, { access: 'private', useCache: false });
        if (!arquivo) throw new Error(`Pedido de oração sumiu do Blob: ${b.pathname}`);
        return JSON.parse(await new Response(arquivo.stream).text()) as Oracao;
      }),
    );
  } else {
    const { readdir, readFile } = await import('node:fs/promises');
    const dir = await localDir();
    const arquivos = await readdir(dir);
    registros = await Promise.all(
      arquivos
        .filter((f) => f.endsWith('.json'))
        .map(async (f) => JSON.parse(await readFile(`${dir}/${f}`, 'utf8')) as Oracao),
    );
  }

  return registros.sort((a, b) => b.criadoEm.localeCompare(a.criadoEm));
}
