import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-4xl">
          <h1 className="text-6xl font-black text-white mb-6">
            Bienvenue sur <span className="text-nexus-primary">Nexus Web</span>
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Apprenez le développement web moderne avec des cours interactifs et des projets pratiques.
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="px-8 py-4 bg-nexus-primary text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-nexus-primary/30 transition-all"
          >
            Commencer maintenant
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
