import FriendList from "./FriendList";

const Sidebar = (props) => {
    return(
            <> 
                <button onClick={props.toggleActive}><i className="fa-solid fa-user-plus"></i></button>
                <FriendList/>   
            </>
    )  
}
export default Sidebar;