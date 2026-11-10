import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import type { Task } from '../models/task.interface';
import { useAuth } from '../hooks/useAuth';
import { getHttpErrorMessage, isAbortRequest, isHttpError } from '../services/http.service';
import { getTaskById } from '../services/task.api.service';
import { formatTaskDate } from '../utils/date';
import { NotFoundPage } from './NotFoundPage';

type DetailStatus = 'loading' | 'success' | 'not-found' | 'error';

interface TaskDetailPageProps {
  operationMessage: string;
  onDeleteTask: (id: string, title: string) => Promise<boolean>;
}

interface DetailResult {
  taskId: string;
  reloadVersion: number;
  status: Exclude<DetailStatus, 'loading'>;
  task: Task | null;
  errorMessage: string;
}

export function TaskDetailPage({ operationMessage, onDeleteTask }: TaskDetailPageProps) {
  const { taskId = '' } = useParams<{ taskId: string }>();
  const { accessToken, user } = useAuth();
  const navigate = useNavigate();
  const [result, setResult] = useState<DetailResult | null>(null);
  const [reloadVersion, setReloadVersion] = useState(0);
  const currentResult = accessToken && result?.taskId === taskId && result.reloadVersion === reloadVersion
    ? result
    : null;
  const status: DetailStatus = currentResult?.status ?? 'loading';
  const task = currentResult?.task ?? null;

  useEffect(() => {
    const controller = new AbortController();
    async function loadTask(): Promise<void> {
      try {
        if (!accessToken) return;
        const response = await getTaskById(taskId, accessToken, controller.signal);
        setResult({ taskId, reloadVersion, status: 'success', task: response.data, errorMessage: '' });
      } catch (error) {
        if (isAbortRequest(error)) return;
        if (isHttpError(error) && error.status === 404) {
          setResult({ taskId, reloadVersion, status: 'not-found', task: null, errorMessage: '' });
          return;
        }
        setResult({ taskId, reloadVersion, status: 'error', task: null, errorMessage: getHttpErrorMessage(error) });
      }
    }

    if (taskId && accessToken) void loadTask();
    return () => controller.abort();
  }, [accessToken, taskId, reloadVersion]);

  if (status === 'not-found') {
    return <NotFoundPage title="Tarea no encontrada" message="La tarea solicitada no existe o fue eliminada." />;
  }

  if (status === 'loading') {
    return <p className="request-message" role="status">Consultando detalle de la tarea…</p>;
  }

  if (status === 'error' || !task) {
    return (
      <div className="request-error" role="alert">
        <p>{currentResult?.errorMessage || 'No fue posible cargar la tarea.'}</p>
        <button type="button" onClick={() => setReloadVersion((version) => version + 1)}>Reintentar</button>
      </div>
    );
  }

  const currentTask = task;
  const statusLabel = task.status === 'completed' ? 'Completada' : 'Pendiente';
  const canDelete = user?.role === 'admin';

  async function handleDeleteTask(): Promise<void> {
    if (await onDeleteTask(currentTask.id, currentTask.title)) {
      navigate('/tasks', { replace: true });
    }
  }

  return (
    <article className="panel task-detail" aria-labelledby="task-detail-title">
      <p className="section-heading__eyebrow">Detalle remoto</p>
      <h2 id="task-detail-title">{task.title}</h2>
      <dl className="task-detail__grid">
        <div><dt>Identificador</dt><dd>{task.id}</dd></div>
        <div><dt>Estado</dt><dd>{statusLabel}</dd></div>
        <div><dt>Fecha de creación</dt><dd><time dateTime={task.createdAt}>{formatTaskDate(task.createdAt)}</time></dd></div>
        <div><dt>Última actualización</dt><dd><time dateTime={task.updatedAt}>{formatTaskDate(task.updatedAt)}</time></dd></div>
      </dl>
      {operationMessage && <p className="field-error" role="alert">{operationMessage}</p>}
      {!canDelete && (
        <p className="operation-message" role="status">Eliminar tareas requiere el rol admin. La API valida este permiso.</p>
      )}
      <div className="task-detail__actions">
        <Link className="button-link button-link--secondary" to="/tasks">Volver a tareas</Link>
        {canDelete && <button type="button" className="button-danger" onClick={() => void handleDeleteTask()}>Eliminar tarea</button>}
      </div>
    </article>
  );
}
