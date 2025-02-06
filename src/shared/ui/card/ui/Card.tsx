import { classnames } from '@/shared/lib/styling';
import styles from './Card.module.scss';

export interface CardProps {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  className?: string;
}

export const Card = ({
  title,
  imageUrl,
  description,
  className,
}: CardProps) => {
  return (
    <>
      <div className={classnames(styles.card, className)}>
        <img className={styles.image} src={imageUrl} alt={title} />
        <div className={styles.about}>
          <p className={styles.title}>{title}</p>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </>
  );
};
