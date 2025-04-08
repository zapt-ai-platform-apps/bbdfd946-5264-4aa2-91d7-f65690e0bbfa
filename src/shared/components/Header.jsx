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
            <img src="https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjQ4Nzh8MHwxfHNlYXJjaHw3fHxhcmFiaWMlMjB3ZWJzaXRlJTIwYnVpbGRlciUyMGludGVyZmFjZSUyMHdpdGglMjBtdWx0aXBsZSUyMGNvbXBvbmVudHMlMjBhbmQlMjB0b29scyUyQyUyMHByb2Zlc3Npb25hbCUyMFVJfGVufDB8fHx8MTc0NDA3ODk3Mnww&ixlib=rb-4.0.3&q=80&w=1080" 
              src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=32&height=32" 
              alt="Logo" 
              className="w-8 h-8 ml-2"
            />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t('home.features')}</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="card text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                  <FiEdit className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{t('home.feature1Title')}</h3>
              <p className="text-gray-600">{t('home.feature1Desc')}</p>
            </div>

            {/* Feature 2 */}
            <div className="card text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                  <FiLayout className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{t('home.feature2Title')}</h3>
              <p className="text-gray-600">{t('home.feature2Desc')}</p>
            </div>

            {/* Feature 3 */}
            <div className="card text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                  <FiEdit className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{t('home.feature3Title')}</h3>
              <p className="text-gray-600">{t('home.feature3Desc')}</p>
            </div>

            {/* Feature 4 */}
            <div className="card text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                  <FiSmartphone className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{t('home.feature4Title')}</h3>
              <p className="text-gray-600">{t('home.feature4Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">ابدأ في إنشاء موقعك الاحترافي اليوم</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            انضم إلى آلاف المستخدمين الذين يستخدمون منشئ المواقع الذكي لإنشاء مواقع احترافية بسرعة وسهولة.
          </p>
          {user ? (
            <Link to="/dashboard" className="btn btn-primary py-3 px-8 rounded-lg shadow-lg text-lg font-medium">
              {t('common.dashboard')}
            </Link>
          ) : (
            <Link to="/login" className="btn btn-primary py-3 px-8 rounded-lg shadow-lg text-lg font-medium">
              إنشاء حساب مجاني
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;