import React from 'react';
import CourseCard from '../components/ui/CourseCard';
import WelcomeHeader from '../components/ui/WelcomeHeader';
import XPProgressBar from '../components/ui/XPProgressBar'; // Import de la barre XP
import { coursesData } from '../data/courses';
import { useUser } from '../hooks/userUser'; 

/**
 * Dashboard principal de Nexus Web
 * Affiche les statistiques de l'utilisateur, sa progression XP et la liste des cours.
 */
const Dashboard: React.FC = () => {
  // Récupération de l'utilisateur via Supabase
  const { user, loading } = useUser();

  // Statistiques (Plus tard : récupérées via Supabase avec useEffect)
  const userStats = {
    currentCourses: coursesData.length,
    certificates: 2,
    xp: 1250, // L'utilisateur est Lvl 2 (250/1000 vers le Lvl 3)
  };

  // Gestion du nom d'affichage
  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "Explorer";

  // Écran de chargement pendant la vérification de session
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white pt-28 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* --- SECTION BIENVENUE --- */}
        <header className="mb-8">
          <div className="inline-block px-4 py-1 rounded-full border border-gray-800 bg-gray-900/50 text-sm font-medium text-gray-400 mb-4 animate-fade-in">
            Tableau de bord • Nexus Web
          </div>
          <WelcomeHeader userName={displayName} />
        </header>

        {/* --- BARRE DE PROGRESSION XP --- */}
        <section className="mb-12">
          <XPProgressBar currentXP={userStats.xp} />
        </section>

        {/* --- SECTION STATISTIQUES --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <StatCard 
            label="Cours en cours" 
            value={userStats.currentCourses} 
            color="text-blue-500" 
            unit="Modules"
          />
          <StatCard 
            label="Certificats" 
            value={userStats.certificates} 
            color="text-emerald-500" 
            unit="Obtenus"
          />
          <StatCard 
            label="Points XP" 
            value={userStats.xp} 
            color="text-purple-500" 
            unit="XP Total"
          />
        </div>

        {/* --- TITRE DE SECTION --- */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>
            Continuer l'apprentissage
          </h2>
        </div>

        {/* --- GRILLE DES COURS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      </div>
    </div>
  );
};

/**
 * Sous-composant pour les cartes de statistiques (StatCard)
 */
interface StatCardProps {
  label: string;
  value: number;
  color: string;
  unit: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, color, unit }) => (
  <div className="p-6 rounded-3xl bg-[#121214] border border-gray-800/50 relative overflow-hidden group hover:border-gray-700 transition-all duration-300">
    {/* Effet de halo coloré en fond */}
    <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 blur-3xl ${color.replace('text', 'bg')}`}></div>
    
    <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">{label}</p>
    <div className="flex items-baseline gap-2">
      <span className={`text-4xl font-black ${color}`}>{value}</span>
      <span className="text-gray-600 text-sm font-medium">{unit}</span>
    </div>
  </div>
);

export default Dashboard;