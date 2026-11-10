import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router';
import type { Task } from '../models/task.interface';
import { TaskStatusBadge } from './TaskStatusBadge';
import {
  TASK_TITLE_MAX_LENGTH,
  validateTaskTitle,
} from '../utils/task-validation';
import { formatTaskDate } from '../utils/date';

interface TaskItemProps {
  task: Task;
  canDelete: boolean;
  onToggleStatus: (id: string) => Promise<boolean>;
  onEditTask: (id: string, title: string) => Promise<boolean>;
  onDeleteTask: (id: string, title: string) => Promise<boolean>;
}

export function TaskItem({
  task,
  canDelete,
  onToggleStatus,
  onEditTask,
  onDeleteTask,
}: TaskItemProps) {
  const { id, title, status, updatedAt } = task;
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [error, setError] = useState('');
  const [isBusy, setIsBusy] = useState(false);

  function handleStartEdit() {
    setDraftTitle(title);
    setError('');
    setIsEditing(true);
  }

  function handleCancelEdit() {
    setDraftTitle(title);
    setError('');
    setIsEditing(false);
  }

  function handleDraftChange(value: string) {
    setDraftTitle(value);

    if (error) {
      setError(validateTaskTitle(value) ?? '');
    }
  }

  async function handleEditSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const validationMessage = validateTaskTitle(draftTitle);

    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    setIsBusy(true);
    try {
      const wasUpdated = await onEditTask(id, draftTitle.trim());
      if (wasUpdated) {
        setError('');
        setIsEditing(false);
      }
    } finally {
      setIsBusy(false);
    }
  }

  async function handleToggleStatus(): Promise<void> {
    setIsBusy(true);
    try {
      await onToggleStatus(id);
    } finally {
      setIsBusy(false);
    }
  }

  async function handleDelete(): Promise<void> {
    setIsBusy(true);
    try {
      await onDeleteTask(id, title);
    } finally {
      setIsBusy(false);
    }
  }

  return (
    <article
      className={`task-item task-item--${status}`}
      role="listitem"
      aria-busy={isBusy}
    >
      <div className="task-item__content">
        {isEditing ? (
          <form
            className="task-item__edit-form"
            onSubmit={handleEditSubmit}
            noValidate
          >
            <label
              className="sr-only"
              htmlFor={`edit-task-${id}`}
            >
              Editar título de la tarea
            </label>
            <input
              id={`edit-task-${id}`}
              className="task-item__edit-input"
              value={draftTitle}
              onChange={(event) =>
                handleDraftChange(event.target.value)
              }
              maxLength={TASK_TITLE_MAX_LENGTH}
              aria-invalid={Boolean(error)}
              aria-describedby={
                error ? `edit-error-${id}` : undefined
              }
              autoFocus
            />
            {error && (
              <p
                id={`edit-error-${id}`}
                className="field-error"
                role="alert"
              >
                {error}
              </p>
            )}
            <div className="task-item__edit-actions">
              <button type="submit" disabled={isBusy}>
                {isBusy ? 'Guardando…' : 'Guardar'}
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <>
            <h3 className="task-item__title">
              {title}
            </h3>
            <TaskStatusBadge status={status} />
            <p className="task-item__date">
              Actualizada:{' '}
              <time dateTime={updatedAt}>
                {formatTaskDate(updatedAt)}
              </time>
            </p>
          </>
        )}
      </div>
      <div
        className="task-item__actions"
        role="group"
        aria-label={`Acciones para ${title}`}
      >
        {!isEditing && (
          <Link
            className="button-link button-link--secondary"
            to={`/tasks/${id}`}
          >
            Ver detalle
          </Link>
        )}
        <button
          type="button"
          onClick={() => void handleToggleStatus()}
          disabled={isEditing || isBusy}
        >
          {status === 'completed'
            ? 'Reabrir'
            : 'Completar'}
        </button>
        <button
          type="button"
          onClick={handleStartEdit}
          disabled={isEditing || isBusy}
        >
          Editar
        </button>
        {canDelete && (
          <button
            type="button"
            className="button-danger"
            onClick={() => void handleDelete()}
            disabled={isEditing || isBusy}
          >
            Eliminar
          </button>
        )}
      </div>
    </article>
  );
}
