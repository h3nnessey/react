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
  return (
    <>
      {!!characters.length && (
        <div className={classnames(styles.cardList, className)}>
          {characters.map(character => (
            <CharacterCard key={character.id} {...character} />
          ))}
        </div>
      )}
    </>
  );
};
