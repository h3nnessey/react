import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Montserrat } from 'next/font/google';
import { Provider } from 'react-redux';
import { wrapper } from '@/store';
import { ThemeProvider } from '@/shared/ui/theme';
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
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Provider store={store}>
        <ThemeProvider>
          <style jsx global>{`
            html {
              font-family: ${montserrat.style.fontFamily};
            }
          `}</style>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  );
}
