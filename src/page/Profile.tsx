import React, { useState, useEffect } from 'react';
import { useUser } from '../hooks/useUser';
import api from '../api/axios'; // Importe ton instance Axios à la place de supabase

const Profile: React.FC = () => {
  const { user, setUser } = useUser(); // 'setUser' permet de rafraîchir les données localement
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [message, setMessage] = useState('');

  // Charger le nom actuel au montage
  useEffect(() => {
    if (user) {
      // Ajuste selon la structure de ton objet user renvoyé par Django
      setFullName(user.full_name || '');
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // APPEL DJANGO : On utilise PUT ou PATCH sur ton endpoint profil
      // L'URL dépend de ton backend, par exemple 'auth/profile/update/' ou juste 'profile/'
      const response = await api.patch('profile/update/', {
        full_name: fullName
      });

      setMessage('Profil mis à jour avec succès !');

      // Actualise les données localement
      setUser(response.data);
      
    } catch (err: any) {
      console.error('Profile update error:', err);
      const errorMsg = err.response?.data?.detail || "Une erreur est survenue lors de la mise à jour.";
      setMessage(`Erreur : ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white pt-28 pb-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black mb-8 italic uppercase tracking-tighter">Mon Profil</h1>

        <div className="bg-[#121214] border border-gray-800 rounded-3xl p-8 shadow-xl relative overflow-hidden">
          {/* Décoration subtile */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-600/10 rounded-full blur-3xl"></div>

          <form onSubmit={handleUpdateProfile} className="space-y-6 relative z-10">
            {/* Avatar statique (initiales) */}
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center text-3xl font-black shadow-lg shadow-indigo-500/20 transform -rotate-3">
                {fullName ? fullName.charAt(0).toUpperCase() : 'N'}
              </div>
              <div>
                <h2 className="text-xl text-white font-bold">{fullName || 'Nexus User'}</h2>
                <p className="text-gray-500 text-sm font-mono">{user?.email}</p>
              </div>
            </div>

            <hr className="border-gray-800/50" />

            {/* Champ Nom */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 block ml-1">Nom complet</label>
              <input 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Votre nom"
                className="w-full bg-black/40 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-all placeholder:text-gray-700"
              />
            </div>

            {/* Champ Email (Lecture seule) */}
            <div className="space-y-2 opacity-60">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 block ml-1">Adresse Email</label>
              <input 
                type="email" 
                value={user?.email || ''} 
                disabled 
                className="w-full bg-black/20 border border-gray-900 rounded-xl px-4 py-3 text-gray-500 cursor-not-allowed outline-none font-mono text-sm"
              />
            </div>

            {/* Message de confirmation */}
            {message && (
              <div className={`p-4 rounded-xl text-sm font-bold flex items-center gap-2 animate-in slide-in-from-top-2 duration-300 ${message.includes('Erreur') ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'}`}>
                {message}
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="bg-white text-black font-black py-4 px-8 rounded-xl hover:bg-gray-200 transition-all active:scale-95 disabled:opacity-50 uppercase text-xs tracking-widest w-full sm:w-auto"
            >
              {loading ? 'Synchronisation...' : 'Enregistrer les modifications'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;