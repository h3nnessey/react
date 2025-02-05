import { Component } from 'react';
import { Card, type CardProps } from '../../card';
import styles from './CardList.module.scss';

interface CardListItem extends CardProps {
  id: number;
}

interface CardListProps {
  items: CardListItem[];
}

export class CardList extends Component<CardListProps> {
  render() {
    const { items } = this.props;

    return (
      <>
        {items.length > 0 ? (
          <div className={styles.cardList}>
            {items.map(props => (
              <Card key={props.id} {...props} />
            ))}
          </div>
        ) : null}
      </>
    );
  }
}
