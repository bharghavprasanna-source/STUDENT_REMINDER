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
