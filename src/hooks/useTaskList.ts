import { useCallback, useEffect, useState } from 'react';
import type { TaskListQuery, TaskListResponse } from '../models/api.types';
import type { RequestStatus } from '../models/request-status.type';
import { getHttpErrorMessage, isAbortRequest } from '../services/http.service';
import { listTasks } from '../services/task.api.service';

interface TaskListState {
  status: RequestStatus;
  data: TaskListResponse | null;
  errorMessage: string;
  queryKey: string;
  reloadVersion: number;
}

export function useTaskList(query: TaskListQuery) {
  const [state, setState] = useState<TaskListState>({
    status: 'idle',
    data: null,
    errorMessage: '',
    queryKey: '',
    reloadVersion: -1,
  });
  const [reloadVersion, setReloadVersion] = useState(0);

  const reload = useCallback(() => {
    setReloadVersion((version) => version + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const queryKey = JSON.stringify(query);

    async function loadTasks(): Promise<void> {
      try {
        const result = await listTasks(query, controller.signal);
        setState({
          status: result.data.length === 0 ? 'empty' : 'success',
          data: result,
          errorMessage: '',
          queryKey,
          reloadVersion,
        });
      } catch (error) {
        if (isAbortRequest(error)) {
          return;
        }

        setState((current) => ({
          ...current,
          status: 'error',
          errorMessage: getHttpErrorMessage(error),
          queryKey,
          reloadVersion,
        }));
      }
    }

    void loadTasks();
    return () => controller.abort();
  }, [
    query,
    reloadVersion,
  ]);

  const isCurrentRequest =
    state.queryKey === JSON.stringify(query) &&
    state.reloadVersion === reloadVersion;

  return {
    ...state,
    status: isCurrentRequest ? state.status : 'loading',
    reload,
  };
}
