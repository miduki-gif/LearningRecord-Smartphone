import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
//初期化
export const supabase = createClient(
    process.env.VITE_NEXT_PUBLIC_SUPABASE_URL!, 
    process.env.VITE_NEXT_PUBLIC_SUPABASE_ANON_KEY!
);