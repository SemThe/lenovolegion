import { createClient } from '@supabase/supabase-js'
 
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zrryrepwoqakgzdqncdv.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY
 
if (!supabaseKey) {
    throw new Error('Missing Supabase key. Please add NEXT_PUBLIC_SUPABASE_ANON_KEY or SUPABASE_KEY to your environment variables.')
}
 
export const supabase = createClient(supabaseUrl, supabaseKey)
 