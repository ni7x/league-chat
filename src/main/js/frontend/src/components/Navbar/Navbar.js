import LogoutButton from './LogoutButton';
import { NavLink } from 'react-router-dom';
import { useUserDetails, useUserToken } from "../../services/UserService";

const Navbar = () => {
    const [ userToken, setUserToken ] = useUserToken();
    const [ userDetails, ] = useUserDetails();

    if(userToken !== null){
        return (
            <nav className="navbar">
                <ul>
                    <li>This is {userDetails.username}</li>
                    <li><NavLink to={"/"}>Home</NavLink></li>
                    <li><NavLink to={"/settings"}>Settings</NavLink></li>
                    <li><LogoutButton /></li>
                </ul>
            </nav>
        )
    }
}

export default Navbar;