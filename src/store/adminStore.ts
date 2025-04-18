import { create } from 'zustand';

type Admin = {
  login: string;
  password: string;
  name: string;
};

interface AdminState {
  admins: Admin[];
  currentAdmin: Admin | null;
  phone: string;
  login: (login: string, password: string) => boolean;
  logout: () => void;
  updatePhone: (phone: string) => void;
}

export const useAdminStore = create<AdminState>()((set, get) => ({
  admins: [
    { login: 'NiKiTa Kvest', password: 'admin1408', name: 'Никита' },
    { login: 'ArInA Kvest', password: 'admin1606', name: 'Арина' }
  ],
  currentAdmin: null,
  phone: '+7 (999) 999-99-99',
  
  login: (login, password) => {
    const admin = get().admins.find(
      (a) => a.login === login && a.password === password
    );
    
    if (admin) {
      set({ currentAdmin: admin });
      return true;
    }
    
    return false;
  },
  
  logout: () => {
    set({ currentAdmin: null });
  },

  updatePhone: (phone) => {
    set({ phone });
  }
}));
