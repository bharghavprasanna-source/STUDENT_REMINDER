"use client";

import { useEffect, useState } from "react";

export default function HeaderSummary() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const now = new Date();
  const progressPercent = (now.getHours() / 24) * 100;

  const quote = "Small steps today lead to big success tomorrow 🚀";

  return (
    <section className="mb-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-400">
        {greeting}, Name 👋
      </h1>

      <p className="mt-1 text-gray-600 dark:text-gray-400">{today}</p>
      <div className="mt-4">
        <div
          className="h-1
                      w-full
                      sm:max-w-sm
                      md:max-w-md
                      lg:max-w-lg
                      bg-gray-200 dark:bg-gray-700
                      rounded-full
                      overflow-hidden"
        >
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <p className="mt-4 italic text-gray-700 dark:text-gray-400">“{quote}”</p>
    </section>
  );
}
