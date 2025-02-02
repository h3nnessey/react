import { createRef, Component, type FormEvent } from 'react';

interface SearchFormProps {
  disabled: boolean;
  defaultValue: string;
  onSubmit: (query: string) => void;
}

export class SearchForm extends Component<SearchFormProps> {
  private ref = createRef<HTMLInputElement>();

  private handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = this.ref.current?.value.trim() || '';

    this.props.onSubmit(query);
  };

  render() {
    const { disabled, defaultValue } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          ref={this.ref}
          disabled={disabled}
          defaultValue={defaultValue}
          placeholder="Search something..."
        />
        <button type="submit" disabled={disabled}>
          search
        </button>
      </form>
    );
  }
}
