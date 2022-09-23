import { useRef, useState} from "react";
import { useNavigate } from "react-router";
import { login, useUserToken } from "../services/AuthService";
import "../styles/auth.css";

const Login = () => {
    const [ user, setUser ] = useUserToken();
    const naviagate = useNavigate();
    const [ errorMessage, setErrorMessage ] = useState(""); 
    const formData = useRef();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = formData.current;
        try{
            let user = await login(username.value, password.value);
            setUser(user);
            naviagate("/");
        }catch(err){
           setErrorMessage("Couldn't login");
        }
    }

    return(
        <div className="auth">
            <form onSubmit={handleSubmit} ref={formData}>
                <label htmlFor="username">Username: </label>
                <input type="text" name="username"></input>
                <label htmlFor="password">Password: </label>
                <input type="password" name="password"></input>
                <p className="auth-error">{errorMessage}</p>
                <input type="submit" name="submit" placeholder="submit"></input>
                <p>Or click <a href="/register">here</a> to register</p>
            </form>
        </div>
    )
}

export default Login;