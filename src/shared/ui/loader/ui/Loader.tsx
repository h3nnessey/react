import { Component } from 'react';
import { classnames } from '@/shared/lib/styling';
import styles from './Loader.module.scss';

interface LoaderProps {
  className?: string;
}

export class Loader extends Component<LoaderProps> {
  render() {
    return (
      <div className={classnames(styles.container, this.props.className)}>
        <span className={styles.loader}></span>
      </div>
    );
  }
}
