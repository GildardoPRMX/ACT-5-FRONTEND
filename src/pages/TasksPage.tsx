import { TaskActions } from '../components/TaskActions';
import { TaskFilters } from '../components/TaskFilters';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { TaskSummary } from '../components/TaskSummary';
import type { Task } from '../models/task.interface';
import type {
  TaskFilter,
  TaskSort,
} from '../models/task-view.types';

interface TasksPageProps {
  tasks: Task[];
  visibleTasks: Task[];
  query: string;
  filter: TaskFilter;
  sortBy: TaskSort;
  emptyMessage: string;
  currentPage: number;
  pageSize: number;
  completedCount: number;
  onAddTask: (title: string) => void;
  onQueryChange: (value: string) => void;
  onFilterChange: (value: TaskFilter) => void;
  onSortChange: (value: TaskSort) => void;
  onClearCriteria: () => void;
  onClearCompleted: () => void;
  onPageChange: (page: number) => void;
  onToggleStatus: (id: string) => void;
  onEditTask: (id: string, title: string) => void;
  onDeleteTask: (id: string) => boolean;
}

export function TasksPage({
  tasks,
  visibleTasks,
  query,
  filter,
  sortBy,
  emptyMessage,
  currentPage,
  pageSize,
  completedCount,
  onAddTask,
  onQueryChange,
  onFilterChange,
  onSortChange,
  onClearCriteria,
  onClearCompleted,
  onPageChange,
  onToggleStatus,
  onEditTask,
  onDeleteTask,
}: TasksPageProps) {
  const totalPages = Math.max(1, Math.ceil(visibleTasks.length / pageSize));
  const pageStart = (currentPage - 1) * pageSize;
  const pageTasks = visibleTasks.slice(pageStart, pageStart + pageSize);

  return (
    <div className="page-stack">
      <section className="page-introduction" aria-labelledby="tasks-page-title">
        <p className="section-heading__eyebrow">Gestión</p>
        <h2 id="tasks-page-title">Mis tareas</h2>
        <p>
          Registra, consulta y actualiza las actividades almacenadas en el
          navegador.
        </p>
      </section>

      <TaskForm onAddTask={onAddTask} />
      <TaskFilters
        query={query}
        filter={filter}
        sortBy={sortBy}
        resultCount={visibleTasks.length}
        onQueryChange={onQueryChange}
        onFilterChange={onFilterChange}
        onSortChange={onSortChange}
        onClear={onClearCriteria}
      />
      <TaskSummary tasks={tasks} />
      <TaskActions
        completedCount={completedCount}
        onClearCompleted={onClearCompleted}
      />
      <TaskList
        tasks={pageTasks}
        totalCount={visibleTasks.length}
        emptyMessage={emptyMessage}
        onToggleStatus={onToggleStatus}
        onEditTask={onEditTask}
        onDeleteTask={onDeleteTask}
      />
      <nav className="pagination" aria-label="Paginación de tareas">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span aria-live="polite">
          Página {currentPage} de {totalPages}
        </span>
        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </nav>
    </div>
  );
}
