import { useMemo, useState } from 'react';
import { Route, Routes, useSearchParams } from 'react-router';
import { useAuth } from './hooks/useAuth';
import { useTaskList } from './hooks/useTaskList';
import { AppLayout } from './layouts/AppLayout';
import type { Task } from './models/task.interface';
import type { TaskFilter, TaskSort } from './models/task-view.types';
import type { TaskListQuery } from './models/api.types';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProfilePage } from './pages/ProfilePage';
import { RegisterPage } from './pages/RegisterPage';
import { TaskDetailPage } from './pages/TaskDetailPage';
import { TasksPage } from './pages/TasksPage';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { PublicOnlyRoute } from './routes/PublicOnlyRoute';
import { getHttpErrorMessage } from './services/http.service';
import { createTask, deleteTask, updateTask } from './services/task.api.service';

const PAGE_SIZE = 5;

export default function App() {
  const { accessToken, user, status: authStatus } = useAuth();
  const taskToken = authStatus === 'authenticated' ? accessToken : null;
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [sortBy, setSortBy] = useState<TaskSort>('updated-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [operationMessage, setOperationMessage] = useState('');

  const apiSort: TaskListQuery['sortBy'] = sortBy.startsWith('updated-') ? 'updatedAt' : 'title';
  const apiOrder: TaskListQuery['order'] = sortBy.endsWith('-asc') ? 'asc' : 'desc';
  const normalizedQuery = query.trim().slice(0, 60);
  const taskListQuery = useMemo<TaskListQuery>(() => ({
    page: currentPage,
    limit: PAGE_SIZE,
    sortBy: apiSort,
    order: apiOrder,
    ...(normalizedQuery ? { search: normalizedQuery } : {}),
    ...(filter === 'all' ? {} : { status: filter }),
  }), [apiOrder, apiSort, currentPage, filter, normalizedQuery]);
  const taskList = useTaskList(taskListQuery, taskToken);
  const tasks: Task[] = taskList.data?.data ?? [];
  const meta = taskList.data?.meta;
  const totalCount = meta?.total ?? 0;
  const totalPages = meta?.totalPages ?? 0;
  const canDelete = user?.role === 'admin';

  async function runMutation(request: (token: string) => Promise<unknown>): Promise<boolean> {
    if (!taskToken) return false;
    setOperationMessage('');
    try {
      await request(taskToken);
      taskList.reload();
      return true;
    } catch (error) {
      setOperationMessage(getHttpErrorMessage(error));
      return false;
    }
  }

  function handleAddTask(title: string): Promise<boolean> {
    setCurrentPage(1);
    return runMutation((token) => createTask({ title }, token));
  }

  function handleToggleStatus(id: string): Promise<boolean> {
    const task = tasks.find((currentTask) => currentTask.id === id);
    if (!task) return Promise.resolve(false);
    const status = task.status === 'pending' ? 'completed' : 'pending';
    return runMutation((token) => updateTask(id, { status }, token));
  }

  function handleEditTask(id: string, title: string): Promise<boolean> {
    return runMutation((token) => updateTask(id, { title }, token));
  }

  function handleDeleteTask(id: string, title: string): Promise<boolean> {
    if (!canDelete) return Promise.resolve(false);
    if (!window.confirm(`¿Eliminar la tarea "${title}"?`)) return Promise.resolve(false);
    if (tasks.length === 1 && meta?.hasPreviousPage) {
      setCurrentPage((page) => Math.max(1, page - 1));
    }
    return runMutation((token) => deleteTask(id, token));
  }

  function handleQueryChange(value: string): void {
    const nextParams = new URLSearchParams(searchParams);
    const normalized = value.slice(0, 60);
    if (normalized.trim() === '') nextParams.delete('q');
    else nextParams.set('q', normalized);
    setSearchParams(nextParams, { replace: true });
    setCurrentPage(1);
  }

  function handleFilterChange(value: TaskFilter): void {
    setFilter(value);
    setCurrentPage(1);
  }

  function handleSortChange(value: TaskSort): void {
    setSortBy(value);
    setCurrentPage(1);
  }

  function handleClearCriteria(): void {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('q');
    setSearchParams(nextParams, { replace: true });
    setFilter('all');
    setSortBy('updated-desc');
    setCurrentPage(1);
  }

  const emptyMessage = normalizedQuery || filter !== 'all'
    ? 'No hay tareas que coincidan con la búsqueda y el filtro.'
    : 'No hay tareas registradas. Utiliza el formulario para crear una.';

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route element={<PublicOnlyRoute />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            path="tasks"
            element={
              <TasksPage
                tasks={tasks}
                totalCount={totalCount}
                query={query}
                filter={filter}
                sortBy={sortBy}
                status={taskList.status}
                errorMessage={taskList.errorMessage}
                operationMessage={operationMessage}
                emptyMessage={emptyMessage}
                currentPage={currentPage}
                totalPages={totalPages}
                hasNextPage={meta?.hasNextPage ?? false}
                hasPreviousPage={meta?.hasPreviousPage ?? false}
                canDelete={canDelete}
                onAddTask={handleAddTask}
                onQueryChange={handleQueryChange}
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
                onClearCriteria={handleClearCriteria}
                onPageChange={setCurrentPage}
                onToggleStatus={handleToggleStatus}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
                onRetry={taskList.reload}
              />
            }
          />
          <Route
            path="tasks/:taskId"
            element={<TaskDetailPage operationMessage={operationMessage} onDeleteTask={handleDeleteTask} />}
          />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
