"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  // Load theme on first render
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="
        flex items-center gap-2
        px-4 py-2 rounded-full
        border border-gray-300 dark:border-gray-600
        bg-gray-100 dark:bg-gray-800
        text-black dark:text-white
        cursor-pointer
        transition-all duration-300
        hover:scale-105 active:scale-95
      "
    >
      <span className="text-lg">{isDark ? "☀️" : "🌙"}</span>
      <span className="text-sm">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}
