import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { getReasonPhrase } from 'http-status-codes';

import { UnexpectedError } from '@core/error/unexpected.error';
import { ErrorResponseDto } from '@shared/api/dto/response/error/error.response.dto';

@Catch(UnexpectedError)
export class UnexpectedErrorExceptionFilter implements ExceptionFilter {
  protected readonly _type = UnexpectedErrorExceptionFilter.name;

  public catch(exception: UnexpectedError, host: ArgumentsHost): void {
    const http = host.switchToHttp();
    const response = http.getResponse<FastifyReply>();

    const statusCode = HttpStatus.UNAUTHORIZED;
    const reason = getReasonPhrase(statusCode);

    const errorResponse = ErrorResponseDto.build({
      message: exception.message,
      error: reason,
      statusCode: statusCode,
    });

    response.status(statusCode).send(errorResponse);
  }
}
