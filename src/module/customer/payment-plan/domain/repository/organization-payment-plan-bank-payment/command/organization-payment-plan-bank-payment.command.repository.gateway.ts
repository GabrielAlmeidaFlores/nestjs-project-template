import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { OrganizationPaymentPlanBankPaymentEntity } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-bank-payment/organization-payment-plan-bank-payment.entity';
import type { OrganizationPaymentPlanBankPaymentId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-bank-payment/value-object/organization-payment-plan-bank-payment-id/organization-payment-plan-bank-payment-id.value-object';

export abstract class OrganizationPaymentPlanBankPaymentCommandRepositoryGateway {
  public abstract createOrganizationPaymentPlanBankPayment(
    props: OrganizationPaymentPlanBankPaymentEntity,
  ): TransactionType;

  public abstract updateOrganizationPaymentPlanBankPayment(
    id: OrganizationPaymentPlanBankPaymentId,
    props: Partial<OrganizationPaymentPlanBankPaymentEntity>,
  ): TransactionType;

  public abstract deleteOrganizationPaymentPlanBankPayment(
    id: OrganizationPaymentPlanBankPaymentId,
  ): TransactionType;
}
