
import { User } from '@/types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

let authState: AuthState = {
  user: null,
  isLoading: false,
  error: null
};

const subscribers: Array<(state: AuthState) => void> = [];

function notifySubscribers() {
  subscribers.forEach(callback => callback(authState));
}

// Simulate password validation
const isPasswordValid = (password: string): boolean => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
  const isLongEnough = password.length >= 8;

  return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isLongEnough;
};

// Password validation feedback
export const getPasswordFeedback = (password: string): string[] => {
  const feedback: string[] = [];

  if (!/[A-Z]/.test(password)) feedback.push('Must contain an uppercase letter');
  if (!/[a-z]/.test(password)) feedback.push('Must contain a lowercase letter');
  if (!/[0-9]/.test(password)) feedback.push('Must contain a number');
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) feedback.push('Must contain a special character');
  if (password.length < 8) feedback.push('Must be at least 8 characters long');

  return feedback;
};

// Mock user storage
const users: Record<string, User & { password: string }> = {};

// Load users from localStorage
const loadUsers = () => {
  try {
    const storedUsers = localStorage.getItem('resumeBuilderUsers');
    if (storedUsers) {
      Object.assign(users, JSON.parse(storedUsers));
    }
    
    // Also check if there's a logged in user
    const storedUser = localStorage.getItem('resumeBuilderCurrentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      authState = {
        ...authState,
        user,
        isLoading: false
      };
      notifySubscribers();
    }
  } catch (error) {
    console.error('Failed to load users:', error);
  }
};

// Save users to localStorage
const saveUsers = () => {
  try {
    localStorage.setItem('resumeBuilderUsers', JSON.stringify(users));
  } catch (error) {
    console.error('Failed to save users:', error);
  }
};

// Sign up
export const signUp = async (email: string, password: string): Promise<User> => {
  authState = { ...authState, isLoading: true, error: null };
  notifySubscribers();

  return new Promise((resolve, reject) => {
    // Simulate API delay
    setTimeout(() => {
      if (users[email]) {
        authState = { ...authState, isLoading: false, error: 'Email already in use' };
        notifySubscribers();
        reject(new Error('Email already in use'));
        return;
      }

      if (!isPasswordValid(password)) {
        authState = { ...authState, isLoading: false, error: 'Password does not meet requirements' };
        notifySubscribers();
        reject(new Error('Password does not meet requirements'));
        return;
      }

      const newUser: User & { password: string } = {
        id: Date.now().toString(),
        email,
        password
      };

      users[email] = newUser;
      saveUsers();

      const { password: _, ...userWithoutPassword } = newUser;

      authState = {
        user: userWithoutPassword,
        isLoading: false,
        error: null
      };

      localStorage.setItem('resumeBuilderCurrentUser', JSON.stringify(userWithoutPassword));
      notifySubscribers();
      resolve(userWithoutPassword);
    }, 1000);
  });
};

// Sign in
export const signIn = async (email: string, password: string): Promise<User> => {
  authState = { ...authState, isLoading: true, error: null };
  notifySubscribers();

  return new Promise((resolve, reject) => {
    // Simulate API delay
    setTimeout(() => {
      const user = users[email];

      if (!user || user.password !== password) {
        authState = { ...authState, isLoading: false, error: 'Invalid email or password' };
        notifySubscribers();
        reject(new Error('Invalid email or password'));
        return;
      }

      const { password: _, ...userWithoutPassword } = user;

      authState = {
        user: userWithoutPassword,
        isLoading: false,
        error: null
      };

      localStorage.setItem('resumeBuilderCurrentUser', JSON.stringify(userWithoutPassword));
      notifySubscribers();
      resolve(userWithoutPassword);
    }, 1000);
  });
};

// Sign out
export const signOut = async (): Promise<void> => {
  authState = { user: null, isLoading: false, error: null };
  localStorage.removeItem('resumeBuilderCurrentUser');
  notifySubscribers();
  return Promise.resolve();
};

// Reset password
export const resetPassword = async (email: string): Promise<void> => {
  authState = { ...authState, isLoading: true, error: null };
  notifySubscribers();

  return new Promise((resolve, reject) => {
    // Simulate API delay
    setTimeout(() => {
      const user = users[email];

      if (!user) {
        authState = { ...authState, isLoading: false, error: 'Email not found' };
        notifySubscribers();
        reject(new Error('Email not found'));
        return;
      }

      // In a real app, you'd send an email with a reset link
      // Here we'll just simulate a successful password reset request
      authState = { ...authState, isLoading: false };
      notifySubscribers();
      resolve();
    }, 1000);
  });
};

// Set a new password
export const setNewPassword = async (email: string, newPassword: string): Promise<void> => {
  if (!isPasswordValid(newPassword)) {
    return Promise.reject(new Error('Password does not meet requirements'));
  }

  const user = users[email];
  if (!user) {
    return Promise.reject(new Error('User not found'));
  }

  user.password = newPassword;
  saveUsers();
  return Promise.resolve();
};

// Update user profile
export const updateProfile = async (userId: string, data: Partial<User>): Promise<User> => {
  authState = { ...authState, isLoading: true, error: null };
  notifySubscribers();

  return new Promise((resolve, reject) => {
    // Simulate API delay
    setTimeout(() => {
      if (!authState.user) {
        authState = { ...authState, isLoading: false, error: 'Not authenticated' };
        notifySubscribers();
        reject(new Error('Not authenticated'));
        return;
      }

      const userEmail = Object.keys(users).find(
        email => users[email].id === userId
      );

      if (!userEmail || !users[userEmail]) {
        authState = { ...authState, isLoading: false, error: 'User not found' };
        notifySubscribers();
        reject(new Error('User not found'));
        return;
      }

      const updatedUser = {
        ...users[userEmail],
        ...data
      };

      users[userEmail] = updatedUser;
      saveUsers();

      const { password: _, ...userWithoutPassword } = updatedUser;

      authState = {
        user: userWithoutPassword,
        isLoading: false,
        error: null
      };

      localStorage.setItem('resumeBuilderCurrentUser', JSON.stringify(userWithoutPassword));
      notifySubscribers();
      resolve(userWithoutPassword);
    }, 1000);
  });
};

// Subscribe to auth state changes
export const subscribeToAuthChanges = (callback: (state: AuthState) => void): () => void => {
  subscribers.push(callback);
  callback(authState); // Initial call with current state
  
  // Return unsubscribe function
  return () => {
    const index = subscribers.indexOf(callback);
    if (index > -1) {
      subscribers.splice(index, 1);
    }
  };
};

// Get current user
export const getCurrentUser = (): User | null => {
  return authState.user;
};

// Get auth state
export const getAuthState = (): AuthState => {
  return authState;
};

// Initialize auth on app start
export const initAuth = (): void => {
  loadUsers();
};
