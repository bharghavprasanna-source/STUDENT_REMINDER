"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useTasks, getTaskColorClasses } from "../../context/TaskContext";

export default function CalendarPage() {
  const { tasks } = useTasks();

  const [value, setValue] = useState<Date | null>(null);

  // Prevent hydration mismatch
  useEffect(() => {
    setValue(new Date());
  }, []);

  // Local-safe date formatter (NO timezone issues)
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const selectedDateStr = value ? formatDate(value) : null;

  const tasksForSelectedDate = selectedDateStr
    ? tasks.filter((task) => task.deadline === selectedDateStr)
    : [];

  return (
    <main className="p-6 min-h-screen bg-white dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-black dark:text-white">
        Calendar
      </h1>

      <p className="mt-2 italic text-gray-700 dark:text-gray-400">
        Tasks update live based on deadlines
      </p>

      {/* Calendar */}
      <div className="mt-6 max-w-md">
        {value && (
          <Calendar
            value={value}
            onChange={(val) => setValue(val as Date)}
            tileClassName={({ date, view }) => {
              if (view !== "month") return null;

              const dateStr = formatDate(date);

              // Find a task for this date (if any)
              const taskForDay = tasks.find(
                (task) => task.deadline === dateStr
              );

              // Apply task-type color to tile
              return taskForDay
                ? `task-date ${getTaskColorClasses(taskForDay.type)}`
                : null;
            }}
          />
        )}
      </div>

      {/* Tasks for selected date */}
      {value && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-black dark:text-white">
            Tasks on {value.toDateString()}
          </h2>

          {tasksForSelectedDate.length === 0 ? (
            <p className="mt-2 italic text-gray-700 dark:text-gray-400">
              No tasks for this date.
            </p>
          ) : (
            <ul className="mt-3 space-y-3">
              {tasksForSelectedDate.map((task) => (
                <li
                  key={task.id}
                  className="rounded-lg p-3 bg-gray-100 dark:bg-gray-800"
                >
                  <p className="font-semibold text-black dark:text-white">
                    {task.title}
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="italic text-sm text-gray-700 dark:text-gray-400">
                      {new Date(task.deadline).toDateString()}
                    </span>

                    <span
                      className={`
                        px-2 py-0.5 rounded-full text-xs font-semibold
                        ${getTaskColorClasses(task.type)}
                      `}
                    >
                      {task.type}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Selected date */}
      <p className="mt-4 italic text-gray-700 dark:text-gray-400">
        Selected date:{" "}
        <span className="font-semibold text-black dark:text-white">
          {value ? value.toDateString() : ""}
        </span>
      </p>
    </main>
  );
}
