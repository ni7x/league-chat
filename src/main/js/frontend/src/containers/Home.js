import { useEffect, useState } from "react";
import User from "../components/User";
import { getUser } from "../services/AuthService";

const Home = () => {
    
    const [ userInfo, setUserInfo ] = useState(new Object());
    useEffect(() => {
        getUser().then(user => setUserInfo(user));
    }, [])

    return(
        <>
            <User ingameName={userInfo.ingameName} positions={userInfo.positions} />
            <p>Friends: </p>
            {userInfo.friends && userInfo.friends.map((friend)=>{
                return <User key={friend.id} ingameName={friend.ingameName} positions={friend.positions} />
            })}
        </>
    )
}

export default Home;