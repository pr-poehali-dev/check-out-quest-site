import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface BookingTime {
  id: string;
  time: string;
  date: string;
  questType: 'danger' | 'artifact';
  name: string;
  phone: string;
  isConfirmed: boolean;
  isPending: boolean;
  prepayment?: number;
  payment?: number;
  age?: string;
  peopleCount?: number;
  teaZone?: boolean;
  adminComment?: string;
}

interface BookingContextType {
  bookings: BookingTime[];
  addBooking: (booking: Omit<BookingTime, 'id' | 'isConfirmed' | 'isPending'>) => string;
  updateBooking: (id: string, data: Partial<BookingTime>) => void;
  cancelBooking: (id: string) => void;
  confirmBooking: (id: string) => void;
  getBookingsByDate: (date: string) => BookingTime[];
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<BookingTime[]>([]);

  const addBooking = (booking: Omit<BookingTime, 'id' | 'isConfirmed' | 'isPending'>) => {
    const id = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setBookings(prev => [...prev, { 
      ...booking, 
      id, 
      isConfirmed: false, 
      isPending: true 
    }]);
    return id;
  };

  const updateBooking = (id: string, data: Partial<BookingTime>) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === id ? { ...booking, ...data } : booking
      )
    );
  };

  const cancelBooking = (id: string) => {
    setBookings(prev => prev.filter(booking => booking.id !== id));
  };

  const confirmBooking = (id: string) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === id ? { ...booking, isConfirmed: true, isPending: false } : booking
      )
    );
  };

  const getBookingsByDate = (date: string) => {
    return bookings.filter(booking => booking.date === date);
  };

  return (
    <BookingContext.Provider value={{
      bookings,
      addBooking,
      updateBooking,
      cancelBooking,
      confirmBooking,
      getBookingsByDate
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
