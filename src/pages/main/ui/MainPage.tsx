import { SearchContextComponent } from '@/app/providers/search';
import type { Character } from '@/shared/api/characters';
import { CardList, Loader } from '@/shared/ui/';
import { Header } from '@/widgets/header';

export class MainPage extends SearchContextComponent {
  private mapCharacter = ({ id, image, name, status }: Character) => {
    return {
      id,
      imageUrl: image,
      title: name,
      description: status,
    };
  };

  render() {
    const { characters, isLoading } = this.context;

    const items = characters.map(this.mapCharacter);

    return (
      <>
        <Header />
        <main>{isLoading ? <Loader /> : <CardList items={items} />}</main>
      </>
    );
  }
}
