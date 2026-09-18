import type { Metadata } from 'next';
import { DemoShell } from '@/components/DemoShell';
import LojaOnline from '@/demos/LojaOnline';

export const metadata: Metadata = { title: 'Demo: Feirão, loja online' };

export default function Page() {
  return (
    <DemoShell slug="loja-online">
      <LojaOnline />
    </DemoShell>
  );
}
