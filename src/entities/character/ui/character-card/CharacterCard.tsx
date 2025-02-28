import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/store';
import { classnames } from '@/shared/lib/styling';
import { charactersSlice } from '../../model';
import type { Character } from '../../model';
import styles from './CharacterCard.module.scss';

export const CharacterCard = (character: Character) => {
  const { id, name, image, status } = character;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(state =>
    charactersSlice.selectors.isFavorite(state, id)
  );
  const { id: currentId } = router.query;

  const handleCheckboxChange = () => {
    if (isFavorite) {
      dispatch(charactersSlice.actions.removeFromFavorites(id));
    } else {
      dispatch(charactersSlice.actions.addToFavorites(character));
    }
  };

  return (
    <div
      className={classnames(styles.card, {
        [styles.active]: Number(currentId) === id,
      })}
      title={name}
      role="character-card"
    >
      {Number(currentId) !== id && (
        <Link
          className="link"
          href={{
            pathname: '/',
            query: { ...router.query, id },
          }}
        />
      )}
      <label
        className={styles.favorite}
        title="Add to favorites"
        onClick={event => event.stopPropagation()}
      >
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={isFavorite}
          onChange={handleCheckboxChange}
          role="add-to-favorites"
        />
      </label>
      <Image
        className={styles.image}
        src={image}
        width={80}
        height={80}
        alt={`${name} image`}
      />
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
  );
};
