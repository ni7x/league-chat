import { logout, useUserToken } from "../../services/AuthService";

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