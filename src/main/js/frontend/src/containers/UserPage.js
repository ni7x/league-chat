import { useEffect, useState } from "react";
import { useParams } from "react-router";
import User from "../components/User";
import { getUser } from "../services/AuthService";

const UserPage = () => {
    
    const [ userInfo, setUserInfo ] = useState(null);
    const params = useParams();
    
    useEffect(() => {
        getUser(params.username).then(user => setUserInfo(user));
    }, [])

    if(userInfo === null){
        return(
            <>Loading</>
        )
    }

    return(
        <>  Page of this user
            <User ingameName={userInfo.ingameName} positions={userInfo.positions} sever={userInfo.server}/>
        </>
    )
}

export default UserPage;