import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { OrganizationPaymentPlanEnablePaidResourceEntityPropsInterface } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-enable-paid-resource/organization-payment-plan-enable-paid-resource-entity.props.interface';
import { OrganizationPaymentPlanEnablePaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-enable-paid-resource/value-object/organization-payment-plan-enable-paid-resource-id/organization-payment-plan-enable-paid-resource-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import type { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';

export class OrganizationPaymentPlanEnablePaidResourceEntity extends BaseEntity<OrganizationPaymentPlanEnablePaidResourceId> {
  @Description('Identificador do plano de pagamento')
  public readonly paymentPlan: PaymentPlanId;

  @Description('Identificador do recurso pago habilitado')
  public readonly paymentPlanPaidResource: PaymentPlanPaidResourceId;

  protected readonly _type =
    OrganizationPaymentPlanEnablePaidResourceEntity.name;

  public constructor(
    props: OrganizationPaymentPlanEnablePaidResourceEntityPropsInterface,
  ) {
    super(OrganizationPaymentPlanEnablePaidResourceId, props);
    this.paymentPlan = props.paymentPlan;
    this.paymentPlanPaidResource = props.paymentPlanPaidResource;
  }
}
