import React, {useState, createContext, useContext} from 'react';

const AuthContext = createContext();

// Create a provider component
export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [login, setLogin] = useState('');

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin, login, setLogin }}>
            {children}
        </AuthContext.Provider>
    );
}

// Create a custom hook to use the context
export function useAuth() {
    return useContext(AuthContext);
}