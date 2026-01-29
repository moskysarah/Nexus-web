import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  // Configuration des icônes plus petites et mieux espacées
  const techIcons = [
    { label: 'HTML', color: 'text-orange-500', shadow: 'shadow-orange-500/10', delay: '0s', pos: 'top-[15%] left-[15%]' },
    { label: 'CSS', color: 'text-blue-500', shadow: 'shadow-blue-500/10', delay: '-2.5s', pos: 'top-[25%] right-[15%]' },
    { label: 'JS', color: 'text-yellow-400', shadow: 'shadow-yellow-400/10', delay: '-5s', pos: 'bottom-[10%] left-[15%]' }, // JS est maintenant bien loin du bouton
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex flex-col overflow-hidden relative w-full">
      
      {/* --- ÉLÉMENTS DÉCORATIFS (ICONES RÉDUITES) --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {techIcons.map((icon, index) => (
          <div 
            key={index}
            className={`absolute ${icon.pos} animate-float-slow`}
            style={{ animationDelay: icon.delay }}
          >
            {/* Taille réduite : w-12 h-12 sur mobile, w-16 h-16 sur desktop */}
            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl bg-[#121214]/60 backdrop-blur-md border border-gray-800/50 flex items-center justify-center text-sm md:text-lg font-black ${icon.color} shadow-xl ${icon.shadow} animate-spin-slow`}>
              {icon.label}
            </div>
          </div>
        ))}
        
        {/* Halo lumineux central plus subtil */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[400px] bg-indigo-600/5 blur-[100px] rounded-full"></div>
      </div>

      {/* --- CONTENU PRINCIPAL --- */}
      <div className="flex-1 flex items-center justify-center px-6 relative z-10">
        <div className="text-center max-w-4xl">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-gray-400 text-[10px] md:text-xs font-bold mb-8 animate-fade-in tracking-[0.2em] uppercase">
            ⚡️ Future is now
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter">
            Nexus <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">Web</span>
          </h1>
          
          <p className="text-base md:text-lg text-gray-500 mb-12 max-w-xl mx-auto leading-relaxed">
            Apprenez le développement moderne. <br />
            Simple. Interactif. Performant.
          </p>
          
          <button
            onClick={() => navigate('/signup')}
            className="group relative px-10 py-4 bg-white text-black rounded-xl font-black text-sm md:text-base hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all active:scale-95"
          >
            DÉMARRER L'AVENTURE
            <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;