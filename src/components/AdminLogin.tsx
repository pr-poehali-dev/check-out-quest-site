import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAdminStore } from '@/store/adminStore';
import { useToast } from '@/components/ui/use-toast';

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ isOpen, onClose, onSuccess }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  const loginAdmin = useAdminStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!login || !password) {
      toast({
        title: "Ошибка!",
        description: "Заполните все поля",
        variant: "destructive",
      });
      return;
    }
    
    const success = loginAdmin(login, password);
    
    if (success) {
      toast({
        title: "Успешно!",
        description: "Вы вошли в режим администратора",
      });
      onSuccess();
      onClose();
    } else {
      toast({
        title: "Ошибка!",
        description: "Неверный логин или пароль",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black border-quest-yellow text-quest-orange">
        <DialogHeader>
          <DialogTitle className="text-xl text-quest-orange">Вход в панель администратора</DialogTitle>
          <DialogDescription className="text-quest-orange opacity-70">
            Введите данные для доступа
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="login" className="text-quest-orange">Логин</Label>
            <Input
              id="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="bg-black/50 border-quest-yellow text-quest-orange"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-quest-orange">Пароль</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black/50 border-quest-yellow text-quest-orange"
              required
            />
          </div>
          
          <DialogFooter>
            <Button 
              type="submit"
              className="bg-quest-yellow text-black hover:bg-quest-orange"
            >
              Войти
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminLogin;
