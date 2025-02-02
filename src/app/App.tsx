import { Component } from 'react';
import { CharactersApi, type Character } from '@/shared/api/characters';
import './styles/global.scss';

interface AppState {
  characters: Character[];
}

export default class App extends Component<null, AppState> {
  state: AppState = {
    characters: [],
  };

  componentDidMount() {
    CharactersApi.getCharacters().then(result => {
      this.setState({
        characters: result.success ? result.data.results : [],
      });
    });
  }

  render() {
    return (
      <>
        {this.state.characters.map(character => (
          <div key={character.id}>
            <p>{character.name}</p>
          </div>
        ))}
      </>
    );
  }
}
