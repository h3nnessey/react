const ERROR_MESSAGE = 'Something went wrong';

const generateErrorObject = (message: string) => {
  return {
    success: false as const,
    error: message,
  };
};

export const processApiError = (error: unknown) => {
  let message = ERROR_MESSAGE;

  if (
    typeof error === 'object' &&
    error !== null &&
    'error' in error &&
    typeof error.error === 'string'
  ) {
    message = error.error;
  }

  return generateErrorObject(message);
};

export const processError = (error: unknown) => {
  const message = error instanceof Error ? error.message : ERROR_MESSAGE;

  return generateErrorObject(message);
};
