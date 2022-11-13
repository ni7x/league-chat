import { useEffect, useState } from "react";
const PasswordValidation = (props) => {
    
    const [ isPasswordLengthValid, setIsPasswordLengthValid ] = useState(false);
    const [ containsLowercase, setContainsLowercase ] = useState(false); 
    const [ containsUpperCase, setContainsUpperCase ] = useState(false); 
    const [ containsDigit, setContainsDigit ] = useState(false);
    const [ containsSpecialCharacter, setContainsSpecialCharacter ] = useState(false);
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

        if(e.target.value.length >= 8 && e.target.value.length <= 20){
            setIsPasswordLengthValid(true);
        }else{
            setIsPasswordLengthValid(false);
        }

        if(e.target.value !== e.target.value.toUpperCase() && e.target.value.length > 0){
            setContainsLowercase(true)
        }else{
            setContainsLowercase(false);
        }

        if(e.target.value !== e.target.value.toLowerCase() && e.target.value.length > 0){
            setContainsUpperCase(true)
        }else{
            setContainsUpperCase(false);
        }

        if(/\d/.test(e.target.value)){
            setContainsDigit(true);
        }else{
            setContainsDigit(false);
        }

        if(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(e.target.value) && e.target.value.length > 0){
            setContainsSpecialCharacter(true);
        }else{
            setContainsSpecialCharacter(false);
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