
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useEffect, useState } from 'react';
import { useUser } from '../../hooks/useUser';
const Navbar = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [rank, setRank] = useState<number | null>(null);

  useEffect(() => {
    const checkRank = async () => {
      if (!user) return;

      try {
        // On récupère le top 3
        const { data } = await supabase
          .from('profiles')
          .select('id')
          .order('xp', { ascending: false })
          .limit(3);

        if (data) {
          // On vérifie si l'ID de l'utilisateur est dans ce Top 3
          const userPosition = data.findIndex(p => p.id === user.id);
          if (userPosition !== -1) {
            setRank(userPosition + 1); // Rang 1, 2 ou 3
          }
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Rank check error:', err);
        }
      }
    };

    checkRank();
  }, [user]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error('Logout error:', err);
      }
      // Still navigate even if logout fails
      navigate('/');
    }
  };

  const isActive = (path: string) => location.pathname === path;

  // Fonction pour afficher le badge selon le rang
  const renderBadge = () => {
    if (rank === 1) return <span className="absolute -top-1 -right-1 text-base">👑</span>;
    if (rank === 2) return <span className="absolute -top-1 -right-1 text-base">🥈</span>;
    if (rank === 3) return <span className="absolute -top-1 -right-1 text-base">🥉</span>;
    return null;
  };

  return (
    <nav className="fixed w-full z-50 bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <span className="text-white font-black text-xl">N</span>
          </div>
          <span className="font-black text-xl tracking-tighter text-white">NEXUS</span>
        </Link>

        {/* NAVIGATION */}
        <div className="flex items-center gap-8">
          {user ? (
            <>
              <div className="hidden md:flex items-center gap-6">
                <Link to="/dashboard" className={`text-sm font-bold transition-colors ${isActive('/dashboard') ? 'text-white' : 'text-gray-500 hover:text-white'}`}>Dashboard</Link>
                <Link to="/courses" className={`text-sm font-bold transition-colors ${isActive('/courses') ? 'text-white' : 'text-gray-500 hover:text-white'}`}>Apprendre</Link>
                <Link to="/leaderboard" className={`text-sm font-bold transition-colors ${isActive('/leaderboard') ? 'text-white' : 'text-gray-500 hover:text-white'}`}>Classement</Link>
                <Link to="/profile" className={`text-sm font-bold transition-colors ${isActive('/profile') ? 'text-white' : 'text-gray-500 hover:text-white'}`}>Profil</Link>
              </div>

              <div className="w-[1px] h-6 bg-gray-800 hidden md:block"></div>

              {/* Avatar avec Badge TOP 3 */}
              <div className="flex items-center gap-4">
                <Link to="/profile" className="group relative">
                  <div className={`w-9 h-9 rounded-full bg-gray-800 border flex items-center justify-center text-xs font-bold transition-all ${rank ? 'border-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.3)]' : 'border-gray-700 text-indigo-400 group-hover:border-indigo-500'}`}>
                    {user.user_metadata?.full_name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  {/* Affichage du badge (Couronne ou Médaille) */}
                  {renderBadge()}
                </Link>
                
                <button onClick={handleLogout} className="text-xs font-black uppercase tracking-widest text-rose-500 hover:text-rose-400 transition-colors cursor-pointer">
                  Quitter
                </button>
              </div>
            </>
          ) : (
             <Link to="/signup" className="bg-white text-black px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-200 transition-all shadow-lg">S'inscrire</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;