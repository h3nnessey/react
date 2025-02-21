import { createBrowserRouter, type RouteObject } from 'react-router';
import { ErrorBoundary } from '@/shared/ui/providers';
import { MainPage, NotFoundPage } from '@/pages';
import { CharacterDetails } from '@/entities/character';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <MainPage />
      </ErrorBoundary>
    ),
    children: [
      {
        path: '/:id',
        element: <CharacterDetails />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export const router = createBrowserRouter(routes);
