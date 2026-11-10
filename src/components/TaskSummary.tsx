import type { Task } from '../models/task.interface';

interface TaskSummaryProps {
  tasks: Task[];
  totalCount: number;
}

export function TaskSummary({
  tasks,
  totalCount,
}: TaskSummaryProps) {
  const completed = tasks.filter(
    ({ status }) => status === 'completed',
  ).length;

  const pending =
    tasks.length - completed;

  return (
    <section
      className="summary-grid"
      aria-label="Resumen de tareas"
    >
      <article className="summary-card">
        <span>Total remoto</span>
        <strong>{totalCount}</strong>
      </article>

      <article className="summary-card">
        <span>Pendientes en página</span>
        <strong>{pending}</strong>
      </article>

      <article className="summary-card">
        <span>Completadas en página</span>
        <strong>{completed}</strong>
      </article>
    </section>
  );
}
