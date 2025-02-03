import { SearchContextComponent } from '@/app/providers/search';
import type { Character } from '@/shared/api/characters';
import { CardList, Loader, Button } from '@/shared/ui/';
import { ErrorMessage } from '@/shared/ui/error-message';
import { Header } from '@/widgets/header';
import styles from './MainPage.module.scss';

interface MainPageProps {
  hasError: boolean;
}

export class MainPage extends SearchContextComponent<unknown, MainPageProps> {
  state: MainPageProps = {
    hasError: false,
  };

  private mapCharacter = ({ id, image, name, status }: Character) => {
    return {
      id,
      imageUrl: image,
      title: name,
      description: status,
    };
  };

  private handleThrowErrorClick = () => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) {
      throw new Error('Test Error');
    }

    const { characters, isLoading, error } = this.context;

    const items = characters.map(this.mapCharacter);

    return (
      <>
        <Header />
        <main className={styles.main}>
          {isLoading ? <Loader /> : <CardList items={items} />}
          {!isLoading && error && <ErrorMessage message={error} />}
          <Button text="Throw Error" onClick={this.handleThrowErrorClick} />
        </main>
      </>
    );
  }
}
