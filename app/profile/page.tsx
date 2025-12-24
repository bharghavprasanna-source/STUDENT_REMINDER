"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import LoggedInProfile from "../../components/Profile/LoggedInProfile";

export default function ProfilePage() {
  const [status, setStatus] = useState<"loading" | "logged-in" | "logged-out">(
    "loading"
  );
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  const [joinedAt, setJoinedAt] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await supabase.auth.getUser();

        if (data.user) {
          setEmail(data.user.email);
          setJoinedAt(data.user.created_at);
          setStatus("logged-in");
        } else {
          setStatus("logged-out");
        }
      } catch {
        setStatus("logged-out");
      }
    };

    checkUser();
  }, []);

  return (
    <main className="p-6 min-h-screen bg-white dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-black dark:text-white">Profile</h1>

      {/* Loading */}
      {status === "loading" && (
        <p className="mt-4 italic text-gray-700 dark:text-gray-400">
          Checking authentication…
        </p>
      )}

      {/* Logged OUT view */}
      {status === "logged-out" && (
        <>
          <p className="mt-4 italic text-gray-700 dark:text-gray-400">
            Welcome! Please sign in or create an account.
          </p>

          <div className="mt-6 flex gap-4">
            <button
              onClick={() => router.push("/profile/signin")}
              className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
            >
              Sign In
            </button>

            <button
              onClick={() => router.push("/profile/signup")}
              className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
            >
              Sign Up
            </button>
          </div>
        </>
      )}

      {/* Logged IN view */}
      {status === "logged-in" && (
        <>
          <LoggedInProfile
            email={email}
            joinedAt={joinedAt}
            onLogout={async () => {
              await supabase.auth.signOut();
              setStatus("logged-out");
              setEmail(null);
              setJoinedAt(null);
            }}
          />
        </>
      )}
    </main>
  );
}
