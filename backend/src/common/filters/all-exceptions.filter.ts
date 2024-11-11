import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpExceptionBody,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ErrorResDto } from '../dto/error.res.dto';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    this.logger.error({
      message: 'handle exception',
      error: (exception as Error).message,
      stack: (exception as Error).stack,
    });

    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const body = this.makeReplyBody(exception);
    httpAdapter.reply(ctx.getResponse(), body, httpStatus);
  }

  private makeReplyBody(exception: unknown): ErrorResDto {
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      if (typeof response === 'string') {
        return new ErrorResDto(exception.getResponse() as string);
      }

      const message = (response as HttpExceptionBody).message;
      if (typeof message === 'string') {
        return new ErrorResDto(message);
      }

      return new ErrorResDto(message.join(';'));
    } else if (exception instanceof Error) {
      return new ErrorResDto(exception.message || 'unknown error');
    }

    return new ErrorResDto('unknown error');
  }
}
