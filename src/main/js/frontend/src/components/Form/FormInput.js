const FormInput = (props) => {
    const labelName = props.name.toLowerCase().replace(/\s+/g, '');
    return(
        <>
                <label htmlFor={labelName}>{props.name}: </label>
                <input type={props.type} name={labelName} defaultValue={props.defaultValue}></input>
                <p className="auth-error">{props.errors}</p>
        </>
    )
}

export default FormInput;