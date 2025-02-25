import { classnames } from '@/shared/lib/styling';
import { CharacterCard } from '../character-card/CharacterCard';
import type { Character } from '../../model';
import styles from './CharacterCardList.module.scss';

export interface CharacterCardListProps {
  characters: Character[];
  className?: string;
}

export const CharacterCardList = ({
  characters = [],
  className,
}: CharacterCardListProps) => {
  return (
    <div className={classnames(styles.container, className)}>
      {!!characters.length && (
        <div className={styles.list}>
          {characters.map(character => (
            <CharacterCard key={character.id} {...character} />
          ))}
        </div>
      )}
    </div>
  );
};
