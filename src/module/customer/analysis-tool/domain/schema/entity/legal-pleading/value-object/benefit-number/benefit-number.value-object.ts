import { BaseValueObject } from '@core/domain/schema/value-object/base/base.value-object';
import { InvalidBenefitNumberError } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/benefit-number/error/invalid-benefit-number.error';

export class BenefitNumber extends BaseValueObject<BenefitNumber> {
  protected readonly _type = BenefitNumber.name;

  public constructor(value: string) {
    if (typeof value === 'undefined') {
      throw new InvalidBenefitNumberError();
    }

    value = value.replace(/\D/g, '');

    super(value);

    const isValidBenefitNumber = BenefitNumber.isValid(value);

    if (!isValidBenefitNumber) {
      throw new InvalidBenefitNumberError();
    }
  }

  public static isValid(value: string): boolean {
    if (!value) {
      return false;
    }

    const benefitNumberRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{1}$|^\d{10}$/;
    return benefitNumberRegex.test(value);
  }

  public equals(other: BenefitNumber): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
