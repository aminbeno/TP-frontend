// src/features/auth/AuthProvider.tsx
import { useReducer, type ReactNode } from 'react';
import { authReducer, initialState } from './authReducer';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
