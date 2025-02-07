import { useState } from 'react';
import { SearchForm } from '@/features/search-form';
import { Button } from '@/shared/ui';
import styles from './Header.module.scss';

export const Header = () => {
  const [hasError, setHasError] = useState(false);

  const handleThrowErrorClick = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('Test Error');
  }

  return (
    <header className={styles.header}>
      <Button onClick={handleThrowErrorClick} variant="danger">
        Error
      </Button>
      <SearchForm />
    </header>
  );
};
