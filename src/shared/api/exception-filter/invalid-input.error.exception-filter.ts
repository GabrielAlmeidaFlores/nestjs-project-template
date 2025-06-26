import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { getReasonPhrase } from 'http-status-codes';

import { InvalidInputError } from '@core/error/invalid-input.error';
import { ErrorResponseDto } from '@shared/api/dto/response/error/error.response.dto';

@Catch(InvalidInputError)
export class InvalidInputErrorExceptionFilter implements ExceptionFilter {
  protected readonly _type = InvalidInputErrorExceptionFilter.name;

  public catch(exception: InvalidInputError, host: ArgumentsHost): void {
    const http = host.switchToHttp();
    const response = http.getResponse<FastifyReply>();

    const statusCode = HttpStatus.BAD_REQUEST;
    const reason = getReasonPhrase(statusCode);

    const errorResponse = ErrorResponseDto.build({
      message: exception.message,
      error: reason,
      statusCode: statusCode,
    });

    response.status(statusCode).send(errorResponse);
  }
}
