'use server';

import { revalidatePath } from 'next/cache';

export async function addProject(formData: FormData) {
  const name = formData.get('name') as string;
  const color = formData.get('color') as string;

  await fetch('http://localhost:3000/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, color }),
  });

  revalidatePath('/dashboard');
}

// Ajoutez ici les actions renameProject et deleteProject de la partie 2
export async function renameProject(formData: FormData) {
  const id = formData.get('id') as string;
  const newName = formData.get('newName') as string;
  const color = formData.get('color') as string; // Assurez-vous d'avoir la couleur si nécessaire, sinon adaptez

  await fetch(`http://localhost:3000/api/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: newName, color: color }),
  });

  revalidatePath('/dashboard');
}

export async function deleteProject(formData: FormData) {
  const id = formData.get('id') as string;

  await fetch(`http://localhost:3000/api/projects/${id}`, {
    method: 'DELETE',
  });

  revalidatePath('/dashboard');
}