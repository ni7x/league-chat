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
import { useMemo, useState } from 'react';
import { UserContext } from "./UserContext";
import Authenticated from './wrappers/Authenticated';
import { useUserDetails } from './services/UserService';

const App = () => {
    const [ userToken, setUserToken ] = useState(localStorage.getItem("token"));
    const value = useMemo(() => ({userToken, setUserToken}, [userToken, setUserToken]));
    const  userDetails = useUserDetails(userToken);

    console.log(userDetails);
    return (
        <div className="app">
            <BrowserRouter>
                <UserContext.Provider value={value}>
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
