import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://uhqmkmfwkttfrpcdwvao.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVocW1rbWZ3a3R0ZnJwY2R3dmFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4NTM2MzksImV4cCI6MjA1NDQyOTYzOX0.3yU-qhh044rWxOb06pjkcuCr08YmYeoj6utJqc-PMdY';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
