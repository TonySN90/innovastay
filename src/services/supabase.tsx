import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://dphwgwsehqjvebdyhncn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwaHdnd3NlaHFqdmViZHlobmNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2MzIwMjEsImV4cCI6MjAyNTIwODAyMX0.ysmRsKURagrdrLxymBBDNv2HBP5lTvNguno7tomH2d4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
