'use client';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { Button } from '@/shared/ui/components';
import { createDownloadCharactersUrl } from '../../lib';
import { charactersSlice } from '../../model';
import styles from './CharactersFlyout.module.scss';

export const CharactersFlyout = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(charactersSlice.selectors.getFavorites);

  const downloadUrl = useMemo(() => {
    return createDownloadCharactersUrl(favorites);
  }, [favorites]);

  const handleUnselectClick = () => {
    dispatch(charactersSlice.actions.clearFavorites());
  };

  if (!favorites.length) {
    return null;
  }

  return (
    <div className={styles.flyout} role="characters-flyout">
      <h2 className={styles.title}>
        {favorites.length} characters are selected
      </h2>
      <div className={styles.controls}>
        <Button className={styles.btn}>
          <a
            className="link"
            href={downloadUrl}
            download={`${favorites.length}_favorite_characters.csv`}
          >
            Download
          </a>
        </Button>
        <Button
          className={styles.btn}
          onClick={handleUnselectClick}
          variant="danger"
          data-testid="unselect-button"
        >
          Unselect all
        </Button>
      </div>
    </div>
  );
};
