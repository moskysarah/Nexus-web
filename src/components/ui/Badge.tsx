import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  type?: 'default' | 'new' | 'hot' | 'difficulty';
  level?: 'Débutant' | 'Intermédiaire' | 'Avancé';
}

export const Badge: React.FC<BadgeProps> = ({ children, type = 'default', level }) => {
  // Logique de couleurs basée sur le type ou le niveau
  const getStyles = () => {
    if (level === 'Débutant') return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    if (level === 'Intermédiaire') return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
    if (level === 'Avancé') return 'text-rose-400 bg-rose-400/10 border-rose-400/20';

    switch (type) {
      case 'new': return 'text-nexus-secondary bg-nexus-secondary/10 border-nexus-secondary/20';
      case 'hot': return 'text-nexus-accent bg-nexus-accent/10 border-nexus-accent/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStyles()}`}>
      {children}
    </span>
  );
};