"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

/* ---------------- Types ---------------- */

export type Task = {
  id: string;
  user_id: string;
  title: string;
  deadline: string;
  type: string;
  completed: boolean;
};

type TaskContextType = {
  tasks: Task[];
  loading: boolean;
  addTask: (task: {
    title: string;
    deadline: string;
    type: string;
  }) => Promise<void>;
  completeTask: (id: string) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
};

const TaskContext = createContext<TaskContextType | null>(null);

/* ---------------- Provider ---------------- */

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- Fetch Tasks ---------------- */
  const fetchTasks = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("deadline", { ascending: true });

    if (!error && data) {
      setTasks(data);
    }

    setLoading(false);
  };

  /* ---------------- Auth Listener ---------------- */
  useEffect(() => {
    fetchTasks();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      fetchTasks();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  /* ---------------- Add Task ---------------- */
  const addTask = async (task: {
    title: string;
    deadline: string;
    type: string;
  }) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("tasks")
      .insert({
        title: task.title,
        deadline: task.deadline,
        type: task.type,
        completed: false,
        user_id: user.id,
      })
      .select()
      .single(); // 🔥 IMPORTANT

    if (error) {
      console.error("Add task error:", error);
      return;
    }

    // ✅ UPDATE LOCAL STATE IMMEDIATELY
    setTasks((prev) => [...prev, data]);
  };

  /* ---------------- Complete Task ---------------- */
  const completeTask = async (id: string) => {
    await supabase.from("tasks").update({ completed: true }).eq("id", id);
    fetchTasks();
  };

  /* ---------------- Remove Task ---------------- */
  const removeTask = async (id: string) => {
    await supabase.from("tasks").delete().eq("id", id);
    fetchTasks();
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        addTask,
        completeTask,
        removeTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

/* ---------------- Hook ---------------- */

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used inside TaskProvider");
  }
  return context;
}

export const getTaskColorClasses = (type: string) => {
  switch (type) {
    case "assignment":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
    case "test":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
    case "exam":
      return "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300";
    case "event":
      return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
    case "hackathon":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300";
    case "Overdue":
      return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
  }
};
