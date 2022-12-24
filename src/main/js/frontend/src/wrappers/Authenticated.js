import { useUserDetails, useUserToken } from "../services/UserService";
import { useState,  } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import FriendRequests from "../components/FriendRequest/FriendRequests";
import CreateFriendRequest from "../components/FriendRequest/CreateFriendRequest";

        
let Authenticated = ( props ) => {
    const [ userToken, ] = useUserToken();
    const [ userDetails, ] = useUserDetails();
    const [ areFriendRequestsShown, setAreFriendRequestsShown ] = useState(false);
    const [ isFriendSearchShown, setIsFriendSearchShown ] = useState(false);

    const toggleFriendRequests = () => {
        setAreFriendRequestsShown(!areFriendRequestsShown);
    }

    const toggleFriendSearch = () => {
        setIsFriendSearchShown(!isFriendSearchShown);
    }

    if(userToken === null){
        return <a href="/login"></a>
    }
    
    if(userDetails === null){
        return <>Loading</>
    }

    return(
        <div className="authenticated">
            <Navbar />
            <div className="main">
                <div className={`friend-request-modal${areFriendRequestsShown ? " active" : ""}`}>
                    <FriendRequests toggleActive={toggleFriendRequests} />
                </div>
                <div className={`friend-request-modal${isFriendSearchShown ? " active" : ""}`}>
                    <CreateFriendRequest toggleActive={toggleFriendSearch}/>
                </div>
                {props.children}
            </div>
            <Sidebar toggleFriendRequests={toggleFriendRequests} toggleFriendSearch={toggleFriendSearch} />
        </div>
    )
}

export default Authenticated;