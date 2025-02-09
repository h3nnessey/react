import { useEffect, useRef, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { QueryParams } from '@/shared/api/characters';
import { Input, Button } from '@/shared/ui/';
import styles from './SearchForm.module.scss';
import { useLocalStorage } from '@/shared/lib/storage';

const SEARCH_KEY = 'h3nnessey-search';

export const SearchForm = () => {
  const [search, setSearch] = useLocalStorage(SEARCH_KEY, '');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newQuery = inputRef.current?.value.trim() || '';

    if (search === newQuery) return;

    setSearch(newQuery);
  };

  useEffect(() => {
    navigate({
      pathname: '/',
      search: search ? `?${QueryParams.Name}=${search}` : '',
    });
  }, [search, navigate]);

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
