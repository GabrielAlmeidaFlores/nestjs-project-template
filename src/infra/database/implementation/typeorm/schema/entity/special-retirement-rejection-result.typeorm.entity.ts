import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpecialRetirementRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection.typeorm.entity';

@Entity({ name: 'special_retirement_rejection_result' })
export class SpecialRetirementRejectionResultTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'first_analysis',
    type: 'longtext',
    nullable: true,
  })
  public firstAnalysis: string | null;

  @Column({
    name: 'complete_analysis',
    type: 'longtext',
    nullable: true,
  })
  public completeAnalysis: string | null;

  @Column({
    name: 'simplified_analysis',
    type: 'longtext',
    nullable: true,
  })
  public simplifiedAnalysis: string | null;

  @OneToOne(
    () => SpecialRetirementRejectionTypeormEntity,
    (entity) => entity.specialRetirementRejectionResult,
  )
  public specialRetirementRejection?:
    | SpecialRetirementRejectionTypeormEntity
    | undefined;

  protected override readonly _type =
    SpecialRetirementRejectionResultTypeormEntity.name;
}
