import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import useAuth from '../hooks/useAuth';
import { PATHS } from '../routes/routes';

const AdminGuard = ({ children }) => {
  const { isAuthenticated, isInitialized, user } = useAuth();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!isInitialized) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }

    return <Navigate to={PATHS.login} />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  if (!user.roles.includes('ROLE_ADMIN')) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }

    return <Navigate to={PATHS.login} />;
  }

  return <>{children}</>;
}

export default AdminGuard;