// RequireAuth.js

import { Navigate } from 'react-router-dom';
import { useAuth } from './auth';

function RequireAuth({ children }) {
  const auth = useAuth();

  // Check for stored authentication information on component mount
  if (!auth.user) {
    const storedToken = localStorage.getItem('Authorization');
    if (storedToken) {
      // Rehydrate the user authentication state based on the stored token
      auth.login({ token: storedToken });
    } else {
      return <Navigate to="/login" />;
    }
  }

  return children;
}

export { RequireAuth };
