import './App.css';
import {
    BrowserRouter,
    Routes,
    Route,
    Link
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
    const [ user, setUser ] = useState(null);
    const value = useMemo(() => ({user, setUser}, [user, setUser]));

    return (
        <div className="App">
            <BrowserRouter>
                <UserContext.Provider value={value}>
                    <nav>
                        <ul>
                            {user !== null ?
                                <>
                                    <li><Link to={"/"}>Home</Link></li>
                                    <li><LogoutButton/></li>
                                    <li><Link to={"/settings"}>Settings</Link></li>
                                    <li><Link to={"/addFriend"}>Add to friends</Link></li>
                                </> 
                            :
                                <>
                                    <li><Link to={"/login"}>Login</Link></li>
                                    <li><Link to={"/register"}>Register</Link></li>
                                </>
                            }
                        </ul>
                    </nav>
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
                </UserContext.Provider>
            </BrowserRouter>
        </div>
        );
    }

export default App;
