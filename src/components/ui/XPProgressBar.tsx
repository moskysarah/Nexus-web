import React from 'react';

interface XPProps {
  currentXP: number;
}

const XPProgressBar: React.FC<XPProps> = ({ currentXP }) => {
  const XP_PER_LEVEL = 1000;
  const level = Math.floor(currentXP / XP_PER_LEVEL) + 1;
  const progressInLevel = currentXP % XP_PER_LEVEL;
  const percentage = (progressInLevel / XP_PER_LEVEL) * 100;

  return (
    <div className="bg-[#121214] border border-gray-800 p-6 rounded-3xl mb-8">
      <div className="flex justify-between items-end mb-4">
        <div>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Niveau actuel</p>
          <h3 className="text-2xl font-black text-white">Apprenti Nexus <span className="text-nexus-primary">Lvl {level}</span></h3>
        </div>
        <p className="text-sm font-medium text-gray-400">
          <span className="text-white">{progressInLevel}</span> / {XP_PER_LEVEL} XP
        </p>
      </div>

      {/* Conteneur de la barre */}
      <div className="h-3 w-full bg-gray-900 rounded-full overflow-hidden relative">
        {/* Barre de progression avec dégradé et lueur */}
        <div 
          className="h-full bg-gradient-to-r from-indigo-600 via-purple-500 to-nexus-accent transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(99,102,241,0.5)]"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      <p className="text-xs text-gray-500 mt-3 italic">
        Plus que {XP_PER_LEVEL - progressInLevel} XP pour atteindre le niveau {level + 1}
      </p>
    </div>
  );
};

export default XPProgressBar;