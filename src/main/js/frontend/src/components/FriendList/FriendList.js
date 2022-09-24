import { useUserDetails } from "../../services/UserService";
import Friend from "./Friend";
const FriendList = () => {
    const [ userDetails, setUserDetails ] = useUserDetails();

    if(userDetails.friends.length === 0){
        return(
            <>
                You have no friends..
            </>
        )
    }

    return(
        <>
            {userDetails.friends.map(friend => {
                return <Friend key={friend.id} id={friend.id} ingameName={friend.ingameName} username={friend.username} server={friend.server}/>
            })}
        </>
    )  
}
export default FriendList;