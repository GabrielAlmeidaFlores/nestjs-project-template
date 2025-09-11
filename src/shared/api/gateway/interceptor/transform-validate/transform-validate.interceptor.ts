import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Type,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ResponseValidationError } from '@shared/api/gateway/interceptor/transform-validate/error/response-validation.error';

@Injectable()
export class TransformValidateInterceptor implements NestInterceptor {
  protected readonly _type = TransformValidateInterceptor.name;

  public constructor(private readonly reflector: Reflector) {}

  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const handler = context.getHandler();

    const responseDto = this.reflector.get<Type<unknown>>(
      'successResponseType',
      handler,
    );

    const shouldTransform = typeof responseDto !== 'undefined';

    if (!shouldTransform) {
      return next.handle();
    }

    const transformAndValidate = async (data: unknown): Promise<unknown> => {
      const dtoClass = responseDto as Type<object>;

      const plain = instanceToPlain(data);

      const instance = plainToInstance(dtoClass, plain, {
        enableImplicitConversion: false,
        exposeUnsetFields: false,
        excludeExtraneousValues: true,
      });

      const validationErrors = await validate(instance, {
        forbidNonWhitelisted: true,
        forbidUnknownValues: false,
      });

      const hasValidationErrors = validationErrors.length > 0;
      if (hasValidationErrors) {
        this.exceptionFactory(validationErrors);
      }

      if (typeof data === 'object' && data !== null && '_type' in data) {
        plain['_type'] = data['_type'];
      }

      return plain;
    };

    const handlerResult = next.handle();
    const transformOperator = mergeMap(transformAndValidate);
    const result = handlerResult.pipe(transformOperator);
    return result;
  }

  private exceptionFactory(errors: ValidationError[]): void {
    let firstError = errors[0];

    const child = firstError?.children;
    if (child && child.length > 0) {
      firstError = child[0];
    }

    const dtoProperty = firstError?.property ?? 'unknown';
    const target = firstError?.target as
      | { constructor?: { name?: string } }
      | undefined;
    const dtoName = target?.constructor?.name ?? 'unknown';

    throw new ResponseValidationError({
      dtoName,
      dtoProperty,
    });
  }
}
