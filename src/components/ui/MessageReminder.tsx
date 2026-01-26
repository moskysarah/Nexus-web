import { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';

const AdminReminder = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Premier déclenchement après 5 secondes pour tester, puis toutes les heures
    const initialTimeout = setTimeout(() => setIsVisible(true), 5000);
    
    const interval = setInterval(() => {
      setIsVisible(true);
    }, 3600000); // 1 heure

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[100] animate-bounce-in">
      <div className="bg-[#121214] border-2 border-indigo-500/30 p-5 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-[320px] relative">
        
        {/* Bouton Fermer */}
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>

        <div className="flex flex-col items-center text-center">
          {/* Avatar de Sarah */}
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-full border-4 border-indigo-500 p-1 bg-[#0a0a0c]">
              <img 
                src="/sarah-avatar.png" // Remplace par ton vrai chemin d'image
                alt="Sarah"
                className="w-full h-full rounded-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"; // Avatar de secours
                }}
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-indigo-500 p-1.5 rounded-full text-white shadow-lg">
              <Sparkles size={12} fill="currentColor" />
            </div>
          </div>

          {/* Message de Sarah */}
          <h4 className="text-white font-black text-lg mb-1">Coucou ! Moi c'est Sarah ✨</h4>
          <p className="text-gray-400 text-sm leading-relaxed">
            Je suis ravie de vous accompagner sur <span className="text-indigo-400 font-bold">NEXUS</span>. N'oubliez pas de faire une petite pause, votre cerveau vous remerciera !
          </p>

          <button 
            onClick={() => setIsVisible(false)}
            className="mt-5 w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-500 text-white text-xs font-black rounded-2xl hover:scale-105 transition-all uppercase tracking-widest shadow-lg shadow-indigo-500/20"
          >
            Merci Sarah !
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminReminder;