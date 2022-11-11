import { useRef, useState} from "react";
import { useNavigate } from "react-router";
import { login, forgotPassword } from "../services/AuthService";
import { useUserToken } from "../services/UserService";
import "../styles/auth.css";

const Login = () => {
    const [, setUserToken ] = useUserToken();
    const naviagate = useNavigate();
    const [ errorMessage, setErrorMessage ] = useState(false); 
    const [ isCapsOn, setIsCapsOn ] =  useState(false);
    const [ isPasswordShown, setIsPasswordShown ] =  useState(false);
    const [ isPasswordRecoveryShown, setIsPasswordRecoveryShown ] = useState(false);

    const forgotData = useRef();
    const handleForgotPassword = (e) => {
        e.preventDefault();
        const { email } = forgotData.current;
        try{
            forgotPassword(email.value);
        }catch(err){
            console.log(err);
        }
        
    }
    
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

    const passwordRecoveryToggle = (e) => {
        e.preventDefault();
        setIsPasswordRecoveryShown(!isPasswordRecoveryShown);
    }

    const formData = useRef();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = formData.current;
        try{
            let token = await login(username.value, password.value);
            setUserToken(token);
            naviagate("/");
        }catch(err){
           setErrorMessage(true);
        }
    }

    return(
        <div className="auth login">
            <div className="forgot-password-dial" style={isPasswordRecoveryShown ? {"display" : "block"} : {"display" : "none"}}>
                <button onClick={passwordRecoveryToggle} className="go-back"><i class="fa-solid fa-arrow-left-long"></i></button>
                <form onSubmit={handleForgotPassword} ref={forgotData}>
                    <p> Send e-mail with password recovery </p>
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email"></input>
                    <input type="submit" name="submit" value="Send e-mail"></input>
                </form>
            </div>

            <p className={errorMessage? "error active" : "error"}> Could not authorize.</p>
            <form onSubmit={handleSubmit} ref={formData}  style={isPasswordRecoveryShown ? {"display" : "none"} : {"display" : "block"}}>

                <label htmlFor="username">Username: </label>
                <input type="text" name="username" autoFocus={true}></input>

                <label htmlFor="password">
                    Password: 
                    <span className="caps-warrning" style={isCapsOn? {"display" : "block"} : {"display" : "none"}}>Caps Lock is on!</span>
                </label>
                <div className="password-box">
                    <input type={isPasswordShown ? "text":"password"} name="password" onKeyUp={detectCapsLock}></input>
                    <button onClick={passwordToggle}><i className={isPasswordShown? "fa-solid fa-eye":"fa-sharp fa-solid fa-eye-slash"}></i></button>
                </div>

                <input type="submit" name="submit" value="Login"></input>
                <button onClick={passwordRecoveryToggle}>Forgot password?</button>
                <p className="redirect">Or click <a href="/register">here</a> to register</p>
            </form>
        </div>
    )
}

export default Login;