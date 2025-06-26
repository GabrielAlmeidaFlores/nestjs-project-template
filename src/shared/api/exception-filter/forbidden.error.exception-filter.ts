import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { FastifyReply } from 'fastify';
import { getReasonPhrase } from 'http-status-codes';

import { ForbiddenError } from '@core/error/forbidden.error';
import { ErrorResponseDto } from '@shared/api/dto/response/error/error.response.dto';

@Catch(ForbiddenError)
export class ForbiddenErrorExceptionFilter implements ExceptionFilter {
  protected readonly _type = ForbiddenErrorExceptionFilter.name;

  public catch(exception: ForbiddenError, host: ArgumentsHost): void {
    const http = host.switchToHttp();
    const response = http.getResponse<FastifyReply>();

    const statusCode = HttpStatus.FORBIDDEN;
    const reason = getReasonPhrase(statusCode);

    const errorResponse = ErrorResponseDto.build({
      message: exception.message,
      error: reason,
      statusCode: statusCode,
    });

    response.status(statusCode).send(instanceToPlain(errorResponse));
  }
}
