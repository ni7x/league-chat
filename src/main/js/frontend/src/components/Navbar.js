import LogoutButton from './LogoutButton';
import { NavLink } from 'react-router-dom';
import { useUser } from '../services/AuthService';
const Navbar = () => {
    const [ user, setUser ] = useUser();
    return (
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
    )
}

export default Navbar;