import Image from 'next/image';
import { Button } from '@/shared/ui/components';
import { classnames } from '@/shared/lib/styling';
import { Character } from '../../model';
import styles from './CharacterDetails.module.scss';

interface CharacterDetailsProps {
  character: Character;
  className?: string;
}

export const CharacterDetails = ({
  character,
  className,
}: CharacterDetailsProps) => {
  const {
    id,
    image,
    name,
    status,
    species,
    episode,
    gender,
    origin,
    location,
    type,
  } = character;

  const handleClick = () => {
    // router({
    //   pathname: '/',
    //   search: location.search,
    // });
  };

  return (
    <div
      className={classnames(styles.container, className)}
      key={id}
      role="character-details"
    >
      <Image src={image} alt={name} className={styles.image} role="img" />
      <table className={styles.table}>
        <tbody>
          <tr>
            <th>Name</th>
            <td role="name">{name}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td role="status">{status}</td>
          </tr>
          <tr>
            <th>Type</th>
            <td role="type">{type || 'unknown'}</td>
          </tr>
          <tr>
            <th>Species</th>
            <td role="species">{species}</td>
          </tr>
          <tr>
            <th>Gender</th>
            <td role="gender">{gender}</td>
          </tr>
          <tr>
            <th>Origin</th>
            <td role="origin">{origin.name}</td>
          </tr>
          <tr>
            <th>Location</th>
            <td role="location">{location.name}</td>
          </tr>
          <tr>
            <th>Episodes</th>
            <td role="episodes">{episode.length}</td>
          </tr>
        </tbody>
      </table>
      <Button onClick={handleClick} className={styles.btn} variant="danger">
        &times;
      </Button>
    </div>
  );
};
