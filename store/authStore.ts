/**
 * Authentication Store using Zustand
 * Manages global auth state across the app
 */

import { create } from 'zustand';
import { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { getUserData, UserData } from '@/services/authService';

interface AuthState {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  initialized: boolean;
  setUser: (user: User | null) => void;
  setUserData: (userData: UserData | null) => void;
  setLoading: (loading: boolean) => void;
  initialize: () => void;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  userData: null,
  loading: true,
  initialized: false,

  setUser: (user) => set({ user }),
  
  setUserData: (userData) => set({ userData }),
  
  setLoading: (loading) => set({ loading }),

  // Check if current user is admin
  isAdmin: () => {
    const { userData } = get();
    return userData?.role === 'admin';
  },

  // Initialize auth listener
  initialize: () => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      set({ loading: true });
      
      if (user) {
        // User is signed in
        try {
          const userData = await getUserData(user.uid);
          set({ 
            user, 
            userData, 
            loading: false, 
            initialized: true 
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
          set({ 
            user, 
            userData: null, 
            loading: false, 
            initialized: true 
          });
        }
      } else {
        // User is signed out
        set({ 
          user: null, 
          userData: null, 
          loading: false, 
          initialized: true 
        });
      }
    });

    return unsubscribe;
  },
}));
