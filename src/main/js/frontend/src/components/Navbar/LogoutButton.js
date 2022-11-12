import { logout } from "../../services/AuthService";
import { useUserToken } from "../../services/UserService";

const LogoutButton = () => {
    const [ userToken, setUserToken ] = useUserToken();

    const handleClick = () => {
        logout();
        setUserToken(null);
    }
    
    return(
        <button className="logout-button" onClick={handleClick}><i className="fa-solid fa-right-from-bracket"></i></button>
    )
}

export default LogoutButton;