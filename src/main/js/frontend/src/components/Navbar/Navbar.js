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
                    <li><img src={process.env.PUBLIC_URL + "/profile-image.jpg"} alt="Profile image"></img></li>
                </ul>
                <ul>
                    <li><NavLink to={"/"}> <i className="fa-solid fa-house"></i></NavLink></li>
                    <li><NavLink to={"/settings"}><i className="fa-sharp fa-solid fa-gear"></i></NavLink></li>
                    <li><LogoutButton /></li>
                </ul>
            </nav>
        )
    }
}

export default Navbar;