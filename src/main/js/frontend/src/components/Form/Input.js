const Input = (props) => {
    const labelName = props.name.toLowerCase().replace(/\s+/g, '');
    return(
        <>
                <label htmlFor={labelName}>{props.name}: </label>
                <input type={props.type} name={labelName} defaultValue={props.defaultValue} autoFocus={props.autoFocus}></input>
                <p className="error">{props.errors}</p>
        </>
    )
}

export default Input;