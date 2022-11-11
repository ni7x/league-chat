import PasswordValidation from "../components/Form/PasswordValidation";
import { useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { changePassword } from "../services/AuthService";
import { useNavigate } from "react-router";
import { useUserToken } from "../services/UserService";


const ForgotPassword = () => {
    const [, setUserToken ] = useUserToken();
    const [ isPasswordValid, setIsPasswordValid] = useState(false);
    const [ searchParams, setSearchParams] = useSearchParams();  
    const [ errorMessage, setErrorMessage ] = useState(false); 

    let formData = useRef();
    const naviagate = useNavigate();

    let handleSubmit = async (e) => {
        e.preventDefault();
        const { password } = formData.current;
        let password_token = searchParams.get("token");
        if(isPasswordValid){
            try{
                let user_token = await changePassword(password.value, password_token);
                setUserToken(user_token);
                naviagate("/");
            }catch(err){
               setErrorMessage(true);
            }
        }
       
    }

    return(
        
            
            <div className="auth forgot">  
                <p className={errorMessage? "error active" : "error"}>Token expired</p>
                <form onSubmit={handleSubmit} ref={formData}>
                    <PasswordValidation setIsPasswordValid={setIsPasswordValid}/>
                    <input type="submit" value="Change Password"></input>
            </form>
            </div>
        
    )
}

export default ForgotPassword;