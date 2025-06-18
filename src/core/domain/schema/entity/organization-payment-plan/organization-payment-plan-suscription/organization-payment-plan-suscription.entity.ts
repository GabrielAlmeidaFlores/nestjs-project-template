import type { BankPaymentEntity } from '@core/domain/schema/entity/bank/bank-payment/bank-payment.entity';
import type { OrganizationPaymentPlanEntity } from '@core/domain/schema/entity/organization-payment-plan/organization-payment-plan/organization-payment-plan.entity';
import type { OrganizationPaymentPlanSubscriptionEntityPropsInterface } from '@core/domain/schema/entity/organization-payment-plan/organization-payment-plan-suscription/organization-payment-plan-suscription.entity.props.interface';
import type { RelationModel } from '@core/domain/schema/model/relation.model';

export class OrganizationPaymentPlanSubscriptionEntity {
  public readonly bankPayment: RelationModel<BankPaymentEntity>;
  public readonly organizationPaymentPlan: OrganizationPaymentPlanEntity;

  protected readonly _type = OrganizationPaymentPlanSubscriptionEntity.name;

  public constructor(
    props: OrganizationPaymentPlanSubscriptionEntityPropsInterface,
  ) {
    this.organizationPaymentPlan = props.organizationPaymentPlan;
    this.bankPayment = props.bankPayment;
  }
}
