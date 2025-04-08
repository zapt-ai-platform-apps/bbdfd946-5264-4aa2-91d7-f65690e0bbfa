import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FiType, FiImage, FiLink, FiGrid, FiLayout, 
  FiNavigation2, FiBox, FiAlignRight, FiMapPin, 
  FiMessageSquare, FiShare2
} from 'react-icons/fi';

const BuilderComponentsList = ({ onAddComponent }) => {
  const { t } = useTranslation();
  
  const componentTypes = [
    { type: 'header', icon: <FiAlignRight /> },
    { type: 'text', icon: <FiType /> },
    { type: 'image', icon: <FiImage /> },
    { type: 'button', icon: <FiLink /> },
    { type: 'section', icon: <FiGrid /> },
    { type: 'container', icon: <FiBox /> },
    { type: 'footer', icon: <FiLayout /> },
    { type: 'navigation', icon: <FiNavigation2 /> },
    { type: 'form', icon: <FiMessageSquare /> },
    { type: 'map', icon: <FiMapPin /> },
    { type: 'socialLinks', icon: <FiShare2 /> }
  ];
  
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">{t('builder.components')}</h3>
      <div className="component-panel">
        {componentTypes.map((component) => (
          <div
            key={component.type}
            className="component-item"
            onClick={() => onAddComponent(component.type)}
          >
            <div className="flex flex-col items-center">
              <div className="text-blue-600 mb-2">{component.icon}</div>
              <span className="text-sm">{t(`builder.${component.type}`)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuilderComponentsList;