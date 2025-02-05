import { SearchContextComponent } from '@/app/providers/search';
import { CardList, Loader, Button, ErrorMessage } from '@/shared/ui/';
import type { Character } from '@/shared/api/characters';
import { Header } from '@/widgets/header';
import styles from './MainPage.module.scss';

interface MainPageState {
  hasError: boolean;
}

const characterMapper = ({ id, image, name, status }: Character) => {
  return {
    id,
    imageUrl: image,
    title: name,
    description: status,
  };
};

export class MainPage extends SearchContextComponent<unknown, MainPageState> {
  state: MainPageState = {
    hasError: false,
  };

  handleThrowErrorClick = () => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) {
      throw new Error('Test Error');
    }

    const { characters, isLoading, error } = this.context;
    const items = characters.map(characterMapper);

    return (
      <>
        <Header />
        <main className={styles.main}>
          {isLoading ? <Loader /> : <CardList items={items} />}
          {!isLoading && error && <ErrorMessage message={error} />}
          <Button onClick={this.handleThrowErrorClick}>Throw Error</Button>
        </main>
      </>
    );
  }
}
