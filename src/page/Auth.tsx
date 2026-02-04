import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios'; // Ton instance Axios configurée
import confetti from 'canvas-confetti';
import { Mail, Lock, Rocket, User, ArrowRight } from 'lucide-react';

const Auth: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const cleanEmail = email.trim().toLowerCase();

    try {
      if (isSignUp) {
        // --- INSCRIPTION ---
        // Utilise 'auth/register/' (Axios gère le 'api/' de base)
        await api.post('register/', {
          email: cleanEmail,
          password: password,
          full_name: fullName,
        });

        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        alert("Compte Nexus créé ! Connecte-toi maintenant.");
        setIsSignUp(false); 
      } else {
        // --- CONNEXION ---
        // CORRECTION : 'auth/login/' au lieu de 'auth/auth/login/'
        const response = await api.post('login/', {
          email: cleanEmail,
          password: password,
        });
        // Stockage des tokens JWT
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        
        navigate('/dashboard');
      }
    } catch (err: any) {
      console.error("Erreur Nexus Detail:", err.response?.data);
      
      const errorData = err.response?.data;
      if (errorData?.email) {
        alert("Email déjà utilisé ou invalide.");
      } else if (errorData?.detail) {
        alert("Identifiants incorrects.");
      } else {
        alert("Le serveur Nexus est injoignable.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex flex-col items-center justify-start pt-32 px-4">
      <div className="w-full max-w-sm bg-[#121214] border border-gray-800 p-6 rounded-[2rem] shadow-2xl relative overflow-hidden">
        
        <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[70px] transition-all duration-700 ${isSignUp ? 'bg-purple-600/20' : 'bg-indigo-600/10'}`}></div>

        <div className="text-center mb-6 relative z-10">
          <div className={`inline-flex p-2.5 rounded-xl mb-3 transition-colors ${isSignUp ? 'bg-purple-500/10 text-purple-500' : 'bg-indigo-500/10 text-indigo-500'}`}>
            <Rocket size={22} />
          </div>
          <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">
            Nexus <span className={isSignUp ? 'text-purple-500' : 'text-indigo-500'}>{isSignUp ? 'Join' : 'Access'}</span>
          </h2>
        </div>

        <form onSubmit={handleAuth} className="space-y-3.5 relative z-10 text-left">
          {isSignUp && (
            <div className="relative animate-in fade-in zoom-in-95 duration-300">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
              <input 
                type="text" 
                placeholder="Nom complet" 
                className="w-full pl-11 pr-4 py-3 bg-black/50 border border-gray-800 rounded-xl text-white text-sm outline-none focus:border-purple-500 transition-all"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
            <input 
              type="email" 
              placeholder="Email" 
              className={`w-full pl-11 pr-4 py-3 bg-black/50 border border-gray-800 rounded-xl text-white text-sm outline-none transition-all ${isSignUp ? 'focus:border-purple-500' : 'focus:border-indigo-500'}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
            <input 
              type="password" 
              placeholder="Mot de passe" 
              className={`w-full pl-11 pr-4 py-3 bg-black/50 border border-gray-800 rounded-xl text-white text-sm outline-none transition-all ${isSignUp ? 'focus:border-purple-500' : 'focus:border-indigo-500'}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3.5 mt-2 text-white font-bold rounded-xl transition-all shadow-lg uppercase text-xs flex items-center justify-center gap-2 group ${isSignUp ? 'bg-purple-600 hover:bg-purple-500' : 'bg-indigo-600 hover:bg-indigo-500'}`}
          >
            {loading ? "Chargement..." : isSignUp ? "Créer mon compte" : "Connexion"}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-6 text-center relative z-10">
          <button 
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-gray-500 text-xs hover:text-white transition-colors"
          >
            {isSignUp ? "Déjà un compte ? " : "Pas encore inscrit ? "}
            <span className={`font-bold ${isSignUp ? 'text-purple-400' : 'text-indigo-400'}`}>
              {isSignUp ? "Se connecter" : "S'inscrire"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;