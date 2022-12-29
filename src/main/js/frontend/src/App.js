import './styles/app.css';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    NavLink
  } from "react-router-dom";

import Home from "./containers/Home.js";
import Login from "./containers/Login.js";
import Settings from "./containers/Settings";
import User from "./containers/User";
import Register from "./containers/Register";
import AuthGuard from "./wrappers/AuthGuard.js";
import NotFound from './containers/NotFound';
import ForgotPassword from "./containers/ForgotPassword";
import { useEffect, useMemo, useState } from 'react';
import { UserContext } from "./UserContext";
import Authenticated from './wrappers/Authenticated';
import ConversationWrapper from './components/Conversation/ConversationWrapper';
import { getNewAccessToken } from './services/AuthService';

const App = () => {
    const [ userToken, setUserToken ] = useState(localStorage.getItem("token"));
    const [ refreshToken, setRefreshToken ] = useState(localStorage.getItem("refreshToken"));
    const token = useMemo(() => ({userToken, setUserToken}, [userToken, setUserToken]));
    const [ userDetails, setUserDetails ] = useState(null);
    const user = useMemo(() => ({userDetails, setUserDetails}, [userDetails, setUserDetails]));
    console.log(userToken);
    useEffect(()=>{
        if(userToken === null){
            setUserDetails(null);
        }else{
            const fetchUser = async () => {
                try{
                    const data = await fetch("http://127.0.0.1:8080/api/user/current", {
                        method: "GET",
                        headers: {
                            "Authorization" : "Bearer " + userToken
                          }
                    }) 
                    if(data.ok){
                        const json = await data.json();
                        setUserDetails(json);   
                    }else{
                        console.log("Data not OK");
                        try{
                            console.log("XD");
                            let newToken = await getNewAccessToken(refreshToken);
                            console.log(newToken)
                            setUserToken(newToken);
                            console.log("NEw token set")
                        }catch(e){
                            setUserDetails(null);  
                            setUserToken(null);
                        }
                       
                    }
                }catch{
                    console.log("EXCEPTION UNATHURIZED");
                    try{
                        let newToken = await getNewAccessToken(refreshToken);
                        setUserToken(newToken);
                    }catch(e){
                        setUserDetails(null);  
                        setUserToken(null);
                    }
                }
                   
            }
            fetchUser().catch((e)=>console.log(e))
        }
        
    }, [userToken])

    return (
        <div className="app">
            <BrowserRouter>
                <UserContext.Provider value={{token, user}}>
                    <Routes>
                        <Route element={<AuthGuard/>}>
                            <Route path="/" element={<Authenticated><Home /></Authenticated>} />
                            <Route path="/conversation/:id" element={
                                <Authenticated>
                                    <ConversationWrapper/>
                                </Authenticated>} />
                            <Route path="/settings" element={<Authenticated><Settings /></Authenticated>} />
                            <Route path="/user/:server/:name" element={<Authenticated><User /></Authenticated>} />
                        </Route> 
                        <Route path="/forgotPassword/" element={<ForgotPassword />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </UserContext.Provider>
            </BrowserRouter>
        </div>
        );
    }

export default App;
