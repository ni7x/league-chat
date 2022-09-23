import FriendList from "../components/FriendList/FriendList";
import { useUserToken } from "../services/AuthService"
import { getUser } from "../services/AuthService";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Navigate } from "react-router";

let Authenticated = ( props ) => {
    const [ userToken, setUserToken ] = useUserToken();
    const [ userDetails, setUserDetails ] = useState(null);
    
    useEffect(() => {
        getUser().then(user => setUserDetails(user));
    }, [userToken]);

    if(userDetails === null || userToken === null){
        return <a href="/login"></a>
    }

    return(
        <div className="authenticated-wrapper">
            <Navbar/>
            
            <div className="authenticated-user-profile">
                <a href="/">{userDetails.ingameName}</a>
            </div>
            <div className="authenticated-right-panel">
                <div className="authenticated-friends">
                    <FriendList friends={userDetails.friends} for={userDetails.user}></FriendList>
                </div>  
            </div>
            <div className="authenticated-main">
                {props.children}
            </div>
        </div>
    )

}

export default Authenticated;