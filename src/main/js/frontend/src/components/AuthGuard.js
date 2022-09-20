import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AuthGuard = () => {

    let hasJWT = () => {
        return localStorage.getItem("token") !== null;
    }

    return (
            hasJWT() ?
                <Outlet />
                :   
                <Navigate to="/login" />
        )
};

export default AuthGuard;