import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPermanentDisabilityRevisionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision.typeorm.entity';

@Entity({ name: 'retirement_permanent_disability_revision_result' })
export class RetirementPermanentDisabilityRevisionResultTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'retirement_permanent_disability_revision_first_analysis',
    type: 'longtext',
    nullable: true,
  })
  public retirementPermanentDisabilityRevisionFirstAnalysis: string | null;

  @Column({
    name: 'retirement_permanent_disability_revision_complete_analysis',
    type: 'longtext',
    nullable: true,
  })
  public retirementPermanentDisabilityRevisionCompleteAnalysis: string | null;

  @Column({
    name: 'retirement_permanent_disability_revision_simplified_analysis',
    type: 'text',
    nullable: true,
  })
  public retirementPermanentDisabilityRevisionSimplifiedAnalysis: string | null;

  @OneToOne(
    () => RetirementPermanentDisabilityRevisionTypeormEntity,
    (entity) => entity.retirementPermanentDisabilityRevisionResult,
  )
  public retirementPermanentDisabilityRevision?:
    | RetirementPermanentDisabilityRevisionTypeormEntity
    | undefined;

  protected override readonly _type =
    RetirementPermanentDisabilityRevisionResultTypeormEntity.name;
}
