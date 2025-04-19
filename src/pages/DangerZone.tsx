import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const DangerZone: React.FC = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center py-12">
      {/* Фоновое изображение квеста поверх основного фона */}
      <div className="fixed inset-0 z-1">
        <img 
          src="https://cdn.poehali.dev/files/61bc9cfc-c20e-425f-b41a-062bd971c29a.jpeg" 
          alt="Кирпичная стена" 
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <img 
          src="https://cdn.poehali.dev/files/1d28a7cb-2ca1-4729-80b6-8c716774806d.jpg" 
          alt="Опасная зона" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
      </div>
      
      {/* Основной контент */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="text-white hover:text-quest-orange mb-8 block">
            ← Вернуться на главную
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-quest-orange mb-6">
            Опасная зона
          </h1>
          
          <Card className="bg-black bg-opacity-80 border-none p-6 mb-8 backdrop-blur">
            <h2 className="text-2xl text-quest-orange font-bold mb-4">
              Выживание в мире после катастрофы
            </h2>
            
            <div className="mb-6">
              <img 
                src="https://cdn.poehali.dev/files/1d28a7cb-2ca1-4729-80b6-8c716774806d.jpg" 
                alt="Опасная зона" 
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            </div>
            
            <p className="text-gray-300 mb-4">
              Ядерная катастрофа изменила мир навсегда. Вы — одни из немногих выживших, 
              оказавшихся в эпицентре заражённой территории. Ваша задача — найти противоядие 
              и покинуть опасную зону до того, как радиация заберёт ваши жизни.
            </p>
            
            <div className="border-l-4 border-quest-orange pl-4 my-6">
              <p className="text-gray-300 italic">
                "Мы создали этот квест для любителей экстремальных приключений и 
                поклонников постапокалиптических сюжетов. Захватывающая история с множеством 
                головоломок не оставит равнодушным никого."
              </p>
              <p className="text-quest-orange mt-2">— Команда Check_Out</p>
            </div>
            
            <ul className="space-y-2 text-gray-300 mb-6">
              <li className="flex items-center">
                <span className="text-quest-orange mr-2">⚠️</span>
                <span>Сложность: 8/10</span>
              </li>
              <li className="flex items-center">
                <span className="text-quest-orange mr-2">⏱️</span>
                <span>Длительность: 90 минут</span>
              </li>
              <li className="flex items-center">
                <span className="text-quest-orange mr-2">👥</span>
                <span>Участники: 2-6 человек</span>
              </li>
              <li className="flex items-center">
                <span className="text-quest-orange mr-2">💰</span>
                <span>Стоимость: от 3000₽</span>
              </li>
            </ul>
            
            <Button className="bg-quest-orange hover:bg-orange-700 text-white">
              Забронировать
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DangerZone;
