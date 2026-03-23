import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { AffiliateBankTransferId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-bank-transfer/value-object/affiliate-bank-transfer-id/affiliate-bank-transfer-id.value-object';
import type { OrganizationPaymentPlanAffiliateCommissionId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-affiliate-commission/value-object/organization-payment-plan-affiliate-commission-id/organization-payment-plan-affiliate-commission-id.value-object';
import type { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';
import type { BankTransferId } from '@module/generic/bank/domain/schema/entity/bank-transfer/value-object/bank-transfer-id/bank-transfer-id.value-object';

export class GetAffiliateBankTransferQueryResult extends BaseBuildableObject {
  public readonly id: AffiliateBankTransferId;
  public readonly affiliatePlanCommissionId: OrganizationPaymentPlanAffiliateCommissionId;
  public readonly bankPaymentId: BankPaymentId;
  public readonly bankTransferId: BankTransferId;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type = GetAffiliateBankTransferQueryResult.name;
}
