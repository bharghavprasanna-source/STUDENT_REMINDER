import { supabase } from "./supabaseClient";

export const signUp = async (email: string, password: string) => {
  const res = await supabase.auth.signUp({
    email,
    password,
  });

  console.log("SIGN UP:", res);
  return res;
};

export const signIn = async (email: string, password: string) => {
  const res = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log("SIGN IN:", res);
  return res;
};

export const signOut = async () => {
  return supabase.auth.signOut();
};
