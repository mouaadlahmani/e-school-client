import { createContext, useState } from "react";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        role: null,
        authenticated: false
    });

    const token = window.localStorage.getItem('token');
    if (token && !auth.authenticated) {
        setAuth({
            role: (jwtDecode(token).role),
            authenticated: true,
        });
    }

    return (
        <AuthContext.Provider value={{ ...auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;