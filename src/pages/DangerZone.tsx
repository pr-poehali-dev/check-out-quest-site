import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import QuestCalendar from '@/components/QuestCalendar';
import TimeSlots from '@/components/TimeSlots';

const DangerZone: React.FC = () => {
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
            <div className="inline-block bg-red-600 text-white px-4 py-1 rounded-md mb-4 font-bold">
              ХОРРОР КВЕСТ!
            </div>
            
            <div className="mb-6">
              <img 
                src="https://cdn.poehali.dev/files/1d28a7cb-2ca1-4729-80b6-8c716774806d.jpg" 
                alt="Опасная зона" 
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            </div>
            
            <h2 className="text-2xl text-quest-orange font-bold mb-4">
              Сюжет
            </h2>
            
            <p className="text-gray-300 mb-6">
              Вы группа сталкеров, чьи жизни погрязли в долгах, и вот лучик света – проходит молва, 
              что за дневник одного из ученого, готовы заплатить огромные деньги. Вы не раздумываете 
              и бросаетесь на поиски этого дневника, прямо в логово опасности.
            </p>
            
            <ul className="space-y-2 text-gray-300 mb-6">
              <li className="flex items-center">
                <span className="text-quest-orange mr-2">👥</span>
                <span>Команда от 4–10 человек</span>
              </li>
              <li className="flex items-center">
                <span className="text-quest-orange mr-2">⚠️</span>
                <span>Возраст: 18+, 14+, 13+ в сопровождении</span>
              </li>
              <li className="flex items-center">
                <span className="text-quest-orange mr-2">💰</span>
                <span>Стоимость: до 21:00 - 900₽, после 21:00 - 1000₽ за билет</span>
              </li>
            </ul>
            
            <h3 className="text-xl text-quest-orange font-bold mb-4">Выберите дату и время</h3>
            
            <div className="mb-6">
              <QuestCalendar />
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg text-quest-orange mb-3">Доступное время:</h4>
              <TimeSlots questName="Опасная зона" />
            </div>
            
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
