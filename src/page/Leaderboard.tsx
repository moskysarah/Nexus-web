import { useEffect, useState } from "react";
import axios from "axios"; // On remplace Supabase par Axios
import { Trophy, User } from "lucide-react";

interface LeaderboardUser {
  full_name: string;
  level: number;
  xp: number;
}

const Leaderboard = () => {
  const [leaders, setLeaders] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Appelle ton nouvel endpoint Django que nous avons créé au début
        const response = await axios.get("http://127.0.0.1:8000/api/auth/leaderboard/");
        setLeaders(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du classement:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div className="text-white text-center pt-20">Chargement du Panthéon...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white pt-32 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-black italic uppercase tracking-tighter flex justify-center items-center gap-4">
            <Trophy className="text-yellow-500" size={48} />
            Leaderboard
          </h1>
          <p className="text-gray-500 mt-4">Les meilleurs explorateurs du Nexus Web</p>
        </header>

        <div className="bg-[#121214] border border-gray-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-900/50 border-b border-gray-800">
                <th className="px-8 py-6 text-xs uppercase tracking-widest text-gray-400">Rang</th>
                <th className="px-8 py-6 text-xs uppercase tracking-widest text-gray-400">Explorateur</th>
                <th className="px-8 py-6 text-xs uppercase tracking-widest text-gray-400">Niveau</th>
                <th className="px-8 py-6 text-xs uppercase tracking-widest text-gray-400 text-right">XP Total</th>
              </tr>
            </thead>
            <tbody>
              {leaders.map((player, index) => (
                <tr 
                  key={index} 
                  className={`border-b border-gray-800/50 hover:bg-white/5 transition-colors ${index === 0 ? 'bg-yellow-500/5' : ''}`}
                >
                  <td className="px-8 py-6 font-black italic text-2xl">
                    {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
                  </td>
                  <td className="px-8 py-6 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30">
                      <User size={20} />
                    </div>
                    <span className="font-bold text-lg">{player.full_name}</span>
                  </td>
                  <td className="px-8 py-6 font-mono text-emerald-400 font-bold">Lvl {player.level}</td>
                  <td className="px-8 py-6 text-right font-black text-indigo-400">{player.xp} XP</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;