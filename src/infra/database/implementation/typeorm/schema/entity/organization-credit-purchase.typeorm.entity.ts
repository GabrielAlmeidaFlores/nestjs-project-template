import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BankPaymentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank-payment.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';
import { DateTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date.transformer';

@Entity({ name: 'organization_credit_purchase' })
export class OrganizationCreditPurchaseTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'credit_amount', type: 'integer' })
  public creditAmount: number;

  @Column({
    name: 'valid_from',
    type: 'date',
    transformer: DateTransformer,
    nullable: true,
  })
  public validFrom: Date | null;

  @ManyToOne(() => OrganizationTypeormEntity)
  @JoinColumn({ name: 'organization_id' })
  public organization?: OrganizationTypeormEntity | undefined;

  @ManyToOne(() => BankPaymentTypeormEntity)
  @JoinColumn({ name: 'bank_payment_id' })
  public bankPayment?: BankPaymentTypeormEntity | undefined;

  protected override readonly _type =
    OrganizationCreditPurchaseTypeormEntity.name;
}
