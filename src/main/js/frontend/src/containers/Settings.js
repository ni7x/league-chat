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

    const [ isPasswordValid, setIsPasswordValid] = useState(false);
    const [ isIngameNameValid, setIsIngameNameValid] = useState(false);
    const [ isUsernameValid, setIsUsernameValid] = useState(false);
    const [ isEmailValid, setIsEmailValid] = useState(false);

    const [ server, setServer ] = useState("BR");


    const formData = useRef();

    let isUserValid = () => {
        let {username, email, ingamename, password, positions, server} = formData.current;
        if(!isUsernameValid && username.value != ""){
            return false;
        }
        if(!isEmailValid && email.value != userDetails.email){
            return false;
        }
        if(!isIngameNameValid && ingamename.value != userDetails.ingameName){
            return false;
        }
        if(!isPasswordValid  && ingamename.value != ""){
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
                <ServerSelect setServer={setServer} currentValue={userDetails.server}/>     
                <PasswordValidation setIsPasswordValid={setIsPasswordValid}/>
                <PositionSelect setServer={setServer}/>
                <div className="buttons">
                    <input type="submit" name="submit" placeholder="Submit"></input>
                    <button onClick={handleDelete} className="delete">Delete account</button>
                </div>
          
            </form>
            
        </div>
    )
}
export default Settings;