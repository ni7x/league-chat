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
import UserSettings from "./containers/UserSettings";
import FriendAdd from "./containers/FriendAdd";
import UserPage from "./containers/UserPage";
import Register from "./containers/Register";
import AuthGuard from "./wrappers/AuthGuard.js";
import NotFound from './containers/NotFound';
import { useEffect, useMemo, useState } from 'react';
import { UserContext } from "./UserContext";
import Authenticated from './wrappers/Authenticated';
import { useUserDetails } from './services/UserService';

const App = () => {
    const [ userToken, setUserToken ] = useState(localStorage.getItem("token"));
    const token = useMemo(() => ({userToken, setUserToken}, [userToken, setUserToken]));
    const [ user, setUser ] = useState({});

    useEffect(()=>{
        if(token === null){
            setUser({});
        }else{
            const fetchUser = async () => {
                const data = await fetch("http://127.0.0.1:8080/api/user/current", {
                    method: "GET",
                    headers: {
                        "Authorization" : "Bearer " + userToken
                      }
                }) 
                const json = await data.json();
                setUser(json);      
            }
            fetchUser().catch((e)=>console.log(e))
        }
    }, [userToken])

    return (
        <div className="app">
            <BrowserRouter>
                <UserContext.Provider value={token}>
                    <Routes>
                        <Route element={<AuthGuard/>}>
                            <Route path="/" element={<Authenticated><Home /></Authenticated>} />
                            <Route path="/settings" element={<Authenticated><UserSettings /></Authenticated>} />
                            <Route path="/user/:username" element={<Authenticated><UserPage /></Authenticated>} />
                            <Route path="/addFriend" element={<Authenticated><FriendAdd /></Authenticated>} />
                        </Route> 
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
