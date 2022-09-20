import './App.css';
import {
    BrowserRouter,
    Routes,
    Route,
    Link
  } from "react-router-dom";

import Home from "./containers/Home.js";
import Login from "./containers/Login.js";
import AuthGuard from "./components/AuthGuard.js";
import UserSettings from "./containers/UserSettings";
import UserPage from "./containers/UserPage";
import { logout, getToken } from "./services/AuthService";
import Register from "./containers/Register";


function App() {
    
    return (
        <div className="App">
            <BrowserRouter>
                <nav>
                    <ul>
                        <>
                            <li><Link to={"/"}>Home</Link></li>
                            <li><Link to={"/login"} onClick={logout}>Logout</Link></li>
                            <li><Link to={"/settings"}>Settings</Link></li>
                        </> 
                        <li><Link to={"/login"}>Login</Link></li>
                        <li><Link to={"/register"}>Register</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route element={<AuthGuard/>}>
                        <Route path="/" element={<Home />} />
                        <Route path="/settings" element={<UserSettings />} />
                        <Route path="/user/:username" element={<UserPage />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </div>
        );
    }

export default App;
