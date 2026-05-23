import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import LogoutButton from './components/LogoutButton';
import Link from 'next/link';

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
  const sessionCookie = cookieStore.get('session');
  const user = sessionCookie ? JSON.parse(sessionCookie.value) : null;

  return (
    <html lang="fr">
      <body className={inter.className}>
        <header
          style={{
            background: '#1B8C3E',
            color: 'white',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2 style={{ margin: 0 }}>TaskFlow</h2>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            {user && <span>Bonjour, {user.name}!</span>}
            {user && <LogoutButton />}
            {!user && (
              <Link
                href="/login"
                style={{ color: 'white', textDecoration: 'none' }}
              >
                Login
              </Link>
            )}
          </div>
        </header>
        <main style={{ padding: '2rem' }}>{children}</main>
      </body>
    </html>
  );
}
