import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AffiliateBankTransferId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-bank-transfer/value-object/affiliate-bank-transfer-id/affiliate-bank-transfer-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { AffiliateBankTransferEntityPropsInterface } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-bank-transfer/affiliate-bank-transfer.entity.props.interface';
import type { OrganizationPaymentPlanAffiliateCommissionId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-affiliate-commission/value-object/organization-payment-plan-affiliate-commission-id/organization-payment-plan-affiliate-commission-id.value-object';
import type { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';
import type { BankTransferId } from '@module/generic/bank/domain/schema/entity/bank-transfer/value-object/bank-transfer-id/bank-transfer-id.value-object';

export class AffiliateBankTransferEntity extends BaseEntity<AffiliateBankTransferId> {
  @Description('Comissão de afiliado do plano que originou esta transferência')
  public readonly affiliatePlanCommission: OrganizationPaymentPlanAffiliateCommissionId;

  @Description('Pagamento que originou a transferência')
  public readonly bankPayment: BankPaymentId;

  @Description('Transferência bancária realizada')
  public readonly bankTransfer: BankTransferId;

  protected readonly _type = AffiliateBankTransferEntity.name;

  public constructor(props: AffiliateBankTransferEntityPropsInterface) {
    super(AffiliateBankTransferId, props);
    this.affiliatePlanCommission = props.affiliatePlanCommission;
    this.bankPayment = props.bankPayment;
    this.bankTransfer = props.bankTransfer;
  }
}
