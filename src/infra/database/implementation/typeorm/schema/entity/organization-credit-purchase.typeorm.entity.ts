import { Entity, JoinColumn, ManyToOne, Column } from 'typeorm';

import { BankPaymentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank-payment.typeorm.entity';
import { BaseAuditableTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base-auditable.typeorm.entity';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';

@Entity({ name: 'organization_credit_purchase' })
export class OrganizationCreditPurchaseTypeormEntity extends BaseAuditableTypeormEntity {
  @Column({ name: 'credit_amount', type: 'number' })
  public creditAmount: number;

  @ManyToOne(
    () => OrganizationTypeormEntity,
    (entity) => entity.organizationCreditPurchase,
  )
  @JoinColumn({ name: 'organization_id' })
  public organization: OrganizationTypeormEntity;

  @ManyToOne(
    () => BankPaymentTypeormEntity,
    (entity) => entity.organizationCreditPurchase,
  )
  @JoinColumn({ name: 'bank_payment_id' })
  public bankPayment: BankPaymentTypeormEntity;

  protected override readonly _type =
    OrganizationCreditPurchaseTypeormEntity.name;
}
