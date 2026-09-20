import { categories, productsBy } from '@/data/products';
import { site } from '@/data/site';

export const dynamic = 'force-static';

/** Resumo em texto puro pra LLMs, gerado dos mesmos dados das páginas */
export function GET() {
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.tagline} sob medida para pequenos negócios. ${site.pitch}`,
    '',
    `Desenvolvedor em ${site.city}/${site.region}, Brasil. Atende o Brasil todo, online.`,
    `Orçamento pelo WhatsApp: ${site.phoneDisplay} (https://wa.me/${site.whatsapp}). Preço só por orçamento.`,
    '',
    'Experiência: mais de 3 anos no mercado, com sistema de cobrança para prefeitura, votação online com milhares de votos em tempo real e app de gestão usado em igrejas toda semana.',
    'Tecnologias: React, Next.js, Laravel, PHP, Flutter, Node.js, MySQL.',
    '',
    '## Produtos',
    '',
    'Cada produto pode ser adaptado ao negócio do cliente. "Demo" = versão de exemplo para testar no site; "No ar" = projeto real em produção.',
    '',
  ];
  for (const c of categories) {
    lines.push(`### ${c.plural}`, '', c.blurb, '');
    for (const p of productsBy(c.id)) {
      lines.push(
        `- [${p.name}](${site.url}/produtos/${p.slug}): ${p.headline}. ${p.summary} Pra quem: ${p.audience}. ${p.kind === 'demo' ? 'Demo' : 'No ar'}: ${p.url.startsWith('/') ? site.url + p.url : p.url}`,
      );
    }
    lines.push('');
  }
  lines.push(
    '## Páginas',
    '',
    `- [Início](${site.url})`,
    `- [Todos os produtos](${site.url}/produtos)`,
    `- [Jesus](${site.url}/jesus): o que Jessé crê como cristão, a mensagem do evangelho e um convite para conversar.`,
    '',
  );
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
