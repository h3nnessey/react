import { SearchContextComponent } from '@/app/providers/search';
import type { Character } from '@/shared/api/characters';
import { CharacterCard } from '../character-card/CharacterCard';

interface CharacterCardListProps {
  characters: Character[];
}

export class CharacterCardList extends SearchContextComponent<CharacterCardListProps> {
  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 320px))',
          gap: '20px',
        }}
      >
        {this.props.characters.map(({ id, image, name, status }) => (
          <CharacterCard
            key={id}
            imageUrl={image}
            title={name}
            description={status}
          />
        ))}
      </div>
    );
  }
}
