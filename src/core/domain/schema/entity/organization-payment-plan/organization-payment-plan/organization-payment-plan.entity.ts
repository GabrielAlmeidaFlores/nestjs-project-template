import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { InvalidPaymentPlanDescriptionError } from '@core/domain/schema/entity/organization-payment-plan/organization-payment-plan/error/invalid-payment-plan-description.error';
import { InvalidPaymentPlanNameError } from '@core/domain/schema/entity/organization-payment-plan/organization-payment-plan/error/invalid-payment-plan-name.error';

import type { OrganizationEntity } from '@core/domain/schema/entity/organization/organization/organization.entity';
import type { OrganizationPaymentPlanEntityPropsInterface } from '@core/domain/schema/entity/organization-payment-plan/organization-payment-plan/organization-payment-plan.entity.props.interface';
import type { PaymentPlanEntity } from '@core/domain/schema/entity/payment-plan/payment-plan/payment-plan.entity';
import type { PaymentPlanCycleEnum } from '@core/domain/schema/enum/payment-plan-cycle.enum';
import type { RelationModel } from '@core/domain/schema/model/relation.model';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';

export class OrganizationPaymentPlanEntity extends BaseEntity {
  public readonly name: string;
  public readonly description: string;
  public readonly price: DecimalValue;
  public readonly maxMemberLimit: number;
  public readonly monthlyCreditAmount: number;
  public readonly cycle: PaymentPlanCycleEnum;
  public readonly paymentPlan: RelationModel<PaymentPlanEntity>;
  public readonly organization: RelationModel<OrganizationEntity>;

  protected readonly _type = OrganizationPaymentPlanEntity.name;

  public constructor(props: OrganizationPaymentPlanEntityPropsInterface) {
    OrganizationPaymentPlanEntity.validateName(props.name);
    OrganizationPaymentPlanEntity.validateDescription(props.description);

    super(props);

    this.name = props.name;
    this.description = props.description;
    this.price = props.price;
    this.maxMemberLimit = props.maxMemberLimit;
    this.monthlyCreditAmount = props.monthlyCreditAmount;
    this.cycle = props.cycle;
    this.paymentPlan = props.paymentPlan;
    this.organization = props.organization;
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
