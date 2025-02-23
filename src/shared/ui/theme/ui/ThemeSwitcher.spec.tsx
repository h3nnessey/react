import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Theme, ThemeContext } from '../lib/ThemeContext';
import { ThemeSwitcher } from './ThemeSwitcher';

describe('ThemeSwitcher', () => {
  const mockSwitchTheme = vi.fn();

  const renderWithThemeContext = (theme: Theme) => {
    return render(
      <ThemeContext.Provider
        value={{
          theme,
          switchTheme: mockSwitchTheme,
          ThemeSwitcher: () => null,
        }}
      >
        <ThemeSwitcher />
      </ThemeContext.Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render switch component with dark theme', () => {
    renderWithThemeContext(Theme.Dark);

    const switchElement = screen.getByRole('switch', {
      name: /turn on light theme/i,
    });

    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toHaveAttribute('title', 'Turn on light theme');

    const inputElement = screen.getByRole('checkbox');

    expect(inputElement).toBeChecked();
  });

  it('should render switch component with light theme enabled', () => {
    renderWithThemeContext(Theme.Light);

    const switchElement = screen.getByRole('switch', {
      name: /turn on dark theme/i,
    });

    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toHaveAttribute('title', 'Turn on dark theme');

    const inputElement = screen.getByRole('checkbox');

    expect(inputElement).not.toBeChecked();
  });

  it('should call switchTheme when switch is toggled', () => {
    renderWithThemeContext(Theme.Dark);

    const inputElement = screen.getByRole('checkbox');

    fireEvent.click(inputElement);

    expect(mockSwitchTheme).toHaveBeenCalled();
  });
});
