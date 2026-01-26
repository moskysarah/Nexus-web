import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Colonne Logo */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-nexus-primary to-nexus-secondary"></div>
              <span className="font-bold text-xl dark:text-white uppercase tracking-tighter">Nexus Web</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              La plateforme nouvelle génération pour maîtriser le développement moderne.
            </p>
          </div>

          {/* Liens Rapides */}
          <div>
            <h4 className="font-bold mb-4 dark:text-white">Parcours</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link to="/learn" className="hover:text-nexus-primary transition">HTML & CSS</Link></li>
              <li><Link to="/learn" className="hover:text-nexus-primary transition">JavaScript Mastery</Link></li>
              <li><Link to="/learn" className="hover:text-nexus-primary transition">React & TS</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 dark:text-white">Ressources</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-nexus-primary">Blog</a></li>
              <li><a href="#" className="hover:text-nexus-primary">Documentation</a></li>
              <li><a href="#" className="hover:text-nexus-primary">Roadmaps</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 dark:text-white">Légal</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-nexus-primary">Confidentialité</a></li>
              <li><a href="#" className="hover:text-nexus-primary">Conditions d'utilisation</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">© 2024 Nexus Web. Tous droits réservés.</p>
          <div className="flex gap-6 text-slate-400">
            {/* Icônes réseaux sociaux (simulées) */}
            <span className="hover:text-nexus-primary cursor-pointer text-sm">Twitter</span>
            <span className="hover:text-nexus-primary cursor-pointer text-sm">GitHub</span>
            <span className="hover:text-nexus-primary cursor-pointer text-sm">LinkedIn</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;