import { API_URL } from '../config/env';
import type { ApiErrorBody } from '../models/api.types';

interface HttpErrorOptions {
  status: number;
  code: string;
  message: string;
  details?: unknown;
  requestId?: string;
}

type UnauthorizedHandler = () => void;

let unauthorizedHandler: UnauthorizedHandler | undefined;

export function setUnauthorizedHandler(handler: UnauthorizedHandler): () => void {
  unauthorizedHandler = handler;
  return () => {
    if (unauthorizedHandler === handler) unauthorizedHandler = undefined;
  };
}

export class HttpError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details?: unknown;
  readonly requestId?: string;

  constructor(options: HttpErrorOptions) {
    super(options.message);
    this.name = 'HttpError';
    this.status = options.status;
    this.code = options.code;
    this.details = options.details;
    this.requestId = options.requestId;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isApiErrorBody(value: unknown): value is ApiErrorBody {
  if (!isRecord(value) || !isRecord(value.error)) {
    return false;
  }

  return typeof value.error.code === 'string' &&
    typeof value.error.message === 'string';
}

function isAbortErrorInternal(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError';
}

export async function httpRequest<T>(
  path: string,
  init: RequestInit = {},
  accessToken?: string,
): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set('Accept', 'application/json');

  if (init.body !== undefined && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...init,
      headers,
    });

    if (response.status === 204) {
      return undefined as T;
    }

    const contentType = response.headers.get('content-type') ?? '';
    let payload: unknown;

    if (contentType.includes('application/json')) {
      try {
        payload = await response.json();
      } catch {
        throw new HttpError({
          status: response.status,
          code: 'INVALID_RESPONSE',
          message: 'La API envió una respuesta JSON no válida.',
        });
      }
    }

    if (!response.ok) {
      if (response.status === 401 && accessToken) {
        unauthorizedHandler?.();
      }

      if (isApiErrorBody(payload)) {
        throw new HttpError({
          status: response.status,
          code: payload.error.code,
          message: payload.error.message,
          details: payload.error.details,
          requestId: payload.error.requestId,
        });
      }

      throw new HttpError({
        status: response.status,
        code: 'HTTP_ERROR',
        message: `La API respondió con el estado ${response.status}.`,
      });
    }

    return payload as T;
  } catch (error) {
    if (error instanceof HttpError || isAbortErrorInternal(error)) {
      throw error;
    }

    throw new HttpError({
      status: 0,
      code: 'NETWORK_ERROR',
      message: 'No fue posible conectar con la API. Comprueba que el servidor esté disponible e inténtalo de nuevo.',
    });
  }
}

export function isAbortRequest(error: unknown): boolean {
  return isAbortErrorInternal(error);
}

export function isAbortError(error: unknown): boolean {
  return isAbortErrorInternal(error);
}

export function isHttpError(error: unknown): error is HttpError {
  return error instanceof HttpError;
}

export function getHttpErrorMessage(error: unknown): string {
  if (isHttpError(error)) {
    return error.requestId
      ? `${error.message} (Referencia: ${error.requestId})`
      : error.message;
  }

  return 'Ocurrió un error inesperado.';
}
