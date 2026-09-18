import type { Metadata } from 'next';
import { DemoShell } from '@/components/DemoShell';
import SistemaGarcom from '@/demos/SistemaGarcom';

export const metadata: Metadata = { title: 'Demo: Comanda, sistema de garçom' };

export default function Page() {
  return (
    <DemoShell slug="sistema-garcom">
      <SistemaGarcom />
    </DemoShell>
  );
}
