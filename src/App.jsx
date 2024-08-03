import {  useState } from "react";
import { InputForm } from "./components/InputForm";
import { Insert } from "./components/Insert";
import { ListDisplay } from "./components/ListDisplay";
// import { learnRecordTestData } from "../Utils/supabaseFunction";

export const App = () =>{

const [inputs, setInputs] = useState({ content: "", time:""});

const [records, setReCords] = useState([]);
 const [error, setError] = useState("");
 const [totalTime, serTotalTime] = useState(0);


const handleChange = (e) => {
  const {name, value } = e.target;
  if (name === 'time' && !/^[0-9]*$/.test(value)) {
    return;
}

  setInputs(prevInputs =>({
    ...prevInputs,
    [name]: name === "time" ? parseInt(value, 10) || "" : value
}));
}

  const handleRegister = () =>{
    if(!inputs.content ||!inputs.time){
      setError("入力されていない項目があります。");
    }
    else{
      const newRecord = {title:inputs.content,time:parseInt(inputs.time, 10) }
      const newRecords = [...records,newRecord];
      setReCords(newRecords);
    setInputs({content:"", time:""});
    setError("");

    //合計時間を計算
      const newTotalTime = newRecords.reduce((sum, record)=> sum + record.time, 0);
      serTotalTime(newTotalTime);
  }
  };
  return (
    <>
    <h1>学習記録一覧</h1>
    <InputForm name="content" value={inputs.content} onChange={handleChange} label="学習内容"/>
    <InputForm name="time" value={inputs.time} onChange={handleChange} label="学習時間" suffix="時間" pattern="^[0-9]*$"/>
    <p>入力されている学習内容: {inputs.content}</p>
    <p>入力されている時間: {inputs.time}時間</p>
    <Insert onClick={handleRegister}/>
    <div>{error}</div>
    <p>合計時間：{totalTime}/1000（h）</p>
    <ListDisplay recordList={records}/>
    </>
  );
}