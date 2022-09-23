import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUserToken } from '../services/AuthService';


const AuthGuard = () => {
    const [userToken, setUserToken] = useUserToken();
  
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