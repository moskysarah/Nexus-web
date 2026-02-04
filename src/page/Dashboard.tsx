import React, { useState } from 'react';
import { Trophy, Zap} from 'lucide-react';
import CourseCard from '../components/ui/CourseCard';
import WelcomeHeader from '../components/ui/WelcomeHeader';
import XPProgressBar from '../components/ui/XPProgressBar'; 
import { coursesData } from '../data/courses';
import { useUser } from '../hooks/useUser';
import Footer from '../components/layouts/Footer';
import axios from 'axios';

/**
 * Dashboard principal de Nexus Web - Version Dynamique Django
 */
const Dashboard: React.FC = () => {
  const { user, loading, setUser } = useUser();
  const [isUpdating, setIsUpdating] = useState(false);

  // --- LOGIQUE DE DONNÉES DJANGO ---
  const currentXP = user?.xp ?? 0;
  const currentLevel = user?.level ?? 1;
  const displayName = user?.full_name || user?.email?.split('@')[0] || "Explorer";

  // Fonction pour simuler le gain d'XP via le bouton de mission
  const handleGainXP = async (amount: number) => {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post(
        'http://127.0.0.1:8000/api/auth/gain-xp/', 
        { amount: amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Mise à jour locale de l'état pour voir la barre bouger immédiatement
      if (user) {
        setUser({
          ...user,
          xp: response.data.xp,
          level: response.data.level
        });
      }
    } catch (error) {
      console.error("Erreur lors du gain d'XP:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white pt-28 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* --- SECTION BIENVENUE --- */}
        <header className="mb-8">
          <div className="inline-block px-4 py-1 rounded-full border border-gray-800 bg-gray-900/50 text-sm font-medium text-gray-400 mb-4 animate-fade-in">
            Tableau de bord • Rang {currentLevel}
          </div>
          <WelcomeHeader userName={displayName} />
        </header>

        {/* --- BARRE DE PROGRESSION XP --- */}
        <section className="mb-12">
          <XPProgressBar currentXP={currentXP} />
        </section>

        {/* --- SECTION STATISTIQUES --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <StatCard label="Cours en cours" value={coursesData.length} color="text-blue-500" unit="Modules" />
          <StatCard label="Niveau" value={currentLevel} color="text-emerald-500" unit="Tier" />
          <StatCard label="Points XP" value={currentXP} color="text-purple-500" unit="Total" />
        </div>

        {/* --- SECTION COURS --- */}
        <div className="mb-8 text-left">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>
            Continuer l'apprentissage
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 text-left">
          {coursesData.map(course => (
            <CourseCard
              key={course.id}
              title={course.title}
              link={course.link}
              lang={course.language.toLowerCase() as 'html' | 'css' | 'js'}
              description={course.description}
            />
          ))}
        </div>

        {/* --- SECTION MISSIONS --- */}
        <section className="mb-20 bg-[#121214]/50 border border-gray-800 rounded-[2.5rem] p-8 relative overflow-hidden text-left">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 blur-[100px] -z-10"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 text-left">
            <div>
              <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">Objectifs de mission</h2>
              <p className="text-gray-500 text-sm">Boost ton apprentissage et débloque des badges exclusifs.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mission Card 1 - INTERACTIVE */}
            <div 
              onClick={() => handleGainXP(50)}
              className={`group p-6 bg-black/40 border border-gray-800 rounded-3xl hover:border-orange-500/50 transition-all cursor-pointer ${isUpdating ? 'opacity-50' : ''}`}
            >
              <div className="flex items-center justify-between mb-4 text-left">
                <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-500">
                  <Zap size={24} fill={isUpdating ? "none" : "currentColor"} className={isUpdating ? "animate-pulse" : ""} />
                </div>
                <span className="text-orange-500 font-black text-sm">+50 XP</span>
              </div>
              <h3 className="font-bold text-white mb-1">Session Éclair</h3>
              <p className="text-gray-500 text-xs">Clique pour simuler la fin d'une leçon.</p>
              <div className="mt-4 w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full w-2/3"></div>
              </div>
            </div>

            {/* Mission Card 2 */}
            <div className="group p-6 bg-black/40 border border-gray-800 rounded-3xl hover:border-emerald-500/50 transition-all cursor-pointer text-left">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500">
                  <Trophy size={24} />
                </div>
                <span className="text-emerald-500 font-black text-sm">BADGE</span>
              </div>
              <h3 className="font-bold text-white mb-1">Explorateur Nexus</h3>
              <p className="text-gray-500 text-xs">Ouvre un cours dans chaque catégorie.</p>
              <div className="mt-4 w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-1/3"></div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

// --- COMPOSANT STATCARD LOCAL ---
interface StatCardProps {
  label: string;
  value: number;
  color: string;
  unit: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, color, unit }) => (
  <div className="p-6 rounded-3xl bg-[#121214] border border-gray-800/50 relative overflow-hidden group hover:border-gray-700 transition-all duration-300 text-left">
    <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 blur-3xl ${color.replace('text', 'bg')}`}></div>
    <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">{label}</p>
    <div className="flex items-baseline gap-2">
      <span className={`text-4xl font-black ${color}`}>{value}</span>
      <span className="text-gray-600 text-sm font-medium">{unit}</span>
    </div>
  </div>
);

export default Dashboard;