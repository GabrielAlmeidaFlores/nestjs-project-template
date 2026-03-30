import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpecialRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant.typeorm.entity';

@Entity({ name: 'special_retirement_grant_legal_proceeding' })
export class SpecialRetirementGrantLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'legal_proceeding_number',
    type: 'varchar',
    length: 100,
  })
  public legalProceedingNumber: string;

  @ManyToOne(
    () => SpecialRetirementGrantTypeormEntity,
    (entity) => entity.specialRetirementGrantLegalProceeding,
  )
  @JoinColumn({ name: 'special_retirement_grant_id' })
  public specialRetirementGrant:
    | SpecialRetirementGrantTypeormEntity
    | undefined;

  protected override readonly _type =
    SpecialRetirementGrantLegalProceedingTypeormEntity.name;
}
