'use client';
import { useRef, type FormEvent } from 'react';
import { useSearchNavigation } from '@/providers/search-navigation-provider';
import { Input, Button } from '@/shared/ui/components';
import styles from './SearchForm.module.scss';

export const SearchForm = () => {
  const { search, navigate } = useSearchNavigation();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newQuery = inputRef.current?.value.trim() || '';

    if (newQuery === search) return;

    navigate({ name: newQuery });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} role="search-form">
      <Input
        inputRef={inputRef}
        defaultValue={search}
        placeholder="Search something..."
      />
      <Button type="submit">Search</Button>
    </form>
  );
};
