import React from 'react';
import type { Course } from '../../@types/course';

interface SidebarProps {
  courses: Course[];
  selectedCourseId: string;
  onCourseSelect: (courseId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ courses, selectedCourseId, onCourseSelect }) => {
  const getIcon = (language: string) => {
    switch (language.toLowerCase()) {
      case 'html':
        return '🟠'; // HTML icon
      case 'css':
        return '🔵'; // CSS icon
      case 'js':
        return '🟡'; // JS icon
      default:
        return '📚';
    }
  };

  const getColorClass = (language: string) => {
    switch (language.toLowerCase()) {
      case 'html':
        return 'bg-html';
      case 'css':
        return 'bg-css';
      case 'js':
        return 'bg-js';
      default:
        return 'bg-slate-600';
    }
  };

  return (
    <aside className="w-64 h-full bg-slate-900 border-r border-slate-800 p-4 hidden md:block">
      <h2 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">
        Formations
      </h2>
      <div className="space-y-2">
        {courses.map((course) => (
          <button
            key={course.id}
            onClick={() => onCourseSelect(course.id)}
            className={`w-full text-left px-3 py-3 rounded-lg text-sm transition flex items-center gap-3 ${
              selectedCourseId === course.id
              ? 'bg-nexus-primary/20 text-nexus-primary border border-nexus-primary/30'
              : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <div className={`w-8 h-8 ${getColorClass(course.language)} rounded-lg flex items-center justify-center text-white font-bold text-xs`}>
              {getIcon(course.language)}
            </div>
            <div className="flex-1">
              <div className="font-medium">{course.title}</div>
              <div className="text-xs opacity-75">{course.language}</div>
            </div>
          </button>
        ))}
      </div>

      <button className="mt-10 w-full p-3 border border-dashed border-slate-700 rounded-lg text-slate-500 text-xs hover:border-nexus-secondary transition">
        + Nouvelle formation
      </button>
    </aside>
  );
};

export default Sidebar;