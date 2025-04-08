import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useAuth } from '../../modules/auth/providers/AuthProvider';
import LoadingScreen from '../../shared/components/LoadingScreen';
import BuilderComponentsList from '../../modules/websiteBuilder/components/BuilderComponentsList';
import BuilderPreview from '../../modules/websiteBuilder/components/BuilderPreview';
import BuilderSettings from '../../modules/websiteBuilder/components/BuilderSettings';
import { FiSave, FiEye, FiX, FiLayers, FiSettings, FiList } from 'react-icons/fi';
import * as Sentry from '@sentry/browser';

const BuilderPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [websiteName, setWebsiteName] = useState('موقع جديد');
  const [components, setComponents] = useState([]);
  const [activeTab, setActiveTab] = useState('components');
  const [selectedComponentIndex, setSelectedComponentIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  
  useEffect(() => {
    // If id exists, fetch website data
    if (id) {
      fetchWebsite();
    } else {
      // New website
      setLoading(false);
    }
    
    // Warn before leaving with unsaved changes
    const handleBeforeUnload = (e) => {
      if (unsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [id, unsavedChanges]);
  
  const fetchWebsite = async () => {
    try {
      // Placeholder for actual API call
      // const response = await fetch(`/api/websites/${id}`, {
      //   headers: {
      //     'Authorization': `Bearer ${session.access_token}`
      //   }
      // });
      
      // if (!response.ok) throw new Error('Failed to fetch website');
      // const data = await response.json();
      
      // Placeholder data for testing
      const data = {
        id,
        name: 'موقع تجريبي',
        components: []
      };
      
      setWebsiteName(data.name);
      setComponents(data.components);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching website:', error);
      Sentry.captureException(error, {
        extra: { 
          context: 'fetchWebsite in BuilderPage',
          websiteId: id 
        },
      });
      setError(error.message);
      setLoading(false);
    }
  };
  
  const handleSave = async () => {
    try {
      setSaving(true);
      
      const websiteData = {
        name: websiteName,
        components,
        userId: user.id
      };
      
      // This would be replaced with an actual API call to save the website
      // const response = await fetch(`/api/websites${id ? `/${id}` : ''}`, {
      //   method: id ? 'PUT' : 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${session.access_token}`
      //   },
      //   body: JSON.stringify(websiteData)
      // });
      
      // if (!response.ok) throw new Error('Failed to save website');
      // const savedWebsite = await response.json();
      
      // if it's a new website, redirect to the edit page
      // if (!id) {
      //   navigate(`/builder/${savedWebsite.id}`, { replace: true });
      // }
      
      setUnsavedChanges(false);
      console.log('Website saved successfully');
    } catch (error) {
      console.error('Error saving website:', error);
      Sentry.captureException(error, {
        extra: { 
          context: 'handleSave in BuilderPage',
          websiteId: id,
          websiteData: { name: websiteName, componentCount: components.length }
        },
      });
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };
  
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(components);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setComponents(items);
    setUnsavedChanges(true);
  };
  
  const handleAddComponent = (componentType) => {
    const newComponent = {
      id: `component-${Date.now()}`,
      type: componentType,
      content: getDefaultContentForType(componentType),
      styles: getDefaultStylesForType(componentType)
    };
    
    setComponents([...components, newComponent]);
    setSelectedComponentIndex(components.length);
    setUnsavedChanges(true);
  };
  
  const handleUpdateComponent = (index, updatedComponent) => {
    const newComponents = [...components];
    newComponents[index] = updatedComponent;
    setComponents(newComponents);
    setUnsavedChanges(true);
  };
  
  const handleDeleteComponent = (index) => {
    const newComponents = [...components];
    newComponents.splice(index, 1);
    setComponents(newComponents);
    setSelectedComponentIndex(null);
    setUnsavedChanges(true);
  };
  
  const getDefaultContentForType = (type) => {
    switch (type) {
      case 'header':
        return { title: 'عنوان الموقع', subtitle: 'وصف مختصر للموقع' };
      case 'text':
        return { text: 'أضف نصك هنا...' };
      case 'image':
        return { src: 'https://via.placeholder.com/400x300', alt: 'صورة' };
      case 'button':
        return { text: 'زر', link: '#' };
      default:
        return {};
    }
  };
  
  const getDefaultStylesForType = (type) => {
    switch (type) {
      case 'header':
        return { 
          background: '#f8f9fa', 
          textAlign: 'center',
          padding: '40px' 
        };
      case 'text':
        return { 
          fontSize: '16px',
          textAlign: 'right',
          color: '#333333' 
        };
      case 'image':
        return { 
          width: '100%',
          borderRadius: '4px' 
        };
      case 'button':
        return { 
          backgroundColor: '#3B82F6',
          color: '#ffffff',
          padding: '10px 20px',
          borderRadius: '4px',
          textAlign: 'center' 
        };
      default:
        return {};
    }
  };
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Builder Header */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="text"
                className="text-xl font-bold border-none focus:outline-none focus:ring-0 bg-transparent"
                value={websiteName}
                onChange={(e) => {
                  setWebsiteName(e.target.value);
                  setUnsavedChanges(true);
                }}
              />
              {unsavedChanges && (
                <span className="text-sm text-yellow-600 mr-2">
                  ({t('builder.unsavedChanges')})
                </span>
              )}
            </div>
            <div className="flex space-x-2 space-x-reverse">
              <button
                className="btn btn-primary flex items-center"
                onClick={handleSave}
                disabled={saving}
              >
                <FiSave className="ml-1" />
                {saving ? t('common.loading') : t('common.save')}
              </button>
              <button
                className="btn btn-secondary flex items-center"
                onClick={() => navigate(`/preview/${id || 'new'}`)}
              >
                <FiEye className="ml-1" />
                {t('common.preview')}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-4">
          {error}
        </div>
      )}
      
      {/* Builder Content */}
      <div className="flex-grow flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-l border-gray-200 overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <div className="flex">
              <button
                className={`flex-1 py-2 text-center ${activeTab === 'components' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                onClick={() => setActiveTab('components')}
              >
                <FiList className="w-5 h-5 mx-auto mb-1" />
                <span className="text-sm">{t('builder.components')}</span>
              </button>
              <button
                className={`flex-1 py-2 text-center ${activeTab === 'layers' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                onClick={() => setActiveTab('layers')}
              >
                <FiLayers className="w-5 h-5 mx-auto mb-1" />
                <span className="text-sm">الطبقات</span>
              </button>
              <button
                className={`flex-1 py-2 text-center ${activeTab === 'settings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                onClick={() => setActiveTab('settings')}
              >
                <FiSettings className="w-5 h-5 mx-auto mb-1" />
                <span className="text-sm">{t('builder.settings')}</span>
              </button>
            </div>
          </div>
          
          <div className="p-4">
            {activeTab === 'components' && (
              <BuilderComponentsList onAddComponent={handleAddComponent} />
            )}
            
            {activeTab === 'layers' && (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="components">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-2"
                    >
                      {components.length === 0 ? (
                        <p className="text-gray-500 text-center p-4">
                          {t('builder.dragDrop')}
                        </p>
                      ) : (
                        components.map((component, index) => (
                          <Draggable
                            key={component.id}
                            draggableId={component.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`p-3 bg-white rounded border ${
                                  selectedComponentIndex === index
                                    ? 'border-blue-500'
                                    : 'border-gray-200'
                                } ${
                                  snapshot.isDragging ? 'shadow-md' : ''
                                } cursor-move`}
                                onClick={() => setSelectedComponentIndex(index)}
                              >
                                <div className="flex justify-between items-center">
                                  <span className="font-medium">
                                    {t(`builder.${component.type}`)} {index + 1}
                                  </span>
                                  <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteComponent(index);
                                    }}
                                  >
                                    <FiX />
                                  </button>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
            
            {activeTab === 'settings' && selectedComponentIndex !== null && (
              <BuilderSettings
                component={components[selectedComponentIndex]}
                onUpdate={(updatedComponent) => 
                  handleUpdateComponent(selectedComponentIndex, updatedComponent)
                }
              />
            )}
            
            {activeTab === 'settings' && selectedComponentIndex === null && (
              <p className="text-gray-500 text-center p-4">
                اختر عنصرًا لتعديل إعداداته
              </p>
            )}
          </div>
        </div>
        
        {/* Preview Area */}
        <div className="flex-grow p-6 overflow-y-auto">
          <BuilderPreview
            components={components}
            selectedIndex={selectedComponentIndex}
            onSelectComponent={setSelectedComponentIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;