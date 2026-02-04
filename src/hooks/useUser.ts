// hooks/useUser.ts (ou context/UserContext.tsx)
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useUser = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setLoading(false);
        return;
      }
      const response = await axios.get('http://127.0.0.1:8000/api/auth/me/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      console.error("Erreur fetch user", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  };

  // --- ICI : On expose setUser et refreshUser ---
  return { 
    user, 
    loading, 
    logout, 
    setUser, // Permet de modifier l'état localement
    refreshUser: fetchUser // Permet de relancer une requête serveur
  };
};