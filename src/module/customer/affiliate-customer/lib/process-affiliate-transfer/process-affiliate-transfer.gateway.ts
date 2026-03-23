import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';
import type { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';

export abstract class ProcessAffiliateTransferGateway {
  /**
   * Processes the affiliate commission transfer for a completed payment.
   * Does nothing if the org payment plan has no affiliate linked or if affiliate has no pix key.
   */
  public abstract process(
    bankPaymentId: BankPaymentId,
    organizationPaymentPlanId: OrganizationPaymentPlanId,
    paymentAmount: DecimalValue,
  ): Promise<void>;
}
