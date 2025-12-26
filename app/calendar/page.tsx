"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarPage() {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <main className="p-6 min-h-screen bg-white dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-black dark:text-white">
        Calendar
      </h1>

      <p className="mt-2 italic text-gray-700 dark:text-gray-400">
        View your schedule and upcoming tasks
      </p>

      <div className="mt-6 max-w-md">
        <Calendar onChange={(value) => setDate(value as Date)} value={date} />
      </div>

      <p className="mt-4 italic text-gray-700 dark:text-gray-400">
        Selected date:{" "}
        <span className="font-semibold text-black dark:text-white">
          {date.toDateString()}
        </span>
      </p>
    </main>
  );
}
