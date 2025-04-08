import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../modules/auth/providers/AuthProvider';
import LoadingScreen from '../../shared/components/LoadingScreen';
import { FiPlus, FiEdit, FiGrid, FiUser, FiBarChart2 } from 'react-icons/fi';
import * as Sentry from '@sentry/browser';

const DashboardPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        // This would be replaced with an actual API call to get the user's websites
        const websitesData = []; // Placeholder for API call
        setWebsites(websitesData);
      } catch (error) {
        console.error('Error fetching websites:', error);
        Sentry.captureException(error, {
          extra: { context: 'fetchWebsites in DashboardPage' },
        });
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWebsites();
  }, [user]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('dashboard.welcomeBack')}</h1>
        <p className="text-gray-600">{user.email}</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card flex items-center">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full ml-4">
            <FiGrid className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">{t('dashboard.totalWebsites')}</h3>
            <p className="text-2xl font-bold">{websites.length || 0}</p>
          </div>
        </div>
        
        <div className="card flex items-center">
          <div className="p-3 bg-green-100 text-green-600 rounded-full ml-4">
            <FiBarChart2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">{t('dashboard.publishedWebsites')}</h3>
            <p className="text-2xl font-bold">{websites.filter(w => w.published).length || 0}</p>
          </div>
        </div>
        
        <div className="card flex items-center">
          <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full ml-4">
            <FiEdit className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">{t('dashboard.draftWebsites')}</h3>
            <p className="text-2xl font-bold">{websites.filter(w => !w.published).length || 0}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">{t('dashboard.quickActions')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/builder" className="card flex items-center hover:shadow-md transition-shadow duration-200">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-full ml-4">
              <FiPlus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-medium">{t('dashboard.createNewWebsite')}</h3>
              <p className="text-sm text-gray-500">إنشاء موقع جديد من البداية أو من قالب</p>
            </div>
          </Link>
          
          <Link to="/websites" className="card flex items-center hover:shadow-md transition-shadow duration-200">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full ml-4">
              <FiGrid className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-medium">{t('dashboard.viewAllWebsites')}</h3>
              <p className="text-sm text-gray-500">عرض وإدارة جميع مواقعك</p>
            </div>
          </Link>
          
          <div className="card flex items-center hover:shadow-md transition-shadow duration-200 cursor-pointer">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-full ml-4">
              <FiUser className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-medium">{t('dashboard.editProfile')}</h3>
              <p className="text-sm text-gray-500">تعديل معلومات الحساب الشخصي</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Websites */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{t('websites.title')}</h2>
          <Link to="/websites" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
            عرض الكل
          </Link>
        </div>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
            {error}
          </div>
        )}
        
        {websites.length === 0 ? (
          <div className="card text-center py-8">
            <p className="text-gray-500 mb-4">{t('websites.noWebsites')}</p>
            <Link to="/builder" className="btn btn-primary">
              {t('websites.createNew')}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {websites.slice(0, 3).map((website) => (
              <div key={website.id} className="card">
                <h3 className="font-bold text-lg mb-2">{website.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{website.description}</p>
                <div className="flex justify-between mt-4">
                  <Link to={`/builder/${website.id}`} className="btn btn-primary text-sm">
                    {t('common.edit')}
                  </Link>
                  <Link to={`/preview/${website.id}`} className="btn btn-secondary text-sm">
                    {t('common.preview')}
                  </Link>
                </div>
              </div>
            ))}
            
            {/* Create New Website Card */}
            <Link to="/builder" className="card border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-center p-6 hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200">
              <FiPlus className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="font-bold text-lg text-blue-500">{t('websites.createNew')}</h3>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;