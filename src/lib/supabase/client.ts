import { createClient, SupabaseClient } from '@supabase/supabase-js';

function getSupabaseUrl(): string {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set');
  }
  return process.env.NEXT_PUBLIC_SUPABASE_URL;
}

function getSupabaseAnonKey(): string {
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not set');
  }
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

function getSupabaseServiceKey(): string {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set');
  }
  return process.env.SUPABASE_SERVICE_ROLE_KEY;
}

let supabaseClient: SupabaseClient | null = null;
let supabaseAdminClient: SupabaseClient | null = null;

export const supabase = (() => {
  if (!supabaseClient) {
    supabaseClient = createClient(
      getSupabaseUrl(),
      getSupabaseAnonKey()
    );
  }
  return supabaseClient;
})();

export const supabaseAdmin = (() => {
  if (!supabaseAdminClient) {
    supabaseAdminClient = createClient(
      getSupabaseUrl(),
      getSupabaseServiceKey(),
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
  }
  return supabaseAdminClient;
})();
