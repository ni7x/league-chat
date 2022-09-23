import { useState } from "react";
import { useUserToken } from "./AuthService"

export const useUserDetails = async (userToken) => {
    const [userDetails, setUserDetails ] = useState({});
    console.log("tooken === " + userToken);
    if(userToken === null){
        return null;
    }
    const response = await fetch("http://127.0.0.1:8080/api/user/current", {
        method: "GET",
        headers: {
            "Authorization" : "Bearer " + userToken
          }
    });
    if(response.ok){
        return response.json();
    }

    return null;
    
}