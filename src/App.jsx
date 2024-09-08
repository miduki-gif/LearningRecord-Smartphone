import { useEffect, useState } from "react";
import { InputForm } from "./components/InputForm";
import { getLearnRecords } from "../utils/SupabaseFunction";
import { RecordData } from "../utils/RecordData";
import { supabase } from "../utils/Supabase";

export const App = () => {
  const [inputs, setInputs] = useState({ content: "", time: "" });
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [totalTime, setTotalTime] = useState(0);
  const [loading, setLoading] = useState(true);

          //合計時間計算
          const totalTimeCalculate = (records) => {
            return records.reduce((sum, record) => sum + (record.time || 0), 0)
          }

  useEffect(() => {
    const data = async () => {
      try {
        const recordData = await getLearnRecords();
        console.log(recordData)
        console.log(recordData)
        setRecords(recordData);
        setTotalTime(totalTimeCalculate(recordData));
      } catch (error) {
        console.error("データの取得に失敗しました", error);
      } finally {
        setLoading(false);
      }
    };
    data();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "time" && !/^[0-9]*$/.test(value)) {
      return;
    }

    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]:
        name === "time" ? (value === "" ? "" : parseInt(value, 10)) : value,
    }));
  };

  const handleRecord = async () => {
    //学習内容もしくは学習時間のどちらかが入力されていないときに入力されていない項目がありますと表示する
    if (!inputs.content || inputs.time === "" || inputs.time === null) {
      setError("入力されていない項目があります。");
      return;
    } else {

      try {
        //supabaseのテーブルのcontent,timeというカラムに入力した学習内容、学習時間を登録する
        //学習時間は数値型で10進数に変換
        const { data, error } = await supabase
          .from("study-record")
          .insert({ content: inputs.content, time: parseInt(inputs.time, 10) })
          .select().single()
        //エラーがあれば例外を投げる
        if (error) {
          throw error;
        }
        // console.log(data);
          //入力したデータをリストに追加する
    const newRecords = [...records, data];
    setRecords(newRecords);
    console.log(newRecords);
    //合計時間を再計算
    setTotalTime(totalTimeCalculate(newRecords));
      } catch (error) {
        //正常にデータが登録できなかった際にエラーをコンソールに表示する
        console.error("Error insert addData:", error);
        return;
      }
    }
    //学習内容、学習時間の入力欄を初期化する
    setInputs({ content: "", time: "" });
    //エラーも初期化する
    setError("");
  };

  const deleteRecord = async (id) => {
    //supabaseからidを参照してテーブルから削除ボタンを押したデータを削除する
    console.log("aaa");
    console.log(id)

    try {
      const { error } = await supabase
      .from("study-record")
      .delete()
      .eq("id", id);
      console.log(records)
      console.log(id)
      const newRecords = records.filter(i => i.id != id);
      console.log('newRecords length:', newRecords[0]);
      console.log("filteredRecords:", newRecords);
      setRecords([...newRecords]);
      //合計時間を再計算して表示
      setTotalTime(totalTimeCalculate(newRecords));
      console.log("削除後のrecords:", setRecords);
      console.log("IDの型:", typeof id); 
      console.log("IDの内容:", id);
      console.log("削除後のrecords:", newRecords);
      // エラーがあれば例外を投げる
      if (error) {
        throw error;
      }
    } catch (error) {
      // 正常にデータが削除できなかった際にエラーをコンソールに表示する
      console.error("Error deleteData:", error);
      console.log("getDatabaseの中身:", records);
      return;
    }
  }
  return loading ? (
    <h2>Loading...</h2>
  ) : (
    <>
      <h1>学習記録!</h1>
      <InputForm
        name="content"
        value={inputs.content}
        onChange={handleInputChange}
        label="学習内容"
      />
      <InputForm
        name="time"
        value={inputs.time}
        onChange={handleInputChange}
        label="学習時間"
        suffix="時間"
        pattern="^[0-9]*$"
      />
      <p>入力されている学習内容: {inputs.content}</p>
      <p>入力されている時間: {inputs.time}時間</p>
      <RecordData data={records} onClickDelete={deleteRecord}/>
      <button onClick={handleRecord}>登録</button>
      <div>{error}</div>
      <p>合計時間：{totalTime}/1000（h）</p>
    </>
  );
};
