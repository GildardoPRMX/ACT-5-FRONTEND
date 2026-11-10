import { Navigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { formatTaskDate } from '../utils/date';

export function ProfilePage() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;

  return (
    <article className="panel task-detail" aria-labelledby="profile-title">
      <p className="section-heading__eyebrow">Cuenta</p>
      <h2 id="profile-title">Mi perfil</h2>
      <dl className="task-detail__grid">
        <div><dt>Nombre</dt><dd>{user.name}</dd></div>
        <div><dt>Correo electrónico</dt><dd>{user.email}</dd></div>
        <div><dt>Rol</dt><dd>{user.role}</dd></div>
        <div><dt>Cuenta creada</dt><dd><time dateTime={user.createdAt}>{formatTaskDate(user.createdAt)}</time></dd></div>
        <div><dt>Última actualización</dt><dd><time dateTime={user.updatedAt}>{formatTaskDate(user.updatedAt)}</time></dd></div>
      </dl>
    </article>
  );
}
