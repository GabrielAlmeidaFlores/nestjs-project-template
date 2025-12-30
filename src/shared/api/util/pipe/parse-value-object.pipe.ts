import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

import { BaseValueObject } from '@core/domain/schema/value-object/base/base.value-object';

@Injectable()
export class ParseValueObjectPipe<
  T extends BaseValueObject<T>,
> implements PipeTransform<string, T> {
  protected readonly _type = ParseValueObjectPipe.name;

  public constructor(
    private readonly valueObjectClass: new (value: string) => T,
  ) {}

  public transform(value: string, metadata: ArgumentMetadata): T {
    const paramName = metadata.data;

    if (!value) {
      throw new BadRequestException(
        `O parâmetro '${paramName}' não pode ser nulo.`,
      );
    }

    try {
      const valueObject = new this.valueObjectClass(value);
      return valueObject;
    } catch (error) {
      throw error;
    }
  }
}
