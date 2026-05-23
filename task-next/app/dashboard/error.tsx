'use client'; // Ce composant doit être un Client Component

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Vous pouvez logguer l'erreur dans un service de surveillance d'erreurs ici
    console.error(error);
  }, [error]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
      <h2>Une erreur est survenue !</h2>
      <p>{error.message}</p>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#1B8C3E',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Réessayer
      </button>
    </div>
  );
}