import { useState } from 'react';
import { Button } from '@/shared/ui/';
import { Header, SearchResults } from '@/widgets';
import styles from './MainPage.module.scss';

export const MainPage = () => {
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
        <SearchResults />
        <Button className={styles.btn} onClick={handleThrowErrorClick}>
          Throw Error
        </Button>
      </main>
    </>
  );
};
