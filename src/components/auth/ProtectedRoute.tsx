import { Navigate } from 'react-router-dom';
import { useUser } from '../../hooks/userUser';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useUser();

  console.log("Auth State:", { user, loading }); // <--- AJOUTE CECI

  if (loading) {
    return <div className="text-white bg-black h-screen flex items-center justify-center">Chargement Nexus...</div>;
  }

  if (!user) {
    return <Navigate to="/signup" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
