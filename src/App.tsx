import { AppHeader } from './components/AppHeader';
import { AppFooter } from './components/AppFooter';
import { TaskFilters } from './components/TaskFilters';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TaskSummary } from './components/TaskSummary';
import { tasks } from './data/tasks';

export default function App() {
  return (
    <div className="app-shell">
      <AppHeader />
      <main className="app-main">
        <TaskForm />
        <TaskFilters />
        <TaskSummary tasks={tasks} />
        <TaskList tasks={tasks} />
      </main>
      <AppFooter courseName="Diseño Frontend con Frameworks" />
    </div>
  );
}
