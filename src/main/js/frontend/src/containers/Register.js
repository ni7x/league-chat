import { useRef, useState } from "react";
import { register } from "../services/AuthService";

const Register = () => {
    let [ errors, setErrors ] = useState(new Map());
    let formData = useRef();

    const addError = (errorFor, errorMessage) => {
        setErrors(map=> new Map(map.set(errorFor, errorMessage)));
    }

    const isValid = (username, ingameName, password) =>{
        const PASSWORD_PATTERN = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$";

        if(username.length < 4){ 
            addError("username", "Username is too short!");
            return false;
        }
        if(ingameName.length < 2){
            addError("ingameName", "Ingame Name is too short!");
            return false;
        }
        if(password.length < 8){
            addError("password", "Password is too short!");
            return false;
        }
        if(password.length > 20){
            addError("password", "Password is too long!");
            return false;
        }
        if(!new RegExp(PASSWORD_PATTERN).test(password)){
            addError("password", "Password needs to have at least 1 capital character, 1 number and 1 small character!");
            return false;
        }
        return true;
    
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        //check if  username exist database needs to send error
        let {username, ingameName, password} = formData.current;
        if(isValid(username.value, ingameName.value, password.value)){
            register(username.value, ingameName.value, password.value)
            .then(window.location.href = "/");
        }   
    }

    return(
        <>
            <form onSubmit={handleSubmit} ref={formData}>
                <label htmlFor="username">Username: </label>
                <input type="text" name="username"></input>
                <p>{errors.get("username")}</p>
                <label htmlFor="ingameName">Ingame Name: </label>
                <input type="text" name="ingameName"></input>
                <p>{errors.get("ingameName")}</p>
                <label htmlFor="password">Password: </label>
                <input type="password" name="password"></input>
                <p>{errors.get("password")}</p>
                <input type="submit" name="submit" placeholder="Submit"></input>
            </form>
        </>
    )
}

export default Register;