import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThemeProvider } from './ThemeProvider';
import { ThemeContext, Theme } from '../lib/ThemeContext';
import { ThemeSwitcher } from './ThemeSwitcher';

// Mock the ThemeSwitcher component
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

    // Verify that the default theme is dark
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

    // Verify the initial theme is dark
    const themeElement = screen.getByTestId('theme');
    expect(themeElement).toHaveTextContent(Theme.Dark);

    // Simulate clicking the button to switch the theme
    const switchButton = screen.getByTestId('switch-theme-button');
    fireEvent.click(switchButton);

    // Verify the theme has switched to light
    expect(themeElement).toHaveTextContent(Theme.Light);

    // Simulate clicking the button again to switch back to dark
    fireEvent.click(switchButton);

    // Verify the theme has switched back to dark
    expect(themeElement).toHaveTextContent(Theme.Dark);
  });

  it('should render the ThemeSwitcher component', () => {
    render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>
    );

    // Verify that the ThemeSwitcher component is rendered
    const themeSwitcherElement = screen.getByTestId('theme-switcher');
    expect(themeSwitcherElement).toBeInTheDocument();
  });
});
