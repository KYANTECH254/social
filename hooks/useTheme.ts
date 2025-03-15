"use client"

import { useState, useEffect } from 'react';
import { getFromLocalStorage } from "@/lib/Functions";

export const useTheme = () => {
  const [theme, setTheme] = useState<string | null>('system');

  useEffect(() => {
    const savedTheme = getFromLocalStorage('theme');
    if (savedTheme) setTheme(savedTheme);

    const handleStorageChange = () => {
      const newTheme = getFromLocalStorage('theme');
      if (newTheme !== theme) {
        setTheme(newTheme);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    const main = document.querySelector('main');
    if (main) {
      if (theme === 'dark') {
        main.classList.add('dark-mode');
        main.classList.remove('light-mode');
      } else if (theme === 'light') {
        main.classList.add('light-mode');
        main.classList.remove('dark-mode');
      } else {
        main.classList.remove('dark-mode');
        main.classList.remove('light-mode');
      }
    }

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [theme]);
};
