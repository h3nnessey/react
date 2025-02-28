import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from './ThemeProvider';
import { ThemeContext } from '../lib/ThemeContext';

describe('ThemeSwitcher component', () => {
  it('should properly set title attribute on switch', () => {
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ ThemeSwitcher }) => <ThemeSwitcher />}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    const switchElement = screen.getByRole<HTMLLabelElement>('switch');

    expect(switchElement).toHaveAttribute('title', 'Turn on light theme');

    fireEvent.click(switchElement);

    expect(switchElement).toHaveAttribute('title', 'Turn on dark theme');
  });
});
