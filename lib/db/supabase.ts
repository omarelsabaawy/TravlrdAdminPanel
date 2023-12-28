import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://rxigqxorhmitfuguxkiy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4aWdxeG9yaG1pdGZ1Z3V4a2l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM3NjQwNjMsImV4cCI6MjAxOTM0MDA2M30.249V3ced7U-WFj2QhmQIDR7lsDgBBgy6jcTNqVZiBPA";

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or key is missing. Please check your environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
