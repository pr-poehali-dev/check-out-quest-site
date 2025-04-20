import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import QuestCalendar from '@/components/QuestCalendar';
import TimeSlots from '@/components/TimeSlots';

const ArtifactQuest: React.FC = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center py-12">
      {/* Фоновое изображение квеста поверх основного фона */}
      <div className="fixed inset-0 z-[1]">
        <img 
          src="https://cdn.poehali.dev/files/e2f2a7c3-a94d-44cf-bc7e-6d17444c517c.jpg" 
          alt="Кирпичная стена" 
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <img 
          src="https://cdn.poehali.dev/files/224bb71c-f2e2-49e0-b2c9-37b9d6428872.jpg" 
          alt="В поисках артефакта" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
      </div>
      
      {/* Основной контент */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="text-white hover:text-quest-yellow mb-8 block">
            ← Вернуться на главную
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-quest-yellow mb-6">
            В поисках артефакта
          </h1>
          
          <Card className="bg-black bg-opacity-80 border-none p-6 mb-8 backdrop-blur">
            <div className="inline-block bg-blue-600 text-white px-4 py-1 rounded-md mb-4 font-bold">
              ДЕТЕКТИВНЫЙ КВЕСТ!
            </div>
            
            <div className="mb-6">
              <img 
                src="https://cdn.poehali.dev/files/224bb71c-f2e2-49e0-b2c9-37b9d6428872.jpg" 
                alt="В поисках артефакта" 
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            </div>
            
            <h2 className="text-2xl text-quest-yellow font-bold mb-4">
              Сюжет
            </h2>
            
            <p className="text-gray-300 mb-6">
              Вы команда следопытов, которые отправляются на поиски утерянного артефакта. 
              Все сводки говорят о том, что артефакт был украден и спрятан в старом подвале 
              под музеем. Но местный детектив не может разгадать загадки и найти улики, 
              поэтому именно вам предстоит помочь ему в этом нелегком деле!
            </p>
            
            <ul className="space-y-2 text-gray-300 mb-6">
              <li className="flex items-center">
                <span className="text-quest-yellow mr-2">👥</span>
                <span>Команда от 4–10 человек</span>
              </li>
              <li className="flex items-center">
                <span className="text-quest-yellow mr-2">🧩</span>
                <span>Возраст: 9+, квест проходит с ведущим, в роли доброго детектива Шляпсона</span>
              </li>
              <li className="flex items-center">
                <span className="text-quest-yellow mr-2">💰</span>
                <span>Стоимость: до 21:00 - 900₽, после 21:00 - 1000₽ за билет</span>
              </li>
            </ul>
            
            <h3 className="text-xl text-quest-yellow font-bold mb-4">Выберите дату и время</h3>
            
            <div className="mb-6">
              <QuestCalendar />
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg text-quest-yellow mb-3">Доступное время:</h4>
              <TimeSlots questName="В поисках артефакта" />
            </div>
            
            <Button className="bg-quest-yellow hover:bg-yellow-600 text-black">
              Забронировать
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ArtifactQuest;
