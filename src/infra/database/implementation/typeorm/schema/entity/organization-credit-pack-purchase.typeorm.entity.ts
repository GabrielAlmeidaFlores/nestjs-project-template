import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BankPaymentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank-payment.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CreditPackTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/credit-pack.typeorm.entity';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';

@Entity({ name: 'organization_credit_pack_purchase' })
export class OrganizationCreditPackPurchaseTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'credit_amount', type: 'integer' })
  public creditAmount: number;

  @Column({ name: 'price', type: 'decimal', precision: 10, scale: 2 })
  public price: string;

  @ManyToOne(() => OrganizationTypeormEntity)
  @JoinColumn({ name: 'organization_id' })
  public organization?: OrganizationTypeormEntity | undefined;

  @ManyToOne(
    () => CreditPackTypeormEntity,
    (e) => e.organizationCreditPackPurchase,
  )
  @JoinColumn({ name: 'credit_pack_id' })
  public creditPack?: CreditPackTypeormEntity | undefined;

  @ManyToOne(() => BankPaymentTypeormEntity)
  @JoinColumn({ name: 'bank_payment_id' })
  public bankPayment?: BankPaymentTypeormEntity | undefined;

  protected override readonly _type =
    OrganizationCreditPackPurchaseTypeormEntity.name;
}
