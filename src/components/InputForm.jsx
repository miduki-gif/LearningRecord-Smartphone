import PropTypes from 'prop-types';

export const InputForm = (props) =>{
    const {name,value, onChange, label,suffix,pattern}=props;
    return(
        <>
        <label>{label}</label>
        <input name={name} value={value} onChange={onChange} pattern={pattern}/>
        <span>{suffix}</span>
        </>
    );
}

//関数型でかつ必須であることを保証
InputForm.propTypes = {
    name: PropTypes.func.isRequired,
    value: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.func.isRequired,
    suffix: PropTypes.func.isRequired,
    pattern: PropTypes.func.isRequired
  };