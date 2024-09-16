import { Supabase } from "./Supabase";

  export const GetLearnRecords = async () => {
    const { data, error } = await Supabase.from('study-record').select('content, time, id');

    if (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    
      return data;
  };