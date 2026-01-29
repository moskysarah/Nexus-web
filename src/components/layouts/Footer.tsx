import React from 'react';
import { Rocket, Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0c] border-t border-gray-800/50 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Colonne 1 : Brand & Description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="p-2 bg-indigo-500 rounded-lg group-hover:rotate-12 transition-transform">
                <Rocket size={20} className="text-white" />
              </div>
              <span className="text-xl font-black italic tracking-tighter text-white uppercase">
                Nexus<span className="text-indigo-500">Web</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              La plateforme d'apprentissage nouvelle génération pour maîtriser le web avec Sarah.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Github size={18} />} href="#" />
              <SocialIcon icon={<Twitter size={18} />} href="#" />
              <SocialIcon icon={<Linkedin size={18} />} href="#" />
            </div>
          </div>

          {/* Colonne 2 : Plateforme */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Plateforme</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><FooterLink label="Cours" href="/dashboard" /></li>
              <li><FooterLink label="Missions" href="#" /></li>
              <li><FooterLink label="Certifications" href="#" /></li>
              <li><FooterLink label="Classement" href="#" /></li>
            </ul>
          </div>

          {/* Colonne 3 : Support */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Support</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><FooterLink label="Centre d'aide" href="#" /></li>
              <li><FooterLink label="Documentation" href="#" /></li>
              <li><FooterLink label="Contact" href="#" /></li>
              <li><FooterLink label="Statut API" href="#" /></li>
            </ul>
          </div>

          {/* Colonne 4 : Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Restez à jour</h4>
            <p className="text-gray-500 text-sm mb-4">Reçois les nouveaux défis chaque semaine.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Ton email" 
                className="w-full bg-black/50 border border-gray-800 rounded-xl py-3 px-4 text-sm text-white focus:border-indigo-500 outline-none transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors">
                <Mail size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* --- BARRE INFÉRIEURE --- */}
        <div className="pt-8 border-t border-gray-800/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">
            © {currentYear} Nexus Web. Tous droits réservés.
          </p>
          <div className="flex items-center gap-1 text-gray-600 text-xs">
            Fait avec <Heart size={12} className="text-red-500 fill-red-500" /> pour les passionnés du web.
          </div>
          <div className="flex gap-6 text-xs text-gray-600">
            <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-white transition-colors">CGU</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- PETITS COMPOSANTS INTERNES ---

const FooterLink = ({ label, href }: { label: string; href: string }) => (
  <Link to={href} className="hover:text-indigo-400 hover:translate-x-1 transition-all inline-block">
    {label}
  </Link>
);

const SocialIcon = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
  <a 
    href={href} 
    className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:border-indigo-500 hover:text-indigo-500 transition-all"
  >
    {icon}
  </a>
);

export default Footer;