'use client';
import { useEffect, useRef, type FormEvent } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store';
import { charactersSlice } from '@/entities/character';
import { Input, Button } from '@/shared/ui/components';
import styles from './SearchForm.module.scss';

export const SearchForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const search = searchParams.get('name') || '';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newQuery = inputRef.current?.value.trim() || '';

    if (newQuery === search) return;

    dispatch(charactersSlice.actions.setIsLoading(true));
    router.push(`/${newQuery ? `?name=${newQuery}` : ''}`);
  };

  useEffect(() => {
    dispatch(charactersSlice.actions.setIsLoading(false));
  }, [searchParams, dispatch]);

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
