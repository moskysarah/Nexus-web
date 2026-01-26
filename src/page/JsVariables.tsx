import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const JsVariables = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const navigate = useNavigate();

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
      {/* Barre de progression jaune JS */}
      <div className="fixed top-20 left-0 w-full h-1 bg-white/5 z-50">
        <div 
          className="h-full bg-yellow-400 transition-all duration-150 shadow-[0_0_10px_#facc15]" 
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto pt-32 px-6">
        <header className="mb-12">
          <span className="text-yellow-400 font-black text-xs uppercase tracking-[0.2em] px-3 py-1 bg-yellow-400/10 border border-yellow-400/20 rounded-full">
            Module 03 • JavaScript
          </span>
          <h1 className="text-5xl font-black text-white mt-4 mb-6">Variables & Logique</h1>
          <p className="text-xl text-gray-400 italic">"Le cerveau de votre application web."</p>
        </header>

        {/* SECTION 1: LES VARIABLES */}
        <section className="bg-[#121214] border border-gray-800 p-8 rounded-3xl mb-8 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-yellow-400">01.</span> Stocker des données
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="leading-relaxed">
                JavaScript utilise des boîtes virtuelles appelées <span className="text-white font-bold">Variables</span> pour mémoriser des informations.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                  <code className="text-yellow-400">const</code> : Pour les valeurs qui ne changent jamais.
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                  <code className="text-yellow-400">let</code> : Pour les valeurs que vous allez modifier.
                </li>
              </ul>
            </div>
            
            <div className="bg-black/40 p-6 rounded-2xl border border-gray-800 font-mono text-sm text-emerald-400 shadow-inner">
               <span className="text-gray-500">// Déclaration</span><br/>
               <span className="text-purple-400">const</span> pays = <span className="text-yellow-200">"France"</span>;<br/>
               <span className="text-purple-400">let</span> points = <span className="text-orange-400">0</span>;<br/><br/>
               <span className="text-gray-500">// Mise à jour</span><br/>
               points = points + <span className="text-orange-400">50</span>;
            </div>
          </div>
        </section>

        

        {/* SECTION 2: LES TYPES DE DONNÉES */}
        <section className="bg-[#121214] border border-gray-800 p-8 rounded-3xl mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-yellow-400">02.</span> Les Types de données
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
              <span className="block text-2xl mb-2">"abc"</span>
              <p className="text-xs font-bold uppercase text-gray-500">String (Texte)</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
              <span className="block text-2xl mb-2">123</span>
              <p className="text-xs font-bold uppercase text-gray-500">Number (Nombre)</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
              <span className="block text-2xl mb-2">true/false</span>
              <p className="text-xs font-bold uppercase text-gray-500">Boolean (Vrai/Faux)</p>
            </div>
          </div>
        </section>

        {/* SECTION 3: LES CONDITIONS */}
        <section className="bg-[#121214] border border-gray-800 p-8 rounded-3xl mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-yellow-400">03.</span> La Logique (If/Else)
          </h2>
          <p className="mb-6">C'est ici que votre code prend des décisions :</p>
          <div className="bg-black/60 p-6 rounded-2xl border border-gray-700 font-mono text-sm">
            <span className="text-purple-400">if</span> (points &gt;= <span className="text-orange-400">100</span>) {'{'}<br/>
            &nbsp;&nbsp;console.log(<span className="text-yellow-200">"Niveau supérieur !"</span>);<br/>
            {'}'} <span className="text-purple-400">else</span> {'{'}<br/>
            &nbsp;&nbsp;console.log(<span className="text-yellow-200">"Continuez à apprendre"</span>);<br/>
            {'}'}
          </div>
        </section>

        {/* CALL TO ACTION */}
        <div className="relative p-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl overflow-hidden shadow-2xl shadow-yellow-500/20">
          <div className="bg-[#0a0a0c] rounded-[22px] p-10 text-center">
            <h3 className="text-3xl font-black text-white mb-4 italic uppercase">Mission terminée ?</h3>
            <p className="text-gray-400 mb-8">Validez vos connaissances pour débloquer votre récompense en XP.</p>
            
            <button 
              onClick={() => navigate('/lesson/3')} 
              className="group relative inline-flex items-center gap-3 bg-yellow-500 text-black font-black px-10 py-5 rounded-2xl hover:bg-yellow-400 transition-all active:scale-95 overflow-hidden"
            >
              <span className="relative z-10 uppercase tracking-widest">Passer le Quiz JS (+100 XP)</span>
              <span className="text-xl group-hover:translate-x-2 transition-transform">⚡</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsVariables;