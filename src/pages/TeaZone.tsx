import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

const TeaZone: React.FC = () => {
  return (
    <div className="min-h-screen relative brick-wall tea-zone-bg">
      <div className="absolute top-0 left-0 w-full h-6 black-yellow-stripe"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <Link to="/" className="inline-flex items-center text-quest-orange hover:text-quest-yellow mb-8">
          <ArrowLeft className="mr-2" size={20} />
          Вернуться на главную
        </Link>
        
        <div className="mt-6 mb-12">
          <Card className="w-full max-w-3xl mx-auto bg-black/80 border-quest-yellow">
            <CardContent className="p-8">
              <h1 className="text-4xl font-bold text-quest-tea mb-6 text-center">Чайная зона</h1>
              
              <div className="text-quest-orange space-y-6">
                <p className="text-lg">
                  Чайная зона – эта уютная комната с большим столом и мягкими диванами в самом квесте. После увлекательного приключения, полны эмоций и загадок, приглашаем вас в уютную чайную зону, где можно отдохнуть и поделиться впечатлениями!
                </p>
                
                <p className="text-lg">
                  Приходите и насладитесь временем в нашей чайной зоне — местом для отдыха после ярких приключений!
                </p>
                
                <div className="bg-quest-yellow/10 p-6 rounded-lg border border-quest-yellow">
                  <h3 className="text-xl font-semibold mb-4 text-quest-yellow">Стоимость и условия:</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Аренда чайной зоны на 1ч стоит 1000₽</li>
                    <li>Мы предоставляем только место для банкета! Посуда, еда, напитки – все с вас!</li>
                    <li>Мы предоставим: микроволновку, куллер с водой и чайник, в котором можно вскипятить воду</li>
                  </ul>
                </div>
                
                <div className="bg-red-900/20 p-6 rounded-lg border border-red-900">
                  <h3 className="text-xl font-semibold mb-4 text-red-400">Ограничения:</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Строго запрещен вход с алкоголем</li>
                    <li>Запрещается курить в помещении</li>
                    <li>Запрещается использовать бенгальские огни и другие свечи, кроме обычных парафиновых свечей (они разрешены)</li>
                  </ul>
                </div>
                
                <div className="text-center mt-8">
                  <p className="text-lg font-semibold text-quest-yellow">
                    Если вас заинтересовала данная услуга, не забудьте сообщить о ней оператору!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-6 black-yellow-stripe"></div>
      </div>
    </div>
  );
};

export default TeaZone;
