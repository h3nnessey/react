import { MainPage } from '@/pages/main';
import { SearchProvider } from './providers/search';
import './styles/globals.scss';

export default function App() {
  return (
    <SearchProvider>
      <MainPage />
    </SearchProvider>
  );
}
