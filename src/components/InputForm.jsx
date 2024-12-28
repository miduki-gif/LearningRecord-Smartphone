export const InputForm = (props) =>{
    const {name,value, onChange, label,id,suffix,pattern}=props;
    return(
        <>
        <label htmlFor={id}>{label}</label>
        <input id={id} name={name} value={value} onChange={onChange} pattern={pattern}/>
        <span>{suffix}</span>
        </>
    );
}