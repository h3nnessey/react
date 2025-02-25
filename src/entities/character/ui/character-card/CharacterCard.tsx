import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/store';
import { classnames } from '@/shared/lib/styling';
import { processSearchParams } from '@/shared/lib/url';
import { charactersSlice } from '../../model';
import type { Character, CharacterId } from '../../model';
import styles from './CharacterCard.module.scss';

export const CharacterCard = (character: Character) => {
  const { id, name, image, status } = character;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(state =>
    charactersSlice.selectors.isFavorite(state, id)
  );
  const { id: currentId } = router.query;

  const handleClick = (id: CharacterId) => {
    router.push({
      pathname: '/',
      query: processSearchParams({ ...router.query, id }),
    });
  };

  const handleCheckboxChange = () => {
    if (isFavorite) {
      dispatch(charactersSlice.actions.removeFromFavorites(id));
    } else {
      dispatch(charactersSlice.actions.addToFavorites(character));
    }
  };

  return (
    <>
      <div
        className={classnames(styles.card, {
          [styles.active]: Number(currentId) === id,
        })}
        title={name}
        onClick={() => handleClick(id)}
      >
        <label
          className={styles.favorite}
          title="Add to favorites"
          onClick={event => event.stopPropagation()}
        >
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={isFavorite}
            onChange={handleCheckboxChange}
          />
        </label>
        <Image className={styles.image} src={image} alt={name} role="img" />
        <div className={styles.about}>
          <p className={styles.title}>{name}</p>
          <p
            className={classnames(
              styles.description,
              styles[status.toLowerCase()]
            )}
          >
            {status}
          </p>
        </div>
      </div>
    </>
  );
};
