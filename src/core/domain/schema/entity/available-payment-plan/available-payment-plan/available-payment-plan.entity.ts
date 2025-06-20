import { InvalidPaymentPlanDescriptionError } from '@core/domain/schema/entity/available-payment-plan/available-payment-plan/error/invalid-available-payment-plan-description.error';
import { InvalidPaymentPlanNameError } from '@core/domain/schema/entity/available-payment-plan/available-payment-plan/error/invalid-available-payment-plan-name.error';
import { BaseEntity } from '@core/domain/schema/entity/base/base/base.entity';

import type { AvailablePaymentPlanEntityPropsInterface } from '@core/domain/schema/entity/available-payment-plan/available-payment-plan/available-payment-plan.entity.props.interface';
import type { PaymentPlanCycleEnum } from '@core/domain/schema/enum/payment-plan/payment-plan-cycle.enum';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';

export class AvailablePaymentPlanEntity extends BaseEntity {
  public readonly name: string;
  public readonly description: string;
  public readonly price: DecimalValue;
  public readonly maxMemberLimit: number;
  public readonly monthlyCreditAmount: number;
  public readonly active: boolean;
  public readonly cycle: PaymentPlanCycleEnum;

  protected readonly _type = AvailablePaymentPlanEntity.name;

  public constructor(props: AvailablePaymentPlanEntityPropsInterface) {
    AvailablePaymentPlanEntity.validateName(props.name);
    AvailablePaymentPlanEntity.validateDescription(props.description);

    super(props);

    this.name = props.name;
    this.description = props.description;
    this.price = props.price;
    this.maxMemberLimit = props.maxMemberLimit;
    this.monthlyCreditAmount = props.monthlyCreditAmount;
    this.active = props.active;
    this.cycle = props.cycle;
  }

  public static validateName(name: string): void {
    const minNameLength = 3;
    const maxNameLength = 100;
    const nameRegex = /^[A-Za-z0-9\s]+$/;

    const hasMinimumLength = name.length > minNameLength;
    const hasMaximumLength = name.length < maxNameLength;
    const matchesAllowedCharacters = nameRegex.test(name);

    this.validateAllOrThrow(
      [hasMinimumLength, hasMaximumLength, matchesAllowedCharacters],
      () =>
        new InvalidPaymentPlanNameError({
          maxLength: maxNameLength,
          minLength: minNameLength,
        }),
    );
  }

  public static validateDescription(name: string): void {
    const minNameLength = 3;
    const maxNameLength = 255;
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s]+$/;

    const hasMinimumLength = name.length > minNameLength;
    const hasMaximumLength = name.length < maxNameLength;
    const matchesAllowedCharacters = nameRegex.test(name);

    this.validateAllOrThrow(
      [hasMinimumLength, hasMaximumLength, matchesAllowedCharacters],
      () =>
        new InvalidPaymentPlanDescriptionError({
          maxLength: maxNameLength,
          minLength: minNameLength,
        }),
    );
  }
}
