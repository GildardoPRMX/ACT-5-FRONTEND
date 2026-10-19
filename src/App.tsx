import { useState } from 'react';
import { AppHeader } from './components/AppHeader';
import { AppFooter } from './components/AppFooter';
import { TaskFilters } from './components/TaskFilters';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TaskSummary } from './components/TaskSummary';
import { TaskActions } from './components/TaskActions';
import { tasks as initialTasks } from './data/tasks';
import type { Task } from './models/task.interface';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(
    () => [...initialTasks],
  );

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
  }

  return (
    <div className="app-shell">
      <AppHeader />
      <main className="app-main">
        <TaskForm onAddTask={handleAddTask} />
        <TaskFilters />
        <TaskSummary tasks={tasks} />
        <TaskActions
          completedCount={completedCount}
          onClearCompleted={handleClearCompleted}
        />
        <TaskList
          tasks={tasks}
          onToggleStatus={handleToggleStatus}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />
      </main>
      <AppFooter courseName="Diseño Frontend con Frameworks" />
    </div>
  );
}
