import type { Metadata } from 'next';
import { DemoShell } from '@/components/DemoShell';
import Escolinha from '@/demos/Escolinha';

export const metadata: Metadata = { title: 'Demo: Chamada, gestão de escolinhas' };

export default function Page() {
  return (
    <DemoShell slug="escolinha">
      <Escolinha />
    </DemoShell>
  );
}
