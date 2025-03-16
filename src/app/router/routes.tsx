import type { RouteObject } from 'react-router';
import { MainPage } from '@/pages/main/MainPage';
import { HookFormPage } from '@/pages/hook-form/HookFormPage';
import { UncontrolledFormPage } from '@/pages/uncontrolled-form/UncontrolledFormPage';
import { Layout } from '@/widgets/layout/ui/Layout';

export const AppRoutes = {
  Main: {
    path: '/',
    label: 'Main',
  },
  HookForm: {
    path: '/hook-form',
    label: 'React Hook Form',
  },
  UncontrolledForm: {
    path: '/uncontrolled-form',
    label: 'Uncontrolled Form',
  },
};

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: AppRoutes.Main.path,
        element: <MainPage />,
      },
      {
        path: AppRoutes.HookForm.path,
        element: <HookFormPage />,
      },
      {
        path: AppRoutes.UncontrolledForm.path,
        element: <UncontrolledFormPage />,
      },
    ],
  },
];
