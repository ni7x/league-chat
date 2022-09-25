import FriendAdd from "../../containers/FriendAdd";
import { useUserDetails } from "../../services/UserService";
import Friend from "./Friend";
import FriendRequestList from "./FriendRequest/FriendRequestList";
const FriendList = () => {
    const [ userDetails, setUserDetails ] = useUserDetails();

    if(userDetails.friends.length === 0){
        return(
            <> <FriendAdd/>
                You have no friends..
                <FriendRequestList/>
            </>
        )
    }

    return(
        <> 
            <FriendAdd/>
            {userDetails.friends.map(friend => {
                return <Friend key={friend.id} id={friend.id} ingameName={friend.ingameName} username={friend.username} server={friend.server}/>
            })}
            <FriendRequestList/>
        </>
    )  
}
export default FriendList;