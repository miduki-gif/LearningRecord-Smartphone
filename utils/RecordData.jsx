export const RecordData = (props) =>{
    const { data, onClickDelete } = props;
    return(
        <>
        <ul style={{listStyle:"none"}}>
        {data.map((record) => (
          <li data-testid="recordData" key={record.id}>
            <span data-testid="content">{record.content}</span>
            <span data-testid="time">{record.time}
            <span data-testid="time-string">時間</span>
            </span>
          <button onClick={() => onClickDelete(record.id)}>削除</button>
          </li>
        )
        )}
      </ul> 
        </>
    );
}