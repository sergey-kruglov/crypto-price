import { Logger } from '@nestjs/common';

export function handleProcessError(error: Error) {
  const logger = new Logger('app');
  logger.error({
    message: 'unhandled error',
    error: error.message,
    stack: error.stack,
  });
  // ideally here should be internal alert to dev team
}
