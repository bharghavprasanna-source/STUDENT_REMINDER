"use client";

import { signOut } from "../../lib/auth";

export default function ProfileView({ email }: { email: string }) {
  return (
    <>
      <h1 className="text-2xl font-bold text-black dark:text-white">Profile</h1>

      <p className="mt-4 italic text-gray-700 dark:text-gray-400">
        Logged in as: <strong>{email}</strong>
      </p>

      <button
        onClick={async () => {
          await signOut();
          location.reload();
        }}
        className="mt-6 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
      >
        Logout
      </button>
    </>
  );
}
