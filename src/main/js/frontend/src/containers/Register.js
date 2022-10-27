import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { register } from "../services/AuthService";
import { getTypeFromErrorMessage, useUserToken } from "../services/UserService";
import { isUserValid } from "../services/UserService";
import "../styles/auth.css";
import ServerSelect from "../components/Form/ServerSelect";


const Register = () => {
    const [ , setUserToken ] = useUserToken();
    const navigate = useNavigate();
    let formData = useRef();

    const setError = (message) => {
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
                    //setError(err);
                }
            }  
        }
        catch(err){
           // setError(err.message);
        } 
    }

    return(
        <div className="auth register">
            <form onSubmit={handleSubmit} ref={formData}>
                <label htmlFor="username" autoFocus={true}>Username: </label>
                <input type="text" name="username"></input>

                <label htmlFor="ingamename" autoFocus={true}>Ingame Name: </label>
                <input type="text" name="ingamename"></input>

                <label htmlFor="password" autoFocus={true}>Password: </label>
                <input type="password" name="password"></input>
             
                <ServerSelect/>

                <input type="submit" name="submit" placeholder="Submit"></input>
                <p className="redirect">Or click <a href="/login">here</a> to login</p>
            </form>
        </div>
    )
}

export default Register;