import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CodePlayground from '../components/ui/CodePlayground'; // Réutilise ton éditeur !

const CssBasics = () => {
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
      <div className="fixed top-20 left-0 w-full h-1 bg-white/5 z-50">
        <div className="h-full bg-blue-500 transition-all duration-150" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      <div className="max-w-4xl mx-auto pt-32 px-6">
        <header className="mb-12">
          <span className="text-blue-500 font-black text-xs uppercase tracking-[0.2em]">Module 02 • CSS</span>
          <h1 className="text-5xl font-black text-white mt-4 mb-6">Flexbox Mastery</h1>
        </header>

        <section className="bg-[#121214] border border-gray-800 p-8 rounded-3xl mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Le concept de Flexbox</h2>
          <p className="leading-relaxed">
            Flexbox est un mode de mise en page qui permet de disposer des éléments en colonnes ou en lignes facilement. 
            Avec <code className="text-blue-400 font-mono">display: flex;</code>, le parent devient un "container" et ses enfants des "items".
          </p>
        </section>

        <CodePlayground />

        <div className="mt-16 text-center">
          <button onClick={() => navigate('/lesson/2')} className="bg-blue-600 text-white font-black px-8 py-4 rounded-xl hover:bg-blue-500 shadow-lg shadow-blue-500/20 transition-all">
            Passer le Quiz CSS (+100 XP)
          </button>
        </div>
      </div>
    </div>
  );
};

export default CssBasics;