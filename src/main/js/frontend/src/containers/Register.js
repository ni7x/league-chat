import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { register } from "../services/AuthService";
import { getTypeFromErrorMessage, useUserToken } from "../services/UserService";
import { isUserValid } from "../services/UserService";
import "../styles/auth.css";
import Input from "../components/Form/Input";
import ServerSelect from "../components/Form/ServerSelect";


const Register = () => {
    const [ , setUserToken ] = useUserToken();
    const navigate = useNavigate();
    let [ errors, setErrors ] = useState(new Map());
    let formData = useRef();

    const setError = (message) => {
        setErrors(new Map([[getTypeFromErrorMessage(message), message]]));
    }
 
    let handleSubmit = async (e) => {
        e.preventDefault();
        let {username, ingamename, password, server} = formData.current;
        try{
            if(isUserValid(username.value, ingamename.value, password.value)){
                try{
                    let user = await register(username.value, ingamename.value, password.value, server.value);
                    setUserToken(user);
                    navigate("/");
                }catch(err){
                    setError(err);
                }
            }  
        }
        catch(err){
            setError(err.message);
        } 
    }

    return(
        <div className="auth register">
            <form onSubmit={handleSubmit} ref={formData}>
                <Input type="text" name="Username" errors={errors.get("USERNAME_ERROR")}/>
                <Input type="text" name="Ingame Name" errors={errors.get("INGAME_NAME_ERROR")}/>
                <Input type="password" name="Password" errors={errors.get("PASSWORD_ERROR")}/>
                
                <ServerSelect/>
                <input type="submit" name="submit" placeholder="Submit"></input>
                <p className="redirect">Or click <a href="/login">here</a> to login</p>
            </form>
        </div>
    )
}

export default Register;