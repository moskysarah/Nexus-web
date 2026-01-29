import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useUser } from '../hooks/useUser';

const Profile = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [message, setMessage] = useState('');

  // Charger le nom actuel au montage
  useEffect(() => {
    if (user) {
      setFullName(user.user_metadata?.full_name || '');
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName }
      });

      if (error) {
        setMessage(`Erreur : ${error.message}`);
      } else {
        setMessage('Profil mis à jour avec succès !');
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setMessage(`Erreur : ${err.message}`);
        console.error('Profile update error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white pt-28 pb-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black mb-8">Mon Profil</h1>

        <div className="bg-[#121214] border border-gray-800 rounded-3xl p-8 shadow-xl">
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            {/* Avatar statique (initiales) */}
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center text-3xl font-black shadow-lg shadow-indigo-500/20">
                {fullName.charAt(0).toUpperCase() || 'E'}
              </div>
              <div>
                <h2 className="text-xl text-white font-bold">{fullName || 'Explorer'}</h2>
                <p className="text-gray-500 text-sm">{user?.email}</p>
              </div>
            </div>

            <hr className="border-gray-800" />

            {/* Champ Nom */}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-white  block mb-2">Nom complet</label>
              <input 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Votre nom"
                className="w-full bg-[#0a0a0c] border border-gray-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
              />
            </div>

            {/* Champ Email (Lecture seule) */}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">Adresse Email</label>
              <input 
                type="email" 
                value={user?.email || ''} 
                disabled 
                className="w-full bg-[#0a0a0c]/50 border border-gray-800 rounded-xl px-4 py-3 text-gray-500 cursor-not-allowed outline-none"
              />
              <p className="text-[10px] text-gray-600 mt-2 italic">L'email ne peut pas être modifié pour le moment.</p>
            </div>

            {/* Message de confirmation */}
            {message && (
              <p className={`text-sm font-medium ${message.includes('Erreur') ? 'text-rose-500' : 'text-emerald-500'}`}>
                {message}
              </p>
            )}

            <button 
              disabled={loading}
              className="bg-white text-black font-bold py-3 px-8 rounded-xl hover:bg-gray-200 transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;