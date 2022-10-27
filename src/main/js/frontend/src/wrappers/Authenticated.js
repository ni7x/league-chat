import { useUserDetails, useUserToken } from "../services/UserService";
import { useState,  } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import FriendRequests from "../components/FriendRequest/FriendRequests";

let Authenticated = ( props ) => {
    const [ userToken, ] = useUserToken();
    const [ userDetails, ] = useUserDetails();
    const [ isModalActive, setIsModalActive ] = useState(false);

    const toggleModalActivity = () => {
        setIsModalActive(!isModalActive);
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
               {/*<div className={`friend-request-modal${isModalActive ? " active" : ""}`}>
                    <FriendRequests toggleActive={toggleModalActivity} />
                </div>*/}  
                {props.children}
            </div>
            <Sidebar toggleActive={toggleModalActivity} />
            

        </div>
    )

}

export default Authenticated;