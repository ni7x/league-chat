import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { register } from "../services/AuthService";
import { getTypeFromErrorMessage, useUserToken } from "../services/UserService";
import "../styles/auth.css";
import ServerSelect from "../components/Form/ServerSelect";
import PasswordValidation from "../components/Form/PasswordValidation";


const Register = () => {
    const [ , setUserToken ] = useUserToken();

    //forgive me please
    const [ isUsernameValid, setIsUsernameValid ] = useState(false);
    const [ isUsernameUnqiue, setIsUsernameUnique ] = useState(true);
    const [ isEmailValid, setIsEmailValid ] = useState(false);
    const [ isEmailUnqiue, setIsEmailUnqiue ] = useState(true);
    const [ isIngameNameValid, setIsIngameNameValid ] = useState(false);
    const [ isIngameNameUnqiue, setIsIngameNameUnique ] = useState(true);
    const [ isPasswordValid, setIsPasswordValid] = useState(false);
    const [ isFirstPhase, setIsFirstPhase ] = useState(true);
    
   

    const navigate = useNavigate();
    let formData = useRef();

    let usernameValidation = (e) => {
        if(e.target.value.length >= 4 && e.target.value.length <= 25){
            setIsUsernameValid(true);
        }else{
            setIsUsernameValid(false);
        }
    }

    let emailValidation = (e) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)){
            setIsEmailValid(true);
        }else{
            setIsEmailValid(false)
        }
    }

    let ingameNameValidation = (e) => {
        if(e.target.value.length >= 2 && e.target.value.length <= 16){
            setIsIngameNameValid(true);
        }else{
            setIsIngameNameValid(false);
        }
    }

   

    let isUserValid = () => {
        if(!isUsernameValid){
            return false;
        }
        if(!isEmailValid){
            return false;
        }
        if(!isIngameNameValid){
            return false;
        }
        if(!isPasswordValid){
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
                if(err.startsWith("Ingame")){
                    setIsIngameNameUnique(false);
                    setIsUsernameUnique(true);
                    setIsEmailUnqiue(true);
                }
            }
        }      
    }
    
    let proceedNext = async () => {
        let {username, email, password} = formData.current;
        if((isUsernameValid && isEmailValid) && isPasswordValid){
            try{
                await register(username.value, email.value, null, password.value, "BR");
            }catch(err){
                if(!err.startsWith("User") && !err.startsWith("Email")){
                    setIsFirstPhase(false);
                    setIsEmailUnqiue(true);
                    setIsUsernameUnique(true);
                }
                else if(err.startsWith("User")){
                    setIsUsernameUnique(false);
                }else if(err.startsWith("Email")){
                    setIsEmailUnqiue(false);
                    setIsUsernameUnique(true);
                }
            }

        }
    }

    return(
        <div className="auth register">
            <form onSubmit={handleSubmit} ref={formData}>
                
                <div className="first-phase" style={isFirstPhase?{display:"block"} : {display: "none"}}>
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" onKeyUp={usernameValidation} autoFocus={true}></input>
                    <div className="tips">
                        <p><span className={isUsernameValid ? "valid": null}>4-20 characters long</span></p>
                        <p><span className="invalid" style={isUsernameUnqiue ? {display: "none"} : {display: "block"}}>This username is already taken</span></p>
                    </div>

                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" onKeyUp={emailValidation}></input>
                    <div className="tips">
                    <p>
                        <span className={isEmailValid ? "valid": null}>Email needs to be valid</span></p>
                        <p><span className="invalid" style={isEmailUnqiue ? {display: "none"} : {display: "block"}}>This e-email is already taken</span></p>
                    </div>

                    <PasswordValidation setIsPasswordValid={setIsPasswordValid}/>

                    <input type="submit" name="submit" value="Next" onClick={proceedNext}></input>

                </div>

                <div className="second-phase" style={!isFirstPhase?{display:"block"} : {display: "none"}}>
                    <button onClick={e=>setIsFirstPhase(true)} className="go-back"><i class="fa-solid fa-arrow-left-long"></i></button>
                    <label htmlFor="ingamename">Ingame Name: </label>
                    <input type="text" name="ingamename" onKeyUp={ingameNameValidation} autoFocus={true}></input>
                    <div className="tips">
                        <p><span className={isIngameNameValid ? "valid": null}>2-16 characters long</span></p>
                        <p><span className="invalid" style={isIngameNameUnqiue ? {display: "none"} : {display: "block"}}>This ign is already taken on this server</span></p>
                    </div>
                    <label htmlFor="server">Server: </label>
                    <ServerSelect/>
                    <input type="submit" name="submit" value="Register"></input>
                </div>

                <p className="redirect">Or click <a href="/login">here</a> to login</p>
            </form>
        </div>
    )
}

export default Register;