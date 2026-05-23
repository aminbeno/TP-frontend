import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { setAuthToken } from '../../api/axios';

/**
 * Hook personnalisé pour mettre à jour l'intercepteur Axios
 * quand le token Redux change
 */
export function useAuthToken() {
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    setAuthToken(token);
  }, [token]);
}
