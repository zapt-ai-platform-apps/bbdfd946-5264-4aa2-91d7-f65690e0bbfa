import React from 'react';

const ZaptBadge = () => {
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <a 
        href="https://www.zapt.ai" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block px-3 py-1 rounded-full bg-black bg-opacity-80 text-white text-xs font-medium hover:bg-opacity-100 transition-all"
      >
        Made on ZAPT
      </a>
    </div>
  );
};

export default ZaptBadge;