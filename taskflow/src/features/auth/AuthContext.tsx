// src/features/auth/AuthContext.tsx
import { createContext, useContext } from 'react';
import { type AuthState, type AuthAction } from './authReducer';

interface AuthContextType {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

// Custom hook pour consommer le context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
}