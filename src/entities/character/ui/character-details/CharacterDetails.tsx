import { useLocation, useNavigate, useParams } from 'react-router';
import { useCharacter } from '@/shared/api/characters/hooks';
import { Button, ErrorMessage, Loader } from '@/shared/ui';
import styles from './CharacterDetails.module.scss';

export const CharacterDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const { data, error, isLoading } = useCharacter(Number(id));

  const handleClick = () => {
    navigate({
      pathname: '/',
      search: location.search,
    });
  };

  return (
    <div className={styles.container} key={id} role="details">
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {data && (
        <>
          <img
            src={data.image}
            alt={data.name}
            className={styles.image}
            role="img"
          />
          <table className={styles.table}>
            <tbody>
              <tr role="name">
                <th>Name</th>
                <td>{data.name}</td>
              </tr>
              <tr role="status">
                <th>Status</th>
                <td>{data.status}</td>
              </tr>
              <tr role="type">
                <th>Type</th>
                <td>{data.type || 'unknown'}</td>
              </tr>
              <tr role="species">
                <th>Species</th>
                <td>{data.species}</td>
              </tr>
              <tr role="gender">
                <th>Gender</th>
                <td>{data.gender}</td>
              </tr>
              <tr role="origin">
                <th>Origin</th>
                <td>{data.origin.name}</td>
              </tr>
              <tr role="location">
                <th>Location</th>
                <td>{data.location.name}</td>
              </tr>
              <tr role="episodes">
                <th>Episodes</th>
                <td>{data.episode.length}</td>
              </tr>
            </tbody>
          </table>
        </>
      )}
      <Button onClick={handleClick} className={styles.btn} variant="danger">
        &times;
      </Button>
    </div>
  );
};
