"use client";

import { createContext, useContext, useState, useEffect } from "react";

export type Task = {
  id: number;
  title: string;
  deadline: string;
  type: string;
  completed: boolean;
};

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "completed">) => void;
  removeTask: (id: number) => void;
  completeTask: (id: number) => void;
};

const TaskContext = createContext<TaskContextType | null>(null);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  // 🔹 Load from localStorage (on first load)
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // 🔹 Save to localStorage (on every change)
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Omit<Task, "id" | "completed">) => {
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...task,
        completed: false,
      },
    ]);
  };

  const removeTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const completeTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: true } : task))
    );

    setTimeout(() => {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    }, 350);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, completeTask }}>
      {children}
    </TaskContext.Provider>
  );
}

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
