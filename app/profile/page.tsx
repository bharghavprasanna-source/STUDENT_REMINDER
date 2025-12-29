"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useTasks } from "../../context/TaskContext";

export default function ProfilePage() {
  const { tasks } = useTasks();

  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- AUTH CHECK ---------------- */
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setEmail(data.user?.email ?? null);
      setLoading(false);
    };

    getUser();
  }, []);

  /* ---------------- TASK COUNTS ---------------- */
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <main className="p-6 min-h-screen bg-white dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-black dark:text-white">Profile</h1>

      {loading ? (
        <p className="mt-4 italic text-gray-700 dark:text-gray-400">
          Loading profile…
        </p>
      ) : (
        <>
          {/* Email */}
          <p className="mt-4 italic text-gray-700 dark:text-gray-400">
            Logged in as{" "}
            <span className="font-semibold text-black dark:text-white">
              {email}
            </span>
          </p>

          {/* Stats */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {/* Total Tasks */}
            <div className="rounded-lg p-4 bg-gray-100 dark:bg-gray-800">
              <p className="text-sm italic text-gray-700 dark:text-gray-400">
                Total Tasks
              </p>
              <p className="mt-2 text-3xl font-bold text-black dark:text-white">
                {totalTasks}
              </p>
            </div>

            {/* Completed Tasks */}
            <div className="rounded-lg p-4 bg-gray-100 dark:bg-gray-800">
              <p className="text-sm italic text-gray-700 dark:text-gray-400">
                Completed
              </p>
              <p className="mt-2 text-3xl font-bold text-green-600">
                {completedTasks}
              </p>
            </div>

            {/* Pending Tasks */}
            <div className="rounded-lg p-4 bg-gray-100 dark:bg-gray-800">
              <p className="text-sm italic text-gray-700 dark:text-gray-400">
                Pending
              </p>
              <p className="mt-2 text-3xl font-bold text-orange-500">
                {pendingTasks}
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              location.reload();
            }}
            className="mt-8 px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white cursor-pointer"
          >
            Logout
          </button>
        </>
      )}
    </main>
  );
}
