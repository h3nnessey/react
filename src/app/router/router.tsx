import { createBrowserRouter, type RouteObject } from 'react-router';
import { CharacterDetails } from '@/entities/character';
import { MainPage, NotFoundPage } from '@/pages';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainPage />,
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
