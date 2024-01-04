// RequireAuth.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (user) => {
    // Use the callback form to get the latest state
    setUser(user);
  };

  const logout = () => {
    // Use the callback form to get the latest state
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout  }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
    return useContext(AuthContext);
  };

export { AuthProvider, useAuth };
