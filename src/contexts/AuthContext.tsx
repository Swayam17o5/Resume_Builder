
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types';
import { 
  initAuth, 
  signIn, 
  signUp, 
  signOut, 
  resetPassword,
  setNewPassword,
  updateProfile,
  subscribeToAuthChanges,
  getAuthState,
  getPasswordFeedback
} from '@/services/authService';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  setNewPassword: (email: string, newPassword: string) => Promise<void>;
  updateProfile: (userId: string, data: Partial<User>) => Promise<void>;
  getPasswordFeedback: (password: string) => string[];
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  resetPassword: async () => {},
  setNewPassword: async () => {},
  updateProfile: async () => {},
  getPasswordFeedback: () => []
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const initialState = getAuthState();
    return {
      user: initialState.user,
      isLoading: initialState.isLoading,
      error: initialState.error,
      isAuthenticated: !!initialState.user
    };
  });

  useEffect(() => {
    // Initialize auth service
    initAuth();
    
    // Subscribe to auth state changes
    const unsubscribe = subscribeToAuthChanges((state) => {
      setAuthState({
        user: state.user,
        isLoading: state.isLoading,
        error: state.error,
        isAuthenticated: !!state.user
      });
    });
    
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    try {
      await signIn(email, password);
    } catch (error) {
      // Error already handled by auth service
    }
  };

  const handleSignUp = async (email: string, password: string) => {
    try {
      await signUp(email, password);
    } catch (error) {
      // Error already handled by auth service
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      // Error already handled by auth service
    }
  };

  const handleResetPassword = async (email: string) => {
    try {
      await resetPassword(email);
    } catch (error) {
      // Error already handled by auth service
    }
  };

  const handleSetNewPassword = async (email: string, newPassword: string) => {
    try {
      await setNewPassword(email, newPassword);
    } catch (error) {
      // Error already handled by auth service
    }
  };

  const handleUpdateProfile = async (userId: string, data: Partial<User>) => {
    try {
      await updateProfile(userId, data);
    } catch (error) {
      // Error already handled by auth service
    }
  };

  const value = {
    ...authState,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    resetPassword: handleResetPassword,
    setNewPassword: handleSetNewPassword,
    updateProfile: handleUpdateProfile,
    getPasswordFeedback
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
