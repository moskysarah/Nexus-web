
// import React from 'react';
import { Link } from 'react-router-dom';

// Simulation de données (En attendant de les lier à Supabase)
const ALL_COURSES = [
  { id: '1', title: 'Fondamentaux HTML5', level: 'Débutant', duration: '45 min', xp: 100, category: 'HTML', color: 'from-orange-500 to-red-500' },
  { id: '2', title: 'Maîtriser Flexbox', level: 'Intermédiaire', duration: '1h 20', xp: 150, category: 'CSS', color: 'from-blue-500 to-indigo-500' },
  { id: '3', title: 'Modern JavaScript ES6', level: 'Avancé', duration: '2h 15', xp: 300, category: 'JS', color: 'from-yellow-400 to-orange-500' },
  { id: '4', title: 'Animations CSS', level: 'Débutant', duration: '30 min', xp: 80, category: 'CSS', color: 'from-pink-500 to-rose-500' },
];

const Courses = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0c] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header de la page */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-white mb-4">Catalogue des Cours</h1>
          <p className="text-gray-400 max-w-2xl">
            Explorez nos modules de formation et montez en compétence. Chaque leçon terminée vous rapporte de l'XP pour grimper dans le classement.
          </p>
        </div>

        {/* Grille de cours */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ALL_COURSES.map((course) => (
            <Link 
              key={course.id} 
              to={`/lesson/${course.id}`}
              className="group relative bg-[#121214] border border-gray-800 rounded-3xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Overlay dégradé au survol */}
              <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${course.color}`}></div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3 py-1 rounded-full bg-white/5 text-gray-400 text-[10px] font-bold uppercase tracking-widest border border-white/10">
                    {course.category}
                  </span>
                  <span className="text-indigo-400 font-black text-sm">+{course.xp} XP</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                  {course.title}
                </h3>
                
                <div className="flex items-center gap-4 text-gray-500 text-sm mt-6">
                  <div className="flex items-center gap-1">
                    <span>⏱ {course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>📊 {course.level}</span>
                  </div>
                </div>

                <div className="mt-8 flex items-center text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Commencer la leçon <span className="ml-2">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;