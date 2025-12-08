import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { OrganizationPaymentPlanEnablePaidResourceEntityPropsInterface } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-enable-paid-resource/organization-payment-plan-enable-paid-resource-entity.props.interface';
import { OrganizationPaymentPlanEnablePaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-enable-paid-resource/value-object/organization-payment-plan-enable-paid-resource-id/organization-payment-plan-enable-paid-resource-id.value.object';
import { PaymentPlanEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/payment-plan.entity';
import { PaymentPlanPaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/payment-plan-paid-resource.entity';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class OrganizationPaymentPlanEnablePaidResourceEntity extends BaseEntity<OrganizationPaymentPlanEnablePaidResourceId> {
  @Description('Plano de pagamento vinculado ao recurso pago habilitado')
  public readonly paymentPlan: PaymentPlanEntity | null;

  @Description('Recurso pago habilitado para o plano de pagamento')
  public readonly paymentPlanPaidResource: PaymentPlanPaidResourceEntity | null;

  protected readonly _type =
    OrganizationPaymentPlanEnablePaidResourceEntity.name;

  public constructor(
    props: OrganizationPaymentPlanEnablePaidResourceEntityPropsInterface,
  ) {
    super(OrganizationPaymentPlanEnablePaidResourceId, props);
    this.paymentPlan = props.paymentPlan ?? null;
    this.paymentPlanPaidResource = props.paymentPlanPaidResource ?? null;
  }
}
