import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import CodePlayground from '../components/ui/CodePlayground';

const HtmlSemantic = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const navigate = useNavigate();

  // Gestion de la barre de progression au scroll
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / totalHeight) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-gray-300 pb-20">
      {/* Barre de progression */}
      <div className="fixed top-20 left-0 w-full h-1 bg-white/5 z-50">
        <div 
          className="h-full bg-orange-500 transition-all duration-150" 
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto pt-32 px-6">
        <header className="mb-12">
          <span className="text-orange-500 font-black text-xs uppercase tracking-[0.2em]">Module 01 • HTML</span>
          <h1 className="text-5xl font-black text-white mt-4 mb-6">Structure & Sémantique</h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Le HTML n'est pas qu'une question d'affichage, c'est le langage qui donne du **sens** au web.
          </p>
        </header>

        {/* Stack de Pratique */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-[#121214] border border-gray-800 p-4 rounded-2xl">
            <p className="text-white font-bold mb-1 italic">Editeur</p>
            <p className="text-sm text-gray-500">VS Code + Emmet</p>
          </div>
          <div className="bg-[#121214] border border-gray-800 p-4 rounded-2xl">
            <p className="text-white font-bold mb-1 italic">Navigateur</p>
            <p className="text-sm text-gray-500">Chrome DevTools (F12)</p>
          </div>
          <div className="bg-[#121214] border border-gray-800 p-4 rounded-2xl">
            <p className="text-white font-bold mb-1 italic">Standard</p>
            <p className="text-sm text-gray-500">HTML5 Sémantique</p>
          </div>
        </div>

        {/* Le Coeur du Cours */}
        <article className="prose prose-invert max-w-none space-y-8">
          <section className="bg-[#121214] border border-gray-800 p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-white mb-4">Pourquoi la sémantique ?</h2>
            <p>
              Imaginez un livre sans chapitres, sans titres, juste une masse de texte. 
              C'est ce qu'est un site fait uniquement de <code className="text-orange-400">&lt;div&gt;</code>. 
              Les balises sémantiques comme <code className="text-orange-400">&lt;header&gt;</code>, 
              <code className="text-orange-400">&lt;main&gt;</code> et <code className="text-orange-400">&lt;footer&gt;</code> 
              organisent votre code pour Google et pour les outils d'accessibilité.
            </p>
          </section>

          

          <section className="bg-[#121214] border border-gray-800 p-8 rounded-3xl mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">La Hiérarchie des Titres</h2>
            <p>
              Respectez toujours l'ordre : <strong>H1 (Titre du site)</strong>, puis <strong>H2 (Grands titres)</strong>, 
              puis <strong>H3</strong>. Ne sautez jamais de niveau pour des raisons de style !
            </p>
          </section>
            <section className="mt-16">
                <h2 className="text-2xl font-bold text-white mb-6 italic">Pratique en direct ⚡️</h2>
                <p className="text-gray-400 mb-6">
                    Essaie d'utiliser les balises <code className="text-orange-400">&lt;header&gt;</code> ou <code className="text-orange-400">&lt;main&gt;</code> ci-dessous :
                </p>
  
                <CodePlayground />
            </section>
        </article>

        {/* Action Finale */}
        <div className="mt-16 p-8 bg-orange-500/10 border border-orange-500/20 rounded-3xl text-center">
          <h3 className="text-white font-bold text-xl mb-4">Prêt pour le quiz ?</h3>
          <button
            onClick={() => { confetti(); navigate('/lesson/1'); }} // Redirige vers le quiz que nous avons créé
            className="bg-orange-500 text-white font-black px-8 py-4 rounded-xl hover:bg-orange-400 transition-all active:scale-95 shadow-lg shadow-orange-500/20"
          >
            Vérifier mes acquis (+100 XP)
          </button>
        </div>
      </div>
    </div>
  );
};

export default HtmlSemantic;