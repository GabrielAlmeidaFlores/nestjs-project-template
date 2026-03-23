import { Column, Entity, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { OrganizationCreditPackPurchaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-credit-pack-purchase.typeorm.entity';

@Entity({ name: 'credit_pack' })
export class CreditPackTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'name', type: 'varchar', length: 100 })
  public name: string;

  @Column({ name: 'description', type: 'varchar', length: 255 })
  public description: string;

  @Column({ name: 'price', type: 'decimal', precision: 10, scale: 2 })
  public price: string;

  @Column({ name: 'credit_amount', type: 'integer' })
  public creditAmount: number;

  @Column({ name: 'active', type: 'boolean', default: true })
  public active: boolean;

  @OneToMany(
    () => OrganizationCreditPackPurchaseTypeormEntity,
    (e) => e.creditPack,
  )
  public organizationCreditPackPurchase?:
    | OrganizationCreditPackPurchaseTypeormEntity[]
    | undefined;

  protected override readonly _type = CreditPackTypeormEntity.name;
}
