import type { Character } from '@/shared/api/characters';
import { classnames } from '@/shared/lib/styling';
import { ErrorMessage, Loader } from '@/shared/ui/components';
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
  return (
    <div className={styles.container}>
      {error && <ErrorMessage message={error} />}
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
