import { useUserDetails } from "../../services/UserService";
import FriendList from "./FriendList";

const Sidebar = (props) => {
    const [ userDetails, ] = useUserDetails();
    return(
            <div className="sidebar">
                <div className="sidebar-top-panel">
                    <button onClick={props.toggleActive} className="modal-toggle"><i className="fa-solid fa-user-plus"></i></button>
                </div>
                {userDetails.friendRequestsTo.length > 0 ?
                 <div className="friend-requests-alert">
                   <span className="block-hidden-on-mobile"> Friend requests: </span> <span className="count">{userDetails.friendRequestsTo.length}</span>
                 </div>
                :
                null
                }
                <FriendList/>   
            </div>
    )  
}
export default Sidebar;