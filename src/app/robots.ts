import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/demos/', '/oracoes', '/jesus/aceitei', '/api/'] }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
