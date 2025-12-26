import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';
import { OrganizationPaymentPlanBankPaymentEntityPropsInterface } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-bank-payment/organization-payment-plan-bank-payment-entity.props.interface';
import { OrganizationPaymentPlanBankPaymentId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-bank-payment/value-object/organization-payment-plan-bank-payment-id/organization-payment-plan-bank-payment-id.value-object';
import { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class OrganizationPaymentPlanBankPaymentEntity extends BaseEntity<OrganizationPaymentPlanBankPaymentId> {
  @Description('Identificador do plano de pagamento da organização')
  public readonly organizationPaymentPlan: OrganizationPaymentPlanId;

  @Description('Identificador da transação de pagamento bancário')
  public readonly bankPayment: BankPaymentId;

  protected readonly _type = OrganizationPaymentPlanBankPaymentEntity.name;

  public constructor(
    props: OrganizationPaymentPlanBankPaymentEntityPropsInterface,
  ) {
    super(OrganizationPaymentPlanBankPaymentId, props);

    this.organizationPaymentPlan = props.organizationPaymentPlan;
    this.bankPayment = props.bankPayment;
  }
}
