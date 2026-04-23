import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
}

const key = supabaseServiceRoleKey || supabaseAnonKey;

if (!key) {
  throw new Error('Missing Supabase key');
}

export const supabaseServer = createClient<Database>(supabaseUrl, key, {
  auth: {
    persistSession: false,
  },
});