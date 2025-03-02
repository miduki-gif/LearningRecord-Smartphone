export const RecordData = (props) =>{
    const { data, onClickDelete } = props;
    return(
        <>
        <ul data-testid="recordData" style={{listStyle:"none"}}>
        {data.map((record) => (
          <li key={record.id}>
            <span data-testid="content">{record.content}</span>
            <span data-testid="time">{`${record.time}時間`}</span>
          <button onClick={() => onClickDelete(record.id)}>削除</button>
          </li>
        )
        )}
      </ul> 
        </>
    );
}