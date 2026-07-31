import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  signOut as firebaseSignOut, 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  User as FirebaseUser 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '../lib/firebase';

export interface User {
  uid?: string;
  name: string;
  email: string;
  workspaceName?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  requestAccess: (data: { nameOrCompany?: string; phone: string; email: string; lookingFor?: string }) => void;
  firebaseUser: FirebaseUser | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem('proposala_user');
      if (savedUser) {
        return JSON.parse(savedUser);
      }
    } catch (e) {
      console.error('Failed to parse saved user state', e);
    }
    return null;
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
    return false;
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        setIsAuthenticated(true);
        const userDocRef = doc(db, 'users', fbUser.uid);
        try {
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const data = docSnap.data() as User;
            setUser({ ...data, uid: fbUser.uid });
          } else {
            const newUser: User = {
              uid: fbUser.uid,
              name: fbUser.displayName || fbUser.email?.split('@')[0] || 'User',
              email: fbUser.email || '',
              workspaceName: `${fbUser.displayName || 'User'}'s workspace`,
            };
            await setDoc(userDocRef, {
              ...newUser,
              updatedAt: new Date().toISOString()
            });
            setUser(newUser);
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, `users/${fbUser.uid}`);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem('proposala_auth', JSON.stringify(isAuthenticated));
    if (user) {
      localStorage.setItem('proposala_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('proposala_user');
    }
  }, [isAuthenticated, user]);

  const login = async (email: string, _password?: string) => {
    const extractedName = email.split('@')[0] || 'User';
    const formattedName = extractedName.charAt(0).toUpperCase() + extractedName.slice(1);
    const deterministicUid = `user_${email.replace(/[^a-zA-Z0-9]/g, '_')}`;
    const newUser: User = {
      uid: deterministicUid,
      name: formattedName,
      email: email,
      workspaceName: `${formattedName}'s workspace`,
    };
    setUser(newUser);
    setIsAuthenticated(true);

    try {
      if (newUser.uid) {
        const userDocRef = doc(db, 'users', newUser.uid);
        await setDoc(userDocRef, { ...newUser, updatedAt: new Date().toISOString() }, { merge: true });
      }
    } catch (err) {
      console.error('Failed to sync user to Firestore:', err);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;
      const newUser: User = {
        uid: fbUser.uid,
        name: fbUser.displayName || 'User',
        email: fbUser.email || '',
        workspaceName: `${fbUser.displayName || 'User'}'s workspace`,
      };
      setUser(newUser);
      setIsAuthenticated(true);
      const userDocRef = doc(db, 'users', fbUser.uid);
      await setDoc(userDocRef, { ...newUser, updatedAt: new Date().toISOString() }, { merge: true });
    } catch (error) {
      console.error('Google Sign-In failed:', error);
      // Fallback to demo login if popup blocked or offline
      await login('ejaz@proposala.io');
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      console.error(e);
    }
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('proposala_auth');
    localStorage.removeItem('proposala_user');
  };

  const requestAccess = (data: { nameOrCompany?: string; phone: string; email: string; lookingFor?: string }) => {
    console.log('Request access submitted:', data);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, loginWithGoogle, logout, requestAccess, firebaseUser }}>
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

