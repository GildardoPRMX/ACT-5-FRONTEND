import { TaskFilters } from '../components/TaskFilters';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { TaskSummary } from '../components/TaskSummary';
import type { Task } from '../models/task.interface';
import type { RequestStatus } from '../models/request-status.type';
import type { TaskFilter, TaskSort } from '../models/task-view.types';

interface TasksPageProps {
  tasks: Task[];
  totalCount: number;
  query: string;
  filter: TaskFilter;
  sortBy: TaskSort;
  status: RequestStatus;
  errorMessage: string;
  operationMessage: string;
  emptyMessage: string;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onAddTask: (title: string) => Promise<boolean>;
  onQueryChange: (value: string) => void;
  onFilterChange: (value: TaskFilter) => void;
  onSortChange: (value: TaskSort) => void;
  onClearCriteria: () => void;
  onPageChange: (page: number) => void;
  onToggleStatus: (id: string) => Promise<boolean>;
  onEditTask: (id: string, title: string) => Promise<boolean>;
  onDeleteTask: (id: string, title: string) => Promise<boolean>;
  onRetry: () => void;
}

export function TasksPage({
  tasks,
  totalCount,
  query,
  filter,
  sortBy,
  status,
  errorMessage,
  operationMessage,
  emptyMessage,
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  onAddTask,
  onQueryChange,
  onFilterChange,
  onSortChange,
  onClearCriteria,
  onPageChange,
  onToggleStatus,
  onEditTask,
  onDeleteTask,
  onRetry,
}: TasksPageProps) {
  return (
    <div className="page-stack">
      <section className="page-introduction" aria-labelledby="tasks-page-title">
        <p className="section-heading__eyebrow">Gestión</p>
        <h2 id="tasks-page-title">Mis tareas</h2>
        <p>Registra y administra las actividades sincronizadas con la API.</p>
      </section>

      <TaskForm onAddTask={onAddTask} />
      <TaskFilters
        query={query}
        filter={filter}
        sortBy={sortBy}
        resultCount={totalCount}
        onQueryChange={onQueryChange}
        onFilterChange={onFilterChange}
        onSortChange={onSortChange}
        onClear={onClearCriteria}
      />
      <TaskSummary tasks={tasks} totalCount={totalCount} />

      {operationMessage && (
        <p className="request-error" role="alert">{operationMessage}</p>
      )}

      {status === 'loading' && (
        <p className="request-message" role="status">Consultando tareas…</p>
      )}
      {status === 'error' && (
        <div className="request-error" role="alert">
          <p>{errorMessage}</p>
          <button type="button" onClick={onRetry}>Reintentar consulta</button>
        </div>
      )}

      <TaskList
        tasks={tasks}
        totalCount={totalCount}
        emptyMessage={status === 'loading' ? 'Cargando resultados…' : emptyMessage}
        onToggleStatus={onToggleStatus}
        onEditTask={onEditTask}
        onDeleteTask={onDeleteTask}
      />
      <nav className="pagination" aria-label="Paginación de tareas">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={!hasPreviousPage || status === 'loading'}
        >
          Anterior
        </button>
        <span aria-live="polite">
          Página {currentPage} de {Math.max(1, totalPages)}
        </span>
        <button
          type="button"
          onClick={() => onPageChange(Math.min(Math.max(1, totalPages), currentPage + 1))}
          disabled={!hasNextPage || status === 'loading'}
        >
          Siguiente
        </button>
      </nav>
    </div>
  );
}
