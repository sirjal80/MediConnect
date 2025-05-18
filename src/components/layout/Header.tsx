import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Heart, Home, Search, Phone, MapPin, HelpCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
          <Heart className="h-8 w-8 text-blue-500" />
          <span className={`text-2xl font-bold ${isScrolled ? 'text-blue-700' : 'text-white'}`}>MediConnect</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <NavLink to="/" icon={<Home size={18} />} isScrolled={isScrolled} currentPath={location.pathname}>Home</NavLink>
          <NavLink to="/doctors" icon={<User size={18} />} isScrolled={isScrolled} currentPath={location.pathname}>Doctors</NavLink>
          <NavLink to="/hospitals" icon={<MapPin size={18} />} isScrolled={isScrolled} currentPath={location.pathname}>Hospitals</NavLink>
          <NavLink to="/emergency" icon={<Phone size={18} />} isScrolled={isScrolled} currentPath={location.pathname}>Emergency</NavLink>
          <NavLink to="/contact" icon={<HelpCircle size={18} />} isScrolled={isScrolled} currentPath={location.pathname}>Contact</NavLink>
        </nav>

        {/* User Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <img 
                  src={user.photo || 'https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=600'} 
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className={`font-medium ${isScrolled ? 'text-gray-800' : 'text-white'}`}>{user.name}</span>
              </div>
              <button 
                onClick={logout}
                className={`px-4 py-2 rounded-md ${isScrolled ? 'bg-blue-500 text-white' : 'bg-white text-blue-600'} hover:bg-opacity-90 transition`}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className={`px-4 py-2 rounded-md ${isScrolled ? 'bg-blue-500 text-white' : 'bg-white text-blue-600'} hover:bg-opacity-90 transition`}
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? (
            <X className={isScrolled ? 'text-gray-800' : 'text-white'} size={24} />
          ) : (
            <Menu className={isScrolled ? 'text-gray-800' : 'text-white'} size={24} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-fadeIn">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <MobileNavLink to="/" icon={<Home size={18} />} onClick={closeMenu}>Home</MobileNavLink>
              <MobileNavLink to="/doctors" icon={<User size={18} />} onClick={closeMenu}>Doctors</MobileNavLink>
              <MobileNavLink to="/hospitals" icon={<MapPin size={18} />} onClick={closeMenu}>Hospitals</MobileNavLink>
              <MobileNavLink to="/emergency" icon={<Phone size={18} />} onClick={closeMenu}>Emergency</MobileNavLink>
              <MobileNavLink to="/contact" icon={<HelpCircle size={18} />} onClick={closeMenu}>Contact</MobileNavLink>
              
              {user ? (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <img 
                      src={user.photo || 'https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=600'} 
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-medium text-gray-800">{user.name}</span>
                  </div>
                  <button 
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition w-full"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition text-center"
                  onClick={closeMenu}
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  isScrolled: boolean;
  currentPath: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, isScrolled, currentPath, children }) => {
  const isActive = currentPath === to;
  
  return (
    <Link 
      to={to} 
      className={`flex items-center space-x-1 hover:text-blue-500 transition-colors ${
        isActive 
          ? 'text-blue-500 font-medium' 
          : isScrolled 
            ? 'text-gray-800'
            : 'text-white'
      }`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
};

interface MobileNavLinkProps {
  to: string;
  icon: React.ReactNode;
  onClick: () => void;
  children: React.ReactNode;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, icon, onClick, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`flex items-center space-x-2 p-2 rounded-md ${
        isActive 
          ? 'bg-blue-50 text-blue-500 font-medium' 
          : 'text-gray-800 hover:bg-gray-100'
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
};

export default Header;