import PropTypes from 'prop-types';

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
};

//関数型でかつ必須であることを保証
ListDisplay.propTypes = {
    recordList: PropTypes.func.isRequired,
  };