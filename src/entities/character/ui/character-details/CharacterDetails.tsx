import { Link } from 'react-router';
import { Button, ErrorMessage, Loader } from '@/shared/ui/components';
import { classnames } from '@/shared/lib/styling';
import type { Character } from '../../model';
import styles from './CharacterDetails.module.scss';

interface CharacterDetailsProps {
  character: Character | null;
  linkTo: {
    pathname: string;
    search: string;
  };
  isLoading?: boolean;
}

export const CharacterDetails = ({
  character,
  isLoading = false,
  linkTo,
}: CharacterDetailsProps) => {
  return (
    <div className={classnames(styles.container, 'character-details')}>
      {isLoading && <Loader />}
      {character ? (
        <>
          <Link className={classnames(styles.link, 'link')} to={linkTo} />
          <img
            src={character.image}
            alt={character.name}
            className={styles.image}
            role="img"
          />
          <table className={styles.table}>
            <tbody>
              <tr>
                <th>Name</th>
                <td>{character.name}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{character.status}</td>
              </tr>
              <tr>
                <th>Type</th>
                <td>{character.type || 'unknown'}</td>
              </tr>
              <tr>
                <th>Species</th>
                <td>{character.species}</td>
              </tr>
              <tr>
                <th>Gender</th>
                <td>{character.gender}</td>
              </tr>
              <tr>
                <th>Origin</th>
                <td>{character.origin.name}</td>
              </tr>
              <tr>
                <th>Location</th>
                <td>{character.location.name}</td>
              </tr>
              <tr>
                <th>Episodes</th>
                <td>{character.episode.length}</td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <ErrorMessage message={'Character not found'} />
      )}
      <Button className={styles.btn} variant="danger">
        <Link className="link" to={linkTo}>
          <span className={styles.close}>Close</span>
        </Link>
      </Button>
    </div>
  );
};
