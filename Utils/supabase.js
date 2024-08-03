import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
//初期化

const supabaseUrl = import.meta.env.VITE_NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey
);