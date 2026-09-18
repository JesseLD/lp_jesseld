import type { Metadata } from 'next';

export const metadata: Metadata = { robots: { index: false, follow: true } };

export default function DemosLayout({ children }: LayoutProps<'/demos'>) {
  return children;
}
