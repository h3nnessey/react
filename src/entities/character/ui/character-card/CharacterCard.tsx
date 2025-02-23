import { useLocation, useNavigate, useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { classnames } from '@/shared/lib/styling';
import { charactersSlice } from '../../model';
import type { Character, CharacterId } from '../../model';
import styles from './CharacterCard.module.scss';

export const CharacterCard = (character: Character) => {
  const { id, name, image, status } = character;
  const { id: currentId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(state =>
    charactersSlice.selectors.isFavorite(state, id)
  );

  const handleClick = (id: CharacterId) => {
    navigate(`/${id}${location.search}`);
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
