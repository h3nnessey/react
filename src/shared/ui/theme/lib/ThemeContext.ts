import { createContext, FunctionComponent } from 'react';
import type { ThemeSwitcherProps } from '../ui/ThemeSwitcher';

export enum Theme {
  Light = 'app-theme-light',
  Dark = 'app-theme-dark',
}

export interface ThemeContextValue {
  theme: Theme;
  switchTheme: () => void;
  ThemeSwitcher: FunctionComponent<ThemeSwitcherProps>;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: Theme.Dark,
  switchTheme: () => {},
  ThemeSwitcher: () => null,
});
