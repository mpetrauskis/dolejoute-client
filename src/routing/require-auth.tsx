import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRootSelector } from '../store/hooks';
import { selectAuthLoggedIn } from '../store/selectors';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const loggedIn = useRootSelector(selectAuthLoggedIn);

  if (!loggedIn) {
    return <Navigate to={`/auth/login?redirect=${location.pathname}`} />;
  }
  return children;
};

export default RequireAuth;
