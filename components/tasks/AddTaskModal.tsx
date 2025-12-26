"use client";

import { useState } from "react";

type AddTaskModalProps = {
  onClose: () => void;
  onSave: (task: { title: string; deadline: string; type: string }) => void;
};

export default function AddTaskModal({ onClose, onSave }: AddTaskModalProps) {
  /* ---------------- STATE (ALL HOOKS HERE) ---------------- */
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [taskType, setTaskType] = useState("assignment");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-white dark:bg-gray-900 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-black dark:text-white">
            Add New Task
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-black dark:hover:text-white cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <div className="mt-4 space-y-4">
          {/* Task Name */}
          <div>
            <label className="block mb-1 font-semibold text-black dark:text-white">
              Task Name
            </label>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Enter task name"
              className="
                w-full rounded p-2
                border border-gray-300 dark:border-gray-700
                bg-white dark:bg-gray-800
                text-black dark:text-white
                placeholder:text-gray-500 dark:placeholder:text-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="block mb-1 font-semibold text-black dark:text-white">
              Deadline
            </label>
            <input
              type="date"
              value={taskDeadline}
              onChange={(e) => setTaskDeadline(e.target.value)}
              className="
                w-full rounded p-2
                border border-gray-300 dark:border-gray-700
                bg-white dark:bg-gray-800
                text-black dark:text-white
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
            />
          </div>

          {/* Task Type */}
          <div>
            <label className="block mb-1 font-semibold text-black dark:text-white">
              Task Type
            </label>
            <select
              value={taskType}
              onChange={(e) => setTaskType(e.target.value)}
              className="
                w-full rounded p-2
                border border-gray-300 dark:border-gray-700
                bg-white dark:bg-gray-800
                text-black dark:text-white
                focus:outline-none focus:ring-2 focus:ring-blue-500
                cursor-pointer
              "
            >
              <option value="assignment">Assignment</option>
              <option value="test">Test</option>
              <option value="exam">Exam</option>
              <option value="event">Event</option>
              <option value="hackathon">Hackathon</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              if (!taskTitle || !taskDeadline) {
                alert("Please fill all fields");
                return;
              }

              onSave({
                title: taskTitle,
                deadline: taskDeadline,
                type: taskType,
              });

              onClose();
            }}
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
          >
            Save Task
          </button>
        </div>
      </div>
    </div>
  );
}
