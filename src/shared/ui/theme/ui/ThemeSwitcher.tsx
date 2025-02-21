import { Button, type ButtonProps } from '../../components/button';
import { useTheme } from '../lib/useTheme';

export type ThemeSwitcherProps = ButtonProps;

export const ThemeSwitcher = (props: ThemeSwitcherProps) => {
  const { theme, switchTheme } = useTheme();

  return (
    <Button onClick={switchTheme} {...props}>
      {theme}
    </Button>
  );
};
