import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { register } from "../services/AuthService";
import { getTypeFromErrorMessage, useUserToken } from "../services/UserService";
import "../styles/auth.css";
import ServerSelect from "../components/Form/ServerSelect";


const Register = () => {
    const [ , setUserToken ] = useUserToken();

    const [ isUsernameValid, setIsUsernameValid ] = useState(false);
    const [ isUsernameUnqiue, setIsUsernameUnique ] = useState(true);
    const [ isIngameNameValid, setIsIngameNameValid ] = useState(false);
    const [ isIngameNameUnqiue, setIsIngameNameUnique ] = useState(true);
    const [ isPasswordLengthValid, setIsPasswordLengthValid ] = useState(false);
    const [ containsLowercase, setContainsLowercase ] = useState(false); 
    const [ containsUpperCase, setContainsUpperCase ] = useState(false); 
    const [ containsDigit, setContainsDigit ] = useState(false);
    const [ containsSpecialCharacter, setContainsSpecialCharacter ] = useState(false);

    const [ isCapsOn, setIsCapsOn ] =  useState(false);
    const [ isPasswordShown, setIsPasswordShown ] =  useState(false);
    
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


    const navigate = useNavigate();
    let formData = useRef();

    let usernameValidation = (e) => {
        if(e.target.value.length >= 4 && e.target.value.length <= 25){
            setIsUsernameValid(true);
        }else{
            setIsUsernameValid(false);
        }
    }

    let ingameNameValidation = (e) => {
        if(e.target.value.length >= 2 && e.target.value.length <= 16){
            setIsIngameNameValid(true);
        }else{
            setIsIngameNameValid(false);
        }
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

    let isUserValid = () => {
        if(!isUsernameValid){
            return false;
        }
        if(!isIngameNameValid){
            return false;
        }
        if(!isPasswordLengthValid){
            return false;
        }
        if(!containsDigit || !containsSpecialCharacter){
            return false;
        }
        if(!containsLowercase || !containsUpperCase){
            return false;
        }
        return true;
    }

    let handleSubmit = async (e) => {
        e.preventDefault();
        let {username, email, ingamename, password, server} = formData.current;
        if(isUserValid()){
            try{
                let user = await register(username.value, email.value, ingamename.value, password.value, server.value);
                setUserToken(user);
                navigate("/");
            }catch(err){
                if(err.startsWith("User")){
                    setIsUsernameUnique(false);
                }else if(err.startsWith("Ingame")){
                    setIsIngameNameUnique(false);
                    setIsUsernameUnique(true);
                }else{
                    alert(err);
                }
            }
        }      
    }

    return(
        <div className="auth register">
            <form onSubmit={handleSubmit} ref={formData}>
                <label htmlFor="username" autoFocus={true}>Username: </label>
                <input type="text" name="username" onKeyUp={usernameValidation}></input>
                <div className="tips">
                    <p><span className={isUsernameValid ? "valid": null}>4-20 characters long</span></p>
                    <p><span className="invalid" style={isUsernameUnqiue ? {display: "none"} : {display: "block"}}>This username is already taken</span></p>
                </div>

                <label htmlFor="email" autoFocus={true}>Email: </label>
                <input type="email" name="email" onKeyUp={null}></input>
              

                <label htmlFor="ingamename" autoFocus={true}>Ingame Name: </label>
                <input type="text" name="ingamename" onKeyUp={ingameNameValidation}></input>
                <div className="tips">
                    <p><span className={isIngameNameValid ? "valid": null}>2-16 characters long</span></p>
                    <p><span className="invalid" style={isIngameNameUnqiue ? {display: "none"} : {display: "block"}}>This ign is already taken on this server</span></p>
                </div>

                <label htmlFor="password" autoFocus={true}>
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

                <ServerSelect/>

                <input type="submit" name="submit" value="Register"></input>
                <p className="redirect">Or click <a href="/login">here</a> to login</p>
            </form>
        </div>
    )
}

export default Register;