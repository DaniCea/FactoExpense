import * as React from 'react';
import { Navigate, Outlet } from 'react-router';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';


interface AuthOutletProps {
  fallbackPath: string;
}

const AuthOutlet: React.FC<AuthOutletProps> = ({ fallbackPath }) => {
  const isAuthenticated = useIsAuthenticated();

  debugger;

  if (!isAuthenticated) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <Outlet />;
};

export default AuthOutlet;