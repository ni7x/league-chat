import { useRef, useState} from "react";
import { useNavigate } from "react-router";
import { login } from "../services/AuthService";
import { useUserToken } from "../services/UserService";
import "../styles/auth.css";

const Login = () => {
    const [, setUserToken ] = useUserToken();
    const naviagate = useNavigate();
    const [ errorMessage, setErrorMessage ] = useState(false); 
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
            <p className={errorMessage? "error active" : "error"}> Could not authorize.</p>
            <form onSubmit={handleSubmit} ref={formData}>

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
                <p className="redirect">Or click <a href="/register">here</a> to register</p>
            </form>
        </div>
    )
}

export default Login;