import { BaseValueObject } from '@core/domain/schema/value-object/base/base.value-object';

export class TransferMethod extends BaseValueObject<TransferMethod> {
  protected readonly _type = TransferMethod.name;

  public constructor(value: string) {
    super(value);
  }

  public equals(other: TransferMethod): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
