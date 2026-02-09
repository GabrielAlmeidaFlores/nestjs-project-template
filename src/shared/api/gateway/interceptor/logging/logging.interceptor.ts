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
  private static readonly SENSITIVE_FIELDS = [
    'password',
    'senha',
    'token',
    'accessToken',
    'refreshToken',
    'access_token',
    'refresh_token',
    'secret',
    'apiKey',
    'api_key',
    'authorization',
    'auth',
    'cookie',
    'creditCard',
    'credit_card',
    'cardNumber',
    'card_number',
    'cvv',
    'cpf',
    'cnpj',
    'rg',
    'ssn',
    'privateKey',
    'private_key',
  ];

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

    const sanitizedParams = this.sanitizeData(paramsObj);
    const sanitizedQuery = this.sanitizeData(queryObj);
    const sanitizedBody = this.sanitizeData(bodyObj);

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
📥 REQUEST

🔹 Method: ${method}
🔹 URL: ${url}
🔹 IP: ${ip}
🔹 User-Agent: ${userAgent}${hasParams ? `\n🔹 Params: ${JSON.stringify(sanitizedParams, null, 2)}` : ''}${hasQuery ? `\n🔹 Query: ${JSON.stringify(sanitizedQuery, null, 2)}` : ''}${hasBody ? `\n🔹 Body: ${JSON.stringify(sanitizedBody, null, 2)}` : ''}

📤 RESPONSE

🔹 Status: ${statusCode}
🔹 Duration: ${duration}ms${hasResponse ? `\n🔹 Response:\n${truncatedResponse}${isTruncated ? '\n... (truncated)' : ''}` : ''}
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
📥 REQUEST

🔹 Method: ${method}
🔹 URL: ${url}
🔹 IP: ${ip}
🔹 User-Agent: ${userAgent}${hasParams ? `\n🔹 Params: ${JSON.stringify(sanitizedParams, null, 2)}` : ''}${hasQuery ? `\n🔹 Query: ${JSON.stringify(sanitizedQuery, null, 2)}` : ''}${hasBody ? `\n🔹 Body: ${JSON.stringify(sanitizedBody, null, 2)}` : ''}

❌ ERROR

🔹 Duration: ${duration}ms
🔹 Error: ${error.message}
🔹 Stack: ${stackTrace}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          `);
        },
      }),
    );
  }

  /**
   * Sanitiza dados sensíveis de forma recursiva
   */
  private sanitizeData(data: unknown): unknown {
    if (typeof data !== 'object' || data === null) {
      return data;
    }

    if (Array.isArray(data)) {
      return data.map((item) => this.sanitizeData(item));
    }

    const sanitized: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(data)) {
      const keyLower = key.toLowerCase();

      // Verifica se o campo é sensível (mas ignora IDs)
      const isId = keyLower.endsWith('id');
      const isSensitive =
        !isId &&
        LoggingInterceptor.SENSITIVE_FIELDS.some((field) =>
          keyLower.includes(field.toLowerCase()),
        );

      if (isSensitive) {
        sanitized[key] = '***';
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = this.sanitizeData(value);
      } else {
        sanitized[key] = value;
      }
    }

    return sanitized;
  }

  /**
   * Sanitiza response para não logar dados muito grandes
   */
  private sanitizeResponse(data: unknown): unknown {
    const sanitized = this.sanitizeData(data);

    if (typeof sanitized !== 'object' || sanitized === null) {
      return sanitized;
    }

    const result = { ...sanitized } as Record<string, unknown>;

    for (const [key, value] of Object.entries(result)) {
      if (
        Array.isArray(value) &&
        value.length > LoggingInterceptor.MAX_ARRAY_DISPLAY_LENGTH
      ) {
        result[key] = `[Array with ${value.length} items]`;
      }
    }

    return result;
  }
}
