import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(
    'https://cjyeahxvwflznymnchor.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqeWVhaHh2d2Zsem55bW5jaG9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg1NTYyNDQsImV4cCI6MTk4NDEzMjI0NH0.OQscVNMZQtcUTfXb99gPt5LCRi_eo5seEyngcVM6eVA'
  )