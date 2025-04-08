import React from 'react';
import { useTranslation } from 'react-i18next';
import { HexColorPicker } from 'react-colorful';
import { FiAlignLeft, FiAlignCenter, FiAlignRight, FiAlignJustify } from 'react-icons/fi';

const BuilderSettings = ({ component, onUpdate }) => {
  const { t } = useTranslation();
  const [showColorPicker, setShowColorPicker] = React.useState(false);
  const [colorProperty, setColorProperty] = React.useState(null);
  
  if (!component) return null;
  
  const handleContentChange = (key, value) => {
    const updatedComponent = {
      ...component,
      content: {
        ...component.content,
        [key]: value
      }
    };
    onUpdate(updatedComponent);
  };
  
  const handleStyleChange = (key, value) => {
    const updatedComponent = {
      ...component,
      styles: {
        ...component.styles,
        [key]: value
      }
    };
    onUpdate(updatedComponent);
  };
  
  const handleColorClick = (property) => {
    setColorProperty(property);
    setShowColorPicker(true);
  };
  
  const handleColorChange = (color) => {
    handleStyleChange(colorProperty, color);
  };
  
  // General settings for all components
  const renderGeneralSettings = () => (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3">{t('builder.generalSettings')}</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('builder.textAlignment')}
        </label>
        <div className="flex border rounded overflow-hidden">
          <button
            className={`flex-1 p-2 ${component.styles.textAlign === 'right' ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-600'}`}
            onClick={() => handleStyleChange('textAlign', 'right')}
          >
            <FiAlignRight className="mx-auto" />
          </button>
          <button
            className={`flex-1 p-2 ${component.styles.textAlign === 'center' ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-600'}`}
            onClick={() => handleStyleChange('textAlign', 'center')}
          >
            <FiAlignCenter className="mx-auto" />
          </button>
          <button
            className={`flex-1 p-2 ${component.styles.textAlign === 'left' ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-600'}`}
            onClick={() => handleStyleChange('textAlign', 'left')}
          >
            <FiAlignLeft className="mx-auto" />
          </button>
          <button
            className={`flex-1 p-2 ${component.styles.textAlign === 'justify' ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-600'}`}
            onClick={() => handleStyleChange('textAlign', 'justify')}
          >
            <FiAlignJustify className="mx-auto" />
          </button>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('builder.padding')}
        </label>
        <input
          type="text"
          className="input w-full"
          value={component.styles.padding || ''}
          onChange={(e) => handleStyleChange('padding', e.target.value)}
          placeholder="مثال: 10px 20px"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('builder.textColor')}
        </label>
        <div 
          className="w-full h-10 rounded border cursor-pointer flex items-center px-3"
          style={{ backgroundColor: component.styles.color || '#000000' }}
          onClick={() => handleColorClick('color')}
        >
          <span className="bg-white px-2 py-1 rounded text-xs">
            {component.styles.color || '#000000'}
          </span>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('builder.backgroundColor')}
        </label>
        <div 
          className="w-full h-10 rounded border cursor-pointer flex items-center px-3"
          style={{ backgroundColor: component.styles.backgroundColor || '#ffffff' }}
          onClick={() => handleColorClick('backgroundColor')}
        >
          <span className="bg-white px-2 py-1 rounded text-xs">
            {component.styles.backgroundColor || '#ffffff'}
          </span>
        </div>
      </div>
    </div>
  );
  
  // Component specific settings
  const renderComponentSettings = () => {
    switch (component.type) {
      case 'header':
        return (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                العنوان
              </label>
              <input
                type="text"
                className="input w-full"
                value={component.content.title}
                onChange={(e) => handleContentChange('title', e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                العنوان الفرعي
              </label>
              <input
                type="text"
                className="input w-full"
                value={component.content.subtitle}
                onChange={(e) => handleContentChange('subtitle', e.target.value)}
              />
            </div>
          </div>
        );
        
      case 'text':
        return (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                النص
              </label>
              <textarea
                className="input w-full"
                rows="5"
                value={component.content.text}
                onChange={(e) => handleContentChange('text', e.target.value)}
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                حجم الخط
              </label>
              <input
                type="text"
                className="input w-full"
                value={component.styles.fontSize}
                onChange={(e) => handleStyleChange('fontSize', e.target.value)}
                placeholder="مثال: 16px"
              />
            </div>
          </div>
        );
        
      case 'image':
        return (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                رابط الصورة
              </label>
              <input
                type="text"
                className="input w-full"
                value={component.content.src}
                onChange={(e) => handleContentChange('src', e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                النص البديل
              </label>
              <input
                type="text"
                className="input w-full"
                value={component.content.alt}
                onChange={(e) => handleContentChange('alt', e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                العرض
              </label>
              <input
                type="text"
                className="input w-full"
                value={component.styles.width}
                onChange={(e) => handleStyleChange('width', e.target.value)}
                placeholder="مثال: 100%"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                دائرية الحواف
              </label>
              <input
                type="text"
                className="input w-full"
                value={component.styles.borderRadius}
                onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
                placeholder="مثال: 4px"
              />
            </div>
          </div>
        );
        
      case 'button':
        return (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                النص
              </label>
              <input
                type="text"
                className="input w-full"
                value={component.content.text}
                onChange={(e) => handleContentChange('text', e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الرابط
              </label>
              <input
                type="text"
                className="input w-full"
                value={component.content.link}
                onChange={(e) => handleContentChange('link', e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                لون الخلفية
              </label>
              <div 
                className="w-full h-10 rounded border cursor-pointer flex items-center px-3"
                style={{ backgroundColor: component.styles.backgroundColor }}
                onClick={() => handleColorClick('backgroundColor')}
              >
                <span className="bg-white px-2 py-1 rounded text-xs">
                  {component.styles.backgroundColor}
                </span>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                لون النص
              </label>
              <div 
                className="w-full h-10 rounded border cursor-pointer flex items-center px-3"
                style={{ backgroundColor: component.styles.color }}
                onClick={() => handleColorClick('color')}
              >
                <span className="bg-white px-2 py-1 rounded text-xs">
                  {component.styles.color}
                </span>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الحشو الداخلي
              </label>
              <input
                type="text"
                className="input w-full"
                value={component.styles.padding}
                onChange={(e) => handleStyleChange('padding', e.target.value)}
                placeholder="مثال: 10px 20px"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                دائرية الحواف
              </label>
              <input
                type="text"
                className="input w-full"
                value={component.styles.borderRadius}
                onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
                placeholder="مثال: 4px"
              />
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">
        {t(`builder.${component.type}`)} {t('builder.settings')}
      </h3>
      
      <div className="space-y-6">
        {renderComponentSettings()}
        {renderGeneralSettings()}
      </div>
      
      {showColorPicker && (
        <div className="mt-4 p-3 bg-white rounded shadow-lg">
          <HexColorPicker 
            color={component.styles[colorProperty] || "#000000"} 
            onChange={handleColorChange}
          />
          <div className="flex justify-end mt-2">
            <button 
              className="btn btn-sm btn-primary"
              onClick={() => setShowColorPicker(false)}
            >
              {t('common.done')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuilderSettings;