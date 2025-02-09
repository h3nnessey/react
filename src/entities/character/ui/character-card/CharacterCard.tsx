import type { Character } from '@/shared/api/characters';
import { classnames } from '@/shared/lib/styling';
import styles from './CharacterCard.module.scss';

export interface CharacterCardProps extends Character {
  className?: string;
}

export const CharacterCard = ({
  name,
  status,
  image,
  className,
}: CharacterCardProps) => {
  return (
    <>
      <div className={classnames(styles.card, className)} title={name}>
        <img className={styles.image} src={image} alt={name} />
        <div className={styles.about}>
          <p className={styles.title}>{name}</p>
          <p className={(classnames(styles.description), styles.status)}>
            {status}
          </p>
        </div>
      </div>
    </>
  );
};
