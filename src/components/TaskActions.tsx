interface TaskActionsProps {
  completedCount: number;
  onClearCompleted: () => void;
}

export function TaskActions({
  completedCount,
  onClearCompleted,
}: TaskActionsProps) {
  return (
    <section className="task-actions" aria-label="Acciones globales de tareas">
      <button
        type="button"
        className="button-danger"
        onClick={onClearCompleted}
        disabled={completedCount === 0}
      >
        Limpiar tareas completadas ({completedCount})
      </button>
    </section>
  );
}
