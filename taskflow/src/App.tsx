import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './features/auth/Login';
import Dashboard from './pages/Dashboard';
import ProjectDetail from './pages/ProjectDetail';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuthToken } from './features/auth/useAuthToken';

export default function App() {
  // Mettre à jour l'intercepteur Axios quand le token Redux change
  useAuthToken();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      } />
      <Route path="/projects/:id" element={
        <ProtectedRoute><ProjectDetail /></ProtectedRoute>
      } />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}