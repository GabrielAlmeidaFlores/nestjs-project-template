import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpecialRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant.typeorm.entity';

@Entity({ name: 'special_retirement_grant_result' })
export class SpecialRetirementGrantResultTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'special_retirement_grant_complete_analysis',
    type: 'longtext',
    nullable: true,
  })
  public specialRetirementGrantCompleteAnalysis: string | null;

  @Column({
    name: 'special_retirement_grant_simplified_analysis',
    type: 'text',
    nullable: true,
  })
  public specialRetirementGrantSimplifiedAnalysis: string | null;

  @OneToOne(
    () => SpecialRetirementGrantTypeormEntity,
    (entity) => entity.specialRetirementGrantResult,
  )
  public specialRetirementGrant?:
    | SpecialRetirementGrantTypeormEntity
    | undefined;

  protected override readonly _type =
    SpecialRetirementGrantResultTypeormEntity.name;
}
