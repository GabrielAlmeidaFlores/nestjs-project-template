import { BaseValueObject } from '@core/domain/schema/value-object/base/base.value-object';

export class PaymentMethod extends BaseValueObject<PaymentMethod> {
  protected readonly _type = PaymentMethod.name;

  public constructor(value: string) {
    super(value);
  }

  public equals(other: PaymentMethod): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
