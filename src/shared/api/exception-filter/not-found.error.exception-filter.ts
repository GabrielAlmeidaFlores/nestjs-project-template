import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { getReasonPhrase } from 'http-status-codes';

import { NotFoundError } from '@core/error/not-found.error';
import { ErrorResponseDto } from '@shared/api/dto/response/error/error.response.dto';

@Catch(NotFoundError)
export class NotFoundErrorExceptionFilter implements ExceptionFilter {
  protected readonly _type = NotFoundErrorExceptionFilter.name;

  public catch(exception: NotFoundError, host: ArgumentsHost): void {
    const http = host.switchToHttp();
    const response = http.getResponse<FastifyReply>();

    const statusCode = HttpStatus.NOT_FOUND;
    const reason = getReasonPhrase(statusCode);

    const errorResponse = new ErrorResponseDto({
      message: exception.message,
      error: reason,
      statusCode: statusCode,
    });

    response.status(statusCode).send(errorResponse);
  }
}
