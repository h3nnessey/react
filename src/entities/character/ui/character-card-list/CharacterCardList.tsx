import { classnames } from '@/shared/lib/styling';
import { ErrorMessage } from '@/shared/ui/components';
import type { GetFilteredCharactersReturnType } from '../../api';
import { CharacterCard } from '../character-card/CharacterCard';
import styles from './CharacterCardList.module.scss';

export type CharacterCardListProps = GetFilteredCharactersReturnType & {
  className?: string;
};

export const CharacterCardList = ({
  data,
  error,
  className,
}: CharacterCardListProps) => {
  return (
    <div className={classnames(styles.container, className)}>
      {error && <ErrorMessage message={error} />}
      {data && (
        <div className={styles.list} role="character-card-list">
          {data.results.map(character => (
            <CharacterCard key={character.id} {...character} />
          ))}
        </div>
      )}
    </div>
  );
};
