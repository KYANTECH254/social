"use client";

import { Moon, ArrowLeft } from "lucide-react";
import ItemsNav from "@/components/ItemsNav/ItemsNav";
import TopNav from "@/components/TopNav/TopNav";
import { getFromLocalStorage, saveToLocalStorage } from "@/lib/Functions";
import { useState, useEffect } from "react";

export default function ThemeOptions() {
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    const savedTheme = getFromLocalStorage('theme');
    if (savedTheme) setTheme(savedTheme);
  }, []);

  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme);
    saveToLocalStorage('theme', selectedTheme);
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <main>
      <TopNav />
      <ItemsNav />

      <div className="settings-container">
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-blue-500 mb-4 back-button"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <h4 className="p-4 container-sub-headings">Choose between Light, Dark, and System mode.</h4>
        <div className="flex flex-col">
          <div
            onClick={() => handleThemeChange(theme === 'dark' ? 'light' : 'dark')}
            className="w-full p-4 flex items-center gap-3 cursor-pointer settings-ex-cards"
          >
            <span>Dark / Light Theme</span>
            <Moon
              size={20}
              className={`${theme !== 'system' ? 'mode-active' : ''}`}
            />
          </div>
          <div
            onClick={() => handleThemeChange('system')}
            className="w-full p-4 flex items-center gap-3 cursor-pointer settings-ex-cards"
          >
            <span>Default System Mode</span>
            {theme === 'system' ? (
              <input
                type="checkbox"
                checked
                className="h-6 w-11 rounded-full bg-gray-200 transition-colors duration-200 checked:bg-blue-500 cursor-pointer"
                readOnly
              />
            ) : (
              <Moon size={20} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}