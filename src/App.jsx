import { useEffect, useState } from "react";
import { InputForm } from "./components/InputForm";
import { ListDisplay } from "./components/ListDisplay";
import { getLearnRecords } from "../utils/SupabaseFunction";
// import { RecordData } from "../utils/RecordData";
import { supabase } from "../utils/Supabase";

export const App = () => {
  const [inputs, setInputs] = useState({ content: "", time: "" });

  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [totalTime, serTotalTime] = useState(0);
  const [getDatabase, setGetDatabase] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = async () => {
      try {
        const recordData = await getLearnRecords();
        setGetDatabase(recordData);
      } catch (error) {
        console.error("データの取得に失敗しました", error);
      } finally {
        setLoading(false);
      }
    };
    data();
  }, []);

  const handleChange = (e) => {
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

  const handleRegister = async () => {
    let newRecord;
    //学習内容もしくは学習時間のどちらかが入力されていないときに入力されていない項目がありますと表示する
    if (!inputs.content || inputs.time === "" || inputs.time === null) {
      setError("入力されていない項目があります。");
      return;
    } else {
      //入力した学習内容、学習時間をオブジェクトの中に入れる
      //学習時間は数値型で10進数に変換
      newRecord = {
        title: inputs.content,
        time: parseInt(inputs.time, 10),
      };

      try {
        //supabaseのテーブルのcontent,timeというカラムに入力した学習内容、学習時間を登録する
        const { error } = await supabase
          .from("study-record")
          .insert({ content: newRecord.title, time: newRecord.time })
          .select();
        //エラーがあれば例外を投げる
        if (error) {
          throw error;
        }
      } catch (error) {
        //正常にデータが登録できなかった際にエラーをコンソールに表示する
        console.error("Error insert addData:", error);
        return;
      }
    }
    //入力したデータをリストに追加する
    const newRecords = [...records, newRecord];
    setRecords(newRecords);
    //学習内容、学習時間の入力欄を初期化する
    setInputs({ content: "", time: "" });
    //エラーも初期化する
    setError("");

    //合計時間を計算
    const newTotalTime = newRecords.reduce(
      (sum, record) => sum + record.time,
      0
    );
    serTotalTime(newTotalTime);
  };

  const deleteRecord = async (id) => {
    //supabaseからidを参照してテーブルから削除ボタンを押したデータを削除する
    try {
      const { error } = await supabase
      .from("study-record")
      .delete()
      .eq("id", id);
      console.log("IDの型:", typeof id); 
      console.log("IDの内容:", id);
      //エラーがあれば例外を投げる
      if (error) {
        throw error;
      }
    } catch (error) {
      //正常にデータが削除できなかった際にエラーをコンソールに表示する
      console.error("Error deleteData:", error);
      console.log("getDatabaseの中身:", getDatabase);
      return;
    }
    const newRecords = records.filter(record => record.id !=id);
    setRecords(newRecords);
    console.log("削除後のrecords:", newRecords);
  }
  return loading ? (
    <h2>Loading...</h2>
  ) : (
    <>
      <h1>学習記録一覧</h1>
      <InputForm
        name="content"
        value={inputs.content}
        onChange={handleChange}
        label="学習内容"
      />
      <InputForm
        name="time"
        value={inputs.time}
        onChange={handleChange}
        label="学習時間"
        suffix="時間"
        pattern="^[0-9]*$"
      />
      <p>入力されている学習内容: {inputs.content}</p>
      <p>入力されている時間: {inputs.time}時間</p>
      <ul style={{listStyle:"none"}}>
        {getDatabase.map((record) => (
          <li key={record.id}>{record.content}{record.time}時間
          <button onClick={() => deleteRecord(record.id)}>削除</button>
          </li>
        )
        )}
      </ul>
      {/* <RecordData data={getDatabase} onClickDelete={deleteRecord(records)}/> */}
      <button onClick={handleRegister}>登録</button>
      <div>{error}</div>
      <p>合計時間：{totalTime}/1000（h）</p>
      <ListDisplay recordList={records} />
    </>
  );
};
