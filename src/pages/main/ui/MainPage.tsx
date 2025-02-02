import { SearchContextComponent } from '@/app/providers/search';
import { CharacterCardList } from '@/entities/character';
import { Header } from '@/widgets/header';

export class MainPage extends SearchContextComponent {
  render() {
    return (
      <>
        <Header />
        <main>
          <CharacterCardList characters={this.context.items} />
        </main>
      </>
    );
  }
}
