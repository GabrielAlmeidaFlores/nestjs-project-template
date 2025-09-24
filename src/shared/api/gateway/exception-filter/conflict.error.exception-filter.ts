import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { FastifyReply } from 'fastify';
import { getReasonPhrase } from 'http-status-codes';

import { ConflictError } from '@core/error/conflict.error';
import { ErrorResponseDto } from '@shared/api/util/dto/response/error.response.dto';

@Catch(ConflictError)
export class ConflictErrorExceptionFilter implements ExceptionFilter {
  protected readonly _type = ConflictErrorExceptionFilter.name;

  public catch(exception: ConflictError, host: ArgumentsHost): void {
    const http = host.switchToHttp();
    const response = http.getResponse<FastifyReply>();

    const statusCode = HttpStatus.CONFLICT;
    const reason = getReasonPhrase(statusCode);

    const errorResponse = ErrorResponseDto.build({
      message: exception.message,
      error: reason,
      statusCode: statusCode,
    });

    response.status(statusCode).send(instanceToPlain(errorResponse));
  }
}
