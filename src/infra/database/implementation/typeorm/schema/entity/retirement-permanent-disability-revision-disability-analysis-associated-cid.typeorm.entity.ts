import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

import { RetirementPermanentDisabilityRevisionDisabilityAnalysisTypeormEntity } from './retirement-permanent-disability-revision-disability-analysis.typeorm.entity';

@Entity({
  name: 'retirement_permanent_disability_revision_disability_analysis_associated_cid',
})
export class RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'cid', type: 'varchar', length: 20 })
  public cid: string;

  @ManyToOne(
    () =>
      RetirementPermanentDisabilityRevisionDisabilityAnalysisTypeormEntity,
    (entity) =>
      entity.retirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCid,
  )
  @JoinColumn({
    name: 'retirement_permanent_disability_revision_disability_analysis_id',
  })
  public retirementPermanentDisabilityRevisionDisabilityAnalysis?: RetirementPermanentDisabilityRevisionDisabilityAnalysisTypeormEntity | undefined;

  protected override readonly _type =
    RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidTypeormEntity.name;
}
