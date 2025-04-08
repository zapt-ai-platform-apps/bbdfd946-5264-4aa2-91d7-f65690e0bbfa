import React from 'react';
import { useTranslation } from 'react-i18next';

const BuilderPreview = ({ components, selectedIndex, onSelectComponent }) => {
  const { t } = useTranslation();
  
  const renderComponent = (component, index) => {
    const isSelected = selectedIndex === index;
    const baseStyles = {
      ...component.styles,
      cursor: 'pointer',
      position: 'relative'
    };
    
    const selectedStyles = isSelected
      ? { outline: '2px dashed #3B82F6', outlineOffset: '2px' }
      : {};
    
    const componentStyles = {
      ...baseStyles,
      ...selectedStyles
    };
    
    switch (component.type) {
      case 'header':
        return (
          <header 
            style={componentStyles}
            onClick={() => onSelectComponent(index)}
            className="p-8"
          >
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
          <div 
            style={componentStyles}
            onClick={() => onSelectComponent(index)}
            className="p-4"
          >
            <p>{component.content.text}</p>
          </div>
        );
        
      case 'image':
        return (
          <div 
            style={componentStyles}
            onClick={() => onSelectComponent(index)}
            className="p-4"
          >
            <img 
              src={component.content.src} 
              alt={component.content.alt} 
              style={{ maxWidth: '100%' }}
            />
          </div>
        );
        
      case 'button':
        return (
          <div 
            style={componentStyles}
            onClick={() => onSelectComponent(index)}
            className="p-4"
          >
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
          <section 
            style={componentStyles}
            onClick={() => onSelectComponent(index)}
            className="p-8 bg-gray-100"
          >
            <div className="text-center">
              <p className="text-gray-400">{t('builder.section')}</p>
            </div>
          </section>
        );
        
      case 'container':
        return (
          <div 
            style={componentStyles}
            onClick={() => onSelectComponent(index)}
            className="p-6 border border-dashed border-gray-300 rounded"
          >
            <div className="text-center">
              <p className="text-gray-400">{t('builder.container')}</p>
            </div>
          </div>
        );
        
      case 'footer':
        return (
          <footer 
            style={componentStyles}
            onClick={() => onSelectComponent(index)}
            className="p-8 bg-gray-800 text-white"
          >
            <div className="text-center">
              <p>{t('builder.footer')}</p>
            </div>
          </footer>
        );
        
      case 'navigation':
        return (
          <nav 
            style={componentStyles}
            onClick={() => onSelectComponent(index)}
            className="p-4 bg-white border-b border-gray-200"
          >
            <div className="flex justify-between items-center">
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
          <div 
            style={componentStyles}
            onClick={() => onSelectComponent(index)}
            className="p-6 border border-gray-200 rounded"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">الاسم</label>
                <input type="text" className="input w-full" disabled />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">البريد الإلكتروني</label>
                <input type="email" className="input w-full" disabled />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">الرسالة</label>
                <textarea className="input w-full" rows="4" disabled></textarea>
              </div>
              <div>
                <button className="btn btn-primary">إرسال</button>
              </div>
            </div>
          </div>
        );
        
      case 'map':
        return (
          <div 
            style={componentStyles}
            onClick={() => onSelectComponent(index)}
            className="p-4"
          >
            <div className="bg-gray-200 h-64 flex items-center justify-center rounded">
              <p className="text-gray-500">{t('builder.map')}</p>
            </div>
          </div>
        );
        
      case 'socialLinks':
        return (
          <div 
            style={componentStyles}
            onClick={() => onSelectComponent(index)}
            className="p-4"
          >
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
          <div 
            style={componentStyles}
            onClick={() => onSelectComponent(index)}
            className="p-4 bg-gray-100 text-center"
          >
            <p className="text-gray-500">
              نوع غير معروف: {component.type}
            </p>
          </div>
        );
    }
  };
  
  return (
    <div className="preview-container">
      {components.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">{t('builder.dragDrop')}</p>
          <p className="text-gray-400 text-sm">اختر عنصرًا من القائمة اليمنى لإضافته إلى موقعك</p>
        </div>
      ) : (
        components.map((component, index) => (
          <div key={component.id} className="mb-4">
            {renderComponent(component, index)}
          </div>
        ))
      )}
    </div>
  );
};

export default BuilderPreview;