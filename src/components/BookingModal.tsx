import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/contexts/BookingContext';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  questType: 'danger' | 'artifact';
  selectedDate: Date | undefined;
  selectedTime: string | null;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  questType,
  selectedDate,
  selectedTime,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const { toast } = useToast();
  const { addBooking } = useBooking();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Ошибка!",
        description: "Выберите дату и время",
        variant: "destructive",
      });
      return;
    }
    
    if (!name || !phone) {
      toast({
        title: "Ошибка!",
        description: "Заполните все поля",
        variant: "destructive",
      });
      return;
    }
    
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    
    addBooking({
      date: formattedDate,
      time: selectedTime,
      questType,
      name,
      phone,
    });
    
    toast({
      title: "Успешно!",
      description: "Бронь в резерве, скоро с вами свяжется оператор для уточнения.",
    });
    
    setName('');
    setPhone('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black border-quest-yellow text-quest-orange">
        <DialogHeader>
          <DialogTitle className="text-xl text-quest-orange">Бронирование</DialogTitle>
          <DialogDescription className="text-quest-orange opacity-70">
            Введите ваши данные для бронирования квеста
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-quest-orange">Ваше имя</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-black/50 border-quest-yellow text-quest-orange"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-quest-orange">Номер телефона</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-black/50 border-quest-yellow text-quest-orange"
              placeholder="+7 (XXX) XXX-XX-XX"
              required
            />
          </div>
          
          <DialogFooter>
            <Button 
              type="submit"
              className="bg-quest-yellow text-black hover:bg-quest-orange"
            >
              Забронировать
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
