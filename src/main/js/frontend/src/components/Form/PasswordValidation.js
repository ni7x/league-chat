import { useEffect, useState } from "react";
import { useUserDetails } from "../../services/UserService";

const specialCharacters = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

const PasswordValidation = (props) => {
    const [ userDetails,  ] = useUserDetails();   
    const [ isPasswordLengthValid, setIsPasswordLengthValid ] =  useState(() => userDetails !== null ? true : false);
    const [ containsLowercase, setContainsLowercase ] =  useState(() => userDetails !== null ? true : false);
    const [ containsUpperCase, setContainsUpperCase ] =  useState(() => userDetails !== null ? true : false);
    const [ containsDigit, setContainsDigit ] =  useState(() => userDetails !== null ? true : false);
    const [ containsSpecialCharacter, setContainsSpecialCharacter ] =  useState(() => userDetails !== null ? true : false);
    const [ isCapsOn, setIsCapsOn ] =  useState(false);
    const [ isPasswordShown, setIsPasswordShown ] =  useState(false);
    
    useEffect(()=>{
        if(isPasswordLengthValid && containsDigit && containsSpecialCharacter && containsLowercase && containsUpperCase){
            props.setIsPasswordValid(true);
        }else{
            props.setIsPasswordValid(false);
        }   
    })

    const detectCapsLock = (e) => {
        if(e.getModifierState("CapsLock")){
            setIsCapsOn(true);
        }else{
            setIsCapsOn(false);
        }
    }

    const passwordToggle = (e) => {
        e.preventDefault();
        setIsPasswordShown(!isPasswordShown);
    }

    let passwordValidation = (e) => {
        detectCapsLock(e);
        console.log(e.target.value)
        if(userDetails !== null && e.target.value === ""){
            setIsPasswordLengthValid(true);
            setContainsDigit(true);
            setContainsUpperCase(true);
            setContainsLowercase(true);
            setContainsSpecialCharacter(true);
        }else{
            let password = e.target.value;
            
            if(password.length >= 8 && password.length <= 20){
                setIsPasswordLengthValid(true);
            }else{
                setIsPasswordLengthValid(false);
            }
    
            if(password !== password.toUpperCase() && password.length > 0){
                setContainsLowercase(true)
            }else{
                setContainsLowercase(false);
            }
    
            if(password !== password.toLowerCase() && password.length > 0){
                setContainsUpperCase(true)
            }else{
                setContainsUpperCase(false);
            }
    
            if(/\d/.test(password)){
                setContainsDigit(true);
            }else{
                setContainsDigit(false);
            }
    
            if(specialCharacters.test(password)){
                setContainsSpecialCharacter(true);
            }else{
                setContainsSpecialCharacter(false);
            }
        }

        
    }

    return(
        <div className="setting"> 
            <label htmlFor="password">
                Password: 
                <span className="caps-warrning" style={isCapsOn? {"display" : "block"} : {"display" : "none"}}>Caps Lock is on!</span>
            </label>
            <div className="password-box">
                <input type={isPasswordShown ? "text":"password"} name="password" onKeyUp={passwordValidation}></input>
                <button onClick={passwordToggle}><i className={isPasswordShown ? "fa-solid fa-eye":"fa-sharp fa-solid fa-eye-slash"}></i></button>
            </div>
            <div className="tips">
                <p><span className={isPasswordLengthValid ? "valid": null}>8-20 characters long</span></p>
                <p><span className={containsUpperCase ? "valid": null}>at least 1 uppercase character</span> </p>
                <p><span className={containsLowercase ? "valid": null}>at least 1 lowercase character</span></p>
                <p><span className={containsDigit ? "valid": null}>at least 1 digit</span></p>
                <p><span className={containsSpecialCharacter ? "valid": null}>at least 1 special character</span></p>
            </div>
        </div>
    )

}

export default PasswordValidation;