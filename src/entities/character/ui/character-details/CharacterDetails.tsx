import Image from 'next/image';
import Link from 'next/link';
import { Button, ErrorMessage } from '@/shared/ui/components';
import { classnames } from '@/shared/lib/styling';
import type { GetCharacterReturnType } from '../../api';
import styles from './CharacterDetails.module.scss';

export type CharacterDetailsProps = GetCharacterReturnType & {
  className?: string;
  searchParams?: { [key: string]: string | string[] | undefined };
};

export const CharacterDetails = ({
  data,
  error,
  className,
  searchParams = {},
}: CharacterDetailsProps) => {
  const href = {
    pathname: '/',
    query: {
      ...searchParams,
    },
  };

  return (
    <div
      className={classnames(styles.container, className)}
      data-testid="container"
    >
      {error && <ErrorMessage message={error} />}
      {data && (
        <>
          <Link className={classnames(styles.link, 'link')} href={href} />
          <Image
            className={styles.image}
            src={data.image}
            alt={`${data.name} image`}
            width={380}
            height={380}
            priority
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
      <Button
        className={styles.btn}
        data-testid="close-button"
        variant="danger"
      >
        <Link className="link" href={href}>
          &times;
        </Link>
      </Button>
    </div>
  );
};
