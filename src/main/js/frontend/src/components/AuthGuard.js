import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AuthGuard = () => {

    let hasJWT = () => {
        console.log("JWT ==="  + localStorage.getItem("token"));
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