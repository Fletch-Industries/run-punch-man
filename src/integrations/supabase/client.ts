// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://oinmtplcwuitjmvuvfki.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pbm10cGxjd3VpdGptdnV2ZmtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5MTE0ODQsImV4cCI6MjA2NjQ4NzQ4NH0.ya8nIbfK3NCaavX7A8FXY7cA1KwhhQKRHaoCvXPSo8Q";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);