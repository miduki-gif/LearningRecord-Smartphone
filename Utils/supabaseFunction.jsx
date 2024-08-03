import { supabase } from "./supabase";

  export const learnRecordTestData = async () => {
    await supabase.from('study-record').select('content, time');
  };