import { PureComponent } from 'react';
import { Card, type CardProps } from '../../card';
import styles from './CarList.module.scss';

interface CardListItem extends CardProps {
  id: number;
}

interface CardListProps {
  items: CardListItem[];
}

export class CardList extends PureComponent<CardListProps> {
  render() {
    const { items } = this.props;

    return (
      <>
        {items.length === 0 ? (
          <p>No results</p>
        ) : (
          <div className={styles.cardList}>
            {this.props.items.map(props => (
              <Card key={props.id} {...props} />
            ))}
          </div>
        )}
      </>
    );
  }
}
