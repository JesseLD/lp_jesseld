import type { Metadata } from 'next';
import { DemoShell } from '@/components/DemoShell';
import SiteAgro from '@/demos/SiteAgro';

export const metadata: Metadata = { title: 'Demo: Verde Vale Agro, site institucional' };

export default function Page() {
  return (
    <DemoShell slug="site-agro">
      <SiteAgro />
    </DemoShell>
  );
}
