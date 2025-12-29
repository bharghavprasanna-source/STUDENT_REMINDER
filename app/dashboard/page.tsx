"use client";

import { useTasks, getTaskColorClasses } from "../../context/TaskContext";

export default function DashboardPage() {
  const { tasks } = useTasks();

  /* ---------------- Date Range ---------------- */
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const next7Days = new Date(today);
  next7Days.setDate(today.getDate() + 7);

  /* ---------------- Upcoming Deadlines ---------------- */
  const upcomingDeadlines = tasks
    .filter((task) => {
      const taskDate = new Date(task.deadline);
      taskDate.setHours(0, 0, 0, 0);

      return (
        task.type !== "event" &&
        !task.completed &&
        taskDate >= today &&
        taskDate <= next7Days
      );
    })
    .sort(
      (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    );

  return (
    <main className="p-6 min-h-screen bg-white dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-black dark:text-white">
        Dashboard
      </h1>

      {/* ---------------- Upcoming Deadlines ---------------- */}
      <div className="mt-6 rounded-lg p-5 bg-gray-100 dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-black dark:text-white">
          Upcoming Deadlines
        </h2>

        {upcomingDeadlines.length === 0 ? (
          <p className="mt-3 italic text-gray-700 dark:text-gray-400">
            No deadlines in the next 7 days 🎉
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-gray-300 dark:divide-gray-700">
            {upcomingDeadlines.map((task) => (
              <li
                key={task.id}
                className="py-3 flex items-center justify-between"
              >
                {/* Left */}
                <div>
                  <p className="font-semibold text-black dark:text-white">
                    {task.title}
                  </p>

                  <p className="mt-1 italic text-sm text-gray-700 dark:text-gray-400">
                    Due on {new Date(task.deadline).toDateString()}
                  </p>
                </div>

                {/* Right */}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getTaskColorClasses(
                    task.type
                  )}`}
                >
                  {task.type}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
