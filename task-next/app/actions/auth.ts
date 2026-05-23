'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (email !== 'admin@taskflow.com' || password !== 'password123') {
    return { error: 'Email ou mot de passe incorrect' };
  }

  const cookieStore = await cookies();
  cookieStore.set('session', JSON.stringify({
    email, name: 'Admin', role: 'admin'
  }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Mettre à true en production
    maxAge: 3600, // 1 heure
    path: '/',
  });

  redirect('/dashboard');
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  redirect('/login');
}