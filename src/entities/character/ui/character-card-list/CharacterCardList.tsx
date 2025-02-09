import type { MouseEvent } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import type { Character } from '@/shared/api/characters';
import { classnames } from '@/shared/lib/styling';
import { CharacterCard } from '../character-card/CharacterCard';
import styles from './CharacterCardList.module.scss';

interface CharacterCardListProps {
  characters: Character[];
  className?: string;
}

export const CharacterCardList = ({
  characters = [],
  className,
}: CharacterCardListProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (id && event.currentTarget === event.target) {
      navigate({
        pathname: '/',
        search: location.search,
      });
    }
  };

  return (
    <>
      {!!characters.length && (
        <div
          onClick={handleClick}
          className={classnames(styles.cardList, className)}
        >
          {characters.map(character => (
            <CharacterCard key={character.id} {...character} />
          ))}
        </div>
      )}
    </>
  );
};
