import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { useBookingStore } from '@/store/bookingStore';

interface QuestCalendarProps {
  onSelectDate: (date: Date | undefined) => void;
}

const QuestCalendar: React.FC<QuestCalendarProps> = ({ onSelectDate }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [disabledDates, setDisabledDates] = useState<Date[]>([]);
  
  // Получаем текущую дату в формате "YYYY-MM-DD"
  const currentDate = format(new Date(), 'yyyy-MM-dd');
  
  useEffect(() => {
    // Отключаем предыдущие даты
    const pastDates = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let d = new Date(2023, 0, 1); d < today; d.setDate(d.getDate() + 1)) {
      pastDates.push(new Date(d));
    }
    
    setDisabledDates(pastDates);
  }, []);
  
  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    onSelectDate(newDate);
  };

  return (
    <div className="p-4 bg-black/70 rounded-lg border border-quest-yellow">
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleDateChange}
        locale={ru}
        disabled={disabledDates}
        className="text-quest-orange bg-black rounded-md"
      />
    </div>
  );
};

export default QuestCalendar;
