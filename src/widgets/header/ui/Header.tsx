import { Component } from 'react';
import { SearchForm } from '@/features/search-form';

export class Header extends Component {
  render() {
    return (
      <header>
        <SearchForm />
      </header>
    );
  }
}
