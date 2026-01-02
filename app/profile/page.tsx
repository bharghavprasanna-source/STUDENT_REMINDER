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
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        window.location.href = "/login";
        return;
      }

      setEmail(data.user.email ?? null);
      setLoading(false);
    };

    getUser();
  }, []);

  /* ---------------- TASK COUNTS ---------------- */
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-md px-6 text-center">
        {/* Avatar */}
        <div className="mx-auto mb-4 h-28 w-28 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-4xl">
          👤
        </div>

        <h1 className="text-2xl font-bold text-black dark:text-white">
          Profile
        </h1>

        {loading ? (
          <p className="mt-4 italic text-gray-500">Loading…</p>
        ) : (
          <>
            <p className="mt-2 italic text-gray-600 dark:text-gray-400">
              Signed in as
            </p>
            <p className="mt-1 text-sm font-medium text-blue-400 break-all">
              {email}
            </p>

            {/* Stats */}
            <div className="mt-8 flex gap-4">
              <Stat label="Total" value={totalTasks} color="text-blue-600" />
              <Stat
                label="Completed"
                value={completedTasks}
                color="text-green-600"
              />
              <Stat
                label="Pending"
                value={pendingTasks}
                color="text-orange-500"
              />
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="mt-8 px-6 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
  color = "text-black",
}: {
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <div className="flex-1 rounded-lg p-4 bg-gray-100 dark:bg-gray-800">
      <p className="text-sm italic text-gray-500">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
