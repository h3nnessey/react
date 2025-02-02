import { Component } from 'react';
import { SearchProvider } from '@/app/providers/search';
import { Header } from '@/widgets/header';

export class MainPage extends Component {
  render() {
    return (
      <SearchProvider>
        <Header />
        <main>
          <h1>main page</h1>
        </main>
      </SearchProvider>
    );
  }
}
