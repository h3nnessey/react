import { Component } from 'react';
import styles from './Loader.module.scss';

export class Loader extends Component {
  render() {
    return <span className={styles.loader}></span>;
  }
}
