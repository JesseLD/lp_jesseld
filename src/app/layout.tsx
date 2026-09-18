import type { Metadata, Viewport } from 'next';
import { Archivo, Figtree } from 'next/font/google';
import { site } from '@/data/site';
import './globals.css';

const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  axes: ['wdth'],
  style: ['normal', 'italic'],
});

const figtree = Figtree({
  variable: '--font-figtree',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline} em ${site.city}/${site.region}`,
    template: `%s | ${site.name}`,
  },
  description: `${site.pitch} Aplicativos, sites e sistemas sob medida para pequenos negócios. Veja demos de verdade e peça orçamento pelo WhatsApp.`,
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: site.name,
  },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  themeColor: '#001d49',
  viewportFit: 'cover',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${figtree.variable} antialiased`}>
      <body className="min-h-dvh font-sans">{children}</body>
    </html>
  );
}
