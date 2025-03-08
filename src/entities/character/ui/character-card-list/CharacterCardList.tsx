import { classnames } from '@/shared/lib/styling';
import { ErrorMessage, Loader } from '@/shared/ui/components';
import { CharacterCard } from '../character-card/CharacterCard';
import type { Character } from '../../model';
import styles from './CharacterCardList.module.scss';

export interface CharacterCardListProps {
  characters: Character[];
  className?: string;
  isLoading?: boolean;
}

export const CharacterCardList = ({
  characters,
  className,
  isLoading = false,
}: CharacterCardListProps) => {
  return (
    <div className={classnames(styles.container, className, 'character-list')}>
      {isLoading && <Loader />}
      {characters.length > 0 ? (
        <div className={styles.list}>
          {characters.map(character => (
            <CharacterCard key={character.id} {...character} />
          ))}
        </div>
      ) : (
        <ErrorMessage message="Nothing found" />
      )}
    </div>
  );
};
