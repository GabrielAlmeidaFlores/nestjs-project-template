import { BaseValueObject } from '@core/domain/schema/value-object/base/base.value-object';

export class HashedPassword extends BaseValueObject<HashedPassword> {
  protected readonly _type = HashedPassword.name;

  public constructor(value: string) {
    super(value);
  }

  public equals(other: HashedPassword): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
