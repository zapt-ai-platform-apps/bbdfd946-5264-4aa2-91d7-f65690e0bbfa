import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiHome } from 'react-icons/fi';

const NotFoundPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4 mb-6">
          {t('errors.notFound')}
        </h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          {t('errors.notFoundMessage')}
        </p>
        <Link 
          to="/" 
          className="btn btn-primary inline-flex items-center px-6 py-3"
        >
          <FiHome className="ml-2" />
          {t('errors.returnHome')}
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;