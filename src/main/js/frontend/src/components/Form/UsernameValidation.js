import { useEffect, useState } from "react";
import { checkUsernameUniqueness } from "../../services/UserService";
import { useUserDetails } from "../../services/UserService";


const UsernameValidation = (props) => {
    const [ userDetails, ] = useUserDetails();

    const [ isUsernameLengthValid, setIsUsernameLengthValid ] =  useState(() => userDetails !== null ? true : false);
    const [ isUsernameUnqiue, setIsUsernameUnique ] = useState(true);

    useEffect(()=>{
        if(isUsernameLengthValid && isUsernameUnqiue){
            props.setIsUsernameValid(true);
        }else{
            props.setIsUsernameValid(false);
        }      
    })

  
    let usernameValidation = (e) => {
        if(userDetails !== null && (userDetails.username === e.target.value || e.target.value === "")){
            setIsUsernameLengthValid(true);
            setIsUsernameUnique(true);
        }else if(e.target.value.length >= 4 && e.target.value.length <= 25){
            setIsUsernameLengthValid(true);
            checkUsernameUniqueness(e.target.value).then(result=>setIsUsernameUnique(result)); 
        }else{
            setIsUsernameLengthValid(false);
            setIsUsernameUnique(true);
        }
    }

    return(
        <div className="setting"> 
           <label htmlFor="username">Username: </label>
            <input type="text" name="username" onKeyUp={usernameValidation} autoFocus={true} defaultValue={props.currentValue}></input>
            <div className="tips">
                <p><span className={isUsernameLengthValid ? "valid": null}>4-20 characters long</span></p>
                <p><span className="invalid" style={isUsernameUnqiue ? {display: "none"} : {display: "block"}}>This username is already taken</span></p>
            </div>
        </div>
    )

}

export default UsernameValidation;