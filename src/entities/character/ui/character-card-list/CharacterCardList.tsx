import { useNavigate } from 'react-router';
import { classnames } from '@/shared/lib/styling';
import { Button, ErrorMessage, Loader } from '@/shared/ui/components';
import { CharacterCard } from '../character-card/CharacterCard';
import { Character } from '../../model';
import styles from './CharacterCardList.module.scss';

export interface CharacterCardListProps {
  characters: Character[];
  isLoading?: boolean;
  className?: string;
  error?: string;
}

export const CharacterCardList = ({
  characters = [],
  isLoading,
  className,
  error,
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
