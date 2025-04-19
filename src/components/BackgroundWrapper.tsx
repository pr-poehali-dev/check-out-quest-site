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
          src="https://cdn.poehali.dev/files/e2f2a7c3-a94d-44cf-bc7e-6d17444c517c.jpg" 
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
