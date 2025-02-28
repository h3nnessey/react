import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button, ErrorMessage } from '@/shared/ui/components';
import { classnames } from '@/shared/lib/styling';
import { processSearchParams } from '@/shared/lib/url';
import type { GetCharacterReturnType } from '../../api';
import styles from './CharacterDetails.module.scss';

export type CharacterDetailsProps = GetCharacterReturnType & {
  className?: string;
};

export const CharacterDetails = ({
  data,
  error,
  className,
}: CharacterDetailsProps) => {
  const router = useRouter();

  const handleClose = () => {
    router.push({
      pathname: '/',
      search: processSearchParams({ ...router.query, id: undefined }),
    });
  };

  return (
    <div className={classnames(styles.container, className)}>
      {error && <ErrorMessage message={error} />}
      {data && (
        <>
          <Image
            className={styles.image}
            src={data.image}
            alt={`${data.name} image`}
            width={380}
            height={380}
          />
          <table className={styles.table} role="details-table">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{data.name}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{data.status}</td>
              </tr>
              <tr>
                <th>Type</th>
                <td>{data.type || 'unknown'}</td>
              </tr>
              <tr>
                <th>Species</th>
                <td>{data.species}</td>
              </tr>
              <tr>
                <th>Gender</th>
                <td>{data.gender}</td>
              </tr>
              <tr>
                <th>Origin</th>
                <td>{data.origin.name}</td>
              </tr>
              <tr>
                <th>Location</th>
                <td>{data.location.name}</td>
              </tr>
              <tr>
                <th>Episodes</th>
                <td>{data.episode.length}</td>
              </tr>
            </tbody>
          </table>
        </>
      )}
      <Button className={styles.btn} onClick={handleClose} variant="danger">
        &times;
      </Button>
    </div>
  );
};
