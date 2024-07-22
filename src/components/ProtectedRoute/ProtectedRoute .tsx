import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element: Component }) => {
  const isAuthenticated = () => {
     return localStorage.getItem('mentisID') !== null;
  };

  return isAuthenticated() ? <Component /> : <Navigate to="/signup" />;
};

export default ProtectedRoute;
