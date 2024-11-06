import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    // You can return a loading indicator here
    return null;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;