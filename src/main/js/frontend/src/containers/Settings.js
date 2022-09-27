import { useRef, useState } from "react"
import Input from "../components/Form/Input";
import PositionSelect from "../components/Form/PositionSelect";
import ServerSelect from "../components/Form/ServerSelect";
import { logout } from "../services/AuthService";
import { deleteUser, isUserValid, updateUser, useUserToken, getTypeFromErrorMessage } from "../services/UserService";
import { useUserDetails } from "../services/UserService";

const Settings = () => {
    const [ userToken, setUserToken ] = useUserToken(); 
    const [ userDetails, setUserDetails ] = useUserDetails();
    let [ errors, setErrors ] = useState(new Map());
    const formData = useRef();

    const setError = (message) => {
        setErrors(new Map([[getTypeFromErrorMessage(message), message]]));
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
        <>
            <form ref={formData} onSubmit={handleUpdate}>
                <Input type="text" name="Username" defaultValue={userDetails.username} errors={errors.get("USERNAME_ERROR")}/>
                <Input type="text" name="Ingame Name" defaultValue={userDetails.ingameName} errors={errors.get("INGAME_NAME_ERROR")}/>
                <Input type="password" name="Password" defaultValue={""} errors={errors.get("PASSWORD_ERROR")}/>
                <PositionSelect current={userDetails.positions}/>
                <ServerSelect current={userDetails.server}/>
                <input type="submit" name="submit" placeholder="Submit"></input>
            </form>
            <button onClick={handleDelete}>Delete account</button>
        </>
    )
}
export default Settings;