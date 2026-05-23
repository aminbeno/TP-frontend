import './globals.css'; // Si vous avez un fichier CSS global
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import LogoutButton from './components/LogoutButton'; // Assurez-vous d'importer le bouton

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TaskFlow Next',
  description: 'Gérez vos projets avec Next.js',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  const user = session ? JSON.parse(session.value) : null;

  return (
    <html lang="fr">
      <body className={inter.className}>
        <header style={{
          background: '#1B8C3E', color: 'white', padding: '1rem 2rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <h2 style={{ margin: 0 }}>TaskFlow</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {user && <span>Bonjour, {user.name}!</span>} {/* Affiche le nom de l'utilisateur */}
            {user && <LogoutButton />}
            {!user && <a href="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</a>}
          </div>
        </header>
        <main style={{ padding: '2rem' }}>{children}</main> {/* Ajoutez un peu de padding au main pour l'esthétique */}
      </body>
    </html>
  );
}