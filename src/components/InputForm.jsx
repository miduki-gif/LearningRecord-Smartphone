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