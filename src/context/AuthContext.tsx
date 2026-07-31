import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  name: string;
  email: string;
  workspaceName?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => void;
  logout: () => void;
  requestAccess: (data: { nameOrCompany?: string; phone: string; email: string; lookingFor?: string }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem('proposala_user');
      if (savedUser) {
        return JSON.parse(savedUser);
      }
    } catch (e) {
      console.error('Failed to parse saved user state', e);
    }
    // Default mock authenticated user for instant preview capability
    return {
      name: 'Ejaz Karim',
      email: 'ejaz@proposala.io',
      workspaceName: "Ejaz Karim's workspace",
    };
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const savedAuth = localStorage.getItem('proposala_auth');
      if (savedAuth !== null) {
        return JSON.parse(savedAuth);
      }
    } catch (e) {
      console.error('Failed to parse saved auth state', e);
    }
    // Default to true so user lands directly on active state unless manually logging out
    return true;
  });

  useEffect(() => {
    localStorage.setItem('proposala_auth', JSON.stringify(isAuthenticated));
    if (user) {
      localStorage.setItem('proposala_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('proposala_user');
    }
  }, [isAuthenticated, user]);

  const login = (email: string, _password?: string) => {
    const extractedName = email.split('@')[0] || 'User';
    const formattedName = extractedName.charAt(0).toUpperCase() + extractedName.slice(1);
    const newUser: User = {
      name: email.includes('ejaz') ? 'Ejaz Karim' : formattedName,
      email: email,
      workspaceName: `${email.includes('ejaz') ? 'Ejaz Karim' : formattedName}'s workspace`,
    };
    setUser(newUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('proposala_auth');
    localStorage.removeItem('proposala_user');
  };

  const requestAccess = (data: { nameOrCompany?: string; phone: string; email: string; lookingFor?: string }) => {
    console.log('Request access submitted:', data);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, requestAccess }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
