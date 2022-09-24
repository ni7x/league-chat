import { logout } from "../../services/AuthService";
import { useUserToken } from "../../services/UserService";

const LogoutButton = () => {
    const [ userToken, setUserToken ] = useUserToken();

    const handleClick = () => {
        logout();
        setUserToken(null);
    }
    
    return(
        <button className="logout-button" onClick={handleClick}>Logout</button>
    )
}

export default LogoutButton;