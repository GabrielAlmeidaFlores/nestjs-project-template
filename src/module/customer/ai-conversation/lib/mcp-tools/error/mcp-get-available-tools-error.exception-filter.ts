import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { FastifyReply } from 'fastify';
import { getReasonPhrase } from 'http-status-codes';

import { McpGetAvailableToolsError } from '@module/customer/ai-conversation/lib/mcp-tools/error/mcp-get-available-tools.error';
import { ErrorResponseDto } from '@shared/api/util/dto/response/error.response.dto';

@Catch(McpGetAvailableToolsError)
export class McpGetAvailableToolsErrorExceptionFilter implements ExceptionFilter {
  protected readonly _type = McpGetAvailableToolsErrorExceptionFilter.name;

  public catch(
    exception: McpGetAvailableToolsError,
    host: ArgumentsHost,
  ): void {
    const http = host.switchToHttp();
    const response = http.getResponse<FastifyReply>();

    const statusCode = HttpStatus.SERVICE_UNAVAILABLE;
    const reason = getReasonPhrase(statusCode);

    const errorResponse = ErrorResponseDto.build({
      message: exception.message,
      error: reason,
      statusCode: statusCode,
    });

    response.status(statusCode).send(instanceToPlain(errorResponse));
  }
}
