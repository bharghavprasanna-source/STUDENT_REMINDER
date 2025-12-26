"use client";

import { useState } from "react";
import AddTaskModal from "../../components/tasks/AddTaskModal";

type Task = {
  id: number;
  title: string;
  deadline: string;
  completed: boolean;
};

const initialTasks: Task[] = [
  { id: 1, title: "Assignment 1", deadline: "2026-01-05", completed: false },
  {
    id: 2,
    title: "Lab Record Submission",
    deadline: "2026-01-10",
    completed: false,
  },
];

export default function AddTasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showModal, setShowModal] = useState(false);

  const completeTask = (id: number) => {
    // 1️⃣ mark task as completed (for animation)
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: true } : task))
    );

    // 2️⃣ remove after animation
    setTimeout(() => {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    }, 350);
  };

  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
  );

  return (
    <main className="p-6 min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black dark:text-white">
          Add Tasks
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
        >
          + Add Task
        </button>
      </div>

      {/* Task list */}
      <div className="mt-6 space-y-4">
        {sortedTasks.map((task) => (
          <div
            key={task.id}
            className={`
  flex items-center justify-between
  p-4 rounded-lg
  bg-gray-100 dark:bg-gray-800
  transition-all duration-300
  ${task.completed ? "opacity-60 scale-95" : ""}
`}
          >
            <div>
              <p className="font-semibold text-black dark:text-white">
                {task.title}
              </p>
              <p className="text-sm italic text-gray-700 dark:text-gray-400">
                {new Date(task.deadline).toDateString()}
              </p>
            </div>

            {/* Tickbox */}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => completeTask(task.id)}
              className="h-5 w-5 cursor-pointer"
              aria-label="Mark task as completed"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && <AddTaskModal onClose={() => setShowModal(false)} />}
    </main>
  );
}
