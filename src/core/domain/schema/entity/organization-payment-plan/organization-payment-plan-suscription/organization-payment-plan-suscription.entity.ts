import type { OrganizationPaymentPlanSubscriptionEntityPropsInterface } from '@core/domain/schema/entity/organization-payment-plan/organization-payment-plan-suscription/organization-payment-plan-suscription.entity.props.interface';
import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class OrganizationPaymentPlanSubscriptionEntity {
  public readonly bankPayment: Guid;

  protected readonly _type = OrganizationPaymentPlanSubscriptionEntity.name;

  public constructor(
    props: OrganizationPaymentPlanSubscriptionEntityPropsInterface,
  ) {
    this.bankPayment = props.bankPayment;
  }
}
