import { BaseEntity } from '@core/domain/schema/entity/base/base/base.entity';

import type { BankPaymentEntity } from '@core/domain/schema/entity/bank/bank-payment/bank-payment.entity';
import type { CreditPlanEntity } from '@core/domain/schema/entity/credit-plan/credit-plan/credit-plan.entity';
import type { OrganizationCreditPlanPurchaseEntityPropsInterface } from '@core/domain/schema/entity/credit-plan/organization-credit-plan-purchase/organization-credit-plan-purchase.entity.props.interface';
import type { OrganizationEntity } from '@core/domain/schema/entity/organization/organization/organization.entity';
import type { RelationModel } from '@core/domain/schema/model/relation.model';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';

export class OrganizationCreditPlanPurchaseEntity extends BaseEntity {
  public readonly price: DecimalValue;
  public readonly creditAmount: number;
  public readonly active: boolean;
  public readonly creditPlan: CreditPlanEntity;
  public readonly organization: RelationModel<OrganizationEntity>;
  public readonly bankPayment: RelationModel<BankPaymentEntity>;

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
