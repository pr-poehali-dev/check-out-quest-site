import React, { createContext, useState, useContext, ReactNode } from 'react';

type Admin = {
  login: string;
  password: string;
  name: string;
};

interface AdminContextType {
  admins: Admin[];
  currentAdmin: Admin | null;
  phone: string;
  login: (login: string, password: string) => boolean;
  logout: () => void;
  updatePhone: (phone: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [admins] = useState<Admin[]>([
    { login: 'NiKiTa Kvest', password: 'admin1408', name: 'Никита' },
    { login: 'ArInA Kvest', password: 'admin1606', name: 'Арина' }
  ]);
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);
  const [phone, setPhone] = useState<string>('+7 (999) 999-99-99');

  const login = (login: string, password: string) => {
    const admin = admins.find(
      (a) => a.login === login && a.password === password
    );
    
    if (admin) {
      setCurrentAdmin(admin);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setCurrentAdmin(null);
  };

  const updatePhone = (newPhone: string) => {
    setPhone(newPhone);
  };

  return (
    <AdminContext.Provider value={{
      admins,
      currentAdmin,
      phone,
      login,
      logout,
      updatePhone
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
