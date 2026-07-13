import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

export type UserPlan = 'free' | 'pro' | 'enterprise';

export interface User {
  id: string;
  email: string;
  name: string;
  plan: UserPlan;
  avatar?: string;
  createdAt: string;
}

interface AuthContextValue {
  user: User | null;
  isLoggedIn: boolean;
  canExport: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  upgradePlan: (plan: UserPlan) => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoggedIn: false,
  canExport: false,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  upgradePlan: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('automatch-user');
    return saved ? JSON.parse(saved) : null;
  });

  const isLoggedIn = user !== null;
  const canExport = user !== null && user.plan !== 'free';

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check for demo accounts
    const demoAccounts: Record<string, { name: string; plan: UserPlan }> = {
      'demo@automatch.com': { name: 'Demo User', plan: 'pro' },
      'free@automatch.com': { name: 'Free User', plan: 'free' },
      'enterprise@automatch.com': { name: 'Enterprise User', plan: 'enterprise' },
    };

    const demo = demoAccounts[email.toLowerCase()];
    if (demo || password.length >= 6) {
      const newUser: User = {
        id: `user-${Date.now()}`,
        email: email.toLowerCase(),
        name: demo?.name || email.split('@')[0],
        plan: demo?.plan || 'free',
        createdAt: new Date().toISOString(),
      };
      setUser(newUser);
      localStorage.setItem('automatch-user', JSON.stringify(newUser));
      return true;
    }
    return false;
  }, []);

  const register = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (password.length >= 6 && email.includes('@')) {
      const newUser: User = {
        id: `user-${Date.now()}`,
        email: email.toLowerCase(),
        name,
        plan: 'free',
        createdAt: new Date().toISOString(),
      };
      setUser(newUser);
      localStorage.setItem('automatch-user', JSON.stringify(newUser));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('automatch-user');
  }, []);

  const upgradePlan = useCallback((plan: UserPlan) => {
    if (user) {
      const updated = { ...user, plan };
      setUser(updated);
      localStorage.setItem('automatch-user', JSON.stringify(updated));
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, canExport, login, register, logout, upgradePlan }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
