import { useParams } from 'react-router';
import { useCharacter } from '@/shared/api/characters/hooks';
import { ErrorMessage, Loader } from '@/shared/ui';
import styles from './CharacterDetails.module.scss';

export const CharacterDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useCharacter(Number(id));

  return (
    <div className={styles.container}>
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};
