import { Link, useParams, useSearchParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { classnames } from '@/shared/lib/styling';
import { charactersSlice } from '../../model';
import type { Character } from '../../model';
import styles from './CharacterCard.module.scss';

export const CharacterCard = (character: Character) => {
  const { id, name, image, status } = character;
  const params = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(state =>
    charactersSlice.selectors.isFavorite(state, id)
  );
  const isActive = Number(params.id) === id;

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
          [styles.active]: isActive,
        })}
        title={name}
        role="character-card"
      >
        {!isActive && (
          <Link
            className="link"
            to={{
              pathname: `/${id}`,
              search: searchParams.toString(),
            }}
            role="link"
          />
        )}
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
        <img className={styles.image} src={image} alt={name} role="img" />
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
