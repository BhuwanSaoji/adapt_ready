import React, { createContext, useContext, useState } from 'react';
import { postAPI } from '../common/ApiHelper';

// Create the Auth Context
export const AuthContext = createContext();
// AuthProvider component to provide auth state and functions

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to log in the user
  const login = async (data) => {
    const result = await postAPI("/login", data);
    if(result.data.statusCode==200){
        localStorage.setItem("token",result.data.data)
        setIsAuthenticated(true);
        window.location.assign("/home")
    }
    
    
  };

  // Function to log out the user
  const logout = () => {
    localStorage.removeItem("token")
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};