import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import type { InvalidInputError } from '@core/error/invalid-input.error';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class BaseEntity<Id extends Guid> {
  public readonly id: Id;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected constructor(
    idConstructor: ConstructorType<Id>,
    props: BaseEntityPropsInterface<Id>,
  ) {
    this.id = props.id ?? new idConstructor();
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
