import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </p>
          </div>
          <div className="flex space-x-6">
            <a 
              href="/terms" 
              className="text-gray-600 hover:text-primary-600 text-sm transition-colors"
            >
              {t('footer.terms')}
            </a>
            <a 
              href="/privacy" 
              className="text-gray-600 hover:text-primary-600 text-sm transition-colors"
            >
              {t('footer.privacy')}
            </a>
            <a 
              href="/contact" 
              className="text-gray-600 hover:text-primary-600 text-sm transition-colors"
            >
              {t('footer.contact')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;