import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import QuestCalendar from '@/components/QuestCalendar';
import TimeSlots from '@/components/TimeSlots';
import BookingModal from '@/components/BookingModal';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const ArtifactQuest: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };
  
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setIsBookingModalOpen(true);
  };
  
  return (
    <div className="min-h-screen relative brick-wall artifact-zone-bg">
      <div className="absolute inset-0 pointer-events-none">
        <div className="white-smoke"></div>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-6 black-yellow-stripe"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <Link to="/" className="inline-flex items-center text-quest-orange hover:text-quest-yellow mb-8">
          <ArrowLeft className="mr-2" size={20} />
          Вернуться на главную
        </Link>
        
        <div className="mt-6 mb-12">
          <div className="w-full max-w-5xl mx-auto bg-black/80 p-8 rounded-lg border border-quest-yellow">
            <h1 className="text-4xl font-bold text-quest-gold mb-6 text-center">ДЕТЕКТИВНЫЙ КВЕСТ!</h1>
            
            <div className="text-quest-orange mb-8">
              <h2 className="text-2xl font-semibold mb-4">Сюжет:</h2>
              <p className="text-lg">
                Вы команда следопытов, которые отправляются на поиски утерянного артефакта. Все сводки говорят о том, что артефакт был украден и спрятан в старом подвале под музеем. Но местный детектив не может разгадать загадки и найти улики, поэтому именно вам предстоит помочь ему в этом нелегком деле!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="text-quest-orange">
                  <h3 className="text-xl font-semibold mb-2">Информация:</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Возраст: 9+, квест проходит с ведущим, в роли доброго детектива Шляпсона</li>
                    <li>Команда от 4–10 человек</li>
                    <li>Цена за 1 человека, указана под временем бронирования</li>
                  </ul>
                </div>
                
                <QuestCalendar onSelectDate={handleDateSelect} />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-quest-orange mb-4">Выберите время:</h3>
                
                <TimeSlots
                  selectedDate={selectedDate}
                  questType="artifact"
                  onSelectTime={handleTimeSelect}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-6 black-yellow-stripe"></div>
      </div>
      
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        questType="artifact"
        selectedDate={selectedDate}
        selectedTime={selectedTime}
      />
    </div>
  );
};

export default ArtifactQuest;
