import { Component } from 'react';
import styles from './Loader.module.scss';

export class Loader extends Component {
  render() {
    return (
      <div className={styles.container}>
        <span className={styles.loader}></span>
      </div>
    );
  }
}
