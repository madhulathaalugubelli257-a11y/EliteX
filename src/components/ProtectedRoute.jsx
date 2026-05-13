// ProtectedRoute.jsx — Redirects unauthenticated users to login page
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Save where they were going so we can redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
