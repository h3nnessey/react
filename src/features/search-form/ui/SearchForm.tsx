import { useRef, type FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Input, Button } from '@/shared/ui/components';
import styles from './SearchForm.module.scss';

export const SearchForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const search = searchParams.get('name') || '';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newQuery = inputRef.current?.value.trim() || '';

    if (search === newQuery) return;

    navigate({
      pathname: '/',
      search: newQuery ? `?name=${newQuery}` : '',
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        inputRef={inputRef}
        defaultValue={search}
        placeholder="Search something..."
      />
      <Button type="submit">Search</Button>
    </form>
  );
};
