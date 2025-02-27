import { classnames } from '@/shared/lib/styling';
import { ErrorMessage } from '@/shared/ui/components';
import type { GetFilteredCharactersReturnType } from '../../api';
import { CharacterCard } from '../character-card/CharacterCard';
import styles from './CharacterCardList.module.scss';

type CharacterCardListProps = GetFilteredCharactersReturnType & {
  className?: string;
};

export const CharacterCardList = ({
  data,
  error,
  className,
}: CharacterCardListProps) => {
  return (
    <>
      {error && <ErrorMessage message={error} />}
      <div className={classnames(styles.container, className)}>
        {data && (
          <div className={styles.list}>
            {data.results.map(character => (
              <CharacterCard key={character.id} {...character} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
