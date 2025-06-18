import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base/base.entity.props.interface';
import type { InvalidInputError } from '@core/error/invalid-input.error';

export abstract class BaseEntity {
  public readonly id: Guid;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected constructor(props: BaseEntityPropsInterface) {
    this.id = props.id ?? Guid.generate();
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
    this.deletedAt = props.deletedAt ?? null;
  }

  protected static validateAllOrThrow<T extends InvalidInputError>(
    validate: Array<boolean>,
    error: () => T,
  ): void {
    const isInvalid = false;

    const validationFailed = validate.includes(isInvalid);

    if (validationFailed) {
      const errorInstance = error();
      throw errorInstance;
    }
  }
}
