import Link from 'next/link';
import { House, LayoutGrid, UserRound } from 'lucide-react';
import { Logo } from './Logo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { whatsappLink } from '@/data/site';

export function TopBar() {
  return (
    <div className="bg-sun text-navy">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-4 py-2 text-sm">
        <p className="truncate">
          <strong className="font-bold">Orçamento sem compromisso</strong>
          <span className="hidden sm:inline"> — me conta o que você precisa e eu te respondo no mesmo dia.</span>
        </p>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener"
          className="shrink-0 rounded-full border-2 border-navy px-3 py-0.5 text-xs font-bold hover:bg-navy hover:text-sun"
        >
          Chamar no WhatsApp
        </a>
      </div>
    </div>
  );
}

const nav = [
  { href: '/produtos#aplicativos', label: 'Aplicativos' },
  { href: '/produtos#sites', label: 'Sites' },
  { href: '/produtos#sistemas', label: 'Sistemas' },
  { href: '/#como-funciona', label: 'Como funciona' },
  { href: '/#sobre', label: 'Sobre mim' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4">
        <Logo />
        <nav aria-label="Principal" className="hidden items-center gap-6 text-sm text-white/80 lg:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-sun">
              {n.label}
            </Link>
          ))}
        </nav>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener"
          className="hidden items-center gap-2 rounded-full bg-sun px-4 py-2 text-sm font-bold text-navy hover:bg-white md:flex"
        >
          <WhatsAppIcon className="size-4" /> Pedir orçamento
        </a>
      </div>
    </header>
  );
}

/** Barra de app no celular: tudo a um toque do polegar */
export function BottomNav() {
  const item = 'flex flex-1 flex-col items-center gap-1 py-2 text-[0.7rem] text-white/75 active:text-sun';
  return (
    <nav
      aria-label="Atalhos"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-navy-deep/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
    >
      <div className="flex items-stretch">
        <Link href="/" className={item}>
          <House className="size-5" /> Início
        </Link>
        <Link href="/produtos" className={item}>
          <LayoutGrid className="size-5" /> Produtos
        </Link>
        <a href={whatsappLink()} target="_blank" rel="noopener" className="-mt-5 flex flex-1 flex-col items-center gap-1 text-[0.7rem] font-bold text-sun">
          <span className="grid size-13 place-items-center rounded-full bg-sun text-navy shadow-[0_6px_20px_-4px_rgba(255,215,44,.6)] ring-4 ring-navy-deep">
            <WhatsAppIcon className="size-6" />
          </span>
          Orçamento
        </a>
        <Link href="/#como-funciona" className={item}>
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 6h16M4 12h10M4 18h6" strokeLinecap="round" /></svg>
          Como funciona
        </Link>
        <Link href="/#sobre" className={item}>
          <UserRound className="size-5" /> Sobre
        </Link>
      </div>
    </nav>
  );
}
