import { useRef } from "react"
import FormInput from "../components/Form/FormInput";
import PositionSelect from "../components/Form/PositionSelect";
import ServerSelect from "../components/Form/ServerSelect";
import { logout } from "../services/AuthService";
import { deleteUser, isUserValid, updateUser, useUserToken } from "../services/UserService";
import { useUserDetails } from "../services/UserService";

const UserSettings = () => {
    const [ userToken, setUserToken ] = useUserToken(); 
    const [ userDetails, setUserDetails ] = useUserDetails();
    const formData = useRef();

    const handleUpdate = async (e) => {
        e.preventDefault();

        let {username, ingamename, password, positions, server} = formData.current;
        let positionsArray = Array.from(positions.options).filter(option=>option.selected).map(option=>option.value);
        try{
            if(isUserValid(username.value, ingamename.value, password.value)){
                const data = await updateUser(userDetails.id, username.value, ingamename.value, password.value, positionsArray, server.value, userToken);
                if(data.ok){
                    let updatedUser = await data.json();
                    if(updatedUser.username !== userDetails.username){
                        logout();
                        setUserToken(null);
                    }
                    setUserDetails(updatedUser);
                }
                else{
                    console.log(data);
                    //error handling
                }
            }
        }catch(err){
            console.log(err.message);
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
                <FormInput type="text" name="Username" defaultValue={userDetails.username}/>
                <FormInput type="text" name="Ingame Name" defaultValue={userDetails.ingameName}/>
                <FormInput type="password" name="Password" defaultValue={""}/>
                <PositionSelect current={userDetails.positions}/>
                <ServerSelect current={userDetails.server}/>
                <input type="submit" name="submit" placeholder="Submit"></input>
            </form>
            <button onClick={handleDelete}>Delete account</button>
        </>
    )
}
export default UserSettings;