import { useState, type ReactNode } from 'react';
import { ThemeContext, Theme } from '../lib/ThemeContext';
import { ThemeSwitcher } from './ThemeSwitcher';

interface ThemeProviderProps {
  children?: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(Theme.Dark);

  const switchTheme = () => {
    setTheme(prev => (prev === Theme.Dark ? Theme.Light : Theme.Dark));
  };

  return (
    <ThemeContext.Provider value={{ theme, switchTheme, ThemeSwitcher }}>
      <div className={theme} />
      {children}
    </ThemeContext.Provider>
  );
};
