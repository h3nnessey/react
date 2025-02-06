import { RouterProvider } from 'react-router';
import { router } from './router';
import './styles/globals.scss';

export default function App() {
  return <RouterProvider router={router} />;
}
