import { classnames } from '@/shared/lib/styling';
import styles from './Card.module.scss';

export interface CardProps {
  imageUrl: string;
  title: string;
  description: string;
  className?: string;
}

export const Card = ({
  imageUrl,
  title,
  description,
  className,
}: CardProps) => {
  return (
    <div className={classnames(styles.card, className)}>
      <img className={styles.image} src={imageUrl} alt={title} />
      <div className={styles.about}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};
