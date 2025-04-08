import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LoadingScreen from '../../shared/components/LoadingScreen';
import { FiArrowRight, FiSmartphone, FiTablet, FiMonitor, FiUpload } from 'react-icons/fi';
import * as Sentry from '@sentry/browser';

const PreviewPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [website, setWebsite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('desktop');
  
  useEffect(() => {
    const fetchWebsite = async () => {
      try {
        // This would be replaced with an actual API call
        // const response = await fetch(`/api/websites/${id}`);
        // if (!response.ok) throw new Error('Failed to fetch website');
        // const data = await response.json();
        
        // Placeholder data for testing
        const data = {
          id,
          name: 'موقع تجريبي',
          components: []
        };
        
        setWebsite(data);
      } catch (error) {
        console.error('Error fetching website:', error);
        Sentry.captureException(error, {
          extra: { 
            context: 'fetchWebsite in PreviewPage',
            websiteId: id 
          },
        });
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWebsite();
  }, [id]);
  
  const renderComponent = (component) => {
    switch (component.type) {
      case 'header':
        return (
          <header style={component.styles}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              {component.content.title}
            </h1>
            <p style={{ fontSize: '1.25rem' }}>
              {component.content.subtitle}
            </p>
          </header>
        );
        
      case 'text':
        return (
          <div style={component.styles}>
            <p>{component.content.text}</p>
          </div>
        );
        
      case 'image':
        return (
          <div style={component.styles}>
            <img 
              src={component.content.src} 
              alt={component.content.alt} 
              style={{ maxWidth: '100%' }}
            />
          </div>
        );
        
      case 'button':
        return (
          <div style={component.styles}>
            <button 
              style={{ 
                backgroundColor: component.styles.backgroundColor,
                color: component.styles.color,
                padding: component.styles.padding,
                borderRadius: component.styles.borderRadius,
                border: 'none',
                cursor: 'pointer',
                display: 'inline-block'
              }}
            >
              {component.content.text}
            </button>
          </div>
        );
        
      case 'section':
        return (
          <section style={component.styles}>
            <div className="text-center py-8">
              <p className="text-gray-400">{t('builder.section')}</p>
            </div>
          </section>
        );
        
      case 'container':
        return (
          <div style={component.styles}>
            <div className="text-center py-6">
              <p className="text-gray-400">{t('builder.container')}</p>
            </div>
          </div>
        );
        
      case 'footer':
        return (
          <footer style={component.styles}>
            <div className="text-center py-8">
              <p>{t('builder.footer')}</p>
            </div>
          </footer>
        );
        
      case 'navigation':
        return (
          <nav style={component.styles}>
            <div className="flex justify-between items-center py-4">
              <div className="font-bold">اسم الموقع</div>
              <div className="flex space-x-4 space-x-reverse">
                <span className="cursor-default">الرئيسية</span>
                <span className="cursor-default">عن الموقع</span>
                <span className="cursor-default">الخدمات</span>
                <span className="cursor-default">اتصل بنا</span>
              </div>
            </div>
          </nav>
        );
        
      case 'form':
        return (
          <div style={component.styles}>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">الاسم</label>
                <input type="text" className="input w-full" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">البريد الإلكتروني</label>
                <input type="email" className="input w-full" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">الرسالة</label>
                <textarea className="input w-full" rows="4"></textarea>
              </div>
              <div>
                <button className="btn btn-primary">إرسال</button>
              </div>
            </div>
          </div>
        );
        
      case 'map':
        return (
          <div style={component.styles}>
            <div className="bg-gray-200 h-64 flex items-center justify-center rounded">
              <p className="text-gray-500">{t('builder.map')}</p>
            </div>
          </div>
        );
        
      case 'socialLinks':
        return (
          <div style={component.styles}>
            <div className="flex justify-center space-x-4 space-x-reverse">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">f</div>
              <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white">t</div>
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white">y</div>
              <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center text-white">i</div>
            </div>
          </div>
        );
        
      default:
        return (
          <div style={component.styles}>
            <p className="text-gray-500 text-center">
              نوع غير معروف: {component.type}
            </p>
          </div>
        );
    }
  };
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
          {error}
        </div>
        <button
          className="btn btn-primary flex items-center"
          onClick={() => navigate(-1)}
        >
          <FiArrowRight className="ml-2" />
          {t('common.back')}
        </button>
      </div>
    );
  }
  
  let containerClasses = "mx-auto bg-white shadow-lg border";
  if (viewMode === 'mobile') {
    containerClasses += " w-[375px]";
  } else if (viewMode === 'tablet') {
    containerClasses += " w-[768px]";
  } else {
    containerClasses += " w-full max-w-6xl";
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Preview Header */}
      <div className="bg-white border-b border-gray-200 py-4 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button
                className="btn btn-secondary flex items-center ml-4"
                onClick={() => navigate(`/builder/${id}`)}
              >
                <FiArrowRight className="ml-2" />
                {t('preview.backToEditor')}
              </button>
              
              <h1 className="text-xl font-bold">{website.name}</h1>
            </div>
            
            <div className="flex space-x-4 space-x-reverse">
              <div className="flex border rounded overflow-hidden">
                <button
                  className={`p-2 ${viewMode === 'mobile' ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-600'}`}
                  onClick={() => setViewMode('mobile')}
                  title={t('preview.viewOnMobile')}
                >
                  <FiSmartphone className="w-5 h-5" />
                </button>
                <button
                  className={`p-2 ${viewMode === 'tablet' ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-600'}`}
                  onClick={() => setViewMode('tablet')}
                  title={t('preview.viewOnTablet')}
                >
                  <FiTablet className="w-5 h-5" />
                </button>
                <button
                  className={`p-2 ${viewMode === 'desktop' ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-600'}`}
                  onClick={() => setViewMode('desktop')}
                  title={t('preview.viewOnDesktop')}
                >
                  <FiMonitor className="w-5 h-5" />
                </button>
              </div>
              
              <button className="btn btn-primary flex items-center">
                <FiUpload className="ml-2" />
                {t('preview.publishWebsite')}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Preview Content */}
      <div className="container mx-auto px-4 py-8">
        <div className={containerClasses}>
          {website.components && website.components.length > 0 ? (
            website.components.map((component) => (
              <div key={component.id} className="w-full">
                {renderComponent(component)}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">لا توجد عناصر لعرضها</p>
              <p className="text-gray-400 text-sm">
                عد إلى المحرر لإضافة بعض العناصر إلى موقعك
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;