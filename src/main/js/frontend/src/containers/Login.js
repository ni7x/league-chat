import { useRef, useState } from "react";
import { login } from "../services/AuthService";

const Login = () => {
    const [ errorMessage, setErrorMessage ] = useState(""); 
    const formData = useRef();
    
    const handleSubmit = (e) => {

        e.preventDefault();
        const { username, password } = formData.current;
        login(username.value, password.value)
            .catch((err) => setErrorMessage("Couldn't login"))
            .finally(setErrorMessage("Logged in"));
    }

    return(
        <>
            <form onSubmit={handleSubmit} ref={formData}>
                <label htmlFor="username">Username: </label>
                <input type="text" name="username"></input>
                <label htmlFor="password">Password: </label>
                <input type="password" name="password"></input>
                <input type="submit" name="submit" placeholder="submit"></input>
            </form>
            <div>
                <p>{errorMessage}</p>
            </div>
        </>
    )
}

export default Login;