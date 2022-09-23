import { useEffect, useState } from "react";
import FriendList from "../components/FriendList/FriendList";
import User from "../components/User";
import { getUser } from "../services/AuthService";

const Home = () => {
    const [ userInfo, setUserInfo ] = useState(null);
    
    useEffect(() => {
        getUser().then(user => setUserInfo(user));
    }, [])

    if(userInfo === null){
        return(
            <>Loading</>
        )
    }

    return(
        <>  
            <User ingameName={userInfo.ingameName} positions={userInfo.positions} server={userInfo.server} friendRequests={userInfo.friendRequestsTo}/>
            <p>Friends: </p>
            <FriendList for={userInfo.username} friends={userInfo.friends}/>
        </>
    )
}

export default Home;