import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThemeProvider } from './ThemeProvider';
import { ThemeContext, Theme } from '../lib/ThemeContext';
import { ThemeSwitcher } from './ThemeSwitcher';

vi.mock('./ThemeSwitcher', () => ({
  ThemeSwitcher: vi.fn(() => <div data-testid="theme-switcher" />),
}));

describe('ThemeProvider', () => {
  it('should provide the dark theme by default', () => {
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ theme }) => <div data-testid="theme">{theme}</div>}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    const themeElement = screen.getByTestId('theme');
    expect(themeElement).toHaveTextContent(Theme.Dark);
  });

  it('should switch the theme when switchTheme is called', () => {
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ theme, switchTheme }) => (
            <div>
              <div data-testid="theme">{theme}</div>
              <button onClick={switchTheme} data-testid="switch-theme-button">
                Switch Theme
              </button>
            </div>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    const themeElement = screen.getByTestId('theme');
    expect(themeElement).toHaveTextContent(Theme.Dark);

    const switchButton = screen.getByTestId('switch-theme-button');
    fireEvent.click(switchButton);

    expect(themeElement).toHaveTextContent(Theme.Light);

    fireEvent.click(switchButton);

    expect(themeElement).toHaveTextContent(Theme.Dark);
  });

  it('should render the ThemeSwitcher component', () => {
    render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>
    );

    const themeSwitcherElement = screen.getByTestId('theme-switcher');
    expect(themeSwitcherElement).toBeInTheDocument();
  });
});
