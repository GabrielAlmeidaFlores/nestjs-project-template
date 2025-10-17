import { Column, Entity, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CustomerTermsAcceptanceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-terms-acceptance.typeorm.entity';

@Entity('customer_terms')
export class CustomerTermsTypeormEntity extends BaseTypeormEntity {
  @Column({ type: 'text', name: 'content' })
  public content: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  public isActive: boolean;

  @OneToMany(
    () => CustomerTermsAcceptanceTypeormEntity,
    (entity) => entity.customerTerms,
  )
  public customerTermsAccepted?:
    | CustomerTermsAcceptanceTypeormEntity[]
    | undefined;

  protected override readonly _type = CustomerTermsTypeormEntity.name;
}
