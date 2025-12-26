"use client";

import { useState } from "react";
import AddTaskModal from "../../components/tasks/AddTaskModal";
import { useTasks } from "../../context/TaskContext";

export default function AddTasksPage() {
  /* -------------------- GLOBAL TASK CONTEXT -------------------- */
  const { tasks, addTask, removeTask, completeTask } = useTasks();

  /* -------------------- LOCAL UI STATE -------------------- */
  const [showModal, setShowModal] = useState(false);

  /* -------------------- SORT -------------------- */
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

      <p className="mt-2 italic text-gray-700 dark:text-gray-400">
        Upcoming tasks ordered by deadline
      </p>

      {/* Task List */}
      <div className="mt-6 space-y-4">
        {sortedTasks
          .filter((task) => !task.completed) // ✅ KEY FIX
          .map((task) => (
            <div
              key={task.id}
              className="
                flex items-center justify-between
                p-4 rounded-lg
                bg-gray-100 dark:bg-gray-800
                transition-all duration-300
              "
            >
              {/* Task info */}
              <div>
                <p className="font-semibold text-black dark:text-white">
                  {task.title}
                </p>

                <p className="mt-1 italic text-sm text-gray-700 dark:text-gray-400">
                  {new Date(task.deadline).toDateString()} • {task.type}
                </p>
              </div>

              {/* Right-side controls */}
              <div className="flex items-center gap-3">
                {/* Tickbox */}
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => completeTask(task.id)}
                  className="h-5 w-5 cursor-pointer"
                  aria-label="Mark task completed"
                />

                {/* Minus button */}
                <button
                  onClick={() => removeTask(task.id)}
                  className="
                    h-6 w-6 flex items-center justify-center
                    rounded-full
                    bg-red-100 hover:bg-red-200
                    text-red-600 font-bold
                    cursor-pointer
                  "
                  aria-label="Remove task"
                >
                  −
                </button>
              </div>
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
