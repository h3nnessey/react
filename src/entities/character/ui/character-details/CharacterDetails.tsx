import { useParams } from 'react-router';
import styles from './CharacterDetails.module.scss';

export const CharacterDetails = () => {
  const { id } = useParams<{ id: string }>();

  return <div className={styles.container}>ID {id}</div>;
};
