import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { PATHS } from '../routes/routes';

const GuestGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={PATHS.main} />;
  }

  return <>{children}</>;
};

export default GuestGuard;