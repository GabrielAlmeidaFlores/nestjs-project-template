import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { TermsAndConditionsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/terms-and-conditions.typeorm.entity';

@Entity('customer_terms_acceptance')
export class CustomerTermsAcceptanceTypeormEntity extends BaseTypeormEntity {
  @ManyToOne(() => CustomerTypeormEntity, (entity) => entity.termsAccepted)
  @JoinColumn({ name: 'customer_id' })
  public customer?: CustomerTypeormEntity | undefined;

  @ManyToOne(
    () => TermsAndConditionsTypeormEntity,
    (entity) => entity.customerTermsAccepted,
  )
  @JoinColumn({ name: 'terms_id' })
  public terms?: TermsAndConditionsTypeormEntity | undefined;

  protected override readonly _type = CustomerTermsAcceptanceTypeormEntity.name;
}
