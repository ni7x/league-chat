import PasswordValidation from "../components/Form/PasswordValidation";
import { useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { changePassword } from "../services/AuthService";

const ForgotPassword = () => {
    const [ isPasswordValid, setIsPasswordValid] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();  
    let formData = useRef();

    let handleSubmit = (e) => {
        e.preventDefault();
        const { password } = formData.current;
        let token = searchParams.get("token");
        try{
            changePassword(password.value, token);
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className="auth register">  
            <form onSubmit={handleSubmit} ref={formData}>
                <p>Type your new password</p>
                <PasswordValidation setIsPasswordValid={setIsPasswordValid}/>
                <input type="submit" value="Change Password"></input>
           </form>
        </div>
    )
}

export default ForgotPassword;