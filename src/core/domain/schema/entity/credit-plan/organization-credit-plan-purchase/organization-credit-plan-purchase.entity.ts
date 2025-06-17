import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import type { OrganizationCreditPlanPurchaseEntityPropsInterface } from '@core/domain/schema/entity/credit-plan/organization-credit-plan-purchase/organization-credit-plan-purchase.entity.props.interface';
import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class OrganizationCreditPlanPurchaseEntity extends BaseEntity {
  public readonly price: string;
  public readonly creditAmount: number;
  public readonly active: boolean;
  public readonly organization: Guid;
  public readonly creditPlan: Guid;
  public readonly bankPayment: Guid;

  protected readonly _type = OrganizationCreditPlanPurchaseEntity.name;

  public constructor(
    props: OrganizationCreditPlanPurchaseEntityPropsInterface,
  ) {
    super(props);

    this.price = props.price;
    this.creditAmount = props.creditAmount;
    this.active = props.active;
    this.organization = props.organization;
    this.creditPlan = props.creditPlan;
    this.bankPayment = props.bankPayment;
  }
}
