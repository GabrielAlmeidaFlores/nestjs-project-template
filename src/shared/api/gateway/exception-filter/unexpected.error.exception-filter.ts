import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { FastifyReply } from 'fastify';
import { getReasonPhrase } from 'http-status-codes';

import { UnexpectedError } from '@core/error/unexpected.error';
import { ErrorResponseDto } from '@shared/api/util/dto/response/error.response.dto';

@Catch(UnexpectedError)
export class UnexpectedErrorExceptionFilter implements ExceptionFilter {
  protected readonly _type = UnexpectedErrorExceptionFilter.name;

  public catch(exception: UnexpectedError, host: ArgumentsHost): void {
    const http = host.switchToHttp();
    const response = http.getResponse<FastifyReply>();

    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    const reason = getReasonPhrase(statusCode);

    console.error(exception);

    const errorResponse = ErrorResponseDto.build({
      message: reason,
      error: reason,
      statusCode: statusCode,
    });

    response.status(statusCode).send(instanceToPlain(errorResponse));
  }
}
