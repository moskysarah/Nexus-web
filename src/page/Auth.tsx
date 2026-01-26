import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } }
      });
      if (error) alert(error.message);
      else {
        if (data.session) navigate('/dashboard');
        else alert('Inscription réussie !');
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert(error.message);
      else navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center px-4">
      {/* Largeur réduite à max-w-sm et padding réduit */}
      <div className="w-full max-w-sm bg-[#121214] border border-gray-800 p-6 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-black text-white mb-1">
          {isSignUp ? 'Rejoindre Nexus' : 'Bon retour !'}
        </h2>
        <p className="text-gray-400 mb-6 text-xs">
          {isSignUp ? 'Créez votre compte.' : 'Connectez-vous à votre espace.'}
        </p>

        <form onSubmit={handleAuth} className="space-y-3">
          {isSignUp && (
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Nom</label>
              <input 
                type="text" placeholder="Alexandre" 
                className="w-full bg-[#0a0a0c] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none transition"
                onChange={(e) => setFullName(e.target.value)} required={isSignUp}
              />
            </div>
          )}
          
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Email</label>
            <input 
              type="email" placeholder="votre@email.com" 
              className="w-full bg-[#0a0a0c] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none transition"
              onChange={(e) => setEmail(e.target.value)} required
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Mot de passe</label>
            <input 
              type="password" placeholder="••••••••" 
              className="w-full bg-[#0a0a0c] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none transition"
              onChange={(e) => setPassword(e.target.value)} required
            />
          </div>

          <button 
            disabled={loading}
            className="relative w-full overflow-hidden bg-indigo-600 text-white font-bold py-3 rounded-xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 mt-2 group text-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <span className="relative z-10">
              {loading ? 'Chargement...' : isSignUp ? 'Créer mon compte' : 'Se connecter'}
            </span>
          </button>
        </form>

        <div className="mt-4 text-center">
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-gray-500 hover:text-white transition"
          >
            {isSignUp ? "Déjà un compte ? Connexion" : "Pas de compte ? S'inscrire"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;