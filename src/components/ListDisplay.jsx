
// timeを文字列としてフォーマットする関数
const formatTime = (time)=>`${time}時間`;

export const ListDisplay = (props)=>{
    const {recordList} =props;
    return(
        <ul style={{listStyle:"none"}}>
        {recordList.map((record, time)=>
        (
           <li key={time}>
            <p>{record.title}{formatTime(record.time)}</p>
           </li>
        )
       )}
         </ul>
    );
}