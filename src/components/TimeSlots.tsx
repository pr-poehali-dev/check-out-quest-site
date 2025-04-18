import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useBookingStore } from '@/store/bookingStore';
import { format } from 'date-fns';

interface TimeSlotsProps {
  selectedDate: Date | undefined;
  questType: 'danger' | 'artifact';
  onSelectTime: (time: string) => void;
}

const availableTimes = ['12:00', '13:30', '15:00', '16:30', '18:00', '19:30', '21:00', '22:30'];

const TimeSlots: React.FC<TimeSlotsProps> = ({ selectedDate, questType, onSelectTime }) => {
  const [disabledTimes, setDisabledTimes] = useState<string[]>([]);
  const bookings = useBookingStore((state) => state.bookings);
  
  useEffect(() => {
    if (!selectedDate) return;
    
    const currentTime = new Date();
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    const disabledSlots: string[] = [];
    
    // Проверяем все слоты времени
    availableTimes.forEach(time => {
      const [hours, minutes] = time.split(':').map(Number);
      const slotTime = new Date(selectedDate);
      slotTime.setHours(hours, minutes, 0, 0);
      
      // Если осталось менее 1 часа до слота или слот уже прошел, отключаем его
      if (slotTime.getTime() - currentTime.getTime() < 60 * 60 * 1000) {
        disabledSlots.push(time);
      }
      
      // Проверяем, забронирован ли уже этот слот для любого из квестов
      const isBooked = bookings.some(booking => 
        booking.date === formattedDate && 
        booking.time === time
      );
      
      if (isBooked) {
        disabledSlots.push(time);
      }
    });
    
    setDisabledTimes([...new Set(disabledSlots)]);
  }, [selectedDate, bookings]);
  
  const getPrice = (time: string): number => {
    const [hours] = time.split(':').map(Number);
    return hours >= 21 ? 1000 : 900;
  };
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
      {availableTimes.map((time) => {
        const isDisabled = disabledTimes.includes(time);
        const price = getPrice(time);
        
        return (
          <div key={time} className="flex flex-col items-center">
            <Button
              variant="outline"
              className={`w-full mb-2 ${
                isDisabled 
                  ? 'relative opacity-50 cursor-not-allowed line-through text-destructive' 
                  : 'bg-black text-quest-orange border-quest-yellow hover:bg-quest-yellow hover:text-black'
              }`}
              disabled={isDisabled}
              onClick={() => !isDisabled && onSelectTime(time)}
            >
              {time}
              {isDisabled && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-red-500 text-2xl">✕</span>
                </div>
              )}
            </Button>
            <span className="text-sm text-quest-orange">{price} ₽/чел</span>
          </div>
        );
      })}
    </div>
  );
};

export default TimeSlots;
