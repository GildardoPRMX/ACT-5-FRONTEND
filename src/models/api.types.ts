import type { Task } from './task.interface';

export interface ApiDataResponse<T> {
  data: T;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface TaskListResponse {
  data: Task[];
  meta: PaginationMeta;
}

export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
    details?: unknown;
    requestId?: string;
  };
}

export type ApiTaskSortField = 'updatedAt' | 'title';
export type ApiSortOrder = 'asc' | 'desc';

export interface TaskListQuery {
  page: number;
  limit: number;
  sortBy: ApiTaskSortField;
  order: ApiSortOrder;
  search?: string;
  status?: Task['status'];
}

export type CreateTaskInput = Pick<Task, 'title'>;
export type UpdateTaskInput = Partial<Pick<Task, 'title' | 'status'>>;
