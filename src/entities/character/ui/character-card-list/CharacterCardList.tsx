'use client';
import { classnames } from '@/shared/lib/styling';
import { ErrorMessage, Loader } from '@/shared/ui/components';
import { useAppSelector } from '@/store';
import type { GetCharactersOkResponse } from '../../api';
import { charactersSlice } from '../../model';
import { CharacterCard } from '../character-card/CharacterCard';
import styles from './CharacterCardList.module.scss';

export type CharacterCardListProps = {
  data: GetCharactersOkResponse | null;
  error: string | null;
  className?: string;
};

export const CharacterCardList = ({
  data,
  error,
  className,
}: CharacterCardListProps) => {
  const isLoading = useAppSelector(charactersSlice.selectors.isLoading);

  return (
    <div className={classnames(styles.container, className)}>
      {isLoading && <Loader />}
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
