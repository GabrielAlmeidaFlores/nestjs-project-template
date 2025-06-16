import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import type { OrganizationPaymentPlanEntityPropsInterface } from '@core/domain/schema/entity/organization-payment-plan/organization-payment-plan/organization-payment-plan.entity.props.interface';
import type { PaymentPlanCycleEnum } from '@core/domain/schema/enum/payment-plan-cycle.enum';
import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class OrganizationPaymentPlanEntity extends BaseEntity {
  public readonly name: string;
  public readonly description: string;
  public readonly price: number;
  public readonly maxMemberLimit: number;
  public readonly monthlyCreditAmount: number;
  public readonly cycle: PaymentPlanCycleEnum;
  public readonly paymentPlan: Guid;
  public readonly organization: Guid;

  protected readonly _type = OrganizationPaymentPlanEntity.name;

  public constructor(props: OrganizationPaymentPlanEntityPropsInterface) {
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
}
