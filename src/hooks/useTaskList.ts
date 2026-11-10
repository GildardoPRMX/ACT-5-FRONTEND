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

export function useTaskList(query: TaskListQuery, accessToken: string | null) {
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
    if (!accessToken) return;
    const token = accessToken;
    const controller = new AbortController();
    const queryKey = JSON.stringify(query);

    async function loadTasks(): Promise<void> {
      try {
        const result = await listTasks(query, token, controller.signal);
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
    accessToken,
    reloadVersion,
  ]);

  const isCurrentRequest =
    Boolean(accessToken) &&
    state.queryKey === JSON.stringify(query) &&
    state.reloadVersion === reloadVersion;

  return {
    ...state,
    status: !accessToken ? 'idle' : isCurrentRequest ? state.status : 'loading',
    data: accessToken ? state.data : null,
    errorMessage: accessToken ? state.errorMessage : '',
    reload,
  };
}
