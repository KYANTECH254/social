"use client";

import { useContext } from "react";
import { Moon, ArrowLeft } from "lucide-react";
import ItemsNav from "@/components/ItemsNav/ItemsNav";
import TopNav from "@/components/TopNav/TopNav";
import { GoBack } from "@/lib/Functions";
import { ThemeContext } from "@/contexts/ThemeContext";

export default function ThemeOptions() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeOptions must be used within a ThemeProvider");
  }

  const { theme, toggleTheme } = themeContext;

  return (
    <main>
      <TopNav />
      <ItemsNav />

      <div className="settings-container">
        <button
          onClick={GoBack}
          className="flex items-center gap-2 text-blue-500 mb-4 back-button"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <h4 className="p-4 container-sub-headings">
          Choose between Light, Dark, and System mode.
        </h4>

        <div className="flex flex-col">
          {/* Dark / Light theme toggle */}
          <div
            onClick={toggleTheme}
            className="w-full p-4 flex items-center gap-3 cursor-pointer settings-ex-cards"
          >
            <span>Dark / Light Theme</span>
            <Moon
              size={36}
              className={`${theme === "dark" ? "mode-active" : ""} transition-all duration-200`}
            />
          </div>

          {/* System mode toggle */}
          <div className="w-full p-4 flex items-center gap-3 cursor-pointer settings-ex-cards">
            <span>Default System Mode</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={theme === 'system'}
                onChange={() => { }}
                disabled={theme === 'system'} // Disable the toggle when theme is set to 'system'
                className="h-6 w-11 rounded-full bg-gray-200 transition-colors duration-200 checked:bg-blue-500 cursor-pointer"
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </main>
  );
}
