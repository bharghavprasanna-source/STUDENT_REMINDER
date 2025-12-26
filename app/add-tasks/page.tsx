"use client";

import { useState } from "react";
import AddTaskModal from "../../components/tasks/AddTaskModal";

type Task = {
  id: number;
  title: string;
  deadline: string;
  type: string;
  completed: boolean;
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Assignment 1",
    deadline: "2026-01-05",
    type: "assignment",
    completed: false,
  },
  {
    id: 2,
    title: "Lab Record Submission",
    deadline: "2026-01-10",
    type: "exam",
    completed: false,
  },
];

export default function AddTasksPage() {
  /* -------------------- STATE -------------------- */
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showModal, setShowModal] = useState(false);

  /* -------------------- SORT -------------------- */
  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
  );

  /* -------------------- ADD TASK -------------------- */
  const addTask = (task: { title: string; deadline: string; type: string }) => {
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: task.title,
        deadline: task.deadline,
        type: task.type,
        completed: false,
      },
    ]);
  };

  /* -------------------- COMPLETE TASK -------------------- */
  const completeTask = (id: number) => {
    // animate strike
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: true } : task))
    );

    // remove after animation
    setTimeout(() => {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    }, 350);
  };

  /* -------------------- UI -------------------- */
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

      <p className="mt-2 italic text-gray-700 dark:text-gray-400">
        Upcoming tasks ordered by deadline
      </p>

      {/* Task List */}
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
              <p
                className={`
                  font-semibold transition-all duration-300
                  ${
                    task.completed
                      ? "line-through text-gray-500 dark:text-gray-400"
                      : "text-black dark:text-white"
                  }
                `}
              >
                {task.title}
              </p>

              <p className="mt-1 italic text-sm text-gray-700 dark:text-gray-400">
                {new Date(task.deadline).toDateString()} • {task.type}
              </p>
            </div>

            {/* Tickbox */}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => completeTask(task.id)}
              className="h-5 w-5 cursor-pointer"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <AddTaskModal onClose={() => setShowModal(false)} onSave={addTask} />
      )}
    </main>
  );
}
