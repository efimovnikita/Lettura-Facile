import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`group relative flex h-7 w-14 items-center rounded-full transition-all duration-300 focus:outline-none shadow-inner border-2 shrink-0 ${
        theme === 'dark' 
          ? 'bg-indigo-600 border-indigo-500' 
          : 'bg-stone-200 border-stone-100'
      } ${className}`}
      aria-label="Cambia tema"
    >
      {/* Track Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
        <Sun className={`w-3 h-3 ${theme === 'light' ? 'opacity-0' : 'text-white opacity-40'}`} />
        <Moon className={`w-3 h-3 ${theme === 'dark' ? 'opacity-0' : 'text-stone-400 opacity-60'}`} />
      </div>

      {/* Sliding Knob */}
      <div
        className={`h-5 w-5 rounded-full bg-white shadow-lg transition-all duration-300 ease-in-out ${
          theme === 'dark' ? 'translate-x-7.5' : 'translate-x-0.5'
        } flex items-center justify-center border border-stone-100/50 overflow-hidden`}
      >
        {theme === 'light' ? (
          <Sun className="w-3.5 h-3.5 text-amber-500 transition-colors" />
        ) : (
          <Moon className="w-3.5 h-3.5 text-indigo-600 transition-colors" />
        )}
      </div>
    </button>
  );
};
