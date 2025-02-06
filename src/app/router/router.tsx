import { createBrowserRouter, type RouteObject } from 'react-router';
import { ErrorBoundary } from '@/shared/ui';
import { MainPage, NotFoundPage } from '@/pages';

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <MainPage />
      </ErrorBoundary>
    ),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export const router = createBrowserRouter(routes);
