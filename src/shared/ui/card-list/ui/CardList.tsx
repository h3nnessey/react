import { Component } from 'react';
import { Card, type CardProps } from '../../card';
import { classnames } from '@/shared/lib/styling';
import styles from './CardList.module.scss';

interface CardListItem extends Omit<CardProps, 'className'> {
  id: number;
}

interface CardListProps {
  items: CardListItem[];
  className?: string;
}

export class CardList extends Component<CardListProps> {
  render() {
    const { items, className } = this.props;

    return (
      <>
        {items.length > 0 ? (
          <div className={classnames(styles.cardList, className)}>
            {items.map(props => (
              <Card key={props.id} {...props} />
            ))}
          </div>
        ) : null}
      </>
    );
  }
}
