import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/modules/auth/providers/AuthProvider';

const HomePage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary-800">
          {t('home.title')}
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          {t('home.subtitle')}
        </p>
        {user ? (
          <Link 
            to="/dashboard" 
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            {t('home.dashboardButton')}
          </Link>
        ) : (
          <Link 
            to="/login" 
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            {t('home.getStartedButton')}
          </Link>
        )}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="text-primary-600 text-3xl mb-4">✨</div>
          <h3 className="text-xl font-semibold mb-3">{t('home.features.easy.title')}</h3>
          <p className="text-gray-600">{t('home.features.easy.description')}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="text-primary-600 text-3xl mb-4">🚀</div>
          <h3 className="text-xl font-semibold mb-3">{t('home.features.fast.title')}</h3>
          <p className="text-gray-600">{t('home.features.fast.description')}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="text-primary-600 text-3xl mb-4">🌐</div>
          <h3 className="text-xl font-semibold mb-3">{t('home.features.arabic.title')}</h3>
          <p className="text-gray-600">{t('home.features.arabic.description')}</p>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-md p-8 max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">{t('home.howItWorks.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 text-xl font-bold mb-4">1</div>
            <h3 className="font-medium mb-2">{t('home.howItWorks.step1.title')}</h3>
            <p className="text-gray-600 text-sm">{t('home.howItWorks.step1.description')}</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 text-xl font-bold mb-4">2</div>
            <h3 className="font-medium mb-2">{t('home.howItWorks.step2.title')}</h3>
            <p className="text-gray-600 text-sm">{t('home.howItWorks.step2.description')}</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 text-xl font-bold mb-4">3</div>
            <h3 className="font-medium mb-2">{t('home.howItWorks.step3.title')}</h3>
            <p className="text-gray-600 text-sm">{t('home.howItWorks.step3.description')}</p>
          </div>
        </div>
      </section>

      <section className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">{t('home.cta.title')}</h2>
        <p className="text-gray-700 mb-8">{t('home.cta.description')}</p>
        {user ? (
          <Link 
            to="/websites" 
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            {t('home.cta.userButton')}
          </Link>
        ) : (
          <Link 
            to="/login" 
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            {t('home.cta.guestButton')}
          </Link>
        )}
      </section>
    </div>
  );
};

export default HomePage;