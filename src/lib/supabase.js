

import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabaseUrl = 'https://lgraveshxqrjfpvdbgry.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxncmF2ZXNoeHFyamZwdmRiZ3J5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYzMzYzMjksImV4cCI6MjA0MTkxMjMyOX0.Zo_r77Z8rasJkRKTFpRUdOv7s6Ncfe9lTZuovcrqzKc';
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing. Please check your .env file.')
  throw new Error('Supabase configuration is incomplete')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
