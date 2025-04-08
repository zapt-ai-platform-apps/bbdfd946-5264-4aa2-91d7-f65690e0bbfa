import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../modules/auth/providers/AuthProvider';
import { FiMenu, FiX, FiUser, FiLogOut, FiHome, FiGrid, FiSettings } from 'react-icons/fi';

const Header = () => {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img 
              src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=32&height=32" 
              alt="Logo" 
              className="w-8 h-8 ml-2"
            />
            <span className="text-xl font-bold text-gray-900">منشئ المواقع</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700 hover:text-gray-900">
            {menuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
            {t('common.home')}
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">
                {t('common.dashboard')}
              </Link>
              <Link to="/websites" className="text-gray-700 hover:text-blue-600 transition-colors">
                {t('common.websites')}
              </Link>
              <button 
                onClick={handleSignOut}
                className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer flex items-center"
              >
                <FiLogOut className="ml-1" />
                {t('auth.signOut')}
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary">
              {t('common.login')}
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 border-t border-gray-200">
          <nav className="flex flex-col space-y-3">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors py-2 flex items-center">
              <FiHome className="ml-2" />
              {t('common.home')}
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors py-2 flex items-center">
                  <FiGrid className="ml-2" />
                  {t('common.dashboard')}
                </Link>
                <Link to="/websites" className="text-gray-700 hover:text-blue-600 transition-colors py-2 flex items-center">
                  <FiSettings className="ml-2" />
                  {t('common.websites')}
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="text-gray-700 hover:text-blue-600 transition-colors py-2 flex items-center cursor-pointer w-full text-right"
                >
                  <FiLogOut className="ml-2" />
                  {t('auth.signOut')}
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-primary py-2 text-center">
                {t('common.login')}
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;