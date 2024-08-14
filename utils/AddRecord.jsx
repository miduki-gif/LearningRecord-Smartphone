import { supabase } from "./Supabase";

export const AddRecord = async (content, time) => {
    try {
        const { data, error } = await supabase.from('study-record')
        .insert([{ content: content, time: time }]).select();
        //エラーがあれば例外を投げる
    if(error) {
        throw error;
    }
        //エラーがなければ追加されたデーターを返す
        return data;
        } catch(error) {
            console.error("Error insert addData:", error);
            return [];
        }
    };