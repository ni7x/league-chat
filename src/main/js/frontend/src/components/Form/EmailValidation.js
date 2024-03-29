
import { useEffect, useState } from "react";
import { useUserDetails } from "../../services/UserService";
import { checkEmailUniqueness } from "../../services/UserService";

const EmailValidation = (props) => {
    const [ userDetails,  ] = useUserDetails();
    const [ isEmailRegexValid, setIsEmailRegexValid ] = useState(() => userDetails !== null ? true : false);
    const [ isEmailUnqiue, setIsEmailUnique ] = useState(true);
    
    useEffect(()=>{
        if(isEmailRegexValid && isEmailUnqiue){
            props.setIsEmailValid(true);
        }else{
            props.setIsEmailValid(false);
        }    
    })
  
    let emailValidation = (e) => {
        if(userDetails !== null && (userDetails.email === e.target.value || e.target.value === "")){
            setIsEmailRegexValid(true);
            setIsEmailUnique(true);
        }else if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)){
            setIsEmailRegexValid(true);
            checkEmailUniqueness(e.target.value).then(result => setIsEmailUnique(result)); 
        }
        else{
            setIsEmailRegexValid(false);
            setIsEmailUnique(true);
        }
    }

    return(
        <div className="setting"> 
            <label htmlFor="email">Email: </label>
            <input type="email" name="email" onInput={emailValidation} defaultValue={props.currentValue}></input>
            <div className="tips">
                <p>
                    <span className={isEmailRegexValid ? "valid": null}>Email is valid</span>
                </p>
                <p>
                    <span className="invalid" style={isEmailUnqiue ? {display: "none"} : {display: "block"}}>This e-email is already taken</span>
                </p>
            </div>
        </div>
    )

}

export default EmailValidation;