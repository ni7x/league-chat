import { useRef } from "react";
import { sendFriendRequest, useUserDetails, useUserToken } from "../services/UserService";
import ServerSelect from "../components/Form/ServerSelect";

const FriendAdd = () => {
    const formData = useRef();
    const [ userDetails, setUserDetails ] = useUserDetails();
    const [ userToken, setUserToken ] = useUserToken();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let { friendName, server } = formData.current;
       
        const data = await sendFriendRequest(userDetails.username, friendName.value, server.value, userToken);
        if(data.ok){
            let updatedUser = await data.json();
            setUserDetails(updatedUser);
        }
        else{
            console.log(data);
            //error handling
        }
    }

    if(userDetails === null){
        return(
            <>Loading</>
        )
    }

    return(
        <>
            <form onSubmit={handleSubmit} ref={formData}>
                <input type="text" name="friendName"></input>
                <ServerSelect/>
                <input  type="submit" value="Submit"></input>
            </form>
        </>
    )
}

export default FriendAdd;