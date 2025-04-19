import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface BackgroundWrapperProps {
  children: ReactNode;
}

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({ children }) => {
  const location = useLocation();
  
  // Выбираем фон на основе текущего маршрута
  const getBackground = () => {
    // Все страницы имеют общий фон - красная кирпичная стена
    return (
      <div className="fixed inset-0 z-0">
        <img 
          src="https://cdn.poehali.dev/files/61bc9cfc-c20e-425f-b41a-062bd971c29a.jpeg" 
          alt="Кирпичная стена"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative">
      {getBackground()}
      {children}
    </div>
  );
};

export default BackgroundWrapper;
