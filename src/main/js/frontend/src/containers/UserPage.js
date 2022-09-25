import { useEffect, useState } from "react";
import { useParams } from "react-router";
import RecievedRequest from "../components/FriendList/FriendRequest/RecievedRequest";
import SentRequest from "../components/FriendList/FriendRequest/SentRequest";
import { endFriendship, getUserByIGNandServer, sendFriendRequest, useUserDetails, useUserToken } from "../services/UserService";

const UserPage = () => {
    const [ userDetails, setUserDetails] = useUserDetails();
    const [ userToken, ] = useUserToken();
    const [ currentUser, setCurrentUser ] = useState(null);
    const params = useParams();
    
    useEffect(() => {
        const fetchUser = async () => {
            return await getUserByIGNandServer(params.name, params.server, userToken); 
        }
        fetchUser().then((user) => setCurrentUser(user));
    }, [])

    const isFriend = () => {
        return Array.from(userDetails.friends).some(f => f.username === currentUser.username);
    }

    const isInSentRequests = () => {
        return Array.from(userDetails.friendRequestsFrom).find(f => f.to.username === currentUser.username);
    }

    const isInReceivedRequests = () => {
        return Array.from(userDetails.friendRequestsTo).find(f => f.from.username === currentUser.username);
    }


    const handleFriendRequest = async (action) => {
        let data = null;
        if(action === "remove"){
            data = await endFriendship(userDetails.username, currentUser.ingameName, currentUser.server, userToken);
        }else{
            data = await sendFriendRequest(userDetails.username, currentUser.ingameName, currentUser.server, userToken);
        }
        if(data.ok){
            let updatedUser = await data.json();
            setUserDetails(updatedUser);
        }else{
            console.log(data);
        }
    }
    
    if(currentUser === null){
        return(
            <>User was not found</>
        )
    }

    return(
        <>
           {isFriend() ?
                <button onClick={() => handleFriendRequest("remove")}>Remove from friends</button>
                :
                isInSentRequests() !== undefined ?
                    <SentRequest to={currentUser} id={isInSentRequests().id}/>
                :
                    isInReceivedRequests() !== undefined  ?
                        <RecievedRequest from={currentUser} id={isInReceivedRequests().id}/>
                        :
                        <button onClick={() => handleFriendRequest("send")}>Send friend request</button>
           }
        </>
    )
}

export default UserPage;