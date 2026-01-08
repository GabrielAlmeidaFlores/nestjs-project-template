import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { OrganizationPaymentPlanEnabledPaidResourceEntityPropsInterface } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-enabled-paid-resource/organization-payment-plan-enabled-paid-resource-entity.props.interface';
import { OrganizationPaymentPlanEnabledPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-enabled-paid-resource/value-object/organization-payment-plan-enabled-paid-resource-id/organization-payment-plan-enabled-paid-resource-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';
import type { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';

export class OrganizationPaymentPlanEnabledPaidResourceEntity extends BaseEntity<OrganizationPaymentPlanEnabledPaidResourceId> {
  @Description('Identificador do plano de pagamento da organização')
  public readonly organizationPaymentPlan: OrganizationPaymentPlanId;

  @Description('Identificador do recurso pago habilitado')
  public readonly paymentPlanPaidResource: PaymentPlanPaidResourceId;

  protected readonly _type =
    OrganizationPaymentPlanEnabledPaidResourceEntity.name;

  public constructor(
    props: OrganizationPaymentPlanEnabledPaidResourceEntityPropsInterface,
  ) {
    super(OrganizationPaymentPlanEnabledPaidResourceId, props);
    const { organizationPaymentPlan, paymentPlanPaidResource } = props;
    this.organizationPaymentPlan = organizationPaymentPlan;
    this.paymentPlanPaidResource = paymentPlanPaidResource;
  }
}
