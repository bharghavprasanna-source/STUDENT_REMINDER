"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="flex items-center gap-2
      px-4 py-2
      rounded-full
      border border-gray-300 dark:border-gray-600
      bg-gray-100 dark:bg-gray-800
      text-sm font-medium
      hover:bg-gray-200 dark:hover:bg-gray-700
      transition-transform duration-300 cursor-pointer hover:scale-105 active:scale-95 hover:shadow-md pointer-events-auto"
    >
      <span className="text-lg">{darkMode ? "☀️" : "🌙"}</span>
      <span>{darkMode ? "Light" : "Dark"}</span>
    </button>
  );
}
