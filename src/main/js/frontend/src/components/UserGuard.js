import { Children, useEffect, useState } from "react";
import User from "../components/User";
import { getUser } from "../services/AuthService";

const UserGuard = () => {
    const [ userInfo, setUserInfo ] = useState(null);
    useEffect(() => {
        getUser().then(user => setUserInfo(user));
    }, [])
    

    if(userInfo === null){
        return(
            <>Bad token</>
        )
    }

    return(
        <>
           {Children}
        </>
    )
}

export default UserGuard;