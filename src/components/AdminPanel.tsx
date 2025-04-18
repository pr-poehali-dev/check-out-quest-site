import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useAdminStore } from '@/store/adminStore';
import { useBookingStore, BookingTime } from '@/store/bookingStore';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedBooking, setSelectedBooking] = useState<BookingTime | null>(null);
  const [prepayment, setPrepayment] = useState<string>('');
  const [payment, setPayment] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [peopleCount, setPeopleCount] = useState<string>('');
  const [teaZone, setTeaZone] = useState<boolean>(false);
  const [adminComment, setAdminComment] = useState<string>('');
  const [adminPhone, setAdminPhone] = useState<string>('');
  
  const { toast } = useToast();
  const currentAdmin = useAdminStore((state) => state.currentAdmin);
  const bookings = useBookingStore((state) => state.bookings);
  const updateBooking = useBookingStore((state) => state.updateBooking);
  const confirmBooking = useBookingStore((state) => state.confirmBooking);
  const cancelBooking = useBookingStore((state) => state.cancelBooking);
  const adminStorePhone = useAdminStore((state) => state.phone);
  const updatePhone = useAdminStore((state) => state.updatePhone);
  
  React.useEffect(() => {
    if (isOpen) {
      setAdminPhone(adminStorePhone);
    }
  }, [isOpen, adminStorePhone]);
  
  const handleBookingSelect = (booking: BookingTime) => {
    setSelectedBooking(booking);
    setPrepayment(booking.prepayment?.toString() || '');
    setPayment(booking.payment?.toString() || '');
    setAge(booking.age || '');
    setPeopleCount(booking.peopleCount?.toString() || '');
    setTeaZone(booking.teaZone || false);
    setAdminComment(booking.adminComment || '');
  };
  
  const handleUpdateBooking = () => {
    if (!selectedBooking) return;
    
    updateBooking(selectedBooking.id, {
      prepayment: prepayment ? Number(prepayment) : undefined,
      payment: payment ? Number(payment) : undefined,
      age,
      peopleCount: peopleCount ? Number(peopleCount) : undefined,
      teaZone,
      adminComment,
    });
    
    toast({
      title: "Успешно!",
      description: "Информация о бронировании обновлена",
    });
  };
  
  const handleConfirmBooking = (withReceipt: boolean) => {
    if (!selectedBooking) return;
    
    // Обновляем информацию о бронировании
    handleUpdateBooking();
    
    // Подтверждаем бронирование
    confirmBooking(selectedBooking.id);
    
    if (withReceipt) {
      // Логика генерации и отображения чека
      const receipt = generateReceipt();
      saveReceipt(receipt);
    }
    
    toast({
      title: "Успешно!",
      description: "Бронирование подтверждено",
    });
  };
  
  const handleCancelBooking = () => {
    if (!selectedBooking) return;
    
    cancelBooking(selectedBooking.id);
    setSelectedBooking(null);
    
    toast({
      title: "Отмена",
      description: "Бронирование отменено",
    });
  };
  
  const handleSavePhone = () => {
    updatePhone(adminPhone);
    
    toast({
      title: "Успешно!",
      description: "Номер телефона администратора обновлен",
    });
  };
  
  // Функция генерации "чека" (строки с данными)
  const generateReceipt = (): string => {
    if (!selectedBooking) return '';
    
    const questName = selectedBooking.questType === 'danger' 
      ? 'Опасная зона' 
      : 'В поисках артефакта';
      
    const total = (selectedBooking.peopleCount || 0) * (selectedBooking.time.startsWith('21') ? 1000 : 900);
    const teaZonePrice = selectedBooking.teaZone ? 1000 : 0;
    const grandTotal = total + teaZonePrice;
    
    return `
      Забронированный квест: "${questName}"
      Дата и время: ${selectedBooking.date} ${selectedBooking.time}
      Возраст игроков: ${selectedBooking.age || 'Не указан'}
      Количество игроков: ${selectedBooking.peopleCount || 'Не указано'}
      Общая сумма оплаты: ${grandTotal} ₽
      Внесенная предоплата: ${selectedBooking.prepayment || 0} ₽
      ${selectedBooking.teaZone ? '+ Аренда чайной зоны (1ч): 1000 ₽' : ''}
    `;
  };
  
  // Эмуляция сохранения чека
  const saveReceipt = (receipt: string) => {
    console.log('Чек сохранен:', receipt);
    // В реальном приложении здесь может быть логика сохранения/скачивания файла
  };
  
  // Фильтруем бронирования по выбранной дате
  const formattedDate = format(selectedDate, 'yyyy-MM-dd');
  const filteredBookings = bookings.filter(b => b.date === formattedDate);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black border-quest-yellow text-quest-orange max-w-5xl h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl text-quest-orange">
            Панель администратора - {currentAdmin?.name || ''}
          </DialogTitle>
          <DialogDescription className="text-quest-orange opacity-70">
            Управление бронированиями и настройками
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="w-full bg-black border border-quest-yellow">
            <TabsTrigger 
              value="bookings" 
              className="data-[state=active]:bg-quest-yellow data-[state=active]:text-black text-quest-orange"
            >
              Бронирования
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="data-[state=active]:bg-quest-yellow data-[state=active]:text-black text-quest-orange"
            >
              Настройки
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="bookings" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-quest-orange">Выберите дату</h3>
                <Input
                  type="date"
                  value={formattedDate}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  className="bg-black/50 border-quest-yellow text-quest-orange"
                />
                
                <h3 className="text-lg font-medium text-quest-orange mt-4">Бронирования</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking) => (
                      <Button
                        key={booking.id}
                        variant="outline"
                        className={`w-full justify-start ${
                          booking.isPending 
                            ? 'bg-quest-yellow/20 border-quest-yellow' 
                            : booking.isConfirmed 
                              ? 'bg-green-700/20 border-green-700' 
                              : 'bg-black/50 border-quest-yellow'
                        }`}
                        onClick={() => handleBookingSelect(booking)}
                      >
                        <div className="flex items-center space-x-2 text-left">
                          <span className="text-quest-orange">
                            {booking.time} - {booking.questType === 'danger' ? 'Опасная зона' : 'В поисках артефакта'}
                            {booking.isConfirmed && ' ✓'}
                            {booking.teaZone && ' С'}
                          </span>
                        </div>
                      </Button>
                    ))
                  ) : (
                    <p className="text-quest-orange opacity-70">Нет бронирований на эту дату</p>
                  )}
                </div>
              </div>
              
              <div className="md:col-span-2 space-y-4">
                {selectedBooking ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-quest-orange">
                      Детали бронирования
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-quest-orange">Квест</Label>
                        <Input
                          value={selectedBooking.questType === 'danger' ? 'Опасная зона' : 'В поисках артефакта'}
                          disabled
                          className="bg-black/50 border-quest-yellow text-quest-orange"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-quest-orange">Дата и время</Label>
                        <Input
                          value={`${selectedBooking.date} ${selectedBooking.time}`}
                          disabled
                          className="bg-black/50 border-quest-yellow text-quest-orange"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-quest-orange">Имя клиента</Label>
                        <Input
                          value={selectedBooking.name}
                          disabled
                          className="bg-black/50 border-quest-yellow text-quest-orange"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-quest-orange">Телефон</Label>
                        <Input
                          value={selectedBooking.phone}
                          disabled
                          className="bg-black/50 border-quest-yellow text-quest-orange"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-quest-orange">Предоплата (₽)</Label>
                        <Input
                          value={prepayment}
                          onChange={(e) => setPrepayment(e.target.value)}
                          className="bg-black/50 border-quest-yellow text-quest-orange"
                          type="number"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-quest-orange">Общая оплата (₽)</Label>
                        <Input
                          value={payment}
                          onChange={(e) => setPayment(e.target.value)}
                          className="bg-black/50 border-quest-yellow text-quest-orange"
                          type="number"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-quest-orange">Возраст</Label>
                        <Input
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          className="bg-black/50 border-quest-yellow text-quest-orange"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-quest-orange">Количество человек</Label>
                        <Input
                          value={peopleCount}
                          onChange={(e) => setPeopleCount(e.target.value)}
                          className="bg-black/50 border-quest-yellow text-quest-orange"
                          type="number"
                        />
                      </div>
                      
                      <div className="space-y-2 flex items-center space-x-2">
                        <Switch
                          checked={teaZone}
                          onCheckedChange={setTeaZone}
                          className="data-[state=checked]:bg-quest-yellow"
                        />
                        <Label className="text-quest-orange">Аренда чайной зоны</Label>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-quest-orange">Комментарий</Label>
                      <Textarea
                        value={adminComment}
                        onChange={(e) => setAdminComment(e.target.value)}
                        className="bg-black/50 border-quest-yellow text-quest-orange"
                        rows={3}
                      />
                    </div>
                    
                    <div className="flex space-x-2 justify-end">
                      <Button 
                        variant="destructive" 
                        onClick={handleCancelBooking}
                      >
                        Отменить бронь
                      </Button>
                      
                      <Button 
                        className="bg-quest-yellow text-black hover:bg-quest-orange"
                        onClick={() => handleUpdateBooking()}
                      >
                        Обновить
                      </Button>
                      
                      <Button 
                        className="bg-green-700 text-white hover:bg-green-600"
                        onClick={() => handleConfirmBooking(false)}
                      >
                        Подтвердить бронь
                      </Button>
                      
                      <Button 
                        className="bg-quest-orange text-black hover:bg-quest-yellow"
                        onClick={() => handleConfirmBooking(true)}
                      >
                        Подтвердить с чеком
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-quest-orange opacity-70">Выберите бронирование для просмотра деталей</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4 mt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-quest-orange">Настройки администратора</h3>
              
              <div className="space-y-2">
                <Label className="text-quest-orange">Номер телефона для отображения на сайте</Label>
                <Input
                  value={adminPhone}
                  onChange={(e) => setAdminPhone(e.target.value)}
                  className="bg-black/50 border-quest-yellow text-quest-orange"
                  placeholder="+7 (XXX) XXX-XX-XX"
                />
              </div>
              
              <div className="flex justify-end">
                <Button 
                  className="bg-quest-yellow text-black hover:bg-quest-orange"
                  onClick={handleSavePhone}
                >
                  Сохранить
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button 
            onClick={onClose}
            variant="outline"
            className="bg-black border-quest-yellow text-quest-orange hover:bg-quest-yellow hover:text-black"
          >
            Закрыть
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPanel;
