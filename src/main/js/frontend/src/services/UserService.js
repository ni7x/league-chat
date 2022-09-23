import { useState } from "react";
import { useUserToken } from "./AuthService"

export const useUserDetails = async (userToken) => {
    const [userDetails, setUserDetails ] = useState({});
    console.log("tooken === " + userToken);
  

    return null;
    
}