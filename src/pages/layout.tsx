import { Header } from '@/widgets';
import { CharactersFlyout } from '@/entities/character';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <CharactersFlyout />
    </>
  );
};
