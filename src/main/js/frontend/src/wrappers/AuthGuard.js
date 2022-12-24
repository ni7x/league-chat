import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUserToken } from "../services/UserService";


const AuthGuard = () => {
    const [userToken, ] = useUserToken();
    
    let hasJWT = () => {
        return userToken === null ? false : true;
    }

    return (
            hasJWT() ?
                <Outlet />
                :   
                <Navigate to="/login" />
        )
};

export default AuthGuard;