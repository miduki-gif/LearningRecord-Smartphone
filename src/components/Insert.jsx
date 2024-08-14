import PropTypes from 'prop-types';


export const Insert = (props) =>{
  const {onClick} =props;
  return(
      <>
      <button onClick={onClick}>登録</button>

      </>
  );
};

//関数型でかつ必須であることを保証
Insert.propTypes = {
  onClick: PropTypes.func.isRequired,
};
