import Image from 'next/image';
import Link from 'next/link'; // Importez Link pour un meilleur routage

export default function NotFound() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', color: '#ccc' }}>404</h1>
      <div
        style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}
      >
        <Image
          src="/404.png"
          alt="Page not found"
          width={300}
          height={200}
          priority // Chargement prioritaire pour les images "above the fold"
        />
      </div>
      <p>Cette page n'existe pas</p>
      <Link href="/dashboard" style={{ color: '#1B8C3E', textDecoration: 'none' }}>
        ← Retour au Dashboard
      </Link>
    </div>
  );
}