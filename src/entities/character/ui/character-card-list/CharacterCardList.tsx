import { useNavigate } from 'react-router';
import type { Character } from '@/shared/api/characters';
import { classnames } from '@/shared/lib/styling';
import { Button, ErrorMessage, Loader } from '@/shared/ui';
import { CharacterCard } from '../character-card/CharacterCard';
import styles from './CharacterCardList.module.scss';

export interface CharacterCardListProps {
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
  const navigate = useNavigate();

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
        <div className={classnames(styles.cardList, className)}>
          {characters.map(character => (
            <CharacterCard key={character.id} {...character} />
          ))}
        </div>
      )}
    </div>
  );
};
