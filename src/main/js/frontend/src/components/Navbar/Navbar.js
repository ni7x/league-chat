import LogoutButton from './LogoutButton';
import { NavLink } from 'react-router-dom';
import { useUserToken } from "../../services/UserService";

const Navbar = () => {
    const [ user, setUser ] = useUserToken();

    if(user !== null){
        return (
            <nav className="navbar">
                <ul>
                    <li><NavLink to={"/"}>Home</NavLink></li>
                    <li><NavLink to={"/settings"}>Settings</NavLink></li>
                    <li><NavLink to={"/addFriend"}>Add to friends</NavLink></li>
                    <li><LogoutButton /></li>
                </ul>
            </nav>
        )
    }
}

export default Navbar;