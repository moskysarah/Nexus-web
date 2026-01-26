import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from './Badge';

interface Props {
  title: string;
  lang: 'html' | 'css' | 'js';
  description: string;
  link: string; 
}

const CourseCard: React.FC<Props> = ({ title, lang, description, link }) => {
  const config = {
    html: {
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
      text: "text-orange-500",
      bar: "bg-orange-500",
      glow: "group-hover:shadow-orange-500/10",
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
          <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
        </svg>
      )
    },
    css: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      text: "text-blue-500",
      bar: "bg-blue-500",
      glow: "group-hover:shadow-blue-500/10",
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
          <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm17.09 4.413l-.23 2.623H8.32l.233 2.715h8.289l-.23 2.622H8.783l.23 2.593 2.956.811 2.91-.805.327-3.416h2.622l-.744 8.13L12 19.35l-5.379-1.44-.33-4.17h2.622l.19 2.11 2.955.81 2.91-.804.326-3.42H6.11l-.698-8.01h13.178z"/>
        </svg>
      )
    },
    js: {
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      text: "text-yellow-400",
      bar: "bg-yellow-400",
      glow: "group-hover:shadow-yellow-400/10",
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
           <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.73-.345-1.492-.522-1.492-1.134 0-.245.205-.432.535-.432.423 0 .719.182.988.63l1.831-1.134c-.589-1.123-1.503-1.719-2.734-1.719-1.898 0-3.003 1.05-3.003 2.475 0 2.347 2.934 2.723 2.934 3.974 0 .365-.343.562-.805.562-.631 0-.975-.365-1.261-.974l-1.854 1.05c.421.929 1.157 1.635 2.894 1.635 2.219 0 3.191-1.101 3.191-2.477l-.026-.003zM10.587 12.827h-2.12v5.62c0 .93-.075 1.465-.494 1.862-.395.332-1.05.503-1.775.503-.859 0-1.49-.24-1.922-.72-.437-.536-.52-1.154-.52-2.046h2.012c.005.633.05 1.05.327 1.33.254.27.672.369 1.04.369.7 0 .852-.371.852-1.399v-5.519h2.621v.003h-.021z"/>
        </svg>
      )
    }
  };

  const style = config[lang];

  return (
    <div className={`group p-6 rounded-3xl bg-[#121214] border-2 ${style.border} transition-all duration-500 hover:-translate-y-2 ${style.glow}`}>
      
      {/* Icon Container */}
      <div className={`w-14 h-14 ${style.bg} ${style.text} rounded-2xl mb-6 flex items-center justify-center transition-transform group-hover:scale-110 duration-500`}>
        {style.icon}
      </div>

      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      
      <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">
        {description}
      </p>

      {/* Barre de Progression */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500">
          <span>Progression</span>
          <span className={style.text}>0%</span>
        </div>
        <div className="w-full bg-gray-800/50 h-1.5 rounded-full overflow-hidden">
          <div className={`${style.bar} h-full rounded-full transition-all duration-1000 w-0 group-hover:w-1/3`}></div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Badge level="Débutant">Débutant</Badge>
        <Link to={link}>
          <div className="relative flex items-center">
            {/* Effet Pulse derrière le texte */}
            <span className={`absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-40 animate-pulse ${style.bg}`}></span>
            
            <span className={`relative text-xs font-black tracking-widest cursor-pointer transition-all hover:translate-x-1 ${style.text}`}>
              DÉMARRER →
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;