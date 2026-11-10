import { Link } from 'react-router';
import { TaskSummary } from '../components/TaskSummary';
import type { Task } from '../models/task.interface';
import type { RequestStatus } from '../models/request-status.type';

interface HomePageProps {
  tasks: Task[];
  totalCount: number;
  status: RequestStatus;
  errorMessage: string;
  onRetry: () => void;
}

export function HomePage({ tasks, totalCount, status, errorMessage, onRetry }: HomePageProps) {
  return (
    <div className="page-stack">
      <section
        className="panel welcome-panel"
        aria-labelledby="home-title"
      >
        <p className="section-heading__eyebrow">Inicio</p>
        <h2 id="home-title">Organiza y consulta tus actividades</h2>
        <p>
          Registra tareas, actualiza su estado y utiliza las herramientas
          de consulta para concentrarte en el trabajo importante.
        </p>
        <div className="welcome-panel__actions">
          <Link className="button-link" to="/tasks">
            Administrar tareas
          </Link>
        </div>
      </section>
      {status === 'loading' && <p className="request-message" role="status">Consultando tareas…</p>}
      {status === 'error' && (
        <div className="request-error" role="alert">
          <p>{errorMessage}</p>
          <button type="button" onClick={onRetry}>Reintentar consulta</button>
        </div>
      )}
      <TaskSummary tasks={tasks} totalCount={totalCount} />
    </div>
  );
}
