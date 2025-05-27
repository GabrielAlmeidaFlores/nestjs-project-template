import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

import type { InvalidInputError } from '@core/error/invalid-input.error';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class BaseEntity {
  public readonly id: Guid;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected constructor(
    id: Guid | null,
    createdAt: Date | null,
    updatedAt: Date | null,
    deletedAt: Date | null,
  ) {
    this.id = id ?? Guid.generate();
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
    this.deletedAt = deletedAt;
  }

  protected static validateAllOrThrow<T extends InvalidInputError>(
    validate: Array<boolean>,
    error: ConstructorType<T>,
  ): void {
    const isInvalid = false;

    const validationFailed = validate.includes(isInvalid);

    if (validationFailed) {
      throw new error();
    }
  }
}
