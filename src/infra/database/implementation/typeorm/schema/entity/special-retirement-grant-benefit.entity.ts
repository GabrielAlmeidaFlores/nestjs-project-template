import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpecialRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant.typeorm.entity';

@Entity({ name: 'special_retirement_grant_benefit' })
export class SpecialRetirementGrantBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'inss_benefit_number',
    type: 'varchar',
    length: 100,
  })
  public inssBenefitNumber: string;

  @ManyToOne(
    () => SpecialRetirementGrantTypeormEntity,
    (entity) => entity.specialRetirementGrantBenefit,
  )
  @JoinColumn({ name: 'special_retirement_grant_id' })
  public specialRetirementGrant:
    | SpecialRetirementGrantTypeormEntity
    | undefined;

  protected override readonly _type =
    SpecialRetirementGrantBenefitTypeormEntity.name;
}
