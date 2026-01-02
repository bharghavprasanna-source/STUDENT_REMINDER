"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null); // ✅ NEW

  const handleAuth = async () => {
    setLoading(true);
    setError(null);
    setInfo(null);

    if (isSignup) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        setInfo(
          "📩 Please confirm your email from Supabase (check inbox or spam)."
        );

        // auto-hide after 5 seconds
        setTimeout(() => setInfo(null), 5000);
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        window.location.href = "/";
      }
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="w-full max-w-md rounded-xl bg-slate-800 p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-white text-center">
          {isSignup ? "Sign Up" : "Login"}
        </h1>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-6 w-full rounded bg-slate-700 px-4 py-2 text-white outline-none"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-3 w-full rounded bg-slate-700 px-4 py-2 text-white outline-none"
        />

        {/* ERROR MESSAGE */}
        {error && (
          <p className="mt-3 text-sm text-red-400 text-center">{error}</p>
        )}

        {/* INFO MESSAGE (Signup only) */}
        {info && (
          <p className="mt-3 text-sm text-green-400 text-center">{info}</p>
        )}

        {/* Action Button */}
        <button
          onClick={handleAuth}
          disabled={loading}
          className="mt-6 w-full rounded bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Please wait..." : isSignup ? "Create Account" : "Login"}
        </button>

        {/* Toggle */}
        <p className="mt-4 text-center text-sm text-gray-400">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}
          <button
            onClick={() => {
              setIsSignup(!isSignup);
              setError(null);
              setInfo(null);
            }}
            className="ml-2 text-blue-400 hover:underline"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </main>
  );
}
