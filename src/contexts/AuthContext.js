import React, {useState, createContext, useContext} from 'react';

const AuthContext = createContext();

// Create a provider component
export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin }}>
            {children}
        </AuthContext.Provider>
    );
}

// Create a custom hook to use the context
export function useAuth() {
    return useContext(AuthContext);
}