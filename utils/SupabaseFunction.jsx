import { supabase } from "./Supabase";

  export const getLearnRecords = async () => {
    const { data, error } = await supabase.from('study-record').select('content, time');

    if (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    
      return data;
  };