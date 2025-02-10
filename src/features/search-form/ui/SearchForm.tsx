import { useEffect, useRef, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useLocalStorage } from '@/shared/lib/storage';
import { QueryParams } from '@/shared/api/characters';
import { Input, Button } from '@/shared/ui/';
import styles from './SearchForm.module.scss';

const SEARCH_KEY = 'h3nnessey-search';

let isFirstLoad = true;

export const SearchForm = () => {
  const [search, setSearch] = useLocalStorage(SEARCH_KEY, '');
  const location = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newQuery = inputRef.current?.value.trim() || '';

    if (search === newQuery) return;

    setSearch(newQuery);

    navigate({
      pathname: '/',
      search: newQuery ? `?${QueryParams.Name}=${newQuery}` : '',
    });
  };

  useEffect(() => {
    if (isFirstLoad) {
      isFirstLoad = false;

      const searchParams = new URLSearchParams(location.search);

      if (search) {
        searchParams.set(QueryParams.Name, search);
      }

      navigate(
        {
          pathname: location.pathname,
          search: searchParams.toString(),
        },
        { replace: true }
      );
    } else {
      if (inputRef.current) {
        const searchParams = new URLSearchParams(location.search);
        const newValue = searchParams.get(QueryParams.Name) || '';

        inputRef.current.value = newValue;
        setSearch(newValue);
      }
    }
  }, [location.search, location.pathname, navigate, search, setSearch]);

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
