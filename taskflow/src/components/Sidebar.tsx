import styles from './Sidebar.module.css';
import { NavLink } from 'react-router-dom';
import { memo } from 'react';

interface Project { id: string; name: string; color: string; }

interface SidebarProps {
  projects: Project[];
  isOpen: boolean;
  onRename: (p: Project) => void;
}

function Sidebar({ projects, isOpen, onRename }: SidebarProps) {
  console.log('Sidebar re-render');

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <h2 className={styles.title}>Mes Projets</h2>
      <ul className={styles.list}>
        {projects.map(p => (
          <li key={p.id} className={styles.projectItem}>
            <NavLink
              to={`/projects/${p.id}`}
              className={({ isActive }) =>
                `${styles.item} ${isActive ? styles.active : ''}`
              }
            >
              <span className={styles.dot} style={{ background: p.color }} />
              {p.name}
            </NavLink>
            <button
              className={styles.renameBtn}
              onClick={(e) => {
                e.preventDefault();
                onRename(p);
              }}
              title="Renommer"
            >
              ✎
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default memo(Sidebar);
