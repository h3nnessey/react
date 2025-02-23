import { useAppDispatch, useAppSelector } from '@/app/store';
import { charactersSlice } from '@/entities/character/model';
import styles from './CharactersFlyout.module.scss';

export const CharactersFlyout = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(charactersSlice.selectors.getFavorites);

  const handleUnselectClick = () => {
    dispatch(charactersSlice.actions.clearFavorites());
  };

  const handleDownloadClick = () => {
    console.log('download');
  };

  return (
    !!favorites.length && (
      <div className={styles.flyout}>
        <h2>{favorites.length} characters are selected</h2>
        <div className={styles.controls}>
          <button onClick={handleUnselectClick}>Unselect all</button>
          <button onClick={handleDownloadClick}>Download</button>
        </div>
      </div>
    )
  );
};
