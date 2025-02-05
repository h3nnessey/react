import { useState } from 'react';
import { useSearchContext } from '@/app/providers/search';
import { CardList, Loader, Button, ErrorMessage } from '@/shared/ui/';
import type { Character } from '@/shared/api/characters';
import { Header } from '@/widgets/header';
import styles from './MainPage.module.scss';

const characterMapper = ({ id, image, name, status }: Character) => {
  return {
    id,
    imageUrl: image,
    title: name,
    description: status,
  };
};

export const MainPage = () => {
  const { characters, isLoading, error } = useSearchContext();
  const [hasError, setHasError] = useState(false);

  const handleThrowErrorClick = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('Test Error');
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        {isLoading ? (
          <Loader />
        ) : (
          <CardList items={characters.map(characterMapper)} />
        )}
        {!isLoading && error && <ErrorMessage message={error} />}
        <Button className={styles.btn} onClick={handleThrowErrorClick}>
          Throw Error
        </Button>
      </main>
    </>
  );
};
