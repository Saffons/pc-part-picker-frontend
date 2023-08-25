import React, {useState, createContext, useContext} from 'react';

const AuthContext = createContext();

/**
 * Context that stores information about current user's authentication, such as:
 * if anyone's currently logged in, if they're an admin, their login and user id.
 * @param children All children components
 * @returns {JSX.Element} Children components wrapped in AuthContext.Provider
 */
export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [login, setLogin] = useState('');
    const [userId, setUserId] = useState(0);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin, login, setLogin, userId, setUserId }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}