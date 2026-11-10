import { Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';

export function HomePage() {
  const { status, user, sessionMessage, retrySession, logout } = useAuth();
  const isAuthenticated = status === 'authenticated' && user;

  return (
    <section className="panel welcome-panel" aria-labelledby="home-title">
      <p className="section-heading__eyebrow">Inicio</p>
      <h2 id="home-title">Administrador de tareas protegido</h2>
      <p>Consulta y administra tareas sincronizadas con la API REST.</p>
      {isAuthenticated && (
        <p>Sesión activa para {user.name} con rol <strong>{user.role}</strong>.</p>
      )}
      {status === 'checking' && <p className="request-message" role="status">Validando la sesión…</p>}
      {status === 'error' && (
        <div className="request-error" role="alert">
          <p>{sessionMessage || 'No fue posible validar la sesión.'}</p>
          <div className="auth-actions">
            <button type="button" onClick={() => void retrySession()}>Reintentar</button>
            <button type="button" onClick={logout}>Cerrar sesión local</button>
          </div>
        </div>
      )}
      <div className="welcome-panel__actions">
        <Link className="button-link" to={isAuthenticated ? '/tasks' : '/login'}>
          {isAuthenticated ? 'Administrar tareas' : 'Iniciar sesión'}
        </Link>
        {!isAuthenticated && (
          <Link className="button-link button-link--secondary" to="/register">Crear cuenta</Link>
        )}
      </div>
    </section>
  );
}
