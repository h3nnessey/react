import { Header } from '@/widgets';
import { CharactersFlyout } from '@/entities/character';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <CharactersFlyout />
    </>
  );
}
