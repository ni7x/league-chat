import { useRef, useState} from "react";
import { useNavigate } from "react-router";
import { login, forgotPassword } from "../services/AuthService";
import { useUserToken } from "../services/UserService";
import "../styles/auth.css";

const Login = () => {
    const [, setUserToken ] = useUserToken();
    const naviagate = useNavigate();
    const [ errorMessage, setErrorMessage ] = useState(false); 
    const [ emailMessage, setEmailMessage ] = useState(false);
    const [ loadingMessage, setLoadingMessage ] = useState(false);
    const [ successMessage, setSuccessMessage ] = useState(false);

    const [ isCapsOn, setIsCapsOn ] =  useState(false);
    const [ isPasswordShown, setIsPasswordShown ] =  useState(false);
    const [ isPasswordRecoveryShown, setIsPasswordRecoveryShown ] = useState(false);

    const forgotData = useRef();
    const handleForgotPassword = async (e) => {
        e.preventDefault(); //not the proudest code sorry was mad
        const { email } = forgotData.current;
        try{
            setSuccessMessage(false);
            setEmailMessage(false);
            setLoadingMessage(true);
            await forgotPassword(email.value);
            setLoadingMessage(false);
            setSuccessMessage(true);
        }catch(err){
            setLoadingMessage(false);
            setSuccessMessage(false);
            setEmailMessage(true);
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
        setErrorMessage(false);
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
                <p className={emailMessage? "error active" : "error"}> This email does not exist</p>
                <p className={loadingMessage? "loading active" : "loading"}>Email is being sent..</p>
                <p className={successMessage? "success active" : "success"}>Check your inbox</p>

                <form onSubmit={handleForgotPassword} ref={forgotData}>
                    <button onClick={passwordRecoveryToggle} className="go-back"><i className="fa-solid fa-arrow-left-long"></i></button>
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email"></input>
                    <input type="submit" name="submit" value="Request password reset"></input>
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
                    <button tabIndex={-1}  onClick={passwordToggle}><i className={isPasswordShown? "fa-solid fa-eye":"fa-sharp fa-solid fa-eye-slash"}></i></button>
                </div>
                <button onClick={passwordRecoveryToggle} className="forgot-password-button">Forgot password?</button>


                <input type="submit" name="submit" value="Login"></input>
                <p className="redirect">Or click <a href="/register">here</a> to register</p>
            </form>
        </div>
    )
}

export default Login;