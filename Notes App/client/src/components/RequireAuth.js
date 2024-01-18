// RequireAuth.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userCheck } from './redux/userAction';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const isAuthenticated = useSelector(state => state.user);
  const dispatch = useDispatch(); // Invoke dispatch as a function

  useEffect(() => {
    if (isAuthenticated === null) {
      dispatch(userCheck())
    }
  }); // Added dependency array to useEffect

  if (isAuthenticated===false) {
    return <Navigate to="/login" />
  }

  return <div>{children}</div>;
};

export default RequireAuth;
