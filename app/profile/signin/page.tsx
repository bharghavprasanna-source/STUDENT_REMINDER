"use client";

import { useState } from "react";
import { signIn } from "../../../lib/auth";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="p-6 min-h-screen bg-white dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-black dark:text-white">Sign In</h1>

      <p className="mt-4 italic text-gray-700 dark:text-gray-400">
        Welcome back! Please sign in to continue.
      </p>

      <input
        type="email"
        placeholder="Email"
        className="
          block mt-6 w-80 p-2 rounded
          border border-gray-300 dark:border-gray-700
          bg-white dark:bg-gray-800
          text-black dark:text-white
          placeholder:text-gray-500 dark:placeholder:text-gray-400
        "
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="
          block mt-4 w-80 p-2 rounded
          border border-gray-300 dark:border-gray-700
          bg-white dark:bg-gray-800
          text-black dark:text-white
          placeholder:text-gray-500 dark:placeholder:text-gray-400
        "
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={async () => {
          const { error } = await signIn(email, password);
          if (error) alert(error.message);
          else location.href = "/dashboard";
        }}
        className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
      >
        Sign In
      </button>

      <p className="mt-4 italic text-gray-700 dark:text-gray-400">
        Don’t have an account?{" "}
        <a href="/profile/signup" className="text-blue-600 hover:underline">
          Sign up here
        </a>
      </p>
    </main>
  );
}
