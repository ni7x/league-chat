import { useRef, useState } from "react"
import EmailValidation from "../components/Form/EmailValidation";
import IngameNameValidation from "../components/Form/IngameNameValidation";
import PasswordValidation from "../components/Form/PasswordValidation";
import PositionSelect from "../components/Form/PositionSelect";
import UsernameValidation from "../components/Form/UsernameValidation";
import ServerSelect from "../components/Form/ServerSelect";
import { logout } from "../services/AuthService";
import { deleteUser, updateUser, useUserToken } from "../services/UserService";
import { useUserDetails } from "../services/UserService";
import "../styles/settings.css";


const Settings = () => {
    const [ userToken, setUserToken ] = useUserToken(); 
    const [ userDetails, setUserDetails ] = useUserDetails();

    const [ isPasswordValid, setIsPasswordValid] = useState(true);
    const [ isIngameNameValid, setIsIngameNameValid] = useState(true);
    const [ isUsernameValid, setIsUsernameValid] = useState(true);
    const [ isEmailValid, setIsEmailValid] = useState(true);

    const [ server, setServer ] = useState("BR");


    const formData = useRef();

    let isUserValid = () => {
        if(!isUsernameValid){
            return false;
        }
        if(!isEmailValid){
            return false;
        }
        if(!isIngameNameValid){
            return false;
        }
        if(!isPasswordValid){
            return false;
        }
        
        return true;
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        let {username, ingamename, email,  password, positions, server} = formData.current;
        let positionsArray = Array.from(positions.options).filter(option=>option.selected).map(option=>option.value);
       
        if(isUserValid()){
            try{
                const data = await updateUser(userDetails.id, username.value, email.value, ingamename.value, password.value, positionsArray, server.value, userToken);
                let updatedUser = await data.json();
                if(updatedUser.username !== userDetails.username){
                    logout();
                    setUserToken(null);
                }
                setUserDetails(updatedUser);
            }catch(err){
                alert("Unknown error");
            }
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
        <div className="settings-wrapper">
            <form ref={formData} onSubmit={handleUpdate} className="settings">
                <UsernameValidation setIsUsernameValid={setIsUsernameValid} currentValue={userDetails.username}/>
                <EmailValidation setIsEmailValid={setIsEmailValid} currentValue={userDetails.email}/>
                <IngameNameValidation setIsIngameNameValid={setIsIngameNameValid} server={server} currentValue={userDetails.ingameName}/>
                <div className="setting">
                    <label htmlFor="server">Server: </label>
                    <ServerSelect setServer={setServer} currentValue={userDetails.server}/>   
                </div>  
                <PasswordValidation setIsPasswordValid={setIsPasswordValid}/>
                <PositionSelect setServer={setServer}/>
                <div className="buttons">
                    <input type="submit" name="submit" value="Save"></input>
                    <button onClick={handleDelete} className="delete">Delete account</button>
                </div>
          
            </form>
            
        </div>
    )
}
export default Settings;