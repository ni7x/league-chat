import './App.css';
import {
    BrowserRouter,
    Routes,
    Route,
    Link
  } from "react-router-dom";

import Home from "./containers/Home.js";
import Login from "./containers/Login.js";
import Logout from "./containers/Logout.js";
import AuthGuard from "./components/AuthGuard.js";
function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <nav>
                <ul>
                    <li><Link to={"/"}>Home</Link></li>
                    <li><Link to={"/login"}>Login</Link></li>
                    <li><Link to={"/logout"}>Logout</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route element={<AuthGuard/>}>
                    <Route path="/" element={<Home />} />
                    <Route path="/logout" element={<Logout />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
