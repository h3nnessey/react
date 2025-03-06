import type { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { makeStore, type AppStore, type RootState } from '@/store';
import { ThemeProvider } from '@/shared/ui/theme';
import { SearchNavigationProvider } from '@/providers/search-navigation-provider';
import { ErrorBoundary } from '@/providers/error-boundary';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {}
) {
  const { store = makeStore(), ...renderOptions } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => (
    <ErrorBoundary>
      <Provider store={store}>
        <SearchNavigationProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </SearchNavigationProvider>
      </Provider>
    </ErrorBoundary>
  );

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
