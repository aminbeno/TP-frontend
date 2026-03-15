import { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext'; 
import api from '../api/axios';
import Header from '../components/Header';
import styles from './ProjectDetail.module.css';

interface Project {
  id: string;
  name: string;
  color: string;
}

export default function ProjectDetail() {
  // Specify type for useParams to get 'id' as a string
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state: authState, dispatch } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ne lancer l'appel que si l'utilisateur est authentifié et que l'ID existe
    if (!authState.user || !id) return;

    api.get(`/projects/${id}`)
      .then(res => setProject(res.data))
      .catch(error => {
        console.error("Erreur lors du chargement du projet :", error);
        navigate('/dashboard');
      })
      .finally(() => setLoading(false));
  }, [id, navigate, authState.user]);

  // Redirection pendant le rendu (plus performant et évite les erreurs de useEffect)
  if (!authState.user) return <Navigate to="/login" replace />;
  if (!id) return <Navigate to="/dashboard" replace />;

  if (loading) return <div className={styles.loading}>Chargement...</div>;

  // If after loading, the project is still null, it means it wasn't found or an error occurred.
  // Display a more informative message instead of just 'null'.
  if (!project) return <div className={styles.error}>Projet non trouvé.</div>;

  return (
    <div className={styles.layout}>
      <Header
        title="TaskFlow"
        onMenuClick={() => navigate('/dashboard')}
        // BUG 2 FIX: 'authState.user' is guaranteed not to be null here
        // because of the early return check above.
        userName={authState.user.name}
        onLogout={() => dispatch({ type: 'LOGOUT' })}
      />
      <main className={styles.main}>
        <div className={styles.header}>
          <span className={styles.dot} style={{ background: project.color }} />
          <h2>{project.name}</h2>
        </div>
        <p className={styles.info}>Projet ID: {project.id}</p>
      </main>
    </div>
  );
}