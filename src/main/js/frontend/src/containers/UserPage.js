import { useEffect, useState } from "react";
import { useParams } from "react-router";
import User from "../components/User";
import { getUser } from "../services/AuthService";

const UserPage = () => {
    
    const [ userInfo, setUserInfo ] = useState(new Object());
    const params = useParams();
    useEffect(() => {
        console.log(params);
        getUser(params.username).then(user => setUserInfo(user));
    }, [])

    return(
        <>  Page of this user
            <User ingameName={userInfo.ingameName} positions={userInfo.positions} />
        </>
    )
}

export default UserPage;