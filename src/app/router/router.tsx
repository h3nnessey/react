import { createBrowserRouter, type RouteObject } from 'react-router';
import { ErrorBoundary } from '@/shared/ui';
import { MainPage, NotFoundPage } from '@/pages';
import { SearchProvider } from '../providers/search';

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <SearchProvider>
          <MainPage />
        </SearchProvider>
      </ErrorBoundary>
    ),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export const router = createBrowserRouter(routes);
