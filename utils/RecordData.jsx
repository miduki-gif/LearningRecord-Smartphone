import PropTypes from 'prop-types';

export const RecordData = (props) =>{
    const { data } = props;
    return(
        <>
        <ul style={{listStyle:"none"}}>
        {data.map((user, time) => (
          <li key={time}>{user.content}{user.time}時間</li>
        ))}
      </ul> 
        </>
    );
}

//関数型でかつ必須であることを保証
RecordData.propTypes = {
    data: PropTypes.func.isRequired,
  };