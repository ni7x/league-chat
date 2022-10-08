import { useUserDetails } from "../../services/UserService";
import Friend from "./Friend";

const FriendList = () => {
    const [ userDetails, ] = useUserDetails();

    return(
        <div className="friend-list"> 
            {userDetails.friends.map(friend => {
                return <Friend key={friend.id} id={friend.id} ingameName={friend.ingameName} username={friend.username} server={friend.server}/>
            })}
        </div>
    )  
}
export default FriendList;