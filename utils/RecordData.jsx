// import PropTypes from 'prop-types';

// export const RecordData = (props) =>{
//     const { data, onClickDelete } = props;
//     return(
//         <>
//         <ul style={{listStyle:"none"}}>
//         {data.map((user, time) => (
//           <li key={time}>{user.content}{user.time}時間
//           <button onClick={onClickDelete}>削除</button>
//           </li>
//         )
//         )}
//       </ul> 
//         </>
//     );
// }

// //関数型でかつ必須であることを保証
// RecordData.propTypes = {
//     data: PropTypes.func.isRequired,
//     onClickDelete: PropTypes.func.isRequired,
//   };