export const RecordData = (props) =>{
    const { data, onClickDelete } = props;
    return(
        <>
        <ul style={{listStyle:"none"}}>
        {data.map((record) => (
          <li key={record.id}>{record.content}{record.time}時間
          <button onClick={() => onClickDelete(record.id)}>削除</button>

          </li>
        )
        )}
      </ul> 
        </>
    );
}