'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store';
import { classnames } from '@/shared/lib/styling';
import { charactersSlice, type Character } from '../../model';
import styles from './CharacterCard.module.scss';

export const CharacterCard = (character: Character) => {
  const { id, name, image, status } = character;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(state =>
    charactersSlice.selectors.isFavorite(state, id)
  );
  const currentId = Number(pathname.split('/').pop());

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
        [styles.active]: currentId === id,
      })}
      title={name}
      role="character-card"
    >
      {currentId !== id && (
        <Link
          className="link"
          href={{
            pathname: `/${id}`,
            search: searchParams.toString(),
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
        priority
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
