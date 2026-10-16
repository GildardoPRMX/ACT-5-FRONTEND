import type { TaskStatus } from '../models/task.interface';

interface TaskStatusBadgeProps {
  status: TaskStatus;
}

export function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  const statusLabel =
    status === 'completed' ? 'Completada' : 'Pendiente';

  return (
    <span className={`status-badge status-badge--${status}`}>
      {statusLabel}
    </span>
  );
}
