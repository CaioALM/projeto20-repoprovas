type AppErrorTypes = 'conflict' | 'not_found';
export interface AppError {
  type: AppErrorTypes;
  message: string;
}

export function isAppError(error: object): error is AppError {
  return (error as AppError).type !== undefined;
}

export function errorTypeToStatusCode(type: AppErrorTypes) {
  if (type === 'conflict') return 409;
  if (type === 'not_found') return 404;
  if (type === 'Invalid') return 422;
  if (type === 'Unauthorized') return 401; 
  if (type === 'Forbidden') return 403;

  return 400;
}
