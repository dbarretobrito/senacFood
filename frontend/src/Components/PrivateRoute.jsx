import { jwtDecode } from 'jwt-decode';
import { Navigate, Outlet } from 'react-router-dom';

const isTokenValid = (token) => {
    try{
        const decode = jwtDecode(token);
        return decode.exp * 1000 > Date.now();
    }catch{
        return false;
    }
};


const PrivateRoute = () => {
    const token = localStorage.getItem("token");

    if(!token || !isTokenValid(token)){
        return <Navigate to="/login"/>
    }
    return <Outlet/>
}

export default PrivateRoute;