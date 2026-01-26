import React from 'react';

interface WelcomeProps {
  userName?: string;
}

const WelcomeHeader: React.FC<WelcomeProps> = ({ userName = "Explorer" }) => {
  const hour = new Date().getHours();

  // Logique pour déterminer le message selon l'heure
  const getGreeting = () => {
    if (hour >= 5 && hour < 12) {
      return "Bonjour";
    } else if (hour >= 12 && hour < 18) {
      return "Bon après-midi";
    } else if (hour >= 18 && hour < 22) {
      return "Bonsoir";
    } else {
      return "Bonne nuit"; // Pour les codeurs nocturnes !
    }
  };

  return (
    <div className="mb-10 animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
        {getGreeting()},{" "}
        <span className="text-violet-500 bg-clip-text bg-gradient-to-r from-nexus-secondary via-nexus-primary to-nexus-accent">
          {userName}.
        </span>
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg font-medium">
        {hour >= 22 || hour < 5 
          ? "Toujours en train de builder ? Impressionnant." 
          : "Prêt à propulser vos compétences aujourd'hui ?"}
      </p>
    </div>
  );
};

export default WelcomeHeader;