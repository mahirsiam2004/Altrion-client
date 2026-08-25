import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-sand-linen dark:bg-surface-dark-soft hover:scale-105 transition-transform"
      aria-label="থিম পরিবর্তন করুন"
      title={theme === 'light' ? 'ডার্ক মোড' : 'লাইট মোড'}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-sand-accent-strong" />
      ) : (
        <Sun className="w-5 h-5 text-sand-almond-silk" />
      )}
    </button>
  );
};

export default ThemeToggle;
