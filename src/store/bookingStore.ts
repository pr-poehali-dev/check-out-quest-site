import { create } from 'zustand';

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

interface BookingState {
  bookings: BookingTime[];
  addBooking: (booking: Omit<BookingTime, 'id' | 'isConfirmed' | 'isPending'>) => void;
  updateBooking: (id: string, data: Partial<BookingTime>) => void;
  cancelBooking: (id: string) => void;
  confirmBooking: (id: string) => void;
  getBookingsByDate: (date: string) => BookingTime[];
}

export const useBookingStore = create<BookingState>()((set, get) => ({
  bookings: [],
  
  addBooking: (booking) => {
    const id = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    set((state) => ({
      bookings: [...state.bookings, { 
        ...booking, 
        id, 
        isConfirmed: false, 
        isPending: true 
      }]
    }));
    return id;
  },
  
  updateBooking: (id, data) => {
    set((state) => ({
      bookings: state.bookings.map((booking) => 
        booking.id === id ? { ...booking, ...data } : booking
      )
    }));
  },
  
  cancelBooking: (id) => {
    set((state) => ({
      bookings: state.bookings.filter((booking) => booking.id !== id)
    }));
  },
  
  confirmBooking: (id) => {
    set((state) => ({
      bookings: state.bookings.map((booking) => 
        booking.id === id ? { ...booking, isConfirmed: true, isPending: false } : booking
      )
    }));
  },
  
  getBookingsByDate: (date) => {
    return get().bookings.filter((booking) => booking.date === date);
  },
}));
