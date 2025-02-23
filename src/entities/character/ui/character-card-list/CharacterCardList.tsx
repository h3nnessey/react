import { classnames } from '@/shared/lib/styling';
import { Loader } from '@/shared/ui/components';
import { CharacterCard } from '../character-card/CharacterCard';
import type { Character } from '../../model';
import styles from './CharacterCardList.module.scss';

export interface CharacterCardListProps {
  characters: Character[];
  isLoading?: boolean;
  className?: string;
}

export const CharacterCardList = ({
  characters = [],
  isLoading,
  className,
}: CharacterCardListProps) => {
  return (
    <div className={styles.container}>
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
