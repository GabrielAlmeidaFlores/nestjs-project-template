import { BaseValueObject } from '@core/domain/schema/value-object/base/base.value-object';

export class Hash extends BaseValueObject<Hash> {
  protected readonly _type = Hash.name;

  public constructor(value: string) {
    super(value);
  }

  public equals(other: Hash): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
