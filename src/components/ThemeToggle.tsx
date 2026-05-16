import { useTheme } from './ThemeProvider';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative w-10 h-10 rounded-full bg-secondary/70 hover:bg-secondary border border-border hover:border-primary/40 text-foreground transition-all duration-300 flex items-center justify-center group overflow-hidden"
    >
      {/* Sun */}
      <i
        className={`fas fa-sun absolute text-base transition-all duration-500 ease-out text-primary ${
          isDark
            ? 'opacity-0 -translate-y-5 rotate-90 scale-50'
            : 'opacity-100 translate-y-0 rotate-0 scale-100'
        }`}
        aria-hidden="true"
      />
      {/* Moon */}
      <i
        className={`fas fa-moon absolute text-base transition-all duration-500 ease-out text-primary ${
          isDark
            ? 'opacity-100 translate-y-0 rotate-0 scale-100'
            : 'opacity-0 translate-y-5 -rotate-90 scale-50'
        }`}
        aria-hidden="true"
      />
      <span className="sr-only">{isDark ? 'Dark mode active' : 'Light mode active'}</span>
    </button>
  );
};

export default ThemeToggle;
