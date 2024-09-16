import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
//初期化

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

export const Supabase = createClient(
    supabaseUrl,
    supabaseAnonKey
);