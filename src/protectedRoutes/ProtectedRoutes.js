import {Navigate} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../context/AuthProvider";

const ProtectedRoute =({children, roles}) => {
    const {role, authenticated} = useContext(AuthContext);

    if(!authenticated){
        return <Navigate to='/'/>
    }
    if(!roles.includes(role)){
        return <Navigate to='/unauthorized'/>
    }
    return children;

}
export default ProtectedRoute;