import { useRef, useState} from "react";
import { useNavigate } from "react-router";
import Input from "../components/Form/Input";
import { login } from "../services/AuthService";
import { useUserToken } from "../services/UserService";
import "../styles/auth.css";

const Login = () => {
    const [, setUserToken ] = useUserToken();
    const naviagate = useNavigate();
    const [ errorMessage, setErrorMessage ] = useState(""); 
    const formData = useRef();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = formData.current;
        try{
            let token = await login(username.value, password.value);
            setUserToken(token);
            naviagate("/");
        }catch(err){
           setErrorMessage(err);
        }
    }

    return(
        <div className="auth">
            <form onSubmit={handleSubmit} ref={formData}>
                <Input type="text" name="Username"/>
                <Input type="password" name="Password"/>
                <p className="auth-error">{errorMessage}</p>
                <input type="submit" name="submit" placeholder="submit"></input>
                <p>Or click <a href="/register">here</a> to register</p>
            </form>
        </div>
    )
}

export default Login;