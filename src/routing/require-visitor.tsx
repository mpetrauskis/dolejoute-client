import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRootSelector } from '../store/hooks';
import { selectAuthLoggedIn, selectRedirect } from '../store/selectors';

const RequireVisitor = ({ children }: { children: JSX.Element }) => {
  const loggedIn = useRootSelector(selectAuthLoggedIn);
  const redirect = useRootSelector(selectRedirect);

  if (loggedIn) {
    return <Navigate to={redirect ?? '/'} />;
  }
  return children;
};

export default RequireVisitor;
