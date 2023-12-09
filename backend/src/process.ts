import { handleError } from './error-handler';

process.on('unhandledRejection', (reason: Error) => {
  console.log(`Unhandled Rejection: ${reason.message || reason}`);

  throw new Error(String(reason.message || reason));
});

process.on('uncaughtException', (error: Error) => {
  console.log(`Uncaught Exception: ${error.message}`);

  handleError(error, null, null, null);
});