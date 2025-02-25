"use client";
import { useContext, useEffect, useState } from "react";
import { Moon } from "lucide-react";
import { ThemeContext } from "@/contexts/ThemeContext";
import Back from "../Buttons/Back";

export default function ThemeOptions() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeOptions must be used within a ThemeProvider");
  }

  const { theme, toggleTheme } = themeContext;
  const [isSystemMode, setIsSystemMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setIsSystemMode(storedTheme === "system");
  }, [theme]); // Added theme as a dependency

  const handleSystemToggle = () => {
    localStorage.setItem("theme", "system");
    setIsSystemMode(true);
  };

  return (
    <>
      <div className="first-container">
        <Back title="Theme" />

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
                checked={isSystemMode}
                onChange={handleSystemToggle}
                disabled={isSystemMode} // Disable the toggle when theme is set to 'system'
                className="h-6 w-11 rounded-full bg-gray-200 transition-colors duration-200 checked:bg-blue-500 cursor-pointer"
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </ >
  );
}
