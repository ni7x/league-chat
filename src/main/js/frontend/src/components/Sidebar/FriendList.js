import { useUserDetails } from "../../services/UserService";
import Friend from "./Friend";

const FriendList = () => {
    const [ userDetails, ] = useUserDetails();

    return(
        <ul> 
            {userDetails.friends.map(friend => {
                return <Friend key={friend.id} id={friend.id} ingameName={friend.ingameName} username={friend.username} server={friend.server} avatar={friend.avatar}/>
            })}
        </ul>
    )  
}
export default FriendList;