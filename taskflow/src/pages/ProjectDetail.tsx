import { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import api from '../api/axios';
import Header from '../components/Header';
import styles from './ProjectDetail.module.css';

interface Project {
  id: string;
  name: string;
  color: string;
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !id) return;

    api.get(`/projects/${id}`)
      .then(res => setProject(res.data))
      .catch(error => {
        console.error("Erreur lors du chargement du projet :", error);
        navigate('/dashboard');
      })
      .finally(() => setLoading(false));
  }, [id, navigate, user]);

  if (!user) return <Navigate to="/login" replace />;
  if (!id) return <Navigate to="/dashboard" replace />;

  if (loading) return <div className={styles.loading}>Chargement...</div>;
  if (!project) return <div className={styles.error}>Projet non trouvé.</div>;

  return (
    <div className={styles.layout}>
      <Header
        title="TaskFlow"
        onMenuClick={() => navigate('/dashboard')}
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
