
import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-teal-600 dark:hover:text-teal-300 transition-all hover:scale-110 active:scale-95"
      aria-label="Toggle Theme"
    >
      {isDark ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};
