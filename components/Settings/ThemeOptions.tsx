"use client";

import { useContext } from "react";
import { Moon } from "lucide-react";
import { ThemeContext } from "@/contexts/ThemeContext";
import Back from "../Buttons/Back";

export default function ThemeOptions() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeOptions must be used within a ThemeProvider");
  }

  const { theme, toggleTheme } = themeContext;

  return (
    <>
      <div className="first-container">
        <Back title="Theme" />
        <h4 className="p-4 container-sub-headings">Choose between Light and Dark mode.</h4>
        <div className="flex flex-col">
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
        </div>
      </div>
    </>
  );
}
