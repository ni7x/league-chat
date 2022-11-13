
import { useEffect, useState } from "react";
import { checkEmailUniqueness } from "../../services/UserService";

const EmailValidation = (props) => {

    const [ isEmailRegexValid, setIsEmailRegexValid ] = useState(false);
    const [ isEmailUnqiue, setIsEmailUnique ] = useState(true);

    useEffect(()=>{
        if(isEmailRegexValid && isEmailUnqiue){
            props.setIsEmailValid(true);
        }else{
            props.setIsEmailValid(false);
        }      
    })

  
    let emailValidation = (e) => {
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)){
            setIsEmailRegexValid(true);
            checkEmailUniqueness(e.target.value).then(result => setIsEmailUnique(result)); 
        }else{
            setIsEmailRegexValid(false);
            setIsEmailUnique(true);
        }
    }

    return(
        <div className="setting"> 
            <label htmlFor="email">Email: </label>
            <input type="email" name="email" onKeyUp={emailValidation} defaultValue={props.currentValue}></input>
            <div className="tips">
                <p>
                    <span className={isEmailRegexValid ? "valid": null}>Email needs to be valid</span>
                </p>
                <p>
                    <span className="invalid" style={isEmailUnqiue ? {display: "none"} : {display: "block"}}>This e-email is already taken</span>
                </p>
            </div>
        </div>
    )

}

export default EmailValidation;