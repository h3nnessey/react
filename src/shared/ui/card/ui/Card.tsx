import { PureComponent } from 'react';
import styles from './Card.module.scss';

export interface CardProps {
  imageUrl: string;
  title: string;
  description: string;
}

export class Card extends PureComponent<CardProps> {
  render() {
    const { imageUrl, title, description } = this.props;

    return (
      <div className={styles.card}>
        <img className={styles.image} src={imageUrl} alt={title} />
        <div className={styles.about}>
          <p className={styles.title}>{title}</p>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    );
  }
}
