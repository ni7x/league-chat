import { useRef, useState } from "react"
import PasswordValidation from "../components/Form/PasswordValidation";
import PositionSelect from "../components/Form/PositionSelect";
import ServerSelect from "../components/Form/ServerSelect";
import { logout } from "../services/AuthService";
import { deleteUser, isUserValid, updateUser, useUserToken } from "../services/UserService";
import { useUserDetails } from "../services/UserService";

const Settings = () => {
    const [ userToken, setUserToken ] = useUserToken(); 
    const [ userDetails, setUserDetails ] = useUserDetails();
    const [ isPasswordValid, setIsPasswordValid] = useState(false);

    let [ errors, setErrors ] = useState(new Map());
    const formData = useRef();

    const setError = (message) => {
        
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        let {username, ingamename, password, positions, server} = formData.current;
        let positionsArray = Array.from(positions.options).filter(option=>option.selected).map(option=>option.value);
        try{
            if(isUserValid(username.value, ingamename.value, password.value)){
                try{
                    const data = await updateUser(userDetails.id, username.value, ingamename.value, password.value, positionsArray, server.value, userToken);
                    let updatedUser = await data.json();
                    if(updatedUser.username !== userDetails.username){
                        logout();
                        setUserToken(null);
                    }
                    setError(new Map());
                    setUserDetails(updatedUser);
                }catch(err){
                    setError(err);
                }
            }
        }catch(err){
            setError(err.message);
        } 

    }

    const handleDelete = async () => {
        const data = await deleteUser(userDetails.username, userToken);
        if(data.ok){
            logout();
            setUserToken(null);
        }else{
            console.log(data);
            //error handling
        }
    }

    return(
        <div  className="auth register">
            <form ref={formData} onSubmit={handleUpdate}>
                <PositionSelect current={userDetails.positions}/>
                <ServerSelect current={userDetails.server}/>
                <PasswordValidation setIsPasswordValid={setIsPasswordValid}/>
                <input type="submit" name="submit" placeholder="Submit"></input>
                <button onClick={handleDelete}>Delete account</button>
            </form>
            
        </div>
    )
}
export default Settings;