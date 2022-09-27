import { useUserDetails } from "../../services/UserService"
import RecievedRequest from "./RecievedRequest";
import SentRequest from "./SentRequest";
import CreateFriendRequest from "./CreateFriendRequest";


const FriendRequest = (props) => {
    const [ userDetails,  ] = useUserDetails();
    return(
        <div className="friend-requests-wrapper">
            <CreateFriendRequest/>

            <p className="label">Recieved requests:</p>
            <div className="friend-requests">
                {userDetails.friendRequestsTo.map((friendRequest)=>{
                    return <RecievedRequest key={friendRequest.id} from={friendRequest.from} id={friendRequest.id} />
                })}
            </div>

            <p className="label">Sent requests:</p>
            <div className="friend-requests">
                {userDetails.friendRequestsFrom.map((friendRequest)=>{
                    return <SentRequest key={friendRequest.id} to={friendRequest.to} id={friendRequest.id} />
                })}
            </div>
            <button onClick={props.toggleActive} className="close-button">
                Close
            </button>
        </div>
    )
}

export default FriendRequest;