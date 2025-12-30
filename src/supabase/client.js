import { createClient } from '@supabase/supabase-js';

// ⚠️ FORCE KEYS (Bypassing .env to fix the 400 Error immediately)
const supabaseUrl = 'https://mbejyfwiuphpktospkga.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1iZWp5ZndpdXBocGt0b3Nwa2dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2MTY1ODQsImV4cCI6MjA4MTE5MjU4NH0.Nmqmc0zjYcT2O6u21zz4PGzMiO5cDvQHvTbucAdqdpA';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});
