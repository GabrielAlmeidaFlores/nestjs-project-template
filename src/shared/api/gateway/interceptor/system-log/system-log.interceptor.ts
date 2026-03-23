import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ConflictError } from '@core/error/conflict.error';
import { ForbiddenError } from '@core/error/forbidden.error';
import { InvalidInputError } from '@core/error/invalid-input.error';
import { NotFoundError } from '@core/error/not-found.error';
import { ServiceUnavailableError } from '@core/error/service-unavailable.error';
import { UnauthorizedError } from '@core/error/unauthorized.error';
import { UnexpectedError } from '@core/error/unexpected.error';
import { SystemLogCommandGateway } from '@shared/system/system-log/system-log.command.gateway';

import type { FastifyRequest, FastifyReply } from 'fastify';

/**
 * Persiste chamadas HTTP em `system_logs`. Independente do {@link LoggingInterceptor}
 * (console / OpenTelemetry).
 */
@Injectable()
export class SystemLogInterceptor implements NestInterceptor {
  private static readonly MAX_STACK_DB_LENGTH = 20000;
  private static readonly MAX_ROUTE_DB_LENGTH = 500;
  private static readonly MAX_BODY_DB_LENGTH = 20000;

  protected readonly _type = SystemLogInterceptor.name;
  private readonly logger = new Logger(SystemLogInterceptor.name);
  private readonly ERROR_STATUS_CODE = 400;
  private readonly SENSITIVE_FIELDS;

  public constructor(
    private readonly systemLogCommandGateway: SystemLogCommandGateway,
  ) {
    this.logger = new Logger(SystemLogInterceptor.name);
    this.ERROR_STATUS_CODE = 400;
    this.SENSITIVE_FIELDS = [
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
  }

  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<FastifyRequest>();
    const response = ctx.getResponse<FastifyReply>();

    const { url, method } = request;

    return next.handle().pipe(
      tap({
        next: (responseData: unknown) => {
          const statusCode = response.statusCode;
          const isError = statusCode >= this.ERROR_STATUS_CODE;

          if (method === 'GET' && !isError) {
            return;
          }

          const requestBody = this.serializeBody(request.body);
          const responseBody = this.serializeBody(responseData);

          this.persist({
            statusCode,
            url,
            requestBody,
            stackTrace: null,
            responseBody,
            isError,
          });
        },
        error: (error: Error) => {
          const statusCode = ((): HttpStatus => {
            if (error instanceof HttpException) {
              return error.getStatus();
            }

            if (error instanceof UnauthorizedError) {
              return HttpStatus.UNAUTHORIZED;
            }

            if (error instanceof ForbiddenError) {
              return HttpStatus.FORBIDDEN;
            }

            if (error instanceof NotFoundError) {
              return HttpStatus.NOT_FOUND;
            }

            if (error instanceof InvalidInputError) {
              return HttpStatus.BAD_REQUEST;
            }

            if (error instanceof ConflictError) {
              return HttpStatus.CONFLICT;
            }

            if (error instanceof ServiceUnavailableError) {
              return HttpStatus.SERVICE_UNAVAILABLE;
            }

            if (error instanceof UnexpectedError) {
              return HttpStatus.INTERNAL_SERVER_ERROR;
            }

            return HttpStatus.INTERNAL_SERVER_ERROR;
          })();

          const responseBody =
            error instanceof HttpException
              ? this.serializeBody(error.getResponse())
              : null;

          const fullStack =
            typeof error.stack === 'string'
              ? error.stack.substring(
                  0,
                  SystemLogInterceptor.MAX_STACK_DB_LENGTH,
                )
              : null;

          this.persist({
            statusCode,
            url,
            requestBody: this.serializeBody(request.body),
            stackTrace: fullStack,
            responseBody,
            isError: true,
          });
        },
      }),
    );
  }

  private persist(props: {
    statusCode: number;
    url: string;
    requestBody: string | null;
    stackTrace: string | null;
    responseBody: string | null;
    isError: boolean;
  }): void {
    const endpoint =
      props.url.length > SystemLogInterceptor.MAX_ROUTE_DB_LENGTH
        ? props.url.substring(0, SystemLogInterceptor.MAX_ROUTE_DB_LENGTH)
        : props.url;

    void this.systemLogCommandGateway
      .persist({
        code: props.statusCode,
        endpoint,
        requestBody: props.requestBody,
        stackTrace: props.stackTrace,
        responseBody: props.responseBody,
        isError: props.isError,
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : String(err);
        this.logger.error(`Falha ao gravar log em system_logs: ${message}`);
      });
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
        this.SENSITIVE_FIELDS.some((field) =>
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

  private serializeBody(body: unknown): string | null {
    if (body === undefined || body === null) {
      return null;
    }

    try {
      const sanitized = this.sanitizeData(body);
      const value =
        typeof sanitized === 'string'
          ? sanitized
          : JSON.stringify(sanitized, null, 0);

      if (value.length > SystemLogInterceptor.MAX_BODY_DB_LENGTH) {
        return value.substring(0, SystemLogInterceptor.MAX_BODY_DB_LENGTH);
      }

      return value;
    } catch {
      return null;
    }
  }
}
