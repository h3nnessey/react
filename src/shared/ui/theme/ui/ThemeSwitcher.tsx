import { useTheme } from '../lib/useTheme';
import { Theme } from '../lib/ThemeContext';
import { Switch } from '../../components';
import { classnames } from '@/shared/lib/styling';

export interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { theme, switchTheme } = useTheme();
  const isDarkTheme = theme === Theme.Dark;

  return (
    <Switch
      className={classnames(theme, className)}
      checked={isDarkTheme}
      onChange={switchTheme}
      title={isDarkTheme ? 'Turn on light theme' : 'Turn on dark theme'}
    />
  );
};
