import { Column, Entity, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CustomerTermsAcceptanceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-terms-acceptance.typeorm.entity';

@Entity('terms_and_conditions')
export class TermsAndConditionsTypeormEntity extends BaseTypeormEntity {
  @Column({ type: 'text', name: 'content' })
  public content: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  public isActive: boolean;

  @OneToMany(
    () => CustomerTermsAcceptanceTypeormEntity,
    (entity) => entity.terms,
  )
  public customerTermsAccepted?:
    | CustomerTermsAcceptanceTypeormEntity[]
    | undefined;

  protected override readonly _type = TermsAndConditionsTypeormEntity.name;
}
