import { createClient } from "@supabase/supabase-js";

// Use valid URL format for default values
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://example.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "example-anon-key";

// Only create client if we have valid URL
const createSupabaseClient = () => {
  try {
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.error("Failed to initialize Supabase client:", error);
    // Return a mock client that won't throw errors when methods are called
    return {
      auth: {
        signInWithPassword: async () => ({
          data: null,
          error: { message: "Supabase not configured" },
        }),
        signUp: async () => ({
          data: null,
          error: { message: "Supabase not configured" },
        }),
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            single: async () => ({ data: null }),
          }),
          order: () => ({
            eq: () => ({ data: [] }),
          }),
        }),
        insert: async () => ({ data: null, error: null }),
        update: async () => ({ data: null, error: null }),
        delete: async () => ({ data: null, error: null }),
      }),
    };
  }
};

export const supabase = createSupabaseClient();
