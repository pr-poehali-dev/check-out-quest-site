import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const ArtifactQuest: React.FC = () => {
  return (
    <div className="min-h-screen relative">
      {/* Фоновое изображение */}
      <img 
        src="https://cdn.poehali.dev/files/5e8b46f2-c6d2-4a4f-bb7c-8cec280c3aba.jpg" 
        alt="В поисках артефакта" 
        className="quest-background-image"
      />
      
      {/* Затемнение для лучшей читаемости */}
      <div className="quest-overlay"></div>
      
      {/* Основной контент */}
      <div className="container mx-auto py-12 px-4 relative z-20">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="text-white hover:text-quest-yellow mb-8 block">
            ← Вернуться на главную
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-quest-yellow mb-6">
            В поисках артефакта
          </h1>
          
          <Card className="bg-black bg-opacity-70 border-none p-6 mb-8">
            <h2 className="text-2xl text-quest-yellow font-bold mb-4">
              Захватывающее приключение в старинном замке
            </h2>
            
            <p className="text-gray-300 mb-4">
              Старинная легенда гласит, что в этом заброшенном замке спрятан древний артефакт, 
              обладающий невероятной силой. Многие искатели приключений пытались его найти, 
              но никто не вернулся. Сможете ли вы разгадать тайну древних и обрести могущество?
            </p>
            
            <div className="border-l-4 border-quest-yellow pl-4 my-6">
              <p className="text-gray-300 italic">
                "Этот квест — настоящее испытание для любителей загадок и головоломок. 
                Мы воссоздали атмосферу таинственного замка с множеством секретов, 
                запутанных коридоров и волшебных предметов."
              </p>
              <p className="text-quest-yellow mt-2">— Команда Check_Out</p>
            </div>
            
            <ul className="space-y-2 text-gray-300 mb-6">
              <li className="flex items-center">
                <span className="text-quest-yellow mr-2">🧩</span>
                <span>Сложность: 7/10</span>
              </li>
              <li className="flex items-center">
                <span className="text-quest-yellow mr-2">⏱️</span>
                <span>Длительность: 75 минут</span>
              </li>
              <li className="flex items-center">
                <span className="text-quest-yellow mr-2">👥</span>
                <span>Участники: 2-5 человек</span>
              </li>
              <li className="flex items-center">
                <span className="text-quest-yellow mr-2">💰</span>
                <span>Стоимость: от 2800₽</span>
              </li>
            </ul>
            
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
