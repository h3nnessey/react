import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store';
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

  return (
    !!favorites.length && (
      <div className={styles.flyout} data-testid="characters-flyout">
        <h2 className={styles.title}>
          {favorites.length} characters are selected
        </h2>
        <div className={styles.controls}>
          <button className={styles.btn} onClick={handleUnselectClick}>
            <span>Unselect all</span>
          </button>
          <a
            className={styles.link}
            href={downloadUrl}
            download={`${favorites.length}_favorite_characters.csv`}
          >
            <span>Download</span>
          </a>
        </div>
      </div>
    )
  );
};
