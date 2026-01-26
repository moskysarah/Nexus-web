import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Profile {
  full_name: string;
  xp: number;
  level: number;
}

const Leaderboard = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, xp, level')
        .order('xp', { ascending: false }) // On trie par XP le plus haut
        .limit(10); // On affiche le Top 10

      if (!error) setProfiles(data);
      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div className="text-white pt-32 text-center">Chargement du classement...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0c] pt-32 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-black text-white mb-2 text-center">Classement Global</h1>
        <p className="text-gray-500 text-center mb-12 uppercase tracking-widest text-xs font-bold">
          Les meilleurs développeurs de Nexus
        </p>

        <div className="space-y-3">
          {profiles.map((profile, index) => (
            <div 
              key={index}
              className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${
                index === 0 
                ? 'bg-indigo-500/10 border-indigo-500/50 shadow-lg shadow-indigo-500/5' 
                : 'bg-[#121214] border-gray-800'
              }`}
            >
              <div className="flex items-center gap-5">
                {/* Position */}
                <span className={`w-8 text-xl font-black ${
                  index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-400' : index === 2 ? 'text-orange-400' : 'text-gray-600'
                }`}>
                  #{index + 1}
                </span>

                {/* Avatar & Nom */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center font-bold text-indigo-400">
                    {profile.full_name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white font-bold">{profile.full_name}</p>
                    <p className="text-gray-500 text-xs">Niveau {profile.level}</p>
                  </div>
                </div>
              </div>

              {/* XP Score */}
              <div className="text-right">
                <span className="text-white font-black">{profile.xp}</span>
                <span className="text-indigo-500 text-xs font-bold ml-1">XP</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;