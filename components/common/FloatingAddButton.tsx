"use client";

import { useRouter } from "next/navigation";

export default function FloatingAddButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/add-tasks")}
      className="
        fixed bottom-6 right-6 z-50
        h-14 w-14 rounded-full
        bg-blue-600 hover:bg-blue-700
        text-white text-3xl
        pb-1.5
        shadow-lg
        cursor-pointer
        transition-all duration-200
        hover:scale-110 active:scale-95
      "
      aria-label="Add Task"
    >
      +
    </button>
  );
}
