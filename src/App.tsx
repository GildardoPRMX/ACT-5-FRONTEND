import { useEffect, useState } from 'react';
import { AppHeader } from './components/AppHeader';
import { AppFooter } from './components/AppFooter';
import { TaskFilters } from './components/TaskFilters';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TaskSummary } from './components/TaskSummary';
import { TaskActions } from './components/TaskActions';
import { tasks as initialTasks } from './data/tasks';
import type { Task } from './models/task.interface';
import type {
  TaskFilter,
  TaskSort,
} from './models/task-view.types';
import { getVisibleTasks } from './services/task-query.service';
import {
  loadTasks,
  saveTasks,
} from './services/task-storage.service';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() =>
    loadTasks(initialTasks),
  );
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [sortBy, setSortBy] = useState<TaskSort>('updated-desc');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const visibleTasks = getVisibleTasks(tasks, {
    query,
    filter,
    sortBy,
  });
  const hasActiveCriteria = query.trim() !== '' || filter !== 'all';
  const emptyMessage = hasActiveCriteria
    ? 'No hay tareas que coincidan con la búsqueda y el filtro.'
    : 'Utiliza el formulario para registrar una nueva actividad.';
  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(visibleTasks.length / pageSize));
  const currentVisiblePage = Math.min(currentPage, totalPages);
  const startIndex = (currentVisiblePage - 1) * pageSize;
  const paginatedTasks = visibleTasks.slice(startIndex, startIndex + pageSize);

  function handleAddTask(title: string) {
    const now = new Date().toISOString();
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      status: 'pending',
      createdAt: now,
      updatedAt: now,
    };

    setTasks((currentTasks) => [
      newTask,
      ...currentTasks,
    ]);
    setCurrentPage(1);
  }

  function handleToggleStatus(id: string) {
    const now = new Date().toISOString();

    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== id) {
          return task;
        }

        return {
          ...task,
          status:
            task.status === 'pending'
              ? 'completed'
              : 'pending',
          updatedAt: now,
        };
      }),
    );
    setCurrentPage(1);
  }

  function handleEditTask(
    id: string,
    title: string,
  ) {
    const now = new Date().toISOString();

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title,
              updatedAt: now,
            }
          : task,
      ),
    );
    setCurrentPage(1);
  }

  function handleDeleteTask(id: string) {
    const selectedTask = tasks.find(
      (task) => task.id === id,
    );

    if (!selectedTask) {
      return;
    }

    const shouldDelete = window.confirm(
      `¿Eliminar la tarea "${selectedTask.title}"?`,
    );

    if (!shouldDelete) {
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id),
    );
    setCurrentPage(1);
  }

  function handleQueryChange(value: string) {
    setQuery(value);
    setCurrentPage(1);
  }

  function handleFilterChange(value: TaskFilter) {
    setFilter(value);
    setCurrentPage(1);
  }

  function handleSortChange(value: TaskSort) {
    setSortBy(value);
    setCurrentPage(1);
  }

  function handleClearCriteria() {
    setQuery('');
    setFilter('all');
    setSortBy('updated-desc');
    setCurrentPage(1);
  }

  const completedCount = tasks.filter(
    (task) => task.status === 'completed',
  ).length;

  function handleClearCompleted() {
    if (completedCount === 0) {
      return;
    }

    const shouldClear = window.confirm(
      `¿Eliminar las ${completedCount} tareas completadas?`,
    );

    if (!shouldClear) {
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.status !== 'completed'),
    );
    setCurrentPage(1);
  }

  return (
    <div className="app-shell">
      <AppHeader />
      <main className="app-main">
        <TaskForm onAddTask={handleAddTask} />
        <TaskFilters
          query={query}
          filter={filter}
          sortBy={sortBy}
          resultCount={visibleTasks.length}
          onQueryChange={handleQueryChange}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          onClear={handleClearCriteria}
        />
        <TaskSummary tasks={tasks} />
        <TaskActions
          completedCount={completedCount}
          onClearCompleted={handleClearCompleted}
        />
        <TaskList
          tasks={paginatedTasks}
          totalCount={visibleTasks.length}
          emptyMessage={emptyMessage}
          onToggleStatus={handleToggleStatus}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />
        <nav className="pagination" aria-label="Paginación de tareas">
          <button
            type="button"
            onClick={() =>
              setCurrentPage((page) => Math.max(1, page - 1))
            }
            disabled={currentVisiblePage === 1}
          >
            Anterior
          </button>
          <p aria-live="polite">
            Página {currentVisiblePage} de {totalPages}
          </p>
          <button
            type="button"
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
            }
            disabled={currentVisiblePage === totalPages}
          >
            Siguiente
          </button>
        </nav>
      </main>
      <AppFooter courseName="Diseño Frontend con Frameworks" />
    </div>
  );
}
