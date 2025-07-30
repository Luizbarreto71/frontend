import { useState, useEffect, createContext, useContext } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface User {
  id: string;
  name: string;
  email: string;
  hasPremium: boolean;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPremiumAccess: () => boolean;
  activatePremium: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    // Return mock auth for now
    const [user, setUser] = useLocalStorage<User | null>('currentUser', null);
    
    return {
      user,
      login: async (email: string, password: string) => {
        // Mock login - in production, this would call your API
        const mockUser: User = {
          id: Date.now().toString(),
          name: email.split('@')[0],
          email,
          hasPremium: false,
          createdAt: new Date()
        };
        setUser(mockUser);
        return true;
      },
      register: async (name: string, email: string, password: string) => {
        // Mock register - in production, this would call your API
        const mockUser: User = {
          id: Date.now().toString(),
          name,
          email,
          hasPremium: false,
          createdAt: new Date()
        };
        setUser(mockUser);
        return true;
      },
      logout: () => {
        setUser(null);
      },
      hasPremiumAccess: () => {
        return user?.hasPremium || false;
      },
      activatePremium: () => {
        if (user) {
          setUser({ ...user, hasPremium: true });
        }
      }
    };
  }
  return context;
}