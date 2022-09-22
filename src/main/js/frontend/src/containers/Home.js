import { useEffect, useState } from "react";
import User from "../components/User";
import { getUser } from "../services/AuthService";

const Home = () => {
    const [ userInfo, setUserInfo ] = useState(null);
    useEffect(() => {
        getUser().then(user => setUserInfo(user));
    }, [])
    
    const friendRemove = async (e, friendName) => {
        e.preventDefault();
     
        let data = {
             "username": userInfo.username ,
             "friendName" : friendName,
          
        };
        const response = await fetch("http://127.0.0.1:8080/api/user/removeFriend/", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("token"),
                'Content-Type': 'application/json'
        }});
        if(response.ok){
            setUserInfo(await response.json());
        }
    }

    if(userInfo === null){
        return(
            <>Bad token</>
        )
    }

    return(
        <>
            <User ingameName={userInfo.ingameName} positions={userInfo.positions} server={userInfo.server}/>
            <p>Friends: </p>
            {userInfo.friends && userInfo.friends.map((friend)=>{
                return <div key={friend.id} >   
                            <button onClick={(e) => friendRemove(e, friend.username)}>remove</button>
                            <User ingameName={friend.ingameName} positions={friend.positions} server={friend.server}/>
                       </div>
            })}
        </>
    )
}

export default Home;