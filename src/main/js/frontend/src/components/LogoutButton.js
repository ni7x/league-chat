import { logout, useUser } from "../services/AuthService";

const LogoutButton = () => {
    const [ user, setUser ] = useUser();

    const handleClick = () => {
        logout();
        setUser(null);
    }
    
    return(
        <button className="logout-button" onClick={handleClick}>Logout</button>
    )
}

export default LogoutButton;