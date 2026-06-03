import { createClient } from "@supabase/supabase-js";
import ws from "ws";

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  global: {
    fetch: (...args) => fetch(...args),
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
    transport: ws,
  },
});
