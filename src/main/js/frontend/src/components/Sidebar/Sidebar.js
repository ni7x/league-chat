import { useUserDetails } from "../../services/UserService";
import FriendList from "./FriendList";

const Sidebar = (props) => {
    const [ userDetails, ] = useUserDetails();
    return(
            <div className="sidebar">
                <div className="sidebar-top-panel">
                    <button  className="modal-toggle" onClick={props.toggleFriendSearch}><i className="fa-solid fa-user-plus"></i></button>
                </div>
                
                <div className="friend-requests-alert" onClick={props.toggleFriendRequests}>
                    <span className="block-hidden-on-mobile"> Friend requests: </span> <span className="count">{userDetails.friendRequestsTo.length}</span>
                </div>
                
                <FriendList/>   
            </div>
    )  
}
export default Sidebar;