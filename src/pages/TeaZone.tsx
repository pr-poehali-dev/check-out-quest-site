import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const TeaZone: React.FC = () => {
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
          src="https://cdn.poehali.dev/files/bfe34242-a7f3-41d6-8f06-ab2319e21423.jpg" 
          alt="Чайная зона" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
      </div>
      
      {/* Основной контент */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="text-white hover:text-green-500 mb-8 block">
            ← Вернуться на главную
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-green-500 mb-6">
            Чайная зона
          </h1>
          
          <Card className="bg-black bg-opacity-80 border-none p-6 mb-8 backdrop-blur">
            <div className="mb-6">
              <img 
                src="https://cdn.poehali.dev/files/bfe34242-a7f3-41d6-8f06-ab2319e21423.jpg" 
                alt="Чайная зона" 
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            </div>
            
            <p className="text-gray-300 mb-4 text-lg">
              Чайная зона – эта уютная комната с большим столом и мягкими диванами в самом квесте. 
              После увлекательного приключения, полны эмоций и загадок, приглашаем вас в уютную чайную зону, 
              где можно отдохнуть и поделиться впечатлениями!
            </p>
            
            <p className="text-gray-300 mb-6 text-lg font-semibold">
              Приходите и насладитесь временем в нашей чайной зоне — местом для отдыха после ярких приключений!
            </p>
            
            <div className="border-l-4 border-green-500 pl-4 my-6">
              <p className="text-gray-300 italic">
                Аренда чайной зоны на 1 час стоит 1000₽.
              </p>
            </div>
            
            <div className="bg-black bg-opacity-50 p-4 rounded-lg mb-6">
              <h3 className="text-red-500 font-bold mb-2 text-lg">Ограничения:</h3>
              <ul className="text-gray-300 space-y-1">
                <li>• Строго запрещен вход с алкоголем</li>
                <li>• Запрещается курить в помещении</li>
                <li>• Запрещается использовать бенгальские огни и другие свечи, кроме обычных парафиновых свечей (они разрешены)</li>
              </ul>
            </div>
            
            <div className="bg-black bg-opacity-50 p-4 rounded-lg mb-6">
              <h3 className="text-green-500 font-bold mb-2 text-lg">Важно:</h3>
              <p className="text-gray-300">
                Мы предоставляем только место для банкета! Посуда, еда, напитки – все с вас!
              </p>
              <p className="text-gray-300 mt-2">
                Мы предоставим: микроволновку, куллер с водой и чайник, в котором можно вскипятить воду.
              </p>
            </div>
            
            <div className="text-center mt-4">
              <p className="text-gray-300 mb-4 italic">
                Если вас заинтересовала данная услуга, не забудьте сообщить о ней оператору!
              </p>
              
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Забронировать квест с чайной зоной
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeaZone;
