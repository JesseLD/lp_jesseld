import type { Metadata } from 'next';
import { DemoShell } from '@/components/DemoShell';
import Barbearia from '@/demos/Barbearia';

export const metadata: Metadata = { title: 'Demo: Navalha, app de barbearia' };

export default function Page() {
  return (
    <DemoShell slug="barbearia">
      <Barbearia />
    </DemoShell>
  );
}
