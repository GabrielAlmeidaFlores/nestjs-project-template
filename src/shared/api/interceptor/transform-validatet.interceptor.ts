import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Type,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

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
      console.warn(dtoClass, data);

      const instance = plainToInstance(dtoClass, data);

      console.warn(dtoClass, instance);

      return instanceToPlain(instance);
    };

    const handlerResult$ = next.handle();
    const transformOperator = mergeMap(transformAndValidate);
    const result = handlerResult$.pipe(transformOperator);
    return result;
  }
}
