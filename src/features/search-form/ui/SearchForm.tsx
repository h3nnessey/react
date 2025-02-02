import { Component, createRef } from 'react';

export class SearchForm extends Component {
  ref = createRef<HTMLInputElement>();

  render() {
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
