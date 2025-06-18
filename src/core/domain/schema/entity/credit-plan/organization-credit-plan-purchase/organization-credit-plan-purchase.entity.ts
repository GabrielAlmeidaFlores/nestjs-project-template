import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import type { BankPaymentEntity } from '@core/domain/schema/entity/bank/bank-payment/bank-payment.entity';
import type { CreditPlanEntity } from '@core/domain/schema/entity/credit-plan/credit-plan/credit-plan.entity';
import type { OrganizationCreditPlanPurchaseEntityPropsInterface } from '@core/domain/schema/entity/credit-plan/organization-credit-plan-purchase/organization-credit-plan-purchase.entity.props.interface';
import type { OrganizationEntity } from '@core/domain/schema/entity/organization/organization/organization.entity';
import type { RelationType } from '@core/domain/schema/type/relation.type';

export class OrganizationCreditPlanPurchaseEntity extends BaseEntity {
  public readonly price: string;
  public readonly creditAmount: number;
  public readonly active: boolean;
  public readonly creditPlan: CreditPlanEntity;
  public readonly organization: RelationType<OrganizationEntity>;
  public readonly bankPayment: RelationType<BankPaymentEntity>;

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
