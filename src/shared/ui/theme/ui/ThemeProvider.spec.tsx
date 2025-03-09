import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from './ThemeProvider';
import { Theme, ThemeContext } from '../lib/ThemeContext';

describe('ThemeProvider context provider', () => {
  it('should provide ThemeSwitcher component', () => {
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ ThemeSwitcher }) => (
            <div>
              <ThemeSwitcher />
            </div>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    const switchElement = screen.getByRole<HTMLLabelElement>('switch');

    expect(switchElement).toBeInTheDocument();
  });

  it('should provide switchTheme function and properly switch theme', () => {
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ theme, switchTheme }) => (
            <div data-testid="theme" onClick={switchTheme}>
              {theme}
            </div>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    const divElement = screen.getByTestId('theme');

    expect(divElement).toHaveTextContent(Theme.Dark);

    fireEvent.click(divElement);

    expect(divElement).toHaveTextContent(Theme.Light);

    fireEvent.click(divElement);

    expect(divElement).toHaveTextContent(Theme.Dark);
  });
});
