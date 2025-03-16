import { Navigate, Outlet } from 'react-router';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';


interface IAuthOutletProps {
  fallbackPath: string;
  userMustBeAuthenticated?: boolean;
}

const AuthOutlet = ({ fallbackPath, userMustBeAuthenticated = true }: IAuthOutletProps) => {
  const isAuthenticated = useIsAuthenticated()

  if (!isAuthenticated && userMustBeAuthenticated || isAuthenticated && !userMustBeAuthenticated) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <Outlet />;
};

export default AuthOutlet;