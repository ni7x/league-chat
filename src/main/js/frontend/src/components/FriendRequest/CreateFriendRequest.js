import { useRef, useState } from "react";
import { sendFriendRequest, useUserDetails, useUserToken } from "../../services/UserService";
import ServerSelect from "../Form/ServerSelect";

const CreateFriendRequest = () => {
    const formData = useRef();
    const [ userDetails, setUserDetails ] = useUserDetails();
    const [ userToken, ] = useUserToken();
    const [ errorMessage, setErrorMessage ] = useState(""); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        let { friendName, server } = formData.current;
        try{
            const data = await sendFriendRequest(userDetails.username, friendName.value, server.value, userToken);
            let updatedUser = await data.json();
            setErrorMessage("Request send");
            setUserDetails(updatedUser);
        }catch(err){
            setErrorMessage(err);
        }
    }

    if(userDetails === null){
        return(
            <>Loading</>
        )
    }

    return(
        <div> 
            <form onSubmit={handleSubmit} ref={formData}>
                <input type="text" name="friendName" placeholder="Type name.."></input>
                <ServerSelect/>
                <input  type="submit" value="Invite"></input>
            </form>
            <p className="error">{errorMessage}</p>
        </div>
    )
}

export default CreateFriendRequest;