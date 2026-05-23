import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import ProjectForm from '../components/ProjectForm';
import useProjects from '../hooks/useProjects';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const {
    projects,
    columns,
    loading,
    error,
    addProject,
    renameProject
  } = useProjects();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showForm, setShowForm] = useState(false);

  if (loading) return <div className={styles.loading}>Chargement...</div>;

  return (
    <div className={styles.layout}>
      <Header
        title="TaskFlow"
        onMenuClick={() => setSidebarOpen(p => !p)}
      />
      <div className={styles.body}>
        <Sidebar
          projects={projects}
          isOpen={sidebarOpen}
          onRename={renameProject}
        />
        <div className={styles.content}>
          <div className={styles.toolbar}>
            {error && <div className={styles.error}>{error}</div>}
            {!showForm ? (
              <button
                className={styles.addBtn}
                onClick={() => setShowForm(true)}
              >
                + Nouveau projet
              </button>
            ) : (
              <ProjectForm
                submitLabel="Créer"
                onSubmit={(name, color) => {
                  addProject(name, color);
                  setShowForm(false);
                }}
                onCancel={() => setShowForm(false)}
              />
            )}
          </div>
          <MainContent columns={columns} />
        </div>
      </div>
    </div>
  );
}
