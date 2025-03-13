import { RouterProvider } from 'react-router';
import { router } from './router/router';
import './styles/globals.scss';

export const App = () => {
  return <RouterProvider router={router} />;
};
