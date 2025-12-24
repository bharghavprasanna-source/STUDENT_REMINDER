"use client";

import { useState } from "react";
import { signIn, signUp } from "../../lib/auth";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <h1 className="text-2xl font-bold text-black dark:text-white">Welcome</h1>

      <p className="mt-4 italic text-gray-700 dark:text-gray-400">
        Sign in or create a new account to continue.
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
    focus:outline-none focus:ring-2 focus:ring-blue-500
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
    focus:outline-none focus:ring-2 focus:ring-blue-500
  "
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="mt-6 flex gap-4">
        <button
          onClick={async () => {
            const { error } = await signIn(email, password);
            if (error) alert(error.message);
            else location.reload();
          }}
          className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded "
        >
          Sign In
        </button>

        <button
          onClick={async () => {
            const { error } = await signUp(email, password);
            if (error) alert(error.message);
            else alert("Signup successful. Please sign in.");
          }}
          className="cursor-pointer px-4 py-2 bg-green-600 text-white rounded pointer-events-auto"
        >
          Sign Up
        </button>
      </div>
    </>
  );
}
