import React, { useState } from 'react';
import BlinkingLogo from '@/components/BlinkingLogo';
import QuestCard from '@/components/QuestCard';
import AdminLogin from '@/components/AdminLogin';
import AdminPanel from '@/components/AdminPanel';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/contexts/AdminContext';

const HomePage: React.FC = () => {
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  
  const { currentAdmin, phone: adminPhone } = useAdmin();
  
  const handleAdminSuccess = () => {
    setAdminLoginOpen(false);
    setAdminPanelOpen(true);
  };
  
  return (
    <div className="min-h-screen relative animate-day-night-cycle brick-wall">
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="w-full h-full bg-black"></div>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-6 black-yellow-stripe"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Админ панель */}
        <div className="absolute top-8 right-4">
          {currentAdmin ? (
            <Button 
              onClick={() => setAdminPanelOpen(true)}
              className="bg-quest-yellow text-black hover:bg-quest-orange"
            >
              Панель администратора
            </Button>
          ) : (
            <Button 
              onClick={() => setAdminLoginOpen(true)}
              variant="ghost"
              className="text-quest-orange hover:text-quest-yellow"
            >
              Администратор
            </Button>
          )}
        </div>
        
        {/* Главный контент */}
        <div className="mt-10 space-y-12">
          <BlinkingLogo />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="flex-1"></div>
            <div className="bg-black/70 p-6 rounded-lg border border-quest-yellow">
              <h3 className="text-xl font-bold text-quest-orange mb-4">Информация</h3>
              <p className="text-quest-orange">
                По вопросам бронирования вы можете связаться с администратором по номеру {adminPhone},
                или в сообщениях группы ВК: <a href="https://vk.com/kvest_chekcout" target="_blank" rel="noopener noreferrer" className="text-quest-yellow hover:text-quest-orange">https://vk.com/kvest_chekcout</a>
              </p>
            </div>
          </div>
          
          <div className="bg-black/70 p-6 rounded-lg border border-quest-yellow max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-quest-orange mb-4 text-center">Важно!</h3>
            <p className="text-quest-orange text-center">
              Вход в состоянии алкогольного и наркотического опьянения строго запрещен! Также на квесте вам предстоит поползать, возьмите удобную обувь и одежду!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <QuestCard
              image="/gas-mask.png"
              title="Опасная зона"
              link="/danger-zone"
              alt="Квест Опасная зона"
            />
            
            <QuestCard
              image="/gold-coin.png"
              title="В поисках артефакта"
              link="/artifact-quest"
              alt="Квест В поисках артефакта"
            />
            
            <QuestCard
              image="/tea-zone.png"
              title="Чайная зона"
              link="/tea-zone"
              alt="Чайная зона"
            />
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-6 black-yellow-stripe"></div>
      </div>
      
      <AdminLogin 
        isOpen={adminLoginOpen} 
        onClose={() => setAdminLoginOpen(false)} 
        onSuccess={handleAdminSuccess}
      />
      
      <AdminPanel 
        isOpen={adminPanelOpen} 
        onClose={() => setAdminPanelOpen(false)} 
      />
    </div>
  );
};

export default HomePage;
