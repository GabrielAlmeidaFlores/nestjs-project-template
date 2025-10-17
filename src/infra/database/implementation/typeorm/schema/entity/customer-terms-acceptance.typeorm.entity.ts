import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CustomerTermsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-terms.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';

@Entity('customer_terms_acceptance')
export class CustomerTermsAcceptanceTypeormEntity extends BaseTypeormEntity {
  @ManyToOne(() => CustomerTypeormEntity, (entity) => entity.termsAccepted)
  @JoinColumn({ name: 'customer_id' })
  public customer?: CustomerTypeormEntity | undefined;

  @ManyToOne(
    () => CustomerTermsTypeormEntity,
    (entity) => entity.customerTermsAccepted,
  )
  @JoinColumn({ name: 'customer_terms_id' })
  public customerTerms?: CustomerTermsTypeormEntity | undefined;

  protected override readonly _type = CustomerTermsAcceptanceTypeormEntity.name;
}
