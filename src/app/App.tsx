import { RouterProvider } from 'react-router';
import { ThemeProvider } from '@/shared/ui/theme';
import { router } from './router';
import './styles/globals.scss';

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
