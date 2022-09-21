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
import AuthGuard from "./components/AuthGuard.js";
import { useMemo, useState } from 'react';
import { UserContext } from "./UserContext";
import LogoutButton from './components/LogoutButton';

const App = () => {
    const [ user, setUser ] = useState(localStorage.getItem("token"));
    const value = useMemo(() => ({user, setUser}, [user, setUser]));

    return (
        <div className="app">
            <BrowserRouter>
                <UserContext.Provider value={value}>
                    <nav>
                        <ul>
                            {user !== null ?
                                <>
                                    <li><NavLink to={"/"}>Home</NavLink></li>
                                    <li><NavLink to={"/settings"}>Settings</NavLink></li>
                                    <li><NavLink to={"/addFriend"}>Add to friends</NavLink></li>
                                    <li><LogoutButton/></li>
                                </> 
                            :
                                <>
                                    <li><NavLink to={"/login"}>Login</NavLink></li>
                                    <li><NavLink to={"/register"}>Register</NavLink></li>
                                </>
                            }
                        </ul>
                    </nav>
                    <div className="app-wrapper">
                        <Routes>
                            <Route element={<AuthGuard/>}>
                                <Route path="/" element={<Home />} />
                                <Route path="/settings" element={<UserSettings />} />
                                <Route path="/user/:username" element={<UserPage />} />
                                <Route path="/addFriend" element={<FriendAdd />} />
                            </Route>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Routes>
                    </div>
                </UserContext.Provider>
            </BrowserRouter>
        </div>
        );
    }

export default App;
