import { BottomNav, Header, TopBar } from '@/components/Chrome';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/lib/jsonld';
import { site } from '@/data/site';

export default function SiteLayout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: site.name,
          description: `${site.tagline}. ${site.pitch}`,
          url: site.url,
          telephone: `+${site.whatsapp}`,
          image: `${site.url}/brand/logo-circle.png`,
          areaServed: 'BR',
          address: { '@type': 'PostalAddress', addressLocality: site.city, addressRegion: site.region, addressCountry: 'BR' },
          founder: { '@type': 'Person', name: site.name, jobTitle: 'Desenvolvedor de sites, sistemas e aplicativos', sameAs: [site.github] },
        }}
      />
      <TopBar />
      <Header />
      <main>{children}</main>
      <Footer />
      <BottomNav />
    </>
  );
}
