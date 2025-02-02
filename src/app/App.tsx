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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          padding: '20px',
        }}
      >
        {this.state.characters.map(character => (
          <div key={character.id}>
            <img src={character.image} width={100} height={100} />
            <p>{character.name}</p>
          </div>
        ))}
      </div>
    );
  }
}
