import { createRef, Component, type FormEvent } from 'react';
import { Input, Button } from '@/shared/ui/';
import styles from './SearchForm.module.scss';

interface SearchFormProps {
  disabled: boolean;
  defaultValue: string;
  onSubmit: (query: string) => void;
}

export class SearchForm extends Component<SearchFormProps> {
  private inputRef = createRef<HTMLInputElement>();

  private handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = this.inputRef.current?.value.trim() || '';

    this.props.onSubmit(query);
  };

  render() {
    const { disabled, defaultValue } = this.props;

    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <Input
          inputRef={this.inputRef}
          disabled={disabled}
          defaultValue={defaultValue}
          placeholder="Search something..."
        />
        <Button text="Search" type="submit" disabled={disabled}></Button>
      </form>
    );
  }
}
