import { Entity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import { AffiliateCustomerEnabledPaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/affiliate-customer-enabled-payment-plan.typeorm.entity';
import { AffiliateCustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/affiliate-customer.typeorm';
import { BankTransferTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank-transfer.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({ name: 'affiliate_customer_payment' })
export class AffiliateCustomerPaymentTypeormEntity extends BaseTypeormEntity {
  @ManyToOne(
    () => AffiliateCustomerTypeormEntity,
    (entity) => entity.affiliateCustomerPayment,
  )
  @JoinColumn({ name: 'affiliate_customer_id' })
  public affiliateCustomer: AffiliateCustomerTypeormEntity | undefined;

  @ManyToOne(
    () => BankTransferTypeormEntity,
    (entity) => entity.affiliateCustomerPayment,
  )
  @JoinColumn({ name: 'bank_transfer_id' })
  public bankTransfer: BankTransferTypeormEntity;

  @OneToMany(
    () => AffiliateCustomerEnabledPaymentPlanTypeormEntity,
    (entity) => entity.affiliateCustomerPayment,
  )
  public affiliateCustomerEnabledPaymentPlan:
    | AffiliateCustomerEnabledPaymentPlanTypeormEntity[]
    | undefined;

  protected override readonly _type =
    AffiliateCustomerPaymentTypeormEntity.name;
}
