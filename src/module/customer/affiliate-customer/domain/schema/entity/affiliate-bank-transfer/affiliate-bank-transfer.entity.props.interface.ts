import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AffiliateBankTransferId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-bank-transfer/value-object/affiliate-bank-transfer-id/affiliate-bank-transfer-id.value-object';
import type { OrganizationPaymentPlanAffiliateCommissionId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-affiliate-commission/value-object/organization-payment-plan-affiliate-commission-id/organization-payment-plan-affiliate-commission-id.value-object';
import type { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';
import type { BankTransferId } from '@module/generic/bank/domain/schema/entity/bank-transfer/value-object/bank-transfer-id/bank-transfer-id.value-object';

export interface AffiliateBankTransferEntityPropsInterface extends BaseEntityPropsInterface<AffiliateBankTransferId> {
  affiliatePlanCommission: OrganizationPaymentPlanAffiliateCommissionId;
  bankPayment: BankPaymentId;
  bankTransfer: BankTransferId;
}
