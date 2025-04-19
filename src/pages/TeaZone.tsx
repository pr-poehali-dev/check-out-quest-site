import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const TeaZone: React.FC = () => {
  return (
    <div className="min-h-screen relative">
      {/* Фоновое изображение */}
      <img 
        src="https://cdn.poehali.dev/files/23fd148d-0c64-4e2e-b544-d2b59c4e046e.jpg" 
        alt="Чайная зона" 
        className="quest-background-image"
      />
      
      {/* Затемнение для лучшей читаемости */}
      <div className="quest-overlay"></div>
      
      {/* Основной контент */}
      <div className="container mx-auto py-12 px-4 relative z-20">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="text-white hover:text-quest-orange mb-8 block">
            ← Вернуться на главную
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-green-500 mb-6">
            Чайная зона
          </h1>
          
          <Card className="bg-black bg-opacity-70 border-none p-6 mb-8">
            <h2 className="text-2xl text-green-500 font-bold mb-4">
              Расслабьтесь после приключений
            </h2>
            
            <p className="text-gray-300 mb-4">
              После захватывающих квестов приглашаем вас расслабиться в нашей аутентичной 
              чайной комнате. Здесь вы сможете насладиться изысканными сортами чая, 
              обсудить пройденные испытания и поделиться впечатлениями в уютной атмосфере.
            </p>
            
            <div className="border-l-4 border-green-500 pl-4 my-6">
              <p className="text-gray-300 italic">
                "Мы создали особое пространство, где время замедляет свой ход. 
                Чайная церемония — это не просто чаепитие, а настоящее искусство, 
                которое помогает восстановить душевное равновесие."
              </p>
              <p className="text-green-500 mt-2">— Команда Check_Out</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                <h3 className="text-green-500 font-bold mb-2">Чайное меню</h3>
                <ul className="text-gray-300 space-y-1">
                  <li>• Китайский улун</li>
                  <li>• Японский матча</li>
                  <li>• Индийский чай масала</li>
                  <li>• Травяные сборы</li>
                  <li>• Фруктовые чаи</li>
                </ul>
              </div>
              
              <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                <h3 className="text-green-500 font-bold mb-2">Дополнительно</h3>
                <ul className="text-gray-300 space-y-1">
                  <li>• Восточные сладости</li>
                  <li>• Лёгкие закуски</li>
                  <li>• Настольные игры</li>
                  <li>• Фотозона</li>
                  <li>• Комфортная зона отдыха</li>
                </ul>
              </div>
            </div>
            
            <ul className="space-y-2 text-gray-300 mb-6">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">🍵</span>
                <span>Стоимость: от 600₽ с человека</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">⏱️</span>
                <span>Длительность: не ограничена</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">👥</span>
                <span>Вместимость: до 15 человек</span>
              </li>
            </ul>
            
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Забронировать стол
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeaZone;
