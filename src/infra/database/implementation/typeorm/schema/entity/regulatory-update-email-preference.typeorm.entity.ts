import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';

@Entity({ name: 'regulatory_update_email_preference' })
@Index('IDX_regulatory_update_email_preference_customer_id', ['customer'], {
  unique: true,
})
export class RegulatoryUpdateEmailPreferenceTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'email_enabled', type: 'boolean', default: false })
  public emailEnabled: boolean;

  @ManyToOne(() => CustomerTypeormEntity, { nullable: false })
  @JoinColumn({ name: 'customer_id' })
  public customer?: CustomerTypeormEntity;

  protected override readonly _type =
    RegulatoryUpdateEmailPreferenceTypeormEntity.name;
}
