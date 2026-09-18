import type { MetadataRoute } from 'next';
import { products } from '@/data/products';
import { site } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    { url: `${site.url}/produtos`, priority: 0.9 },
    ...products.map((p) => ({ url: `${site.url}/produtos/${p.slug}`, priority: 0.8 })),
  ];
}
