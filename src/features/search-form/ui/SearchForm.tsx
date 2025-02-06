import { useRef, type FormEvent } from 'react';
import { useSearchParams } from 'react-router';
import { QueryParams } from '@/shared/api/characters';
import { Input, Button } from '@/shared/ui/';
import styles from './SearchForm.module.scss';

export const SearchForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSearchParams({
      [QueryParams.Name]: inputRef.current?.value.trim() || '',
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        inputRef={inputRef}
        defaultValue={searchParams.get(QueryParams.Name) || ''}
        placeholder="Search something..."
      />
      <Button type="submit">Search</Button>
    </form>
  );
};
