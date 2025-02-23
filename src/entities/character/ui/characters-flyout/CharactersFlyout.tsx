import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { Character, charactersSlice } from '../../model';
import styles from './CharactersFlyout.module.scss';

const createUrl = (characters: Character[]) => {
  const jsonString = JSON.stringify(characters, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  return url;
};

export const CharactersFlyout = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(charactersSlice.selectors.getFavorites);

  const downloadUrl = useMemo(() => {
    return createUrl(favorites);
  }, [favorites]);

  const handleUnselectClick = () => {
    dispatch(charactersSlice.actions.clearFavorites());
  };

  return (
    !!favorites.length && (
      <div className={styles.flyout}>
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
            download={`${favorites.length}_favorite_characters.json`}
          >
            <span>Download</span>
          </a>
        </div>
      </div>
    )
  );
};
