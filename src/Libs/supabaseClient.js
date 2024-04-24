
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
// const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY)
export const supabase = createClient("https://zgwmnwcwpryhyqafoyug.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpnd21ud2N3cHJ5aHlxYWZveXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2ODQzMTIsImV4cCI6MjAyODI2MDMxMn0.t8-q0EFD65FicGqAAk-Ad8-_0BNFc2b-TYStM7r-_qU")