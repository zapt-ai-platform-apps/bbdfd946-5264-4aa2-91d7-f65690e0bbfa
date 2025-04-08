import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../modules/auth/providers/AuthProvider';
import LoadingScreen from '../../shared/components/LoadingScreen';
import { FiPlus, FiEdit, FiEye, FiTrash2, FiSearch } from 'react-icons/fi';
import * as Sentry from '@sentry/browser';

const WebsitesPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [websiteToDelete, setWebsiteToDelete] = useState(null);

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        // This would be replaced with an actual API call to get the user's websites
        const websitesData = []; // Placeholder for API call
        setWebsites(websitesData);
      } catch (error) {
        console.error('Error fetching websites:', error);
        Sentry.captureException(error, {
          extra: { context: 'fetchWebsites in WebsitesPage' },
        });
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWebsites();
  }, [user]);

  const confirmDelete = (website) => {
    setWebsiteToDelete(website);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!websiteToDelete) return;
    
    try {
      setLoading(true);
      // This would be replaced with an actual API call to delete the website
      // const response = await fetch(`/api/websites/${websiteToDelete.id}`, {
      //   method: 'DELETE',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${session.access_token}`
      //   }
      // });
      
      // if (!response.ok) throw new Error('Failed to delete website');
      
      // Remove the website from state
      setWebsites(websites.filter(w => w.id !== websiteToDelete.id));
      setShowDeleteModal(false);
      setWebsiteToDelete(null);
    } catch (error) {
      console.error('Error deleting website:', error);
      Sentry.captureException(error, {
        extra: { 
          context: 'handleDelete in WebsitesPage',
          websiteId: websiteToDelete.id 
        },
      });
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredWebsites = websites
    .filter(website => {
      if (filter === 'published') return website.published;
      if (filter === 'drafts') return !website.published;
      return true;
    })
    .filter(website => 
      website.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      website.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (loading && websites.length === 0) {
    return <LoadingScreen />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t('websites.title')}</h1>
        <Link to="/builder" className="btn btn-primary flex items-center">
          <FiPlus className="ml-2" />
          {t('websites.createNew')}
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
          {error}
        </div>
      )}

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
        <div className="flex space-x-4 space-x-reverse">
          <button 
            className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setFilter('all')}
          >
            {t('websites.all')}
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${filter === 'published' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setFilter('published')}
          >
            {t('websites.published')}
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${filter === 'drafts' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setFilter('drafts')}
          >
            {t('websites.drafts')}
          </button>
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="input pr-10 w-full md:w-64 box-border"
            placeholder={t('common.search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Websites List */}
      {filteredWebsites.length === 0 ? (
        <div className="card text-center py-8">
          <p className="text-gray-500 mb-4">{t('websites.noWebsites')}</p>
          <Link to="/builder" className="btn btn-primary">
            {t('websites.createNew')}
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-right font-medium text-gray-700">{t('websites.websiteName')}</th>
                <th className="px-6 py-3 text-right font-medium text-gray-700">{t('websites.status')}</th>
                <th className="px-6 py-3 text-right font-medium text-gray-700">{t('websites.lastModified')}</th>
                <th className="px-6 py-3 text-right font-medium text-gray-700">{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredWebsites.map((website) => (
                <tr key={website.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{website.name}</div>
                    <div className="text-sm text-gray-500">{website.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      website.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {website.published ? t('websites.published') : t('websites.drafts')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(website.updatedAt).toLocaleDateString('ar-SA')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-3 space-x-reverse">
                      <Link 
                        to={`/builder/${website.id}`}
                        className="text-blue-600 hover:text-blue-900"
                        title={t('common.edit')}
                      >
                        <FiEdit className="w-5 h-5" />
                      </Link>
                      <Link 
                        to={`/preview/${website.id}`}
                        className="text-green-600 hover:text-green-900"
                        title={t('common.preview')}
                      >
                        <FiEye className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => confirmDelete(website)}
                        className="text-red-600 hover:text-red-900"
                        title={t('common.delete')}
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">{t('websites.deleteConfirm')}</h2>
            <p className="mb-6 text-gray-600">
              هل أنت متأكد من رغبتك في حذف "{websiteToDelete?.name}"؟ لا يمكن التراجع عن هذا الإجراء.
            </p>
            <div className="flex justify-end space-x-4 space-x-reverse">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                {t('common.cancel')}
              </button>
              <button 
                className="btn btn-danger"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? t('common.loading') : t('common.delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebsitesPage;