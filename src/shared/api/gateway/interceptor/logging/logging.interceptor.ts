import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import type { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private static readonly MAX_RESPONSE_LOG_LENGTH = 1000;
  private static readonly MAX_STACK_LOG_LENGTH = 500;
  private static readonly MAX_ARRAY_DISPLAY_LENGTH = 10;

  protected readonly _type = LoggingInterceptor.name;
  private readonly logger = new Logger(LoggingInterceptor.name);

  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<FastifyRequest>();
    const response = ctx.getResponse<FastifyReply>();

    const { method, url, body, query, params, headers } = request;
    const userAgent = headers['user-agent'] ?? 'unknown';
    const ip = request.ip;

    const paramsObj = params as Record<string, unknown>;
    const queryObj = query as Record<string, unknown>;
    const bodyObj = body as Record<string, unknown> | undefined;

    const hasParams = Object.keys(paramsObj).length > 0;
    const hasQuery = Object.keys(queryObj).length > 0;
    const hasBody =
      typeof bodyObj === 'object' && Object.keys(bodyObj).length > 0;

    const now = Date.now();

    return next.handle().pipe(
      tap({
        next: (responseData: unknown) => {
          const duration = Date.now() - now;
          const statusCode = response.statusCode;

          const responseString = JSON.stringify(
            this.sanitizeResponse(responseData),
            null,
            2,
          );
          const isTruncated =
            responseString.length > LoggingInterceptor.MAX_RESPONSE_LOG_LENGTH;
          const truncatedResponse = responseString.substring(
            0,
            LoggingInterceptor.MAX_RESPONSE_LOG_LENGTH,
          );
          const hasResponse =
            typeof responseData === 'object' && responseData !== null;

          this.logger.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📥 REQUEST | 📤 RESPONSE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔹 Method: ${method}
🔹 URL: ${url}
🔹 IP: ${ip}
🔹 User-Agent: ${userAgent}${hasParams ? `\n🔹 Params: ${JSON.stringify(paramsObj, null, 2)}` : ''}${hasQuery ? `\n🔹 Query: ${JSON.stringify(queryObj, null, 2)}` : ''}${hasBody ? `\n🔹 Body: ${JSON.stringify(this.sanitizeBody(bodyObj), null, 2)}` : ''}
🔹 Status: ${statusCode}
🔹 Duration: ${duration}ms${hasResponse ? `\n🔹 Response: ${truncatedResponse}${isTruncated ? '... (truncated)' : ''}` : ''}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          `);
        },
        error: (error: Error) => {
          const duration = Date.now() - now;

          const stackTrace =
            typeof error.stack === 'string'
              ? error.stack.substring(
                  0,
                  LoggingInterceptor.MAX_STACK_LOG_LENGTH,
                )
              : 'N/A';

          this.logger.error(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📥 REQUEST | ❌ ERROR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔹 Method: ${method}
🔹 URL: ${url}
🔹 IP: ${ip}
🔹 User-Agent: ${userAgent}${hasParams ? `\n🔹 Params: ${JSON.stringify(paramsObj, null, 2)}` : ''}${hasQuery ? `\n🔹 Query: ${JSON.stringify(queryObj, null, 2)}` : ''}${hasBody ? `\n🔹 Body: ${JSON.stringify(this.sanitizeBody(bodyObj), null, 2)}` : ''}
🔹 Duration: ${duration}ms
🔹 Error: ${error.message}
🔹 Stack: ${stackTrace}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          `);
        },
      }),
    );
  }

  private sanitizeBody(body: unknown): unknown {
    if (typeof body !== 'object' || body === null) {
      return body;
    }

    const sanitized = { ...body } as Record<string, unknown>;
    const sensitiveFields = [
      'password',
      'token',
      'secret',
      'apiKey',
      'authorization',
    ];

    for (const field of sensitiveFields) {
      if (field in sanitized) {
        sanitized[field] = '***REDACTED***';
      }
    }

    return sanitized;
  }

  private sanitizeResponse(data: unknown): unknown {
    if (typeof data !== 'object' || data === null) {
      return data;
    }

    const sanitized = { ...data } as Record<string, unknown>;

    for (const [key, value] of Object.entries(sanitized)) {
      if (
        Array.isArray(value) &&
        value.length > LoggingInterceptor.MAX_ARRAY_DISPLAY_LENGTH
      ) {
        sanitized[key] = `[Array with ${value.length} items]`;
      }
    }

    return sanitized;
  }
}
