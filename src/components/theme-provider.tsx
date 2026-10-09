import * as React from 'react';
import { AnimatedThemeToggler, type TransitionVariant } from '@/components/ui/animated-theme-toggler';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextType>({
  theme: 'dark',
  setTheme: () => {},
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('pdf-nup-theme') as Theme | null;
      if (stored === 'light' || stored === 'dark') return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('pdf-nup-theme', theme);
  }, [theme]);

  const setTheme = React.useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  const toggleTheme = React.useCallback(() => {
    setThemeState((t) => (t === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return React.useContext(ThemeContext);
}

/**
 * Navbar theme toggle using Magic UI AnimatedThemeToggler
 */
export function ThemeToggle({
  className,
  variant = 'circle',
}: {
  className?: string;
  variant?: TransitionVariant;
}) {
  const { theme, setTheme } = useTheme();

  return (
    <AnimatedThemeToggler
      theme={theme}
      onThemeChange={setTheme}
      variant={variant}
      duration={450}
      className={className}
    />
  );
}

export { AnimatedThemeToggler };
