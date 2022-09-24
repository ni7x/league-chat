import FriendList from "../components/FriendList/FriendList";
import { useUserDetails, useUserToken } from "../services/UserService";
import { getUser } from "../services/AuthService";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";

let Authenticated = ( props ) => {
    const [ userToken, setUserToken ] = useUserToken();
    const [ userDetails, setUserDetails ] = useUserDetails();


    if(userToken === null){
        return <a href="/login"></a>
    }
    if(userDetails === null){
        return <>Loading</>
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