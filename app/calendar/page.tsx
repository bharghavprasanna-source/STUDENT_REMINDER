"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useTasks } from "../../context/TaskContext";

export default function CalendarPage() {
  const { tasks } = useTasks();

  const [value, setValue] = useState<Date | null>(null);

  // Prevent hydration mismatch
  useEffect(() => {
    setValue(new Date());
  }, []);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <main className="p-6 min-h-screen bg-white dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-black dark:text-white">
        Calendar
      </h1>

      <p className="mt-2 italic text-gray-700 dark:text-gray-400">
        Tasks update live based on deadlines
      </p>

      <div className="mt-6 max-w-md">
        {value && (
          <Calendar
            value={value}
            onChange={(val) => setValue(val as Date)}
            tileClassName={({ date, view }) => {
              if (view !== "month") return null;

              const dateStr = formatDate(date);
              return tasks.some((task) => task.deadline === dateStr)
                ? "task-date"
                : null;
            }}
          />
        )}
      </div>

      <p className="mt-4 italic text-gray-700 dark:text-gray-400">
        Selected date:{" "}
        <span className="font-semibold text-black dark:text-white">
          {value ? value.toDateString() : ""}
        </span>
      </p>
    </main>
  );
}
