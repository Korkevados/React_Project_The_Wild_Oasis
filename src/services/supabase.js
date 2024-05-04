/** @format */

import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://wleyswlojnchqqyuqiml.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsZXlzd2xvam5jaHFxeXVxaW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwNDY0MjUsImV4cCI6MjAyOTYyMjQyNX0.jJzLbcNKGFHXtqGyFrgsRVUiZA1Is8Hp8dmXyYD97yk";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
