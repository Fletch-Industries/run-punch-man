
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Journal", path: "/journal" },
    { name: "R.E.D.", path: "/red" },
    { name: "Media", path: "/media" },
    { name: "Scripture", path: "/scripture" },
    { name: "Merch", path: "/merch" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-navy-900 shadow-xl relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-lg flex items-center justify-center overflow-hidden">
              <img 
                src="/lovable-uploads/43644e4e-066f-44fb-8fb5-3a892299ca49.png" 
                alt="RunPunchMan Icon" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-white font-bold text-lg sm:text-xl tracking-wide">RunPunchMan</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-2 lg:px-3 py-2 text-sm font-semibold transition-all duration-200 relative ${
                  isActive(item.path)
                    ? "text-yellow-400"
                    : "text-white hover:text-yellow-400"
                } hover:transform hover:scale-105`}
              >
                {item.name}
                {isActive(item.path) && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 animate-pulse"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-yellow-400 transition-colors p-2"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-navy-900 border-t border-navy-700 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-3 text-base font-medium transition-colors ${
                    isActive(item.path)
                      ? "text-yellow-400 bg-navy-800"
                      : "text-white hover:text-yellow-400 hover:bg-navy-800"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
