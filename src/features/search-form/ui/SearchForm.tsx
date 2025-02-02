import { Component, createRef } from 'react';
import { SearchContext } from '@/app/providers/search';

export class SearchForm extends Component {
  declare context: React.ContextType<typeof SearchContext>;
  static contextType = SearchContext;

  ref = createRef<HTMLInputElement>();

  render() {
    this.context.setSearch('3213123');

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
