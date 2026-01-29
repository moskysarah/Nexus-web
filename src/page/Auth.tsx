import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase'; 
import confetti from 'canvas-confetti';
import { Mail, Lock, Rocket } from 'lucide-react';

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const playVictorySound = () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3');
    audio.volume = 0.4;
    audio.play().catch(() => {}); 
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1. On tente d'abord de se connecter (Login)
      const { data: _signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!signInError) {
      // Si le login marche : direction Dashboard direct
      navigate('/dashboard');
      return;
    }

    // 2. Si le login échoue parce que l'utilisateur n'existe pas, on l'inscrit (Signup)
    if (signInError.message.includes("Invalid login credentials")) {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        alert("Erreur d'inscription : " + signUpError.message);
        setLoading(false);
      } else {
        // CÉLÉBRATION POUR LE NOUVEAU !
        playVictorySound();
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#6366f1', '#a855f7', '#ffffff'],
          zIndex: 999
        });

        setTimeout(() => navigate('/dashboard'), 2500);
      }
    } else {
      alert(signInError.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#121214] border border-gray-800 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-600/10 blur-[80px] rounded-full"></div>

        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex p-3 bg-indigo-500/10 rounded-2xl text-indigo-500 mb-4 animate-bounce">
            <Rocket size={28} />
          </div>
          <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">
            Nexus <span className="text-indigo-500">Access</span>
          </h2>
          <p className="text-gray-500 text-sm mt-2">Sarah t'attend pour commencer.</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4 relative z-10">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
            <input 
              type="email" 
              placeholder="Ton email" 
              className="w-full pl-12 pr-4 py-4 bg-black/50 border border-gray-800 rounded-2xl text-white outline-none focus:border-indigo-500 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
            <input 
              type="password" 
              placeholder="Ton mot de passe" 
              className="w-full pl-12 pr-4 py-4 bg-black/50 border border-gray-800 rounded-2xl text-white outline-none focus:border-indigo-500 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-black rounded-2xl transition-all shadow-lg shadow-indigo-500/20 uppercase text-sm"
          >
            {loading ? "Chargement..." : "REJOINDRE L'AVENTURE"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;