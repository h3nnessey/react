import { Component } from 'react';
import './styles/global.scss';

export default class App extends Component {
  render() {
    if (Math.random() > 0.5) {
      throw new Error('Render Error');
    }

    return <h1>Lorem ipsum dolor sit amet.</h1>;
  }
}
