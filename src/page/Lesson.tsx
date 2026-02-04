import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import axios from 'axios'; // On remplace l'import Supabase par Axios
import confetti from 'canvas-confetti';

const LESSONS_CONTENT: any = {
  "1": { title: "Les bases du HTML5", lang: "HTML", color: "text-orange-500", barColor: "bg-orange-500", content: "Le HTML est la structure de votre page web. Imaginez que c'est le squelette d'une maison..." },
  "2": { title: "Flexbox Mastery", lang: "CSS", color: "text-blue-500", barColor: "bg-blue-500", content: "Flexbox permet de disposer vos éléments en colonnes ou en lignes très facilement avec display: flex..." },
  "3": { title: "Variables JavaScript", lang: "JS", color: "text-yellow-500", barColor: "bg-yellow-500", content: "En JS, une variable est un conteneur. On utilise 'let' ou 'const' pour stocker des données..." }
};

const Lesson = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, setUser } = useUser(); // On récupère setUser pour mettre à jour l'UI après le gain d'XP
  const [loading, setLoading] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const lesson = LESSONS_CONTENT[id || "1"] || LESSONS_CONTENT["1"];

  // Calcul de la progression au scroll
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight === 0) return; 
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleComplete = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const token = localStorage.getItem('access_token');
      
      // --- APPEL API DJANGO ---
      const response = await axios.post(
        'http://127.0.0.1:8000/api/auth/gain-xp/', 
        { amount: 100 }, // On envoie 100 XP
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Mise à jour de l'état utilisateur local (pour que le Dashboard soit à jour direct)
      if (setUser) {
        setUser({
          ...user,
          xp: response.data.xp,
          level: response.data.level
        });
      }

      // Effet de victoire !
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#a855f7', '#ffffff']
      });

      // Retour au dashboard après la célébration
      setTimeout(() => navigate('/dashboard'), 2000);

    } catch (err) {
      console.error("Erreur Django:", err);
      alert("Erreur lors de la sauvegarde de la progression.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] pt-32 pb-20 px-6">
      
      {/* BARRE DE PROGRESSION AU SCROLL */}
      <div className="fixed top-20 left-0 w-full h-1 bg-white/5 z-50">
        <div 
          className={`h-full transition-all duration-150 ease-out ${lesson.barColor}`}
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <div className="max-w-3xl mx-auto">
        
        <div className="mb-10 flex justify-between items-end">
          <div className="text-left">
            <span className={`font-black text-xs uppercase tracking-[0.2em] ${lesson.color}`}>
              {lesson.lang} • Module 01
            </span>
            <h1 className="text-4xl font-black text-white mt-2">{lesson.title}</h1>
          </div>
          <div className="text-right hidden sm:block">
            <span className="text-gray-500 text-xs font-bold uppercase">Progression</span>
            <p className="text-white font-mono font-bold">{Math.round(scrollProgress)}%</p>
          </div>
        </div>

        <div className="bg-[#121214] border border-gray-800 rounded-3xl p-8 mb-10 shadow-2xl relative overflow-hidden text-left">
          <div className="prose prose-invert text-gray-400 leading-relaxed text-lg">
            <p className="mb-8">{lesson.content}</p>
            
            <div className="space-y-8 opacity-50 italic text-sm">
              <p>Le développement web est un voyage constant. En maîtrisant {lesson.lang}, vous posez une pierre de plus à votre édifice de développeur Fullstack.</p>
              <p>Continuez à scroller pour terminer la lecture et débloquer vos points d'expérience.</p>
            </div>

            <div className="bg-black/40 p-6 rounded-2xl border border-gray-800 font-mono text-sm mt-10">
              <span className="text-purple-400">nexus</span>.<span className="text-yellow-400">completeLesson</span>(<span className="text-emerald-400">"{lesson.title}"</span>);
            </div>
          </div>
        </div>

        <button 
          onClick={handleComplete}
          disabled={loading || scrollProgress < 90}
          className={`w-full font-black py-4 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-3 ${
            scrollProgress >= 90 
            ? 'bg-white text-black hover:bg-gray-200' 
            : 'bg-gray-800 text-gray-500 cursor-not-allowed'
          }`}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
          ) : scrollProgress >= 90 ? (
            'Valider et gagner 100 XP'
          ) : (
            `Lisez encore un peu... (${Math.round(scrollProgress)}%)`
          )}
        </button>

      </div>
    </div>
  );
};

export default Lesson;