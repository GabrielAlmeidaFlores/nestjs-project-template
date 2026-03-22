import type { GetAffiliateBankTransferQueryResult } from '@module/customer/affiliate-customer/domain/repository/affiliate-bank-transfer/query/result/get-affiliate-bank-transfer.query.result';
import type { OrganizationPaymentPlanAffiliateCommissionId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-affiliate-commission/value-object/organization-payment-plan-affiliate-commission-id/organization-payment-plan-affiliate-commission-id.value-object';
import type { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';

export abstract class AffiliateBankTransferQueryRepositoryGateway {
  public abstract findOneByBankPaymentId(
    bankPaymentId: BankPaymentId,
  ): Promise<GetAffiliateBankTransferQueryResult | null>;

  public abstract findOneByAffiliatePlanCommissionId(
    commissionId: OrganizationPaymentPlanAffiliateCommissionId,
  ): Promise<GetAffiliateBankTransferQueryResult | null>;

  public abstract findManyByAffiliatePlanCommissionIds(
    commissionIds: OrganizationPaymentPlanAffiliateCommissionId[],
  ): Promise<GetAffiliateBankTransferQueryResult[]>;
}
