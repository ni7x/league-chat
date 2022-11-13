import { useUserDetails } from "../../services/UserService"
import RecievedRequest from "./RecievedRequest";
import SentRequest from "./SentRequest";
import CreateFriendRequest from "./CreateFriendRequest";
import { useState } from "react";

const FriendRequest = (props) => {
    const [ userDetails,  ] = useUserDetails();
    const [ requestToggle, setRequestToggle ] = useState(false);

    return(
        <div className="friend-requests-wrapper">
            <p className="label">
                <button onClick={() => setRequestToggle(true)} className={requestToggle?" active":" hidden"}>Recieved requests</button>
                <button onClick={() => setRequestToggle(false)} className={!requestToggle?" active":" hidden"}>Send requests</button>
            </p>
            <div className={"friend-requests" + (requestToggle?" active":" hidden")}>
                {userDetails.friendRequestsTo.map((friendRequest)=>{
                    return <RecievedRequest key={friendRequest.id} from={friendRequest.from} id={friendRequest.id} />
                })}
            </div>
            <div className={"friend-requests" + (!requestToggle?" active":" hidden")}>
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