import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser"; // Vérifie que le chemin est correct
import { LayoutDashboard, Trophy, BookOpen, LogOut, Menu, X} from "lucide-react";

const Navbar = () => {
  const { user, logout } = useUser(); // On récupère logout depuis notre hook custom
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Effet de flou au scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout(); // Utilise la fonction de useUser qui supprime les tokens
    navigate("/login");
  };

  const navLinks = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Cours", path: "/courses", icon: BookOpen },
    { name: "Classement", path: "/leaderboard", icon: Trophy },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
      isScrolled ? "py-4 bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-white/5" : "py-6 bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/dashboard" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform shadow-lg shadow-indigo-500/20">
            <span className="text-white font-black text-xl italic">N</span>
          </div>
          <span className="text-white font-black italic text-xl tracking-tighter uppercase">Nexus<span className="text-indigo-500">Web</span></span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors ${
                location.pathname === link.path ? "text-white" : "text-gray-500 hover:text-white"
              }`}
            >
              <link.icon size={16} className={location.pathname === link.path ? "text-indigo-500" : ""} />
              {link.name}
            </Link>
          ))}
          
          <div className="h-6 w-[1px] bg-gray-800 mx-2"></div>

          {/* USER ACTIONS */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10">
              <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-bold text-white">
                {user?.full_name?.charAt(0) || "U"}
              </div>
              <span className="text-sm font-medium text-gray-300">{user?.full_name || "Explorer"}</span>
            </div>
            
            <button 
              onClick={handleLogout}
              className="p-2 text-gray-500 hover:text-red-500 transition-colors"
              title="Déconnexion"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU (Overlay) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[72px] bg-[#0a0a0c] z-[90] p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
           {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-4 text-2xl font-black italic uppercase text-white"
            >
              <link.icon size={24} className="text-indigo-500" />
              {link.name}
            </Link>
          ))}
          <button 
            onClick={handleLogout}
            className="mt-auto flex items-center gap-4 text-2xl font-black italic uppercase text-red-500 border-t border-white/5 pt-6"
          >
            <LogOut size={24} />
            Déconnexion
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;