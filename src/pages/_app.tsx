import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Montserrat } from 'next/font/google';
import { Provider } from 'react-redux';
import { wrapper } from '@/store';
import { ErrorBoundary } from '@/providers/error-boundary';
import { ThemeProvider } from '@/shared/ui/theme';
import Layout from './layout';
import '@/styles/globals.scss';

const montserrat = Montserrat({
  weight: ['400', '500', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps);

  return (
    <>
      <Head>
        <title>Rick and Morty</title>
        <meta name="description" content="Rick and Morty characters" />
        <meta name="keywords" content="Rick and Morty, characters" />
        <meta property="og:title" content="Rick and Morty" />
        <meta property="og:description" content="Rick and Morty characters" />
        <meta property="og:image" content="/bg.jpg" />
        <link rel="icon" href="/favicon.svg" />
        <style jsx global>{`
          html {
            font-family: ${montserrat.style.fontFamily};
          }
        `}</style>
      </Head>
      <ErrorBoundary>
        <Provider store={store}>
          <ThemeProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </Provider>
      </ErrorBoundary>
    </>
  );
}
