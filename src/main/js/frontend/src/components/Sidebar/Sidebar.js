import FriendList from "./FriendList";

const Sidebar = (props) => {
    return(
            <div className="sidebar">
                <div className="sidebar-top-panel">
                    <button onClick={props.toggleActive} className="modal-toggle"><i className="fa-solid fa-user-plus"></i></button>
                </div>
                <FriendList/>   
            </div>
    )  
}
export default Sidebar;