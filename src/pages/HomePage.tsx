import React from 'react';
import BlinkingLogo from '@/components/BlinkingLogo';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <div className="container mx-auto z-20 relative">
        <BlinkingLogo />
        
        <h1 className="text-4xl font-bold text-white text-center mb-8 neon-text">
          Захватывающие квесты в Москве
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <QuestCard 
            title="Опасная зона" 
            description="Выживи в радиоактивном пространстве, найди противоядие и спасись!"
            image="https://cdn.poehali.dev/files/1d28a7cb-2ca1-4729-80b6-8c716774806d.jpg"
            link="/danger-zone"
          />
          
          <QuestCard 
            title="В поисках артефакта" 
            description="Разгадай тайну древнего артефакта и обрети невероятную силу!"
            image="https://cdn.poehali.dev/files/224bb71c-f2e2-49e0-b2c9-37b9d6428872.jpg"
            link="/artifact-quest"
          />
          
          <QuestCard 
            title="Чайная зона" 
            description="Расслабься после приключений в нашей аутентичной чайной комнате"
            image="https://cdn.poehali.dev/files/bfe34242-a7f3-41d6-8f06-ab2319e21423.jpg"
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
