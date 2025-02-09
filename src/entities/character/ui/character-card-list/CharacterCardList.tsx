import type { MouseEvent } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import type { Character } from '@/shared/api/characters';
import { classnames } from '@/shared/lib/styling';
import { Button, ErrorMessage, Loader } from '@/shared/ui';
import { CharacterCard } from '../character-card/CharacterCard';
import styles from './CharacterCardList.module.scss';

interface CharacterCardListProps {
  characters: Character[];
  isLoading?: boolean;
  error: string | null;
  className?: string;
}

export const CharacterCardList = ({
  characters = [],
  isLoading,
  error,
  className,
}: CharacterCardListProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = (event: MouseEvent<HTMLDivElement>) => {
    if (id && event.currentTarget === event.target) {
      navigate({
        pathname: '/',
        search: location.search,
      });
    }
  };

  const handleResetClick = () => {
    navigate({ pathname: '/' }, { replace: true });
  };

  return (
    <div className={styles.container}>
      {error && (
        <ErrorMessage message={error}>
          <Button onClick={handleResetClick}>Reset</Button>
        </ErrorMessage>
      )}
      {isLoading && <Loader />}
      {!!characters.length && (
        <div
          onClick={handleClose}
          className={classnames(styles.cardList, className)}
        >
          {characters.map(character => (
            <CharacterCard key={character.id} {...character} />
          ))}
        </div>
      )}
    </div>
  );
};
