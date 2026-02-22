import { create } from 'zustand';
import { User } from '../types';

interface UIState {
  theme: 'light' | 'dark';
  language: 'en' | 'ar';
  sidebarOpen: boolean;
  currentUser: User | null;
  
  toggleTheme: () => void;
  setLanguage: (lang: 'en' | 'ar') => void;
  toggleSidebar: () => void;
  setSidebar: (open: boolean) => void;
  login: (user: User) => void;
  logout: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  theme: 'light',
  language: 'en',
  sidebarOpen: true,
  currentUser: {
    id: '1',
    name: 'Alex Cashier',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
  },

  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  setLanguage: (language) => set({ language }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebar: (sidebarOpen) => set({ sidebarOpen }),
  login: (currentUser) => set({ currentUser }),
  logout: () => set({ currentUser: null }),
}));
