import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  HttpException,
} from '@nestjs/common';
import { logs, SeverityNumber } from '@opentelemetry/api-logs';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import type { FastifyRequest, FastifyReply } from 'fastify';
import type { LogRecord } from '@opentelemetry/api-logs';

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
  private readonly otlpLogger = logs.getLogger(LoggingInterceptor.name);

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

          let responseString = '';
          let isTruncated = false;
          let truncatedResponse = '';

          try {
            const sanitizedResponse = this.sanitizeResponse(responseData);
            responseString = JSON.stringify(sanitizedResponse, null, 2);
            isTruncated =
              responseString.length >
              LoggingInterceptor.MAX_RESPONSE_LOG_LENGTH;
            truncatedResponse = responseString.substring(
              0,
              LoggingInterceptor.MAX_RESPONSE_LOG_LENGTH,
            );
          } catch {
            truncatedResponse = '[Error serializing response]';
          }

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

          this.emitSuccessLog({
            method,
            url,
            ip,
            userAgent,
            statusCode,
            duration,
            params: sanitizedParams,
            query: sanitizedQuery,
            body: sanitizedBody,
            response: this.sanitizeResponse(responseData),
          });
        },
        error: (error: Error) => {
          const duration = Date.now() - now;
          const statusCode =
            error instanceof HttpException ? error.getStatus() : 500;

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

🔹 Status: ${statusCode}
🔹 Duration: ${duration}ms
🔹 Error: ${error.message}
🔹 Stack: ${stackTrace}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          `);

          this.emitErrorLog({
            method,
            url,
            ip,
            userAgent,
            statusCode,
            duration,
            params: sanitizedParams,
            query: sanitizedQuery,
            body: sanitizedBody,
            errorMessage: error.message,
            errorStack: stackTrace,
          });
        },
      }),
    );
  }

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

  private emitSuccessLog(props: {
    method: string;
    url: string;
    ip: string;
    userAgent: string;
    statusCode: number;
    duration: number;
    params: unknown;
    query: unknown;
    body: unknown;
    response: unknown;
  }): void {
    const record: LogRecord = {
      severityNumber: SeverityNumber.INFO,
      body: `${props.method} ${props.url} ${props.statusCode}`,
      attributes: {
        'http.method': props.method,
        'http.url': props.url,
        'http.status_code': props.statusCode,
        'http.duration_ms': props.duration,
        'http.client_ip': props.ip,
        'http.user_agent': props.userAgent,
        'http.request.params': JSON.stringify(props.params),
        'http.request.query': JSON.stringify(props.query),
        'http.request.body': JSON.stringify(props.body),
        'http.response.body': JSON.stringify(props.response),
      },
    };

    this.otlpLogger.emit(record);
  }

  private emitErrorLog(props: {
    method: string;
    url: string;
    ip: string;
    userAgent: string;
    statusCode: number;
    duration: number;
    params: unknown;
    query: unknown;
    body: unknown;
    errorMessage: string;
    errorStack: string;
  }): void {
    const record: LogRecord = {
      severityNumber: SeverityNumber.ERROR,
      body: `${props.method} ${props.url} ${props.statusCode} ERROR: ${props.errorMessage}`,
      attributes: {
        'http.method': props.method,
        'http.url': props.url,
        'http.status_code': props.statusCode,
        'http.duration_ms': props.duration,
        'http.client_ip': props.ip,
        'http.user_agent': props.userAgent,
        'http.request.params': JSON.stringify(props.params),
        'http.request.query': JSON.stringify(props.query),
        'http.request.body': JSON.stringify(props.body),
        'exception.message': props.errorMessage,
        'exception.stacktrace': props.errorStack,
      },
    };

    this.otlpLogger.emit(record);
  }

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
