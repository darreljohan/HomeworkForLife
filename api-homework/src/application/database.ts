import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "supabase-url";
const supabaseKey = process.env.SUPABASE_KEY || "supabase-key";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
