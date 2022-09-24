import { useUserDetails } from "../../../services/UserService"
import RecievedRequest from "./RecievedRequest";
import SendRequest from "./SendRequest";

const FriendRequestList = () => {
    const [ userDetails,  ] = useUserDetails();
    return(
        <>
            Recieved request:
            {userDetails.friendRequestsTo.map((friendRequest)=>{
                return <RecievedRequest key={friendRequest.id} from={friendRequest.from} id={friendRequest.id} />
            })}
            Sent request:
            {userDetails.friendRequestsFrom.map((friendRequest)=>{
                return <SendRequest key={friendRequest.id} to={friendRequest.to} id={friendRequest.id} />
            })}
        </>
    )
}

export default FriendRequestList;