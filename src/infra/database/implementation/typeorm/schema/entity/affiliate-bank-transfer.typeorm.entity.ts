import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BankPaymentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank-payment.typeorm.entity';
import { BankTransferTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank-transfer.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { OrganizationPaymentPlanAffiliateCommissionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan-affiliate-commission.typeorm.entity';

@Entity({ name: 'affiliate_bank_transfer' })
export class AffiliateBankTransferTypeormEntity extends BaseTypeormEntity {
  @ManyToOne(() => OrganizationPaymentPlanAffiliateCommissionTypeormEntity)
  @JoinColumn({ name: 'affiliate_plan_commission_id' })
  public affiliatePlanCommission?: OrganizationPaymentPlanAffiliateCommissionTypeormEntity;

  @ManyToOne(() => BankPaymentTypeormEntity)
  @JoinColumn({ name: 'bank_payment_id' })
  public bankPayment?: BankPaymentTypeormEntity;

  @ManyToOne(() => BankTransferTypeormEntity)
  @JoinColumn({ name: 'bank_transfer_id' })
  public bankTransfer?: BankTransferTypeormEntity;

  protected override readonly _type = AffiliateBankTransferTypeormEntity.name;
}
