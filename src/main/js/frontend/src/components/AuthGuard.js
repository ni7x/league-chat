import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUser } from '../services/AuthService';


const AuthGuard = () => {
    const location = useLocation();
    const [user, setUser] = useUser();
  
    let hasJWT = () => {
        return user === null ? false : true;
    }

    return (
            hasJWT() ?
                <Outlet />
                :   
                <Navigate to="/login" />
        )
};

export default AuthGuard;