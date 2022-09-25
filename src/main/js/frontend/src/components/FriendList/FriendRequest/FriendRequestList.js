import { useUserDetails } from "../../../services/UserService"
import RecievedRequest from "./RecievedRequest";
import SentRequest from "./SentRequest";

const FriendRequestList = () => {
    const [ userDetails,  ] = useUserDetails();
    console.log(userDetails)
    return(
        <>
            Recieved request:
            {userDetails.friendRequestsTo.map((friendRequest)=>{
                return <RecievedRequest key={friendRequest.id} from={friendRequest.from} id={friendRequest.id} />
            })}
            Sent request:
            {userDetails.friendRequestsFrom.map((friendRequest)=>{
                return <SentRequest key={friendRequest.id} to={friendRequest.to} id={friendRequest.id} />
            })}
        </>
    )
}

export default FriendRequestList;