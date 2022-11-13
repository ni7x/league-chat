import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { register } from "../services/AuthService";
import { getTypeFromErrorMessage, useUserToken } from "../services/UserService";
import "../styles/auth.css";
import ServerSelect from "../components/Form/ServerSelect";
import PasswordValidation from "../components/Form/PasswordValidation";
import UsernameValidation from "../components/Form/UsernameValidation";
import IngameNameValidation from "../components/Form/IngameNameValidation";
import EmailValidation from "../components/Form/EmailValidation";


const Register = () => {
    const [ , setUserToken ] = useUserToken();

    const [ isUsernameValid, setIsUsernameValid ] = useState(false);
    const [ isEmailValid, setIsEmailValid ] = useState(false);
    const [ isIngameNameValid, setIsIngameNameValid ] = useState(false);
    const [ isPasswordValid, setIsPasswordValid] = useState(false);
    const [ isFirstPhase, setIsFirstPhase ] = useState(true);
    

    const navigate = useNavigate();
    let formData = useRef();

   

   

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
               alert("Unknown error");
            }
        }      
    }
    
    let proceedNext = async () => {
        if((isUsernameValid && isEmailValid) && isPasswordValid){
            setIsFirstPhase(false);
        }
            
    }

    return(
        <div className="auth register">
            <form onSubmit={handleSubmit} ref={formData}>    
                <div className="first-phase" style={isFirstPhase ? {display:"block"} : {display: "none"}}>
                   <UsernameValidation setIsUsernameValid={setIsUsernameValid}/>
                   <EmailValidation setIsEmailValid={setIsEmailValid}/>
                   <PasswordValidation setIsPasswordValid={setIsPasswordValid}/>
                   <input type="submit" name="submit" value="Next" onClick={proceedNext}></input>
                </div>
                <div className="second-phase" style={!isFirstPhase?{display:"block"} : {display: "none"}}>
                    <button onClick={e=>setIsFirstPhase(true)} className="go-back">
                        <i className="fa-solid fa-arrow-left-long"></i>
                    </button>
                    <IngameNameValidation setIsIngameNameValid={setIsIngameNameValid}/>
                    <input type="submit" name="submit" value="Register"></input>
                </div>
                <p className="redirect">Or click <a href="/login">here</a> to login</p>
            </form>
        </div>
    )
}

export default Register;