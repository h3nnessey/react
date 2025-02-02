import { Component, createRef } from 'react';
import { SearchContext } from '@/app/providers/search';

export class SearchForm extends Component {
  static contextType = SearchContext;

  ref = createRef<HTMLInputElement>();

  render() {
    console.log(this.context);

    return (
      <form
        onSubmit={event => {
          event.preventDefault();
          console.log(this.ref.current?.value);
        }}
      >
        <input ref={this.ref} type="text" />
        <button type="submit">search</button>
      </form>
    );
  }
}
