import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for stored authentication information on component mount
    const storedToken = localStorage.getItem('Authorization');
    if (storedToken) {
      // Set the user authentication state based on the stored token
      setUser({ token: storedToken });
    }

    // Check authentication with the server
    const checkAuthentication = async () => {
      try {
        const response = await axios.get('/check-auth', { withCredentials: true });
        // Assuming the server responds with user data in the response
        setUser(response.data);
      } catch (error) {
        console.error('Error during check authentication:', error);
        // Handle the error appropriately, e.g., redirect to login
        setUser(null);
      }
    };

    // Check authentication with the server on component mount
    checkAuthentication();
  }, []);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = () => {
    return user;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
