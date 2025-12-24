"use client";

import { useState } from "react";
import { signIn, signUp } from "../../lib/auth";

export default function ProfilePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);

    if (error) {
      alert(error.message);
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    const { error } = await signUp(email, password);
    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Signup successful! You can now sign in.");
    }
  };
  return (
    <main className="p-6 min-h-screen bg-white dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-black dark:text-white">Welcome</h1>

      <p className="mt-4 italic text-gray-700 dark:text-gray-400">
        Sign in or create a new account to continue.
      </p>

      {/* Email */}
      <input
        type="email"
        placeholder="Email"
        className="
          block mt-6 w-80 p-2
          border border-gray-300 dark:border-gray-700
          bg-white dark:bg-gray-800
          text-black dark:text-white
          rounded
        "
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Password */}
      <input
        type="password"
        placeholder="Password"
        className="
          block mt-4 w-80 p-2
          border border-gray-300 dark:border-gray-700
          bg-white dark:bg-gray-800
          text-black dark:text-white
          rounded
        "
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={handleSignIn}
          disabled={loading}
          className="
            px-4 py-2 rounded
            bg-blue-600 hover:bg-blue-700
            text-white
            disabled:opacity-50
          "
        >
          Sign In
        </button>

        <button
          onClick={handleSignUp}
          disabled={loading}
          className="
            px-4 py-2 rounded
            bg-green-600 hover:bg-green-700
            text-white
            disabled:opacity-50
          "
        >
          Sign Up
        </button>
      </div>
    </main>
  );
}
