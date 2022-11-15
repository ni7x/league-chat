import LogoutButton from './LogoutButton';
import { NavLink } from 'react-router-dom';
import { useUserDetails, useUserToken } from "../../services/UserService";

const Navbar = () => {
    const [ userDetails, ] = useUserDetails();

    if(userDetails !== null){
        return (
            <nav className="navbar">
                <ul>
                    <li><a href="/"><img src={process.env.PUBLIC_URL + "/profile-image.jpg"} alt="Profile image"></img></a></li>
                </ul>
                <ul>
                    <li className="link"><NavLink to={"/"}> <i className="fa-solid fa-house"></i></NavLink></li>
                    <li className="link"><NavLink to={"/settings"}><i className="fa-sharp fa-solid fa-gear"></i></NavLink></li>
                    <li><LogoutButton /></li>
                </ul>
            </nav>
        )
    }
}

export default Navbar;