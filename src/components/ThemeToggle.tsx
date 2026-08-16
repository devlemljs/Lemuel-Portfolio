import { Monitor, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { themeMode, setThemeMode } = useTheme();

  return (
    <div className={cn(
      "flex items-center bg-white/90 dark:bg-[#141419]/90 backdrop-blur-md border border-slate-200/90 dark:border-slate-800/90 rounded-full p-0.5 gap-0.5 shadow-2xs transition-all duration-300 z-30",
      className
    )}>
      <button
        type="button"
        onClick={() => setThemeMode('system')}
        className={cn(
          "w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 active:scale-95",
          themeMode === 'system'
            ? "bg-slate-150 dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs font-medium"
            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        )}
        title="System Mode"
        aria-label="System Mode"
      >
        <Monitor className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
      </button>
      <button
        type="button"
        onClick={() => setThemeMode('light')}
        className={cn(
          "w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 active:scale-95",
          themeMode === 'light'
            ? "bg-slate-150 dark:bg-slate-800 text-amber-500 dark:text-amber-400 shadow-xs font-medium"
            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        )}
        title="Light Mode"
        aria-label="Light Mode"
      >
        <Sun className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
      </button>
      <button
        type="button"
        onClick={() => setThemeMode('dark')}
        className={cn(
          "w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 active:scale-95",
          themeMode === 'dark'
            ? "bg-slate-150 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs font-medium"
            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        )}
        title="Dark Mode"
        aria-label="Dark Mode"
      >
        <Moon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
      </button>
    </div>
  );
}
