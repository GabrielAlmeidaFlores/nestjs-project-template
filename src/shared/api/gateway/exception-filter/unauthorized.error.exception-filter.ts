import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { FastifyReply } from 'fastify';
import { getReasonPhrase } from 'http-status-codes';

import { UnauthorizedError } from '@core/error/unauthorized.error';
import { ErrorResponseDto } from '@shared/api/util/dto/response/error/error.response.dto';

@Catch(UnauthorizedError)
export class UnauthorizedErrorExceptionFilter implements ExceptionFilter {
  protected readonly _type = UnauthorizedErrorExceptionFilter.name;

  public catch(exception: UnauthorizedError, host: ArgumentsHost): void {
    const http = host.switchToHttp();
    const response = http.getResponse<FastifyReply>();

    const statusCode = HttpStatus.UNAUTHORIZED;
    const reason = getReasonPhrase(statusCode);

    const errorResponse = ErrorResponseDto.build({
      message: exception.message,
      error: reason,
      statusCode: statusCode,
    });

    response.status(statusCode).send(instanceToPlain(errorResponse));
  }
}
