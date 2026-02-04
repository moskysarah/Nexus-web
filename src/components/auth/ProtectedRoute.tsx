import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // CORRECTION : Utilise 'access_token' (le même nom que dans Auth.tsx)
  const token = localStorage.getItem('access_token');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};