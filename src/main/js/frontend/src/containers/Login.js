import { useRef, useState} from "react";
import { login, useUser } from "../services/AuthService";


const Login = () => {
    const [ user, setUser ] = useUser();
    const [ errorMessage, setErrorMessage ] = useState(""); 
    const formData = useRef();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = formData.current;
        try{
            let user = await login(username.value, password.value);
            setUser(user);
        }catch(err){
           setErrorMessage("Couldn't login");
        }
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