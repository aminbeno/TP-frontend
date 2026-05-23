import AddProjectForm from './AddProjectForm';
import { deleteProject } from '../actions/projects'; // Supprimez renameProject si vous ne l'utilisez pas ici
import { prisma } from '@/lib/prisma'; // Importez prisma

export default async function DashboardPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <p>{projects.length} projets</p>
      <AddProjectForm />
      <ul>
        {projects.map((p) => (
          <li
            key={p.id}
            style={{
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: p.color,
                display: 'inline-block',
              }}
            />
            <a href={`/projects/${p.id}`}>{p.name}</a>

            {/* Formulaire de suppression */}
            <form action={deleteProject} style={{ display: 'inline' }}>
              <input type="hidden" name="id" value={p.id} />
              <button
                type="submit"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'red',
                  fontSize: '1.2em',
                }}
              >
                &times;
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}