import React from 'react';
import BlinkingLogo from '@/components/BlinkingLogo';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      {/* Красный кирпичный фон */}
      <div className="fixed inset-0 red-brick-wall opacity-90 z-0"></div>
      
      {/* Затемнение для лучшей читаемости */}
      <div className="fixed inset-0 bg-black bg-opacity-30 z-1"></div>
      
      {/* Контент страницы */}
      <div className="container mx-auto z-20 relative">
        <BlinkingLogo />
        
        <h1 className="text-4xl font-bold text-white text-center mb-8 neon-text">
          Захватывающие квесты в Москве
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <QuestCard 
            title="Опасная зона" 
            description="Выживи в радиоактивном пространстве, найди противоядие и спасись!"
            image="https://cdn.poehali.dev/files/56dfd1f4-313e-408f-8ce6-8f09da29b74c.jpg"
            link="/danger-zone"
          />
          
          <QuestCard 
            title="В поисках артефакта" 
            description="Разгадай тайну древнего артефакта и обрети невероятную силу!"
            image="https://cdn.poehali.dev/files/5e8b46f2-c6d2-4a4f-bb7c-8cec280c3aba.jpg"
            link="/artifact-quest"
          />
          
          <QuestCard 
            title="Чайная зона" 
            description="Расслабься после приключений в нашей аутентичной чайной комнате"
            image="https://cdn.poehali.dev/files/23fd148d-0c64-4e2e-b544-d2b59c4e046e.jpg"
            link="/tea-zone"
          />
        </div>
      </div>
    </div>
  );
};

interface QuestCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const QuestCard: React.FC<QuestCardProps> = ({ title, description, image, link }) => {
  return (
    <Card className="overflow-hidden border-none shadow-xl transition-all hover:scale-105 bg-black bg-opacity-80">
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-quest-orange mb-2">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        <Link to={link}>
          <Button className="w-full bg-quest-orange hover:bg-orange-700 text-white">
            Подробнее
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default HomePage;
