import { useRef, type FormEvent } from 'react';
import { Input, Button } from '@/shared/ui/';
import styles from './SearchForm.module.scss';

interface SearchFormProps {
  disabled: boolean;
  defaultValue: string;
  onSubmit: (query: string) => void;
}

export const SearchForm = ({
  onSubmit,
  defaultValue,
  disabled,
}: SearchFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = inputRef.current?.value.trim() || '';

    onSubmit(query);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        inputRef={inputRef}
        disabled={disabled}
        defaultValue={defaultValue}
        placeholder="Search something..."
      />
      <Button type="submit" disabled={disabled}>
        Search
      </Button>
    </form>
  );
};
