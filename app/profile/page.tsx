"use client";

import { useEffect, useState } from "react";
import { useTasks } from "../../context/TaskContext";
import { supabase } from "@/lib/supabaseClient";

export default function ProfilePage() {
  const { tasks } = useTasks();

  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- AUTH CHECK ---------------- */
  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Auth fetch error:", error.message);
      }

      setEmail(data.user?.email ?? null);
      setLoading(false);
    };

    getUser();
  }, []);

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error.message);
      return;
    }

    // hard redirect to clear all state
    window.location.replace("/login");
  };

  /* ---------------- TASK COUNTS ---------------- */
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-md px-6 text-center">
        {/* Profile Picture */}
        <div className="mx-auto mb-4 h-28 w-28 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-4xl font-bold text-gray-700 dark:text-gray-300">
          👤
        </div>

        <h1 className="text-2xl font-bold text-black dark:text-white">
          Profile
        </h1>

        {loading ? (
          <p className="mt-4 italic text-gray-700 dark:text-gray-400">
            Loading profile…
          </p>
        ) : (
          <>
            {/* Email */}
            <p className="mt-2 italic text-gray-700 dark:text-gray-400">
              Signed in as
            </p>
            <p className="font-semibold text-black dark:text-white break-all">
              {email}
            </p>

            {/* Stats */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex-1 rounded-lg p-4 bg-gray-100 dark:bg-gray-800">
                <p className="text-sm italic text-gray-700 dark:text-gray-400">
                  Total
                </p>
                <p className="mt-1 text-3xl font-bold text-black dark:text-white">
                  {totalTasks}
                </p>
              </div>

              <div className="flex-1 rounded-lg p-4 bg-gray-100 dark:bg-gray-800">
                <p className="text-sm italic text-gray-700 dark:text-gray-400">
                  Completed
                </p>
                <p className="mt-1 text-3xl font-bold text-green-600">
                  {completedTasks}
                </p>
              </div>

              <div className="flex-1 rounded-lg p-4 bg-gray-100 dark:bg-gray-800">
                <p className="text-sm italic text-gray-700 dark:text-gray-400">
                  Pending
                </p>
                <p className="mt-1 text-3xl font-bold text-orange-500">
                  {pendingTasks}
                </p>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="mt-8 w-full px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </main>
  );
}
