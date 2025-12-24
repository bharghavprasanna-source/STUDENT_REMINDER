"use client";

import { useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function SupabaseTestPage() {
  useEffect(() => {
    const testConnection = async () => {
      const { data, error } = await supabase.auth.getSession();
      console.log("Supabase connection test:", data, error);
    };

    testConnection();
  }, []);

  return (
    <main className="p-6 bg-white dark:bg-gray-900">
      <h1 className="text-black dark:text-white">Supabase Connection Test</h1>
      <p className="mt-4 italic text-gray-700 dark:text-gray-400">
        Check the browser console for results.
      </p>
    </main>
  );
}
