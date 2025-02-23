import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

type ApiErrorResponse = string;

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

function isServerError(err: unknown): err is { error: string } {
  return (
    typeof err === 'object' &&
    err !== null &&
    'error' in err &&
    typeof err.error === 'string'
  );
}

export const deserializeError = (error: unknown): ApiErrorResponse => {
  let message = '';

  if (isFetchBaseQueryError(error)) {
    if (isServerError(error.data)) {
      message = error.data.error;
    } else {
      message = JSON.stringify(error.data);
    }
  }

  return message;
};
