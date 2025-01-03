export const RecordData = (props) =>{
    const { data, onClickDelete } = props;
    return(
        <>
        <ul data-testid="recordData" style={{listStyle:"none"}}>
        {data.map((record) => (
          <li key={record.id}>
            <span>{record.content}</span>
            <span>{record.time}
            <span>時間</span>
            </span>
          <button onClick={() => onClickDelete(record.id)}>削除</button>
          </li>
        )
        )}
      </ul> 
        </>
    );
}