import { Component } from 'react';
import { MainPage } from '@/pages/main';
import { SearchProvider } from './providers/search';
import './styles/globals.scss';

export default class App extends Component {
  render() {
    return (
      <SearchProvider>
        <MainPage />
      </SearchProvider>
    );
  }
}
