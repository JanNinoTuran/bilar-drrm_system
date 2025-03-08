import { createClient } from "@supabase/supabase-js";

// Default values for development to prevent errors when env vars are not set
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://example.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "example-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
