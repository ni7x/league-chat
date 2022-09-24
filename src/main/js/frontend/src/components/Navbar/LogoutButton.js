import { logout } from "../../services/AuthService";
import { useUserToken } from "../../services/UserService";

const LogoutButton = () => {
    const [ user, setUser ] = useUserToken();

    const handleClick = () => {
        logout();
        setUser(null);
    }
    
    return(
        <button className="logout-button" onClick={handleClick}>Logout</button>
    )
}

export default LogoutButton;