import AddProjectForm from './AddProjectForm';
import { deleteProject, renameProject } from '../actions/projects'; // Importez les actions de la partie 2

export default async function DashboardPage() {
  const res = await fetch('http://localhost:3000/api/projects', { cache: 'no-store' });
  const projects = await res.json();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <AddProjectForm />
      <ul>
        {projects.map((p: any) => (
          <li key={p.id} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: p.color, display: 'inline-block' }} />
            <a href={`/projects/${p.id}`}>{p.name}</a>

            {/* Bouton de renommage (ajouté pour la partie 2) */}
            <form action={renameProject} style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
              <input type="hidden" name="id" value={p.id} />
              <input type="hidden" name="color" value={p.color} /> {/* Passez la couleur existante */}
              <input name="newName" placeholder="Nouveau nom" style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }} />
              <button type="submit" style={{ background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer' }}>Renommer</button>
            </form>

            {/* Bouton de suppression (ajouté pour la partie 2) */}
            <form action={deleteProject} style={{ display: 'inline' }}>
              <input type="hidden" name="id" value={p.id} />
              <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'red' }}>
                &times;
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}