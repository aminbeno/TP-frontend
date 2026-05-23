import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateStaticParams() {
  const projects = await prisma.project.findMany();
  return projects.map((p) => ({ id: String(p.id) }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  if (!id) return notFound();

  const projectId = parseInt(id, 10);

  // Si l'ID n'est pas un nombre, on arrête TOUT de suite pour éviter l'erreur Prisma
  if (isNaN(projectId)) {
    return notFound();
  }

  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project) {
    return notFound();
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>
        <span
          style={{
            display: 'inline-block',
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: project.color,
            marginRight: 8,
          }}
        />
        {project.name}
      </h1>
      <p>Créé le : {project.createdAt.toLocaleDateString('fr-FR')}</p>
      <Link href="/dashboard" style={{ color: '#1B8C3E', textDecoration: 'none' }}>
        ← Retour au Dashboard
      </Link>
    </div>
  );
}
