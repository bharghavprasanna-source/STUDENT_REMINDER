"use client";

import { useEffect, useState } from "react";
import { useTasks, getTaskColorClasses } from "../context/TaskContext";

export default function HeaderSummary() {
  const { tasks } = useTasks();

  const [greeting, setGreeting] = useState("");

  /* ---------------- Greeting ---------------- */
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  /* ---------------- Date ---------------- */
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  const formattedDate = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  /* ---------------- Day Progress ---------------- */
  const progressPercent = (today.getHours() / 24) * 100;

  /* ---------------- Tasks Logic ---------------- */
  const todaysTasks = tasks.filter(
    (task) => task.deadline === todayStr && !task.completed
  );

  const completedCount = tasks.filter((task) => task.completed).length;

  const upcomingEvent = tasks
    .filter(
      (task) =>
        task.type === "event" && task.deadline > todayStr && !task.completed
    )
    .sort(
      (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    )[0];

  const quote = "Small steps today lead to big success tomorrow 🚀";

  return (
    <section className="mb-8">
      {/* Greeting */}
      <h1 className="text-2xl font-bold text-black dark:text-white">
        {greeting} 👋
      </h1>

      <p className="mt-1 italic text-gray-700 dark:text-gray-400">
        {formattedDate}
      </p>

      {/* Day Progress Bar */}
      <div className="mt-4">
        <div
          className="
            h-1 w-full
            sm:max-w-sm md:max-w-md lg:max-w-lg
            bg-gray-200 dark:bg-gray-700
            rounded-full overflow-hidden
          "
        >
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {/* Today's Tasks */}
        <div className="rounded-lg p-4 bg-gray-100 dark:bg-gray-800">
          <h3 className="font-semibold text-black dark:text-white">
            Today’s Tasks
          </h3>

          {todaysTasks.length === 0 ? (
            <p className="mt-2 italic text-gray-700 dark:text-gray-400">
              No tasks for today 🎉
            </p>
          ) : (
            <ul className="mt-2 space-y-1">
              {todaysTasks.map((task) => (
                <li key={task.id} className="flex items-center gap-2 text-sm">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getTaskColorClasses(
                      task.type
                    )}`}
                  >
                    {task.type}
                  </span>
                  <span className="text-black dark:text-white">
                    {task.title}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Upcoming Event */}
        <div className="rounded-lg p-4 bg-gray-100 dark:bg-gray-800">
          <h3 className="font-semibold text-black dark:text-white">
            Upcoming Event
          </h3>

          {!upcomingEvent ? (
            <p className="mt-2 italic text-gray-700 dark:text-gray-400">
              No upcoming events
            </p>
          ) : (
            <div className="mt-2">
              <p className="font-medium text-black dark:text-white">
                {upcomingEvent.title}
              </p>

              <div className="mt-1 flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getTaskColorClasses(
                    upcomingEvent.type
                  )}`}
                >
                  event
                </span>

                <span className="italic text-sm text-gray-700 dark:text-gray-400">
                  {new Date(upcomingEvent.deadline).toDateString()}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Completed Tasks */}
        <div className="rounded-lg p-4 bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center">
          <h3 className="font-semibold text-black dark:text-white">
            Tasks Completed
          </h3>

          <p className="mt-3 text-4xl font-bold text-green-600">
            {completedCount}
          </p>

          <p className="mt-1 italic text-gray-700 dark:text-gray-400">
            Keep it up!
          </p>
        </div>
      </div>

      {/* Quote */}
      <p className="mt-6 italic text-gray-700 dark:text-gray-400">“{quote}”</p>
    </section>
  );
}
