import type { BankPaymentEntity } from '@core/domain/schema/entity/bank/bank-payment/bank-payment.entity';
import type { OrganizationPaymentPlanEntity } from '@core/domain/schema/entity/organization-payment-plan/organization-payment-plan/organization-payment-plan.entity';
import type { OrganizationPaymentPlanChargeEntityPropsInterface } from '@core/domain/schema/entity/organization-payment-plan/organization-payment-plan-charge/organization-payment-plan-charge.props.interface';
import type { RelationModel } from '@core/domain/schema/model/relation.model';

export class OrganizationPaymentPlanChargeEntity {
  public readonly bankPayment: RelationModel<BankPaymentEntity>;
  public readonly organizationPaymentPlan: OrganizationPaymentPlanEntity;

  protected readonly _type = OrganizationPaymentPlanChargeEntity.name;

  public constructor(props: OrganizationPaymentPlanChargeEntityPropsInterface) {
    this.organizationPaymentPlan = props.organizationPaymentPlan;
    this.bankPayment = props.bankPayment;
  }
}
