import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ErrorBoundary } from '@/providers/error-boundary';
import { SearchNavigationProvider } from '@/providers/search-navigation-provider';
import { StoreProvider } from '@/providers/store-provider';
import { ThemeProvider } from '@/shared/ui/theme';
import { CharactersFlyout } from '@/entities/character';
import { Header } from '@/widgets';
import { CharacterSlot } from './@character/[id]/CharacterSlot';
import '@/styles/globals.scss';

const montserrat = Montserrat({
  weight: ['400', '500', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rick and Morty',
  description: 'Rick and Morty characters',
  keywords: ['Rick and Morty', 'characters'],
  openGraph: {
    title: 'Rick and Morty',
    description: 'Rick and Morty characters',
    images: [
      {
        url: '/bg.jpg',
      },
    ],
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
  character,
}: Readonly<{
  children: React.ReactNode;
  character: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ErrorBoundary>
          <StoreProvider>
            <SearchNavigationProvider>
              <ThemeProvider>
                <Header />
                <main>
                  {children}
                  {<CharacterSlot character={character} />}
                </main>
                <CharactersFlyout />
              </ThemeProvider>
            </SearchNavigationProvider>
          </StoreProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
