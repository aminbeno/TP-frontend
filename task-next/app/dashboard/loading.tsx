'use client'; // Ajoutez cette ligne au tout début du fichier

export default function Loading() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <p>Chargement des projets...</p>
      {/* Optionnel : ajoutez un spinner ou une animation */}
      <div
        style={{
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #1B8C3E',
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          animation: 'spin 1s linear infinite',
          margin: '20px auto',
        }}
      ></div>
      {/* Le bloc style jsx est ce qui cause le problème */}
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}