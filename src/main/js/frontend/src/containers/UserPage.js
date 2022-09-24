import { useEffect, useState } from "react";
import { useParams } from "react-router";
import User from "../components/User";
import { getUserByIGNandServer, useUserToken } from "../services/UserService";

const UserPage = () => {
    
    const [ userInfo, setUserInfo ] = useState(null);
    const [ userToken, ] = useUserToken();
    const params = useParams();
    
    useEffect(() => {
        const fetchUser = async () => {
            return await getUserByIGNandServer(params.name, params.server, userToken); 
        }
        fetchUser().then((user) => setUserInfo(user));
    }, [])
    
    if(userInfo === null){
        return(
            <>User was not found</>
        )
    }

    return(
        <>  Page of this user
            <User ingameName={userInfo.ingameName} positions={userInfo.positions} sever={userInfo.server}/>
        </>
    )
}

export default UserPage;