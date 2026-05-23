// src/features/auth/AuthProvider.tsx
import { useReducer, type ReactNode, useEffect } from 'react';
import { authReducer, initialState } from './authReducer';
import { AuthContext } from './AuthContext';
import { setAuthToken } from '../../api/axios';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  
  // Mettre à jour le token Axios à chaque changement de token
  useEffect(() => {
    setAuthToken(state.token);
  }, [state.token]);
  
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
